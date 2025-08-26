const express = require("express");
const CryptoJS = require("crypto-js");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const moment = require("moment");
const cors = require("cors");
app.use(cors());
var jwt = require("jsonwebtoken");
app.use(express.json());
// const nodemailer = require("nodemailer");

const port = process.env.PORT;

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dmb-cluster.6bs5ltd.mongodb.net/?retryWrites=true&w=majority&appName=DMB-Cluster`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized access: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access: Malformed token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden access: Invalid or expired token" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // Collections
    const db = client.db("dgm-database");
    const usersCollection = db.collection("users");
    const accountsCollection = db.collection("accounts");
    const transactionsCollection = db.collection("transactions");
    const budgetsCollection = db.collection("budgets");
    const investmentPortfolioCollection = db.collection("investment-portfolios");
    const loansCollection = db.collection("loans");

    //userCollection for generate web token
    app.put("/token/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      await usersCollection.updateOne(filter, updateDoc, options);
      res.send({ token });
    });

    app.post("/login", async (req, res) => {
      const { email, encryptedPassword } = req.body;
      const password = CryptoJS.AES.decrypt(
        encryptedPassword,
        process.env.DECRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (!email || !password) {
        return res
          .status(400)
          .send({ success: false, message: "Email and password are required" });
      }

      const user = await usersCollection.findOne({ email: email });
      const userEncryptedPassword = user?.encryptedPassword;
      const userPassword = CryptoJS.AES.decrypt(
        userEncryptedPassword,
        process.env.DECRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (user && userPassword === password) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        return res.status(200).send({ success: true, token, uId: user._id });
      } else {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }
    });

    app.post("/register", async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        if (result.insertedId) {
          const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
          res.status(201).send({ success: true, result, token });
        } else {
          res
            .status(500)
            .send({ success: false, message: "Registration failed" });
        }
      } catch (error) {
        console.error("Registration error:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/accounts", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;

        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const accounts = await accountsCollection
          .find({ userId: uId })
          .toArray();
        res.send({ success: true, accounts });
      } catch (error) {
        console.error("Error fetching accounts:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/transactions", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;

        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const query = { userId: uId };

        // Fetch transactions and get the most recent date
        const transactions = await transactionsCollection.find(query).toArray();

        // Find the most recent transaction date
        const mostRecentTransaction = transactions.reduce((latest, current) => {
          return new Date(current.date) > new Date(latest.date)
            ? current
            : latest;
        }, transactions[0]);

        const referenceDate = mostRecentTransaction
          ? mostRecentTransaction.date
          : new Date().toISOString();

        res.send({
          success: true,
          transactions,
          referenceDate, // Include reference date for frontend
        });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to fetch transactions" });
      }
    });

    app.get("/transaction-history", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;
        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        // First get the most recent transaction date
        const mostRecentTransaction = await transactionsCollection.findOne(
          { userId: uId },
          { sort: { date: -1 } }
        );

        // Use MongoDB aggregation to group by date and calculate credit/debit amounts
        const formattedTransactions = await transactionsCollection
          .aggregate([
            { $match: { userId: uId } },
            {
              $addFields: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: { $toDate: "$date" },
                  },
                },
              },
            },
            {
              $group: {
                _id: "$dateString",
                credit: {
                  $sum: {
                    $cond: [
                      { $eq: ["$transactionType", "credit"] },
                      "$amount",
                      0,
                    ],
                  },
                },
                debit: {
                  $sum: {
                    $cond: [
                      { $eq: ["$transactionType", "debit"] },
                      "$amount",
                      0,
                    ],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                date: "$_id",
                credit: 1,
                debit: 1,
              },
            },
            { $sort: { date: -1 } },
          ])
          .toArray();

        const referenceDate = mostRecentTransaction
          ? mostRecentTransaction.date
          : new Date().toISOString();

        res.send({
          success: true,
          transactions: formattedTransactions,
          referenceDate, // Include reference date for frontend
        });
      } catch (error) {
        console.error("Failed to fetch transaction history:", error);
        res.status(500).send({
          success: false,
          message: "Failed to fetch transaction history",
        });
      }
    });

    app.get("/spending-by-category", verifyJWT, async (req, res) => {
      try {
        if (!req.query) {
          return res.status(401).json({
            success: false,
            message: "User authentication failed",
          });
        }

        const uId = req.query.uId;

        if (!uId) {
          return res.status(400).json({
            success: false,
            message: "User ID is required",
          });
        }

        // First, find the most recent transaction date for this user
        const mostRecentTransaction = await transactionsCollection.findOne(
          { userId: uId },
          { sort: { date: -1 } }
        );

        if (!mostRecentTransaction) {
          return res.json({
            success: true,
            data: {
              totalSpending: 0,
              categories: [],
            },
          });
        }

        // Use the most recent transaction date as our "reference date" (simulated "today")
        const referenceDate = new Date(mostRecentTransaction.date);

        // Calculate dates for different time periods
        const last7DaysDate = new Date(referenceDate);
        last7DaysDate.setDate(referenceDate.getDate() - 7);
        const last7DaysISOString = last7DaysDate.toISOString();

        const last30DaysDate = new Date(referenceDate);
        last30DaysDate.setDate(referenceDate.getDate() - 30);
        const last30DaysISOString = last30DaysDate.toISOString();

        const last90DaysDate = new Date(referenceDate);
        last90DaysDate.setDate(referenceDate.getDate() - 90);
        const last90DaysISOString = last90DaysDate.toISOString();

        // Base query for spending transactions
        const baseQuery = {
          userId: uId,
          transactionType: "debit",
          amount: { $lt: 0 },
        };

        // Check if any spending transactions exist
        const spendingTransactionsCount =
          await transactionsCollection.countDocuments(baseQuery);

        if (spendingTransactionsCount === 0) {
          return res.json({
            success: true,
            data: {
              totalSpending: 0,
              categories: [],
            },
          });
        }

        // Get all transactions first to calculate time-based amounts
        const allTransactions = await transactionsCollection
          .find(baseQuery)
          .toArray();

        // Group transactions by category
        const categoryMap = {};

        // Track total spending for each time period
        let totalLast7Days = 0;
        let totalLast30Days = 0;
        let totalLast90Days = 0;
        let totalAmount = 0;

        allTransactions.forEach((transaction) => {
          const category = transaction.category || "Uncategorized";
          const amount = Math.abs(transaction.amount);
          const transactionDate = transaction.date;

          if (!categoryMap[category]) {
            categoryMap[category] = {
              category,
              totalAmount: 0,
              last7Days: {
                amount: 0,
                percentage: 0,
              },
              last30Days: {
                amount: 0,
                percentage: 0,
              },
              last90Days: {
                amount: 0,
                percentage: 0,
              },
            };
          }

          // Add to total amount
          categoryMap[category].totalAmount += amount;
          totalAmount += amount;

          // Add to period amounts based on date comparison
          if (transactionDate >= last7DaysISOString) {
            categoryMap[category].last7Days.amount += amount;
            totalLast7Days += amount;
          }

          if (transactionDate >= last30DaysISOString) {
            categoryMap[category].last30Days.amount += amount;
            totalLast30Days += amount;
          }

          if (transactionDate >= last90DaysISOString) {
            categoryMap[category].last90Days.amount += amount;
            totalLast90Days += amount;
          }
        });

        // Calculate percentages for each time period
        Object.values(categoryMap).forEach((category) => {
          category.percentage =
            totalAmount > 0
              ? Math.round((category.totalAmount / totalAmount) * 100)
              : 0;

          category.last7Days.percentage =
            totalLast7Days > 0
              ? Math.round((category.last7Days.amount / totalLast7Days) * 100)
              : 0;

          category.last30Days.percentage =
            totalLast30Days > 0
              ? Math.round((category.last30Days.amount / totalLast30Days) * 100)
              : 0;

          category.last90Days.percentage =
            totalLast90Days > 0
              ? Math.round((category.last90Days.amount / totalLast90Days) * 100)
              : 0;
        });

        // Convert map to array and sort by totalAmount
        const result = Object.values(categoryMap).sort(
          (a, b) => b.totalAmount - a.totalAmount
        );

        // Return the final result with reference date info
        res.json({
          success: true,
          data: {
            totalSpending: totalAmount,
            totalLast7Days,
            totalLast30Days,
            totalLast90Days,
            categories: result,
            referenceDate: referenceDate.toISOString(), // Include reference date for frontend
          },
        });
      } catch (error) {
        console.error("Error fetching spending by category:", error);
        res.status(500).json({
          success: false,
          message: error.message || "Failed to fetch spending by category",
        });
      }
    });

    app.get("/budgets", verifyJWT, async (req, res) => {
      try {
        const userId = req.query.uId;
        const budget = await budgetsCollection.findOne({ userId });
        if (!budget) {
          return res
            .status(404)
            .send({ success: false, message: "Budget not found" });
        }
        res.send({ success: true, data: budget });
      } catch (error) {
        console.error("Error fetching budget:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // Create a new budget entry
    app.post("/budgets", verifyJWT, async (req, res) => {
      try {
        const {
          uId,
          category,
          budgeted,
          color,
          description,
          customCategory,
          isActive,
        } = req.body;

        if (!uId || !category || !budgeted) {
          return res.status(400).send({
            success: false,
            message:
              "Missing required fields: userId, category, and budgeted amount are required",
          });
        }

        // Find the user's budget document
        let userBudget = await budgetsCollection.findOne({ userId: uId });

        // Generate a new ObjectId for this budget item
        const budgetId = new ObjectId();

        const newBudgetItem = {
          category,
          budgeted: parseFloat(budgeted),
          actual: 0, // Initial actual spending is 0
          color: color || "#4ecdc4", // Default color if not provided
          isActive: isActive !== undefined ? isActive : true,
          description: description || "",
          customCategory: customCategory || undefined,
          _id: budgetId,
        };

        if (!userBudget) {
          // If user doesn't have a budget document yet, create one
          const result = await budgetsCollection.insertOne({
            userId: uId,
            budgets: [newBudgetItem],
            monthlyBudgetLimit: 0, // Default monthly limit
          });

          return res.status(201).send({
            success: true,
            message: "Budget created successfully",
            budget: newBudgetItem,
          });
        }

        // Check if category already exists
        if (userBudget.budgets.some((b) => b.category === category)) {
          return res.status(400).send({
            success: false,
            message: "Budget for this category already exists",
          });
        }

        // Add new budget to existing budgets array
        const result = await budgetsCollection.updateOne(
          { userId: uId },
          { $push: { budgets: newBudgetItem } }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(400)
            .send({ success: false, message: "Failed to add budget" });
        }

        res.status(201).send({
          success: true,
          message: "Budget added successfully",
          budget: newBudgetItem,
        });
      } catch (error) {
        console.error("Error creating budget:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // Update an existing budget
    app.put("/budgets/:budgetId", verifyJWT, async (req, res) => {
      try {
        const { budgetId } = req.params;
        const { uId, category, budgeted, color, description, customCategory } =
          req.body;

        if (!ObjectId.isValid(budgetId)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid budget ID" });
        }

        if (!uId || !category || !budgeted) {
          return res.status(400).send({
            success: false,
            message:
              "Missing required fields: userId, category, and budgeted amount are required",
          });
        }

        const budgetObjId = new ObjectId(budgetId);

        // Update the budget item
        const result = await budgetsCollection.updateOne(
          {
            userId: uId,
            "budgets._id": budgetObjId,
          },
          {
            $set: {
              "budgets.$.category": category,
              "budgets.$.budgeted": parseFloat(budgeted),
              "budgets.$.color": color || "#4ecdc4",
              "budgets.$.description": description || "",
              "budgets.$.customCategory": customCategory || undefined,
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({
            success: false,
            message: "Budget not found",
          });
        }

        if (result.modifiedCount === 0) {
          return res.status(400).send({
            success: false,
            message: "No changes made to budget",
          });
        }

        // Get the updated budget to return
        const updatedBudget = await budgetsCollection.findOne(
          { userId: uId },
          { projection: { budgets: { $elemMatch: { _id: budgetObjId } } } }
        );

        res.send({
          success: true,
          message: "Budget updated successfully",
          budget: updatedBudget?.budgets[0],
        });
      } catch (error) {
        console.error("Error updating budget:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // Delete a budget
    app.delete("/budgets/:budgetId", verifyJWT, async (req, res) => {
      try {
        const { budgetId } = req.params;
        const { uId } = req.query;

        if (!ObjectId.isValid(budgetId)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid budget ID" });
        }

        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const budgetObjId = new ObjectId(budgetId);

        // Remove the budget item from the budgets array
        const result = await budgetsCollection.updateOne(
          { userId: uId },
          { $pull: { budgets: { _id: budgetObjId } } }
        );

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .send({ success: false, message: "Budget not found" });
        }

        if (result.modifiedCount === 0) {
          return res
            .status(400)
            .send({ success: false, message: "Failed to delete budget" });
        }

        res.send({ success: true, message: "Budget deleted successfully" });
      } catch (error) {
        console.error("Error deleting budget:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // Toggle a budget's active status
    app.patch("/budgets/:budgetId/toggle", verifyJWT, async (req, res) => {
      try {
        const { budgetId } = req.params;
        const { uId, isActive } = req.body;

        if (!ObjectId.isValid(budgetId)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid budget ID" });
        }

        if (!uId || isActive === undefined) {
          return res.status(400).send({
            success: false,
            message: "User ID and isActive status are required",
          });
        }

        const budgetObjId = new ObjectId(budgetId);

        // Update the isActive status
        const result = await budgetsCollection.updateOne(
          {
            userId: uId,
            "budgets._id": budgetObjId,
          },
          {
            $set: { "budgets.$.isActive": isActive },
          }
        );

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .send({ success: false, message: "Budget not found" });
        }

        if (result.modifiedCount === 0) {
          return res.status(400).send({
            success: false,
            message: "No changes made to budget status",
          });
        }

        res.send({
          success: true,
          message: `Budget ${
            isActive ? "activated" : "deactivated"
          } successfully`,
        });
      } catch (error) {
        console.error("Error toggling budget status:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // Update monthly budget limit
    app.post("/budgets/monthly-limit", verifyJWT, async (req, res) => {
      try {
        const { uId, monthlyBudgetLimit } = req.body;

        if (!uId || monthlyBudgetLimit === undefined) {
          return res.status(400).send({
            success: false,
            message: "User ID and monthly budget limit are required",
          });
        }

        // Validate budget limit
        const limit = parseFloat(monthlyBudgetLimit);
        if (isNaN(limit) || limit < 0) {
          return res.status(400).send({
            success: false,
            message: "Monthly budget limit must be a valid positive number",
          });
        }

        // Find the user's budget document
        let userBudget = await budgetsCollection.findOne({ userId: uId });

        if (!userBudget) {
          // If user doesn't have a budget document yet, create one
          const result = await budgetsCollection.insertOne({
            userId: uId,
            budgets: [],
            monthlyBudgetLimit: limit,
          });

          return res.send({
            success: true,
            message: "Monthly budget limit set successfully",
          });
        }

        // Update the monthly budget limit
        const result = await budgetsCollection.updateOne(
          { userId: uId },
          { $set: { monthlyBudgetLimit: limit } }
        );

        if (result.modifiedCount === 0) {
          return res.status(400).send({
            success: false,
            message: "No changes made to monthly budget limit",
          });
        }

        res.send({
          success: true,
          message: "Monthly budget limit updated successfully",
        });
      } catch (error) {
        console.error("Error updating monthly budget limit:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/notifications", verifyJWT, async (req, res) => {
      try {
        const userId = req.query.uId;
        if (!userId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }
        const notifications = await db
          .collection("notifications")
          .find({ userId })
          .toArray();
        res.send({ success: true, notifications });
      } catch (error) {
        console.error("Error fetching notifications:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/recommendations", verifyJWT, async (req, res) => {
      try {
        const userId = req.query.uId;
        if (!userId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }
        const recommendations = await db
          .collection("recommendations")
          .find({ userId })
          .toArray();
        res.send({ success: true, recommendations });
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/investment-portfolios", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;
        
        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const portfolio = await investmentPortfolioCollection.findOne({ userId: uId });
        
        if (!portfolio) {
          return res
            .status(404)
            .send({ success: false, message: "Investment portfolio not found" });
        }

        res.send({ success: true, portfolio });
      } catch (error) {
        console.error("Error fetching investment portfolio:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/loans", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;

        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const loans = await loansCollection
          .find({ userId: uId })
          .toArray();
        
        res.send({ success: true, loans });
      } catch (error) {
        console.error("Error fetching loans:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });



    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // delete from users a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    //=======================================================check approved user============================================//
    app.get("/verified/:email", async (req, res) => {
      try {
        const email = req.params.email;

        if (!email) {
          return res
            .status(400)
            .send({ success: false, message: "Email parameter is required" });
        }

        const result = await usersCollection.findOne({ email: email });

        if (result) {
          const isVerified = result.verified === true;
          return res.status(200).send({ success: true, verified: isVerified });
        } else {
          return res.status(404).send({
            success: false,
          });
        }
      } catch (error) {
        console.error("Error checking user verification status:", error);
        return res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/approvedUsers", async (req, res) => {
      const query = {};
      const cursor = approvedUsersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/user-details", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;
        if (!uId) {
          return res.status(400).send({ message: "User ID is required" });
        }

        const result = await usersCollection.findOne({ _id: ObjectId(uId) });
        if (!result) {
          return res
            .status(404)
            .send({ found: false, message: "User not found" });
        }

        return res.status(200).send(result);
      } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    // adding account number
    app.patch("/accountNumber/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: ObjectId(id) };

      const update = {
        $set: {
          accountNumber: data.accountNumber,
        },
      };
      const result = await usersCollection.updateOne(query, update);
      res.send(result);
    });

    // post approved users
    app.post("/approvedUsers", async (req, res) => {
      const newUser = req.body;

      const result = await approvedUsersCollection.insertOne(newUser);

      res.send(result);
    });
    //============================================ update ammount===========================================//
    app.patch("/approvedUsers/:id", async (req, res) => {
      const id = req.params.id;
      const updatedAmount = req.body;

      const bankInfo = await bankDataCollection.findOne({
        _id: ObjectId("630f439efda2555ca01f5ea0"),
      });

      const updatedBankAmount = bankInfo.amount - updatedAmount.withdrawAmount;

      const updateBank = {
        $set: { amount: updatedBankAmount },
      };
      const ifUpdated = await bankDataCollection.updateOne(
        { _id: ObjectId("630f439efda2555ca01f5ea0") },
        updateBank
      );
      const query = { accountNumber: id };
      const update = {
        $set: {
          amount: updatedAmount.amount,
        },
      };
      const result = await approvedUsersCollection.updateOne(query, update);
      res.send(result);
    });
    // ==========================================deposite amount=========================================//
    app.patch("/deposite/:accountnumber", async (req, res) => {
      const accountNumber = req.params.accountnumber;
      const updatedAmount = req.body;
      const bankInfo = await bankDataCollection.findOne({
        _id: ObjectId("630f439efda2555ca01f5ea0"),
      });
      const updatedBankAmount = bankInfo.amount + updatedAmount.depositeAmount;

      const updateBank = {
        $set: { amount: updatedBankAmount },
      };
      const ifUpdated = await bankDataCollection.updateOne(
        { _id: ObjectId("630f439efda2555ca01f5ea0") },
        updateBank
      );

      const query = { accountNumber: accountNumber };
      const update = {
        $set: {
          amount: updatedAmount.amount,
        },
      };

      const result = await approvedUsersCollection.updateOne(query, update);
      res.send(result);
    });

    app.put("/approvedUsers/admin/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await approvedUsersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // app.get("/approvedUser/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: id };
    //   const user = await approvedUsersCollection.findOne(query);
    //   res.send(user);
    // });

    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send({ result });
    });

    // ===========================================================profile picture update============================================//
    app.patch("/profile/:email", async (req, res) => {
      const email = req.params.email;
      const profilePicture = req.body;
      const filter = { email: email };
      const update = {
        $set: {
          profileImage: profilePicture.profileImg,
        },
      };
      const result = await approvedUsersCollection.updateOne(filter, update);
      res.send(result);
    });

    // delete from users a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/approvedUsers", async (req, res) => {
      const query = {};
      const cursor = approvedUsersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // adding account number
    app.patch("/accountNumber/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: ObjectId(id) };

      const update = {
        $set: {
          accountNumber: data.accountNumber,
        },
      };
      const result = await usersCollection.updateOne(query, update);
      res.send(result);
    });

    // post approved users
    app.post("/approvedUsers", async (req, res) => {
      const newUser = req.body;
      const result = await approvedUsersCollection.insertOne(newUser);

      res.send(result);
    });

    app.put("/approvedUsers/admin/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await approvedUsersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // app.get("/approvedUser/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: id };
    //   const user = await approvedUsersCollection.findOne(query);
    //   res.send(user);
    // });

    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send({ result });
    });

    // delete from users a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // post approved users
    app.post("/approvedUsers", async (req, res) => {
      const newUser = req.body;

      const result = await approvedUsersCollection.insertOne(newUser);

      res.send(result);
    });

    // Get a single user information

    app.get("/approvedUsers", async (req, res) => {
      const query = {};
      const cursor = approvedUsersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // post approved users
    app.post("/approvedUser", async (req, res) => {
      const newUser = req.body;
      const result = await approvedUsersCollection.insertOne(newUser);
      res.send(result);
    });
    app.delete("/approvedUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await approvedUsersCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/approvedUser/admin/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await approvedUsersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // app.get("/approvedUser/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: id };
    //   const user = await approvedUsersCollection.findOne(query);
    //   res.send(user);
    // });

    // ===============================================customer review ============================================//
    // Insert review data  to database
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await usersReviewCollection.insertOne(review);
      res.send(result);
    });
    //get all review data from database
    app.get("/review", async (req, res) => {
      const result = await usersReviewCollection.find({}).toArray();
      res.send(result);
    });
    // ==================================================Check admin ============================================//
    app.get("/admin", async (req, res) => {
      try {
        const uId = req.query.uId;
        if (!uId) {
          return res
            .status(400)
            .send({ admin: false, message: "User ID is required" });
        }
        const user = await usersCollection.findOne({ _id: ObjectId(uId) });
        if (user) {
          const isAdmin = user.admin === true;
          return res.status(200).send({ admin: isAdmin });
        } else {
          return res
            .status(404)
            .send({ admin: false, message: "User not found" });
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        return res
          .status(500)
          .send({ admin: false, message: "Internal server error" });
      }
    });

    // ==============================================Transfer Balance==========================================//
    // app.patch("/transfer", async (req, res) => {
    //   const { accountNumber, amount } = req.body;
    //   const email = req.query.email;
    //   const receiverinfoquery = { accountNumber: accountNumber };
    //   const senderinfoquery = { email: email };
    //   // find receiver account by account number
    //   const findTargetedaccount = await approvedUsersCollection.findOne(
    //     receiverinfoquery
    //   );
    //   if (!findTargetedaccount) {
    //     return res.send({ message: "Account number did not match " });
    //   }

    //   const updateAmount =
    //     parseFloat(findTargetedaccount.amount) + parseFloat(amount);
    //   const update = {
    //     $set: {
    //       amount: updateAmount,
    //     },
    //   };
    //   const transferBalance = await approvedUsersCollection.updateOne(
    //     receiverinfoquery,
    //     update
    //   );
    //   if (transferBalance.modifiedCount) {
    //     const findSenderInfo = await approvedUsersCollection.findOne(
    //       senderinfoquery
    //     );

    //     const updateSenderAmount =
    //       parseFloat(findSenderInfo.amount) - parseFloat(amount);

    //     const updatesender = {
    //       $set: {
    //         amount: updateSenderAmount,
    //       },
    //     };
    //     const finalResult = await approvedUsersCollection.updateOne(
    //       senderinfoquery,
    //       updatesender
    //     );

    //     // add transection to sender  database
    //     const addTransection = {
    //       $push: {
    //         ["transection"]: {
    //           send_money: amount,
    //           receiverAccountnumber: accountNumber,
    //           senderEmail: findSenderInfo.email,
    //           reciverEmail: findTargetedaccount.email,
    //           staus: "complete",
    //           statustwo: "outgoing",
    //           data: new Date(),
    //           reveiverName: findTargetedaccount.displayName,
    //         },
    //       },
    //     };
    //     senderMail(addTransection);
    //     const insertTransection = await approvedUsersCollection.updateOne(
    //       senderinfoquery,
    //       addTransection
    //     );

    //     //add transection object to receiver database
    //     const addTransectionToReceiver = {
    //       $push: {
    //         ["transection"]: {
    //           receive_money: amount,
    //           senderAccountNumber: findSenderInfo.accountNumber,
    //           senderEmail: findSenderInfo.email,
    //           reciverEmail: findTargetedaccount.email,
    //           staus: "complete",
    //           statustwo: "incomming",
    //           data: new Date(),
    //           senderName: findSenderInfo.displayName,
    //         },
    //       },
    //     };
    //     receiverMail(addTransectionToReceiver);
    //     const insertTransectionDataToReceiver =
    //       await approvedUsersCollection.updateOne(
    //         receiverinfoquery,
    //         addTransectionToReceiver
    //       );

    //     res.send({
    //       finalResult,
    //       insertTransectionDataToReceiver,
    //       insertTransection,
    //     });
    //   }
    // });

    // pagenation for transection history
    // app.get("/transactionCount/:account", async (req, res) => {
    //   const accountNumber = req.params.account;
    //   const findDocument = await approvedUsersCollection.findOne({
    //     accountNumber: accountNumber,
    //   });
    //   const transactionHistory = findDocument?.transaction;
    //   const count = transactionHistory?.length;
    //   if (count) {
    //     res.send({ count });
    //   }
    // });
    // get all transection
    // app.get("/transaction/:account", verifyJWT, async (req, res) => {
    //   const page = req.query.page;
    //   const accountNumber = req.params.account;
    //   const findDocument = await approvedUsersCollection.findOne({
    //     accountNumber: accountNumber,
    //   });
    //   const transectionHistory = findDocument?.transection;

    //   let sortedTransection = [];
    //   if (transectionHistory) {
    //     let sorted = [...transectionHistory].sort(
    //       (a, b) =>
    //         new moment(a.date).format("YYYYMMDD") -
    //         new moment(b.date).format("YYYYMMDD")
    //     );
    //     sortedTransection = sorted.reverse();
    //   }

    //   if (page == 0) {
    //     res.send(sortedTransection);

    //     return;
    //   }
    //   function paginateArray(arr, itemPerPage, pageIndex) {
    //     const lastIndex = itemPerPage * pageIndex;
    //     const firstIndex = lastIndex - itemPerPage;
    //     return arr.slice(firstIndex, lastIndex);
    //   }

    //   const index = parseInt(page);
    //   const result = paginateArray(sortedTransection, 10, index);
    //   res.send(result);
    // });

    // =============================================================load all blogs========================================//
    app.get("/blog", async (req, res) => {
      const result = await blogCollection.find({}).toArray();
      res.send(result);
    });
    // ==============================================================find transection by account Number=======================//
    // app.get("/findtransection:accountNumber", async (req, res) => {
    //   const accountNumber = req.params.accountNumber;
    //   const query = { accountNumber: accountNumber };
    //   const result = await approvedUsersCollection.findOne(query);
    //   const transection = result.transection.reverse();

    //   res.send(transection);
    // });
    // =============================================================guest data collection //bottaom banner form ==================================//

    app.post("/visitordata", async (req, res) => {
      const visitordata = req.body;
      const { email } = visitordata;
      const isMatch = await randomVisitorCollection.findOne({ email: email });
      if (isMatch) {
        res.send({ message: "email already exist " });
        return;
      } else {
        const result = await randomVisitorCollection.insertOne(visitordata);
        res.send(result);
      }
    });
    app.post("/subscribe", async (req, res) => {
      const subscribeData = req.body;
      const { email } = subscribeData;
      const isMatch = await subscribeCollection.findOne({ email: email });
      if (isMatch) {
        res.send({ message: "Already subscribed " });
        return;
      } else {
        const result = await subscribeCollection.insertOne(subscribeData);
        res.send(result);
      }
    });
    // ================================================our bank info============================
    app.get("/bankinfo", async (req, res) => {
      const result = await bankDataCollection.findOne({
        _id: ObjectId("630f439efda2555ca01f5ea0"),
      });
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("digimoney server start successfully");
});

app.listen(port, () => console.log("Run successfully"));

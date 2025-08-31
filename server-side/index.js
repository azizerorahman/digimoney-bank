const express = require("express");
const CryptoJS = require("crypto-js");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

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
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function run() {
  try {
    await client.connect();

    // Collections
    const db = client.db("dgm-database");
    const usersCollection = db.collection("users");
    const accountsCollection = db.collection("accounts");
    const transactionsCollection = db.collection("transactions");
    const budgetsCollection = db.collection("budgets");
    const investmentPortfolioCollection = db.collection(
      "investment-portfolios"
    );
    const loanOfficersCollection = db.collection("loan-officers");
    const loanApplicationsCollection = db.collection("loan-applications");
    const loansCollection = db.collection("loans");
    const insuranceCollection = db.collection("insurances");
    const customersCollection = db.collection("customers");
    const activeLoansCollection = db.collection("active-loans");
    const repaymentSchedulesCollection = db.collection("repayment-schedules");
    const riskAssessmentsCollection = db.collection("risk-assessments");
    const communicationLogsCollection = db.collection("communication-logs");
    const superAdminDataCollection = db.collection("super-admin");

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
      const userPassword =
        user && userEncryptedPassword
          ? CryptoJS.AES.decrypt(
              userEncryptedPassword,
              process.env.DECRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8)
          : null;

      if (user && userPassword === password) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        return res.status(200).send({ success: true, accessToken:token, uId: user._id });
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
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/recipients", verifyJWT, async (req, res) => {
      try {
        const { query, currentUserId } = req.query;

        if (!query || query.length < 3) {
          // Return all recipients if no search query
          const allUsers = await usersCollection
            .find(
              {
                verified: true,
                _id: { $ne: new ObjectId(currentUserId) }, // Exclude current user
              },
              {
                projection: {
                  name: 1,
                  email: 1,
                  _id: 1,
                },
              }
            )
            .toArray();

          // Get accounts for each user
          const recipientsWithAccounts = await Promise.all(
            allUsers.map(async (user) => {
              const accounts = await accountsCollection
                .find({ userId: user._id.toString() })
                .toArray();

              return accounts.map((account) => ({
                id: user._id.toString(),
                accountNumber: account.accountNumber,
                name: user.name,
                email: user.email,
                bank: "DigiMoney Bank", // Since it's intra-bank
                type: account.type,
                accountId: account._id.toString(),
              }));
            })
          );

          const flattenedRecipients = recipientsWithAccounts.flat();
          return res.send({ success: true, recipients: flattenedRecipients });
        }

        // Search functionality
        const searchRegex = new RegExp(query, "i");
        const users = await usersCollection
          .find(
            {
              verified: true,
              _id: { $ne: new ObjectId(currentUserId) }, // Exclude current user
              $or: [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
              ],
            },
            {
              projection: {
                name: 1,
                email: 1,
                _id: 1,
              },
            }
          )
          .toArray();

        // Get accounts for matching users and also search by account number
        const accountMatches = await accountsCollection
          .find({
            $or: [
              { accountNumber: { $regex: searchRegex } },
              { accountName: { $regex: searchRegex } },
            ],
          })
          .toArray();

        // Get user details for account matches
        const accountUserIds = accountMatches.map((acc) => acc.userId);
        const accountUsers = await usersCollection
          .find(
            {
              _id: { $in: accountUserIds.map((id) => new ObjectId(id)) },
              verified: true,
              _id: { $ne: new ObjectId(currentUserId) },
            },
            {
              projection: {
                name: 1,
                email: 1,
                _id: 1,
              },
            }
          )
          .toArray();

        // Combine user search results with their accounts
        const userRecipients = await Promise.all(
          users.map(async (user) => {
            const accounts = await accountsCollection
              .find({ userId: user._id.toString() })
              .toArray();

            return accounts.map((account) => ({
              id: user._id.toString(),
              accountNumber: account.accountNumber,
              name: user.name,
              email: user.email,
              bank: "DigiMoney Bank",
              type: account.type,
              accountId: account._id.toString(),
            }));
          })
        );

        // Add account match results
        const accountRecipients = accountMatches
          .filter((account) => account.userId !== currentUserId)
          .map((account) => {
            const user = accountUsers.find(
              (u) => u._id.toString() === account.userId
            );
            return user
              ? {
                  id: user._id.toString(),
                  accountNumber: account.accountNumber,
                  name: user.name,
                  email: user.email,
                  bank: "DigiMoney Bank",
                  type: account.type,
                  accountId: account._id.toString(),
                }
              : null;
          })
          .filter(Boolean);

        // Combine and deduplicate results
        const allRecipients = [...userRecipients.flat(), ...accountRecipients];
        const uniqueRecipients = allRecipients.filter(
          (recipient, index, self) =>
            index ===
            self.findIndex((r) => r.accountNumber === recipient.accountNumber)
        );

        res.send({ success: true, recipients: uniqueRecipients });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to search recipients",
        });
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
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

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
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

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

        const portfolio = await investmentPortfolioCollection.findOne({
          userId: uId,
        });

        if (!portfolio) {
          return res.status(404).send({
            success: false,
            message: "Investment portfolio not found",
          });
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

        const loans = await loansCollection.find({ userId: uId }).toArray();

        res.send({ success: true, loans });
      } catch (error) {
        console.error("Error fetching loans:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/insurances", verifyJWT, async (req, res) => {
      try {
        const uId = req.query.uId;

        if (!uId) {
          return res
            .status(400)
            .send({ success: false, message: "User ID is required" });
        }

        const insurance = await insuranceCollection.findOne({ userId: uId });

        if (!insurance) {
          return res
            .status(404)
            .send({ success: false, message: "Insurance data not found" });
        }

        res.send({ success: true, insurance });
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    app.post("/transfer", verifyJWT, async (req, res) => {
      try {
        const {
          fromAccountId,
          toAccount,
          recipientName,
          amount,
          currency,
          transferMethod,
          purpose,
          description,
          reference,
          uId,
        } = req.body;

        if (!fromAccountId || !toAccount || !recipientName || !amount || !uId) {
          return res.status(400).send({
            success: false,
            message: "Missing required fields",
          });
        }

        const senderAccount = await accountsCollection.findOne({
          _id: new ObjectId(fromAccountId),
          userId: uId,
        });

        if (!senderAccount) {
          return res.status(404).send({
            success: false,
            message: "Source account not found",
          });
        }

        if (senderAccount.balance < amount) {
          return res.status(400).send({
            success: false,
            message: "Insufficient balance",
          });
        }

        const fee = amount > 1000 ? 2.5 : 0;
        const totalDebit = amount + fee;

        if (senderAccount.balance < totalDebit) {
          return res.status(400).send({
            success: false,
            message: "Insufficient balance including fees",
          });
        }

        const transactionId = `TXN${Date.now()}`;

        await accountsCollection.updateOne(
          { _id: new ObjectId(fromAccountId) },
          { $inc: { balance: -totalDebit } }
        );

        const debitTransaction = {
          userId: uId,
          accountId: fromAccountId,
          transactionId: transactionId,
          type: "transfer",
          transactionType: "debit",
          amount: -amount,
          fee: fee,
          currency: currency || "USD",
          description: `Transfer to ${recipientName}`,
          category: "Transfer",
          date: new Date().toISOString(),
          recipientAccount: toAccount,
          recipientName: recipientName,
          purpose: purpose,
          reference: reference,
          transferMethod: transferMethod,
          status: "completed",
        };

        await transactionsCollection.insertOne(debitTransaction);

        res.send({
          success: true,
          message: "Transfer completed successfully",
          transactionId: transactionId,
          newBalance: senderAccount.balance - totalDebit,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Transfer failed",
        });
      }
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

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
      try {
        const query = {};
        const users = await usersCollection.find(query).toArray();
        res.send(users);
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
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
        return res
          .status(500)
          .send({ admin: false, message: "Internal server error" });
      }
    });

    app.get("/loan-officer-profile/:userId", verifyJWT, async (req, res) => {
      try {
        const userId = req.params.userId;
        const user = await usersCollection.findOne({ _id: ObjectId(userId) });
        if (!user || !user.role?.includes("loan-officer")) {
          return res
            .status(403)
            .send({ message: "Access denied. Loan officer role required." });
        }

        // Fetch loan officer profile data
        const loanOfficerProfile = await loanOfficersCollection.findOne({
          userId: userId,
        });

        res.send(loanOfficerProfile);
      } catch (error) {
        console.error("Error fetching loan officer profile:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    app.get("/loan-applications", verifyJWT, async (req, res) => {
      try {
        const officerId = req.query.officerId;
        const status = req.query.status;
        const loanType = req.query.loanType;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let query = {};
        if (officerId) {
          query.loanOfficerId = officerId;
        }
        if (status && status !== "all") {
          query.status = status;
        }
        if (loanType && loanType !== "all") {
          query.loanType = loanType;
        }

        const skip = (page - 1) * limit;
        const applications = await loanApplicationsCollection
          .find(query)
          .sort({ submittedDate: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();

        const total = await loanApplicationsCollection.countDocuments(query);

        res.send({
          applications,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        console.error("Error fetching loan applications:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.get("/loan-application/:id", verifyJWT, async (req, res) => {
      try {
        const applicationId = req.params.id;
        const application = await loanApplicationsCollection.findOne({
          _id: ObjectId(applicationId),
        });

        if (!application) {
          return res.status(404).send({ message: "Application not found" });
        }

        res.send(application);
      } catch (error) {
        console.error("Error fetching loan application:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get active loans for a specific officer
    app.get("/active-loans", verifyJWT, async (req, res) => {
      try {
        const officerId = req.query.officerId;
        const status = req.query.status;
        const loanType = req.query.loanType;

        let query = {};
        if (officerId) {
          query.loanOfficerId = officerId;
        }
        if (status && status !== "all") {
          query.status = status;
        }
        if (loanType && loanType !== "all") {
          query.loanType = loanType;
        }

        const activeLoans = await activeLoansCollection.find(query).toArray();
        res.send(activeLoans);
      } catch (error) {
        console.error("Error fetching active loans:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get customers
    app.get("/customers", verifyJWT, async (req, res) => {
      try {
        const search = req.query.search;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let query = {};
        if (search) {
          query = {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { phone: { $regex: search, $options: "i" } },
            ],
          };
        }

        const skip = (page - 1) * limit;
        const customers = await customersCollection
          .find(query)
          .skip(skip)
          .limit(limit)
          .toArray();

        const total = await customersCollection.countDocuments(query);

        res.send({
          customers,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get customer by ID
    app.get("/customer/:id", verifyJWT, async (req, res) => {
      try {
        const customerId = req.params.id;
        const customer = await customersCollection.findOne({
          _id: ObjectId(customerId),
        });

        if (!customer) {
          return res.status(404).send({ message: "Customer not found" });
        }

        res.send(customer);
      } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get repayment schedules
    app.get("/repayment-schedules", verifyJWT, async (req, res) => {
      try {
        const loanId = req.query.loanId;

        let query = {};
        if (loanId) {
          query.loanId = loanId;
        }

        const schedules = await repaymentSchedulesCollection
          .find(query)
          .toArray();
        res.send(schedules);
      } catch (error) {
        console.error("Error fetching repayment schedules:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get risk assessments
    app.get("/risk-assessments", verifyJWT, async (req, res) => {
      try {
        const assessments = await riskAssessmentsCollection.find({}).toArray();
        res.send(assessments);
      } catch (error) {
        console.error("Error fetching risk assessments:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get credit analysis data - combined loan applications with risk data
    app.get("/credit-analysis", verifyJWT, async (req, res) => {
      try {
        const officerId = req.query.officerId;
        const status = req.query.status;
        const creditRating = req.query.creditRating;

        // Build query for loan applications
        let query = {};
        if (officerId) {
          query.loanOfficerId = officerId;
        }
        if (status && status !== "all") {
          query.status = status;
        }

        // Fetch loan applications with credit scores
        const applications = await loanApplicationsCollection
          .find({ ...query, creditScore: { $exists: true, $ne: null } })
          .sort({ lastUpdated: -1 })
          .toArray();

        // Fetch risk assessments
        const riskAssessments = await riskAssessmentsCollection
          .find({})
          .toArray();
        const riskData = riskAssessments[0] || {};

        // Process applications into credit analysis format
        const creditAnalyses = applications.map((app) => {
          const getCreditRating = (score) => {
            if (score >= 750) return "excellent";
            if (score >= 700) return "good";
            if (score >= 650) return "fair";
            return "poor";
          };

          const calculateRiskScore = (application) => {
            let riskScore = 0;

            // Credit score impact (40% weight)
            if (application.creditScore < 650) riskScore += 40;
            else if (application.creditScore < 700) riskScore += 25;
            else if (application.creditScore < 750) riskScore += 10;

            // DTI ratio impact (30% weight)
            const dti = application.financials?.debtToIncome || 0;
            if (dti > 45) riskScore += 30;
            else if (dti > 35) riskScore += 20;
            else if (dti > 25) riskScore += 10;

            // Employment stability (20% weight)
            const empYears = application.employment?.yearsEmployed || 0;
            if (empYears < 1) riskScore += 20;
            else if (empYears < 2) riskScore += 15;
            else if (empYears < 3) riskScore += 5;

            // Flags and trends (10% weight)
            if (application.creditTrend === "down") riskScore += 10;
            if (application.flags && application.flags.length > 0)
              riskScore += application.flags.length * 5;

            return Math.min(riskScore, 100);
          };

          return {
            _id: app._id,
            applicantName: app.applicantName,
            applicationId: app.applicantId || app._id,
            loanType: app.loanType?.toLowerCase() || "personal",
            requestedAmount: app.amount || 0,
            creditScore: app.creditScore,
            creditRating: getCreditRating(app.creditScore),
            creditTrend: app.creditTrend || "stable",
            riskLevel: app.riskLevel || "Medium",
            riskScore: calculateRiskScore(app),
            debtToIncomeRatio: app.financials?.debtToIncome || 0,
            annualIncome: app.employment?.income || 0,
            employmentLength: app.employment?.yearsEmployed || 0,
            analysisDate: app.lastUpdated || app.submittedDate,
            status: app.status,
            keyFactors:
              app.flags?.map((flag) => ({
                name: flag.type || "Risk Factor",
                value: flag.message || "See details",
                impact: flag.severity === "high" ? "negative" : "neutral",
              })) || [],
          };
        });

        // Filter by credit rating if specified
        const filteredAnalyses =
          creditRating && creditRating !== "all"
            ? creditAnalyses.filter(
                (analysis) => analysis.creditRating === creditRating
              )
            : creditAnalyses;

        // Calculate statistics
        const stats = {
          total: applications.length,
          excellent: creditAnalyses.filter(
            (a) => a.creditRating === "excellent"
          ).length,
          good: creditAnalyses.filter((a) => a.creditRating === "good").length,
          fair: creditAnalyses.filter((a) => a.creditRating === "fair").length,
          poor: creditAnalyses.filter((a) => a.creditRating === "poor").length,
          avgCreditScore:
            applications.length > 0
              ? Math.round(
                  applications.reduce((sum, app) => sum + app.creditScore, 0) /
                    applications.length
                )
              : 0,
          riskDistribution: riskData.riskDistribution || {
            low: 0,
            medium: 0,
            high: 0,
          },
          fraudAlerts: riskData.fraudAlerts?.length || 0,
        };

        stats.approvalRate =
          stats.total > 0
            ? Math.round(((stats.excellent + stats.good) / stats.total) * 100)
            : 0;

        res.send({
          analyses: filteredAnalyses,
          statistics: stats,
          riskAssessment: riskData,
        });
      } catch (error) {
        console.error("Error fetching credit analysis data:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get communication logs
    app.get("/communication-logs", verifyJWT, async (req, res) => {
      try {
        const applicantId = req.query.applicantId;
        const customerId = req.query.customerId;
        const type = req.query.type;

        let query = {};
        if (applicantId) {
          query.applicantId = applicantId;
        }
        if (customerId) {
          query.customerId = customerId;
        }
        if (type) {
          query.type = type;
        }

        const logs = await communicationLogsCollection
          .find(query)
          .sort({ date: -1 })
          .toArray();

        res.send(logs);
      } catch (error) {
        console.error("Error fetching communication logs:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Update loan application status
    app.patch("/loan-application/:id/status", verifyJWT, async (req, res) => {
      try {
        const applicationId = req.params.id;
        const { status, note, officerId } = req.body;

        const updateDoc = {
          $set: {
            status: status,
            lastUpdated: new Date().toISOString().split("T")[0],
          },
          $push: {
            notes: {
              date: new Date().toISOString().split("T")[0],
              author: req.decoded.email, // From JWT token
              note: note,
            },
          },
        };

        const result = await loanApplicationsCollection.updateOne(
          { _id: ObjectId(applicationId) },
          updateDoc
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating loan application:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Add communication log
    app.post("/communication-logs", verifyJWT, async (req, res) => {
      try {
        const logData = req.body;
        logData.date = new Date().toISOString().split("T")[0];

        const result = await communicationLogsCollection.insertOne(logData);
        res.send(result);
      } catch (error) {
        console.error("Error adding communication log:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Update loan officer stats
    app.patch("/loan-officer-stats/:userId", verifyJWT, async (req, res) => {
      try {
        const userId = req.params.userId;
        const { action, amount } = req.body;

        // This would involve complex calculations based on loan applications
        // For now, we'll just acknowledge the update
        const result = await loanOfficersCollection.updateOne(
          { userId: userId },
          { $set: { lastUpdated: new Date() } }
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating loan officer stats:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get super admin data
    app.get("/super-admin-data", verifyJWT, async (req, res) => {
      try {
        const dataType = req.query.dataType;

        let query = {};
        if (dataType) {
          query.dataType = dataType;
        }

        console.log("Fetching super admin data with query:", query);

        const data = await superAdminDataCollection.find(query).toArray();

        console.log("Fetched super admin data:", data);
        res.send(data);
      } catch (error) {
        console.error("Error fetching super admin data:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Create new super admin data
    app.post("/super-admin-data", verifyJWT, async (req, res) => {
      try {
        const newData = req.body;
        newData.createdAt = new Date().toISOString();
        newData.updatedAt = new Date().toISOString();

        const result = await superAdminDataCollection.insertOne(newData);

        console.log("Created new super admin data:", result);
        res.send(result);
      } catch (error) {
        console.error("Error creating super admin data:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Update super admin data by ID
    app.put("/super-admin-data/:id", verifyJWT, async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        const { ObjectId } = require("mongodb");

        updateData.updatedAt = new Date().toISOString();

        const result = await superAdminDataCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Data not found" });
        }

        res.send(result);
      } catch (error) {
        console.error("Error updating super admin data:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Update super admin data by dataType
    app.put("/super-admin-data/type/:dataType", verifyJWT, async (req, res) => {
      try {
        const dataType = req.params.dataType;
        const updateData = req.body;

        updateData.updatedAt = new Date().toISOString();

        const result = await superAdminDataCollection.updateOne(
          { dataType: dataType },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Data type not found" });
        }

        res.send(result);
      } catch (error) {
        console.error("Error updating super admin data by type:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Patch/partially update super admin data by dataType (for real-time updates)
    app.patch(
      "/super-admin-data/type/:dataType",
      verifyJWT,
      async (req, res) => {
        try {
          const dataType = req.params.dataType;
          const patchData = req.body;

          patchData.updatedAt = new Date().toISOString();

          const result = await superAdminDataCollection.updateOne(
            { dataType: dataType },
            { $set: patchData }
          );

          if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Data type not found" });
          }

          res.send(result);
        } catch (error) {
          console.error("Error patching super admin data:", error);
          res.status(500).send({ message: "Internal server error" });
        }
      }
    );

    // Delete super admin data by ID
    app.delete("/super-admin-data/:id", verifyJWT, async (req, res) => {
      try {
        const id = req.params.id;
        const { ObjectId } = require("mongodb");

        const result = await superAdminDataCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Data not found" });
        }

        res.send({ message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting super admin data:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Add new audit log entry
    app.post("/super-admin-data/audit-log", verifyJWT, async (req, res) => {
      try {
        const newLogEntry = req.body;
        newLogEntry.id = `AUDIT-${Date.now()}`;
        newLogEntry.timestamp = new Date().toISOString();

        const result = await superAdminDataCollection.updateOne(
          { dataType: "auditLogs" },
          {
            $push: { logs: newLogEntry },
            $set: { updatedAt: new Date().toISOString() },
          }
        );

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .send({ message: "Audit logs collection not found" });
        }

        res.send({
          message: "Audit log entry added successfully",
          logEntry: newLogEntry,
        });
      } catch (error) {
        console.error("Error adding audit log entry:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Add new security event
    app.post(
      "/super-admin-data/security-event",
      verifyJWT,
      async (req, res) => {
        try {
          const newSecurityEvent = req.body;
          newSecurityEvent.id = `SEC-${Date.now()}`;
          newSecurityEvent.timestamp = new Date().toISOString();

          const result = await superAdminDataCollection.updateOne(
            { dataType: "complianceAndSecurity" },
            {
              $push: { recentSecurityEvents: newSecurityEvent },
              $set: { updatedAt: new Date().toISOString() },
            }
          );

          if (result.matchedCount === 0) {
            return res.status(404).send({
              message: "Compliance and security collection not found",
            });
          }

          res.send({
            message: "Security event added successfully",
            securityEvent: newSecurityEvent,
          });
        } catch (error) {
          console.error("Error adding security event:", error);
          res.status(500).send({ message: "Internal server error" });
        }
      }
    );

    // Update system metrics (for real-time dashboard updates)
    app.patch(
      "/super-admin-data/system-metrics",
      verifyJWT,
      async (req, res) => {
        try {
          const metrics = req.body;

          const result = await superAdminDataCollection.updateOne(
            { dataType: "systemOverview" },
            {
              $set: {
                ...metrics,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          if (result.matchedCount === 0) {
            return res
              .status(404)
              .send({ message: "System overview collection not found" });
          }

          res.send({ message: "System metrics updated successfully" });
        } catch (error) {
          console.error("Error updating system metrics:", error);
          res.status(500).send({ message: "Internal server error" });
        }
      }
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("DigiMoney server started successfully!");
});

app.listen(port, () =>
  console.log("DigiMoney server is running on port", port)
);

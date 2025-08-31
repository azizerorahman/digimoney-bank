import jwt from "jsonwebtoken";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import CryptoJS from "crypto-js";

export default async ({ req, res, log, error }) => {
  let client = null;

  // Helper function to send JSON response with CORS headers
  const corsResponse = (data, status = 200) => {
    return res.json(data, status, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400",
    });
  };

  try {
    log("DigiMoney Bank API function started");
    log(`Request method: ${req.method || "GET"}, path: ${req.path || "/"}`);

    const path = req.path || "/";
    const method = req.method || "GET";
    const body = req.body
      ? typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body
      : {};
    const headers = req.headers || {};

    // Handle preflight OPTIONS requests first
    if (method === "OPTIONS") {
      log("CORS preflight request handled");
      return res.text("", 200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "86400",
      });
    }

    // Health check (no DB needed)
    if (path === "/health") {
      return corsResponse({
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "DigiMoney Bank API",
        version: "2.0.0",
      });
    }

    // Root endpoint
    if (path === "/" && method === "GET") {
      return corsResponse({
        message: "Hello from DigiMoney Bank Server!",
        status: "API is running",
        timestamp: new Date().toISOString(),
        endpoints: {
          health: "/health",
          login: "/login",
          register: "/register",
          userDetails: "/user-details",
          accounts: "/accounts",
          transactions: "/transactions",
          budgets: "/budgets",
          transfer: "/transfer",
          recipients: "/recipients",
          notifications: "/notifications",
          recommendations: "/recommendations",
          investments: "/investment-portfolios",
          loans: "/loans",
          insurances: "/insurances",
          loanOfficerProfile: "/loan-officer-profile/:userId",
          loanApplications: "/loan-applications",
          activeLoans: "/active-loans",
          customers: "/customers",
          creditAnalysis: "/credit-analysis",
          communicationLogs: "/communication-logs",
        },
      });
    }

    // Initialize database connection for API endpoints
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dmb-cluster.6bs5ltd.mongodb.net/?retryWrites=true&w=majority&appName=DMB-Cluster`;
    client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    const db = client.db("dgm-database");

    // Collections
    const usersCollection = db.collection("users");
    const accountsCollection = db.collection("accounts");
    const transactionsCollection = db.collection("transactions");
    const budgetsCollection = db.collection("budgets");
    const investmentsCollection = db.collection("investment-portfolios");
    const recipientsCollection = db.collection("recipients");

    log("Database connected successfully");

    // Helper functions
    const verifyToken = (authHeader) => {
      if (!authHeader) throw new Error("No authorization header");
      const token = authHeader.split(" ")[1];
      return jwt.verify(token, process.env.SECRET_KEY);
    };

    const checkAdmin = async (uId) => {
      const user = await usersCollection.findOne({ _id: new ObjectId(uId) });
      return user?.admin === true;
    };

    const decryptPassword = (encryptedPassword) => {
      const bytes = CryptoJS.AES.decrypt(
        encryptedPassword,
        process.env.DECRYPTION_KEY
      );
      return bytes.toString(CryptoJS.enc.Utf8);
    };

    // ==================== AUTHENTICATION ENDPOINTS ====================

    // POST /login - User login
    if (path === "/login" && method === "POST") {
      const { email, encryptedPassword } = body;

      try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
          await client.close();
          return corsResponse({ message: "User not found" }, 404);
        }

        const decryptedPassword = decryptPassword(encryptedPassword);
        const storedDecryptedPassword = decryptPassword(user.encryptedPassword);

        if (decryptedPassword === storedDecryptedPassword) {
          const token = jwt.sign(
            { email: user.email, uId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );

          await client.close();
          return corsResponse({
            success: true,
            accessToken: token,
            uId: user._id,
          });
        } else {
          await client.close();
          return corsResponse({ message: "Invalid credentials" }, 401);
        }
      } catch (err) {
        await client.close();
        return corsResponse({ message: "Login failed" }, 500);
      }
    }

    // POST /register - User registration
    if (path === "/register" && method === "POST") {
      try {
        const result = await usersCollection.insertOne(body);
        const token = jwt.sign(
          { email: body.email, uId: result.insertedId },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );

        await client.close();
        return corsResponse({
          success: true,
          result,
          token,
        });
      } catch (err) {
        await client.close();
        return corsResponse({ message: "Registration failed" }, 500);
      }
    }

    // PUT /token/:email - Generate token
    if (path.match(/^\/token\/[^\/]+$/) && method === "PUT") {
      const email = decodeURIComponent(path.split("/")[2]);
      const user = await usersCollection.findOne({ email });

      if (user) {
        const token = jwt.sign(
          { email: user.email, uId: user._id },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );

        await client.close();
        return corsResponse({ accessToken: token });
      } else {
        await client.close();
        return corsResponse({ message: "User not found" }, 404);
      }
    }

    // ==================== USER MANAGEMENT ENDPOINTS ====================

    // GET /user-details - Get user details (Auth required)
    if (path === "/user-details" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const user = await usersCollection.findOne({ _id: new ObjectId(uId) });

        await client.close();
        return corsResponse(user);
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /verified/:email - Check verification status
    if (path.match(/^\/verified\/[^\/]+$/) && method === "GET") {
      const email = decodeURIComponent(path.split("/")[2]);
      const user = await usersCollection.findOne({ email });
      const isVerified = user?.verified === true;

      await client.close();
      return corsResponse({ success: true, verified: isVerified });
    }

    // GET /admin - Check admin status (Auth required)
    if (path === "/admin" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const isAdmin = await checkAdmin(uId);

        await client.close();
        return corsResponse({ admin: isAdmin });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /users - Get all users (Admin only)
    if (path === "/users" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const isAdmin = await checkAdmin(decoded.uId);

        if (!isAdmin) {
          await client.close();
          return corsResponse({ message: "Forbidden" }, 403);
        }

        const users = await usersCollection.find({}).toArray();
        await client.close();
        return corsResponse(users);
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // DELETE /users/:id - Delete user (Admin only)
    if (path.match(/^\/users\/[a-f\d]{24}$/i) && method === "DELETE") {
      try {
        const decoded = verifyToken(headers.authorization);
        const isAdmin = await checkAdmin(decoded.uId);

        if (!isAdmin) {
          await client.close();
          return corsResponse({ message: "Forbidden" }, 403);
        }

        const id = path.split("/")[2];
        const result = await usersCollection.deleteOne({
          _id: new ObjectId(id),
        });
        await client.close();
        return corsResponse(result);
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // ==================== ACCOUNT MANAGEMENT ENDPOINTS ====================

    // GET /accounts - Get user accounts (Auth required)
    if (path === "/accounts" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const accounts = await accountsCollection
          .find({ userId: uId })
          .toArray();

        await client.close();
        return corsResponse({ success: true, accounts });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // ==================== TRANSACTION ENDPOINTS ====================

    // GET /transactions - Get user transactions (Auth required)
    if (path === "/transactions" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const transactions = await transactionsCollection
          .find({ userId: uId })
          .toArray();

        // Find the most recent transaction date for reference
        let referenceDate = null;
        if (transactions.length > 0) {
          const sortedTransactions = transactions.sort((a, b) => {
            const dateA = new Date(a.date || a.createdAt || new Date());
            const dateB = new Date(b.date || b.createdAt || new Date());
            return dateB - dateA;
          });
          referenceDate =
            sortedTransactions[0].date ||
            sortedTransactions[0].createdAt ||
            new Date().toISOString();
        }

        await client.close();
        return corsResponse({ success: true, transactions, referenceDate });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /transaction-history - Get aggregated transaction history (Auth required)
    if (path === "/transaction-history" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;

        log("Transaction history request for user:", uId);

        // Get all transactions for the user
        const allTransactions = await transactionsCollection
          .find({ userId: uId })
          .toArray();

        log("Total transactions found:", allTransactions.length);

        if (allTransactions.length > 0) {
          log(
            "Sample transaction structure:",
            JSON.stringify(allTransactions[0], null, 2)
          );
        }

        // Group transactions by date using JavaScript
        const groupedByDate = {};

        allTransactions.forEach((transaction) => {
          let dateStr;

          // Try different date field approaches
          if (transaction.date) {
            try {
              dateStr = new Date(transaction.date).toISOString().split("T")[0];
            } catch (e) {
              dateStr = new Date().toISOString().split("T")[0];
            }
          } else if (transaction.createdAt) {
            try {
              dateStr = new Date(transaction.createdAt)
                .toISOString()
                .split("T")[0];
            } catch (e) {
              dateStr = new Date().toISOString().split("T")[0];
            }
          } else {
            dateStr = new Date().toISOString().split("T")[0]; // fallback to today
          }

          if (!groupedByDate[dateStr]) {
            groupedByDate[dateStr] = { credit: 0, debit: 0 };
          }

          const amount = Math.abs(transaction.amount || 0);

          if (transaction.transactionType === "credit") {
            groupedByDate[dateStr].credit += amount;
          } else if (transaction.transactionType === "debit") {
            groupedByDate[dateStr].debit += amount;
          }
        });

        // Convert to array and sort by date (newest first)
        const transactions = Object.entries(groupedByDate)
          .map(([date, amounts]) => ({
            date,
            credit: amounts.credit,
            debit: amounts.debit,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        log("Final transaction history response:", transactions);

        await client.close();
        return corsResponse({
          success: true,
          transactions: transactions,
        });
      } catch (authErr) {
        log("Transaction history error:", authErr.message);
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /spending-by-category - Get spending breakdown (Auth required)
    if (path === "/spending-by-category" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;

        const now = new Date();
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

        const pipeline = [
          { $match: { userId: uId, transactionType: "debit" } },
          {
            $group: {
              _id: "$category",
              totalAmount: { $sum: "$amount" },
              last7Days: {
                $sum: {
                  $cond: [{ $gte: ["$createdAt", last7Days] }, "$amount", 0],
                },
              },
              last30Days: {
                $sum: {
                  $cond: [{ $gte: ["$createdAt", last30Days] }, "$amount", 0],
                },
              },
              last90Days: {
                $sum: {
                  $cond: [{ $gte: ["$createdAt", last90Days] }, "$amount", 0],
                },
              },
            },
          },
        ];

        const categories = await transactionsCollection
          .aggregate(pipeline)
          .toArray();
        const totalSpending = categories.reduce(
          (sum, cat) => sum + cat.totalAmount,
          0
        );

        await client.close();
        return corsResponse({
          success: true,
          data: {
            totalSpending,
            categories: categories.map((cat) => ({
              category: cat._id,
              totalAmount: cat.totalAmount,
              percentage: ((cat.totalAmount / totalSpending) * 100).toFixed(1),
              last7Days: { amount: cat.last7Days },
              last30Days: { amount: cat.last30Days },
              last90Days: { amount: cat.last90Days },
            })),
          },
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // ==================== BUDGET ENDPOINTS ====================

    // GET /budgets - Get user budgets (Auth required)
    if (path === "/budgets" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const budget = await budgetsCollection.findOne({ userId: uId });

        if (!budget) {
          await client.close();
          return corsResponse(
            { success: false, message: "No budget found" },
            404
          );
        }

        await client.close();
        return corsResponse({ success: true, data: budget });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // POST /budgets - Create budget (Auth required)
    if (path === "/budgets" && method === "POST") {
      try {
        const decoded = verifyToken(headers.authorization);
        const {
          uId,
          category,
          budgeted,
          color,
          description,
          customCategory,
          isActive,
        } = body;

        if (!uId || !category || !budgeted) {
          await client.close();
          return corsResponse(
            { success: false, message: "Missing required fields" },
            400
          );
        }

        let userBudget = await budgetsCollection.findOne({ userId: uId });
        const budgetId = new ObjectId();

        const newBudgetItem = {
          category,
          budgeted: parseFloat(budgeted),
          actual: 0,
          color: color || "#4ecdc4",
          isActive: isActive !== undefined ? isActive : true,
          description: description || "",
          customCategory: customCategory || undefined,
          _id: budgetId,
        };

        if (!userBudget) {
          const newBudget = {
            userId: uId,
            budgets: [newBudgetItem],
            monthlyBudgetLimit: 0,
          };
          await budgetsCollection.insertOne(newBudget);
        } else {
          if (userBudget.budgets.some((b) => b.category === category)) {
            await client.close();
            return corsResponse(
              { success: false, message: "Budget category already exists" },
              400
            );
          }
          await budgetsCollection.updateOne(
            { userId: uId },
            { $push: { budgets: newBudgetItem } }
          );
        }

        await client.close();
        return corsResponse({
          success: true,
          message: "Budget added successfully",
          budget: newBudgetItem,
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // PUT /budgets/:budgetId - Update budget (Auth required)
    if (path.match(/^\/budgets\/[a-f\d]{24}$/i) && method === "PUT") {
      try {
        const decoded = verifyToken(headers.authorization);
        const budgetId = path.split("/")[2];
        const { uId, category, budgeted, color, description, customCategory } =
          body;

        if (!uId || !category || !budgeted) {
          await client.close();
          return corsResponse(
            { success: false, message: "Missing required fields" },
            400
          );
        }

        const budgetObjId = new ObjectId(budgetId);
        const result = await budgetsCollection.updateOne(
          { userId: uId, "budgets._id": budgetObjId },
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

        await client.close();
        return corsResponse({
          success: true,
          message: "Budget updated successfully",
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // DELETE /budgets/:budgetId - Delete budget (Auth required)
    if (path.match(/^\/budgets\/[a-f\d]{24}$/i) && method === "DELETE") {
      try {
        const decoded = verifyToken(headers.authorization);
        const budgetId = path.split("/")[2];
        const uId = req.query?.uId || decoded.uId;

        const budgetObjId = new ObjectId(budgetId);
        const result = await budgetsCollection.updateOne(
          { userId: uId },
          { $pull: { budgets: { _id: budgetObjId } } }
        );

        await client.close();
        return corsResponse({
          success: true,
          message: "Budget deleted successfully",
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // PATCH /budgets/:budgetId/toggle - Toggle budget status (Auth required)
    if (path.match(/^\/budgets\/[a-f\d]{24}\/toggle$/i) && method === "PATCH") {
      try {
        const decoded = verifyToken(headers.authorization);
        const budgetId = path.split("/")[2];
        const { uId, isActive } = body;

        const budgetObjId = new ObjectId(budgetId);
        await budgetsCollection.updateOne(
          { userId: uId, "budgets._id": budgetObjId },
          { $set: { "budgets.$.isActive": isActive } }
        );

        await client.close();
        return corsResponse({
          success: true,
          message: `Budget ${
            isActive ? "activated" : "deactivated"
          } successfully`,
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // POST /budgets/monthly-limit - Set monthly budget limit (Auth required)
    if (path === "/budgets/monthly-limit" && method === "POST") {
      try {
        const decoded = verifyToken(headers.authorization);
        const { uId, monthlyBudgetLimit } = body;

        const limit = parseFloat(monthlyBudgetLimit);
        if (isNaN(limit) || limit < 0) {
          await client.close();
          return corsResponse(
            { success: false, message: "Invalid budget limit" },
            400
          );
        }

        await budgetsCollection.updateOne(
          { userId: uId },
          { $set: { monthlyBudgetLimit: limit } }
        );

        await client.close();
        return corsResponse({
          success: true,
          message: "Monthly budget limit updated successfully",
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // ==================== ADDITIONAL ENDPOINTS ====================

    // GET /recipients - Get recipients (Auth required)
    if (path === "/recipients" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const { query, currentUserId } = req.query;

        let searchQuery = {
          verified: true,
          _id: { $ne: new ObjectId(currentUserId) },
        };

        if (query && query.length >= 3) {
          const searchRegex = new RegExp(query, "i");
          searchQuery.$or = [
            { name: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
          ];
        }

        const users = await usersCollection
          .find(searchQuery, {
            projection: { name: 1, email: 1, _id: 1 },
          })
          .toArray();

        const recipients = [];
        for (const user of users) {
          const userAccounts = await accountsCollection
            .find({ userId: user._id.toString() })
            .toArray();
          userAccounts.forEach((account) => {
            recipients.push({
              userId: user._id,
              name: user.name,
              email: user.email,
              accountNumber: account.accountNumber,
              accountName: account.accountName,
              accountType: account.type,
            });
          });
        }

        await client.close();
        return corsResponse({ success: true, recipients });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // POST /transfer - Money transfer (Auth required)
    if (path === "/transfer" && method === "POST") {
      try {
        const decoded = verifyToken(headers.authorization);
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
        } = body;

        if (!fromAccountId || !toAccount || !recipientName || !amount || !uId) {
          await client.close();
          return corsResponse(
            { success: false, message: "Missing required fields" },
            400
          );
        }

        const senderAccount = await accountsCollection.findOne({
          _id: new ObjectId(fromAccountId),
          userId: uId,
        });

        if (!senderAccount) {
          await client.close();
          return corsResponse(
            { success: false, message: "Account not found" },
            404
          );
        }

        const fee = amount > 1000 ? 2.5 : 0;
        const totalDebit = amount + fee;

        if (senderAccount.balance < totalDebit) {
          await client.close();
          return corsResponse(
            { success: false, message: "Insufficient balance" },
            400
          );
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

        await client.close();
        return corsResponse({
          success: true,
          message: "Transfer completed successfully",
          transactionId: transactionId,
          newBalance: senderAccount.balance - totalDebit,
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /approvedUsers - Get approved users
    if (path === "/approvedUsers" && method === "GET") {
      const users = await usersCollection.find({}).toArray();
      await client.close();
      return corsResponse(users);
    }

    // GET /notifications - Get user notifications (Auth required)
    if (path === "/notifications" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const userId = req.query?.uId || decoded.uId;
        const notifications = await db
          .collection("notifications")
          .find({ userId })
          .toArray();

        await client.close();
        return corsResponse({ success: true, notifications });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /recommendations - Get user recommendations (Auth required)
    if (path === "/recommendations" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const userId = req.query?.uId || decoded.uId;
        const recommendations = await db
          .collection("recommendations")
          .find({ userId })
          .toArray();

        await client.close();
        return corsResponse({ success: true, recommendations });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /investment-portfolios - Get investment portfolios (Auth required)
    if (path === "/investment-portfolios" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const portfolio = await investmentsCollection.findOne({ userId: uId });

        if (!portfolio) {
          await client.close();
          return corsResponse(
            { success: false, message: "No portfolio found" },
            404
          );
        }

        await client.close();
        return corsResponse({ success: true, portfolio });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /loans - Get user loans (Auth required)
    if (path === "/loans" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const loans = await db
          .collection("loans")
          .find({ userId: uId })
          .toArray();

        await client.close();
        return corsResponse({ success: true, loans });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /insurances - Get user insurance (Auth required)
    if (path === "/insurances" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const uId = req.query?.uId || decoded.uId;
        const insurance = await db
          .collection("insurances")
          .findOne({ userId: uId });

        if (!insurance) {
          await client.close();
          return corsResponse(
            { success: false, message: "No insurance found" },
            404
          );
        }

        await client.close();
        return corsResponse({ success: true, insurance });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // ==================== LOAN OFFICER ENDPOINTS ====================

    // GET /loan-officer-profile/:userId - Get loan officer profile (Auth required)
    if (path.match(/^\/loan-officer-profile\/[^\/]+$/) && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const userId = path.split("/")[2];
        
        const user = await usersCollection.findOne({ 
          _id: new ObjectId(userId),
          role: "loan_officer" 
        });

        if (!user) {
          await client.close();
          return corsResponse({ message: "Loan officer not found" }, 404);
        }

        await client.close();
        return corsResponse({ success: true, profile: user });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /loan-applications - Get all loan applications (Auth required)
    if (path === "/loan-applications" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const loanApplications = await db.collection("loan-applications")
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        // Populate applicant details
        for (let application of loanApplications) {
          if (application.applicantId) {
            const applicant = await usersCollection.findOne({ 
              _id: new ObjectId(application.applicantId) 
            });
            application.applicantName = applicant ? applicant.name : "Unknown";
            application.applicantEmail = applicant ? applicant.email : "Unknown";
          }
        }

        await client.close();
        return corsResponse({ success: true, applications: loanApplications });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /loan-application/:id - Get specific loan application (Auth required)
    if (path.match(/^\/loan-application\/[a-f\d]{24}$/i) && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const applicationId = path.split("/")[2];

        const application = await db.collection("loan-applications")
          .findOne({ _id: new ObjectId(applicationId) });

        if (!application) {
          await client.close();
          return corsResponse({ message: "Application not found" }, 404);
        }

        await client.close();
        return corsResponse({ success: true, application });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /active-loans - Get active loans (Auth required)
    if (path === "/active-loans" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const activeLoans = await db.collection("loans")
          .find({ status: "active" })
          .toArray();

        // Populate borrower details
        for (let loan of activeLoans) {
          if (loan.borrowerId) {
            const borrower = await usersCollection.findOne({ 
              _id: new ObjectId(loan.borrowerId) 
            });
            loan.borrowerName = borrower ? borrower.name : "Unknown";
            loan.borrowerEmail = borrower ? borrower.email : "Unknown";
          }
        }

        await client.close();
        return corsResponse({ success: true, loans: activeLoans });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /customers - Get all customers (Auth required)
    if (path === "/customers" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const customers = await usersCollection
          .find({ role: { $in: ["user", "customer"] } })
          .project({ 
            password: 0, 
            encryptedPassword: 0 
          })
          .toArray();

        // Get account information for each customer
        for (let customer of customers) {
          const accounts = await accountsCollection
            .find({ userId: customer._id.toString() })
            .toArray();
          customer.accounts = accounts;
          customer.totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
        }

        await client.close();
        return corsResponse({ success: true, customers });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /customer/:id - Get specific customer (Auth required)
    if (path.match(/^\/customer\/[a-f\d]{24}$/i) && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        const customerId = path.split("/")[2];

        const customer = await usersCollection.findOne({ 
          _id: new ObjectId(customerId) 
        }, { 
          projection: { password: 0, encryptedPassword: 0 } 
        });

        if (!customer) {
          await client.close();
          return corsResponse({ message: "Customer not found" }, 404);
        }

        await client.close();
        return corsResponse({ success: true, customer });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /repayment-schedules - Get repayment schedules (Auth required)
    if (path === "/repayment-schedules" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const repaymentSchedules = await db.collection("repayment-schedules")
          .find({})
          .toArray();

        await client.close();
        return corsResponse({ success: true, schedules: repaymentSchedules });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /risk-assessments - Get risk assessments (Auth required)
    if (path === "/risk-assessments" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const riskAssessments = await db.collection("risk-assessments")
          .find({})
          .toArray();

        await client.close();
        return corsResponse({ success: true, assessments: riskAssessments });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /credit-analysis - Get credit analysis data (Auth required)
    if (path === "/credit-analysis" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);

        // Get total loan applications
        const totalApplications = await db.collection("loan-applications").countDocuments();
        
        // Get approved applications
        const approvedApplications = await db.collection("loan-applications")
          .countDocuments({ status: "approved" });
        
        // Get pending applications
        const pendingApplications = await db.collection("loan-applications")
          .countDocuments({ status: "pending" });
        
        // Get rejected applications
        const rejectedApplications = await db.collection("loan-applications")
          .countDocuments({ status: "rejected" });

        // Calculate approval rate
        const approvalRate = totalApplications > 0 ? 
          ((approvedApplications / totalApplications) * 100).toFixed(1) : 0;

        // Get average loan amount
        const loanAmounts = await db.collection("loan-applications")
          .find({ status: "approved" })
          .toArray();
        
        const avgLoanAmount = loanAmounts.length > 0 ? 
          loanAmounts.reduce((sum, loan) => sum + (loan.amount || 0), 0) / loanAmounts.length : 0;

        // Get monthly application trends (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyTrends = await db.collection("loan-applications")
          .aggregate([
            {
              $match: {
                createdAt: { $gte: sixMonthsAgo }
              }
            },
            {
              $group: {
                _id: {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" }
                },
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                approved: {
                  $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] }
                }
              }
            },
            {
              $sort: { "_id.year": 1, "_id.month": 1 }
            }
          ]).toArray();

        const creditAnalysis = {
          overview: {
            totalApplications,
            approvedApplications,
            pendingApplications,
            rejectedApplications,
            approvalRate: parseFloat(approvalRate),
            avgLoanAmount: Math.round(avgLoanAmount)
          },
          monthlyTrends: monthlyTrends.map(trend => ({
            month: `${trend._id.year}-${String(trend._id.month).padStart(2, '0')}`,
            applications: trend.count,
            totalAmount: trend.totalAmount,
            approved: trend.approved,
            approvalRate: trend.count > 0 ? ((trend.approved / trend.count) * 100).toFixed(1) : 0
          }))
        };

        await client.close();
        return corsResponse({ success: true, data: creditAnalysis });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // GET /communication-logs - Get communication logs (Auth required)
    if (path === "/communication-logs" && method === "GET") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const communicationLogs = await db.collection("communication-logs")
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        await client.close();
        return corsResponse({ success: true, logs: communicationLogs });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // POST /communication-logs - Create communication log (Auth required)
    if (path === "/communication-logs" && method === "POST") {
      try {
        const decoded = verifyToken(headers.authorization);
        
        const logData = {
          ...body,
          createdAt: new Date(),
          officerId: decoded.uId
        };

        const result = await db.collection("communication-logs")
          .insertOne(logData);

        await client.close();
        return corsResponse({ 
          success: true, 
          message: "Communication log created successfully",
          logId: result.insertedId 
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // PATCH /loan-application/:id/status - Update loan application status (Auth required)
    if (path.match(/^\/loan-application\/[a-f\d]{24}\/status$/i) && method === "PATCH") {
      try {
        const decoded = verifyToken(headers.authorization);
        const applicationId = path.split("/")[2];
        const { status, notes } = body;

        if (!status) {
          await client.close();
          return corsResponse({ message: "Status is required" }, 400);
        }

        const updateData = {
          status,
          updatedAt: new Date(),
          processedBy: decoded.uId
        };

        if (notes) {
          updateData.notes = notes;
        }

        const result = await db.collection("loan-applications")
          .updateOne(
            { _id: new ObjectId(applicationId) },
            { $set: updateData }
          );

        if (result.matchedCount === 0) {
          await client.close();
          return corsResponse({ message: "Application not found" }, 404);
        }

        await client.close();
        return corsResponse({ 
          success: true, 
          message: "Application status updated successfully" 
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // PATCH /loan-officer-stats/:userId - Update loan officer stats (Auth required)
    if (path.match(/^\/loan-officer-stats\/[^\/]+$/) && method === "PATCH") {
      try {
        const decoded = verifyToken(headers.authorization);
        const userId = path.split("/")[2];
        
        // Update or create loan officer stats
        const statsData = {
          ...body,
          updatedAt: new Date()
        };

        const result = await db.collection("loan-officer-stats")
          .updateOne(
            { userId },
            { $set: statsData },
            { upsert: true }
          );

        await client.close();
        return corsResponse({ 
          success: true, 
          message: "Loan officer stats updated successfully" 
        });
      } catch (authErr) {
        await client.close();
        return corsResponse({ message: "Unauthorized Access" }, 401);
      }
    }

    // Default response for unknown endpoints
    await client.close();
    return corsResponse(
      {
        success: false,
        message: `Endpoint ${method} ${path} not found`,
        availableEndpoints: [
          "/",
          "/health",
          "/login",
          "/register",
          "/token/:email",
          "/user-details",
          "/verified/:email",
          "/admin",
          "/users",
          "/users/:id",
          "/accounts",
          "/transactions",
          "/transaction-history",
          "/spending-by-category",
          "/budgets",
          "/budgets/:budgetId",
          "/budgets/:budgetId/toggle",
          "/budgets/monthly-limit",
          "/recipients",
          "/transfer",
          "/approvedUsers",
          "/notifications",
          "/recommendations",
          "/investment-portfolios",
          "/loans",
          "/insurances",
          "/loan-officer-profile/:userId",
          "/loan-applications",
          "/loan-application/:id",
          "/active-loans",
          "/customers",
          "/customer/:id",
          "/repayment-schedules",
          "/risk-assessments",
          "/credit-analysis",
          "/communication-logs",
          "/loan-application/:id/status",
          "/loan-officer-stats/:userId",
        ],
      },
      404
    );
  } catch (err) {
    error(`Function error: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    if (client) {
      try {
        await client.close();
      } catch (closeErr) {
        error(`Error closing database: ${closeErr.message}`);
      }
    }

    return res.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong",
        timestamp: new Date().toISOString(),
      },
      500,
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "86400",
      }
    );
  }
};

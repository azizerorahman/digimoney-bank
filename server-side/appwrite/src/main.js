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

        await client.close();
        return corsResponse({ success: true, transactions });
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

        // First, let's check what date fields exist in transactions
        const sampleTransaction = await transactionsCollection.findOne({
          userId: uId,
        });
        log("Sample transaction:", JSON.stringify(sampleTransaction, null, 2));

        let dateField = "$date"; // Default to 'date' field

        // Check which date field exists
        if (sampleTransaction) {
          if (sampleTransaction.createdAt) {
            dateField = "$createdAt";
          } else if (sampleTransaction.date) {
            dateField = "$date";
          } else if (sampleTransaction.timestamp) {
            dateField = "$timestamp";
          }
        }

        log("Using date field:", dateField);

        const pipeline = [
          { $match: { userId: uId } },
          {
            $addFields: {
              transactionDate: {
                $cond: {
                  if: { $type: [dateField, "string"] },
                  then: { $dateFromString: { dateString: dateField } },
                  else: dateField,
                },
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$transactionDate",
                },
              },
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
                  $cond: [{ $eq: ["$transactionType", "debit"] }, "$amount", 0],
                },
              },
            },
          },
          { $sort: { _id: -1 } },
        ];

        log(
          "Transaction history aggregation pipeline:",
          JSON.stringify(pipeline, null, 2)
        );

        const transactions = await transactionsCollection
          .aggregate(pipeline)
          .toArray();

        log("Transaction history response:", transactions);

        // Filter out null dates and format the response
        const filteredTransactions = transactions
          .filter((t) => t._id !== null)
          .map((transaction) => ({
            date: transaction._id,
            credit: Math.abs(transaction.credit),
            debit: Math.abs(transaction.debit),
          }));

        // If no transactions with valid dates, try a simpler approach
        if (filteredTransactions.length === 0 && transactions.length > 0) {
          log("No valid dates found, using fallback approach");

          // Get all transactions and group them manually
          const allTransactions = await transactionsCollection
            .find({ userId: uId })
            .toArray();
          log("All transactions count:", allTransactions.length);

          const groupedByDate = {};

          allTransactions.forEach((transaction) => {
            let dateStr;

            // Try different date field approaches
            if (transaction.date) {
              dateStr = new Date(transaction.date).toISOString().split("T")[0];
            } else if (transaction.createdAt) {
              dateStr = new Date(transaction.createdAt)
                .toISOString()
                .split("T")[0];
            } else {
              dateStr = new Date().toISOString().split("T")[0]; // fallback to today
            }

            if (!groupedByDate[dateStr]) {
              groupedByDate[dateStr] = { credit: 0, debit: 0 };
            }

            if (transaction.transactionType === "credit") {
              groupedByDate[dateStr].credit += Math.abs(transaction.amount);
            } else if (transaction.transactionType === "debit") {
              groupedByDate[dateStr].debit += Math.abs(transaction.amount);
            }
          });

          // Convert to array and sort
          const fallbackTransactions = Object.entries(groupedByDate)
            .map(([date, amounts]) => ({
              date,
              credit: amounts.credit,
              debit: amounts.debit,
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          log("Fallback transactions:", fallbackTransactions);

          await client.close();
          return corsResponse({
            success: true,
            transactions: fallbackTransactions,
          });
        }

        await client.close();
        return corsResponse({
          success: true,
          transactions: filteredTransactions,
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
          .find({ userId: uId })
          .toArray();

        await client.close();
        return corsResponse({ success: true, insurance });
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

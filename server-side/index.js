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

// ============================================== Sending to receiver email ==============================================

// function receiverMail(addTransectionToReceiver) {
//   const {
//     senderEmail,
//     senderAccountNumber,
//     receive_money,
//     data,
//     reciverEmail,
//   } = addTransectionToReceiver.$push.transection;
//   // sending mail via nodemailer

//   const msg = {
//     from: "testingdeveloper431@gmail.com", // sender address
//     to: ` ${reciverEmail}`, // list of receivers
//     subject: `Money Recived from ${senderEmail}`, // Subject line
//     text: "hey you got a info", // plain text body
//     html: `
//              <p>Hey</p></br>
//              <p>Your account has recived ${receive_money}$ from Account Number ${senderAccountNumber}
//              </p> </br>
//              <p>Best Regards</p> </br>
//              <p>Digi Money Bank</p>

//           `,
//   };

//   nodemailer
//     .createTransport({
//       service: "gmail",
//       auth: {
//         user: "testingdeveloper431@gmail.com",
//         pass: "ajexwpkgpewiohct",
//       },
//       port: 587,
//       host: "smtp.ethereal.email",
//     })
//     .sendMail(msg, (err) => {
//       if (err) {
//         return console.log("Error occures", err);
//       } else {
//         return console.log("email sent");
//       }
//     });
// }

//======================================== jot web token authorization for all users ===================================

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

// ============================================== Sending to sender email ==============================================

// function senderMail(addTransection) {
//   const { senderEmail, receiverAccountnumber, amount, data, reciverEmail } =
//     addTransection.$push.transection;

//   // sending mail via nodemailer
//   //
//   const msg = {
//     from: "testingdeveloper431@gmail.com", // sender address
//     to: `${senderEmail}`, // list of receivers
//     subject: `Money sent to from ${reciverEmail}`, // Subject line
//     text: "hey you got a info", // plain text body
//     html: `
//                <p>Hey</p></br>
//                <p>Your account has send ${amount}$ to Account Number ${receiverAccountnumber}
//                </p> </br>
//                <p>Best Regards</p> </br>
//                <p>Digi Money Bank</p>

//             `,
//   };

//   nodemailer
//     .createTransport({
//       service: "gmail",
//       auth: {
//         user: "testingdeveloper431@gmail.com",
//         pass: "ajexwpkgpewiohct",
//       },
//       port: 587,
//       host: "smtp.ethereal.email",
//     })
//     .sendMail(msg, (err) => {
//       if (err) {
//         return console.log("Error occures", err);
//       } else {
//         return console.log("email sent");
//       }
//     });
// }

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // Collections
    const db = client.db("dgm-database");
    const usersCollection = db.collection("users");
    const accountsCollection = db.collection("accounts");
    const transactionsCollection = db.collection("transactions");
    // const approvedUsersCollection = client
    //   .db("dgm-database")
    //   .collection("approvedUsers");
    // const usersReviewCollection = client
    //   .db("dgm-database")
    //   .collection("reviews");
    // const transectionCollection = client
    //   .db("dgm-database")
    //   .collection("transection");
    // const tokenUserCollection = client.db("dgm-database").collection("user");
    // const blogCollection = client.db("dgm-database").collection("blog");
    // const randomVisitorCollection = client
    //   .db("dgm-database")
    //   .collection("randomvisitor");
    // const subscribeCollection = client
    //   .db("dgm-database")
    //   .collection("subscribe");
    // const bankDataCollection = client.db("dgm-database").collection("bankdata");

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
          return res.status(400).send({ success: false, message: "User ID is required" });
        }

        const accounts = await accountsCollection.find({ userId: uId }).toArray();
        res.send({ success: true, accounts });
      } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    });

    app.get("/transactions", verifyJWT, async (req, res) => {
      try {
      const uId = req.query.uId;

      if (!uId) {
        return res.status(400).send({ success: false, message: "User ID is required" });
      }

      // If accountId is provided, filter by both userId and accountId
      const query = { userId: uId };
      if (req.query.accountId) {
        query.accountId = req.query.accountId;
      }

      // Fetch transactions for the user (and account if provided)
      const transactions = await transactionsCollection.find(query).toArray();
      res.send({ success: true, transactions });
      } catch (error) {
      console.error("Failed to fetch transactions:", error);
      res.status(500).send({ success: false, message: "Failed to fetch transactions" });
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

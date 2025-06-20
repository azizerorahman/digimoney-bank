# DigiMoney Bank - Server Side

A comprehensive digital banking API built with Node.js, Express.js, and MongoDB that provides secure financial services and modern banking solutions.

## 🏦 Overview

DigiMoney Bank is a full-featured digital banking platform that offers modern banking services including account management, transaction processing, budget tracking, investment portfolio management, and multi-role user authentication. The server provides RESTful APIs for a complete banking ecosystem.

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based authentication
- **Password Encryption** - AES encryption for user passwords
- **Role-Based Access Control** - Multiple user roles (Admin, User, Account Manager, Loan Officer, CSR)
- **Account Verification** - Multi-step account verification process

### 👥 User Management
- **User Registration** - Complete user onboarding with document upload
- **Profile Management** - Update user information and profile pictures
- **Admin Controls** - Admin dashboard for user management
- **Account Approval** - Manual account verification system

### 💰 Core Banking Services
- **Account Management** - Multiple account types (Checking, Savings, Credit)
- **Transaction Processing** - Real-time transaction handling
- **Money Transfer** - Secure fund transfers between accounts
- **Balance Management** - Deposit and withdrawal operations
- **Transaction History** - Detailed transaction logs with aggregation

### 📊 Financial Analytics
- **Budget Management** - Personal budget tracking and analytics
- **Spending Analysis** - Category-wise spending breakdown
- **Transaction History** - Time-based transaction aggregation
- **Financial Reports** - Comprehensive financial insights

### 🎯 Advanced Features
- **Investment Portfolio** - Investment tracking and analytics
- **Loan Management** - Loan application and tracking
- **Insurance Management** - Insurance policy management
- **Credit Score Tracking** - Credit score monitoring

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with MongoDB Driver
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Crypto-JS for encryption
- **Date Handling**: Moment.js
- **Email Service**: Nodemailer (configured but commented)
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/azizurrahman-zero/digimoney-bank_server-side.git
   cd digimoney-bank/server-side
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   MONGODB_USER=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   SECRET_KEY=your_jwt_secret_key
   DECRYPTION_KEY=your_aes_encryption_key
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run start-dev
   
   # Production mode
   npm start
   ```

## 📊 Database Schema

### Collections Overview

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  encryptedPassword: String,
  displayName: String,
  fatherName: String,
  motherName: String,
  contact: String,
  address: String,
  gender: String,
  accountType: String,
  amount: Number,
  verified: Boolean,
  admin: Boolean,
  role: String,
  accountNumber: String,
  img: String,
  capturedPhoto: String,
  transactionId: String
}
```

#### Accounts Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  type: String, // 'Checking', 'Savings', 'Credit'
  accountName: String,
  accountNumber: String,
  balance: Number,
  isActive: Boolean,
  createdAt: Date
}
```

#### Transactions Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  accountId: String,
  transactionType: String, // 'credit', 'debit'
  amount: Number,
  description: String,
  category: String,
  merchant: String,
  date: String, // ISO date string
  createdAt: Date
}
```

#### Budgets Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  monthlyIncome: Number,
  monthlyExpenses: Number,
  categories: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/login`
Authenticate user and return JWT token
```javascript
// Request
{
  "email": "user@example.com",
  "encryptedPassword": "encrypted_password"
}

// Response
{
  "success": true,
  "token": "jwt_token",
  "uId": "user_id"
}
```

#### POST `/register`
Register new user account
```javascript
// Request
{
  "email": "user@example.com",
  "encryptedPassword": "encrypted_password",
  "displayName": "John Doe",
  "fatherName": "Father Name",
  "motherName": "Mother Name",
  "contact": "+1234567890",
  "address": "User Address",
  "gender": "Male",
  "accountType": "Savings Account",
  "amount": 1000,
  "transactionId": "TXN123456"
}

// Response
{
  "success": true,
  "result": { "insertedId": "user_id" },
  "token": "jwt_token"
}
```

#### PUT `/token/:email`
Generate JWT token for existing user
```javascript
// Response
{
  "token": "jwt_token"
}
```

### User Management Endpoints

#### GET `/user-details` (Protected)
Get user details by user ID
```javascript
// Query Parameters: ?uId=user_id
// Response: User object
```

#### GET `/verified/:email`
Check user verification status
```javascript
// Response
{
  "success": true,
  "verified": true
}
```

#### GET `/admin` (Protected)
Check if user has admin privileges
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "admin": true
}
```

#### GET `/users`
Get all users (Admin only)
```javascript
// Response: Array of user objects
```

#### DELETE `/users/:id`
Delete user by ID (Admin only)

### Account Management Endpoints

#### GET `/accounts` (Protected)
Get user accounts
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "success": true,
  "accounts": [
    {
      "_id": "account_id",
      "userId": "user_id",
      "type": "Checking",
      "accountName": "Premium Checking",
      "balance": 12450.75,
      "isActive": true
    }
  ]
}
```

### Transaction Management Endpoints

#### GET `/transactions` (Protected)
Get user transactions
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "success": true,
  "transactions": [
    {
      "_id": "transaction_id",
      "userId": "user_id",
      "accountId": "account_id",
      "transactionType": "credit",
      "amount": 1000,
      "description": "Salary Deposit",
      "category": "Income",
      "date": "2025-06-20T10:00:00.000Z"
    }
  ]
}
```

#### GET `/transaction-history` (Protected)
Get aggregated transaction history by date
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "success": true,
  "transactions": [
    {
      "date": "2025-06-20",
      "credit": 1000,
      "debit": 500
    }
  ]
}
```

#### GET `/spending-by-category` (Protected)
Get spending breakdown by category with time-based analysis
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "success": true,
  "data": {
    "totalSpending": 2500,
    "totalLast7Days": 300,
    "totalLast30Days": 1200,
    "totalLast90Days": 2200,
    "categories": [
      {
        "category": "Food",
        "totalAmount": 500,
        "percentage": 20,
        "last7Days": { "amount": 100, "percentage": 33 },
        "last30Days": { "amount": 300, "percentage": 25 },
        "last90Days": { "amount": 450, "percentage": 20 }
      }
    ]
  }
}
```

### Budget Management Endpoints

#### GET `/budgets` (Protected)
Get user budget data
```javascript
// Query Parameters: ?uId=user_id
// Response
{
  "success": true,
  "data": {
    "userId": "user_id",
    "monthlyIncome": 5000,
    "monthlyExpenses": 3500,
    "categories": [
      {
        "name": "Housing",
        "budgeted": 1500,
        "spent": 1450,
        "remaining": 50
      }
    ]
  }
}
```

### Legacy Endpoints (Commented/Deprecated)

The following endpoints are present but commented out in the current implementation:
- Money transfer operations
- Email notification system
- Blog management
- Visitor data collection
- Bank information management

## 🔒 Security Features

### JWT Authentication
- **Token Expiration**: 7 days
- **Secure Headers**: Authorization Bearer token
- **Route Protection**: Middleware-based route protection

### Password Security
- **AES Encryption**: Client-side password encryption
- **Server-side Decryption**: Secure password verification
- **No Plain Text**: Passwords never stored in plain text

### Data Validation
- **Input Sanitization**: All inputs validated
- **Type Checking**: Strict data type validation
- **Error Handling**: Comprehensive error responses

## 🏗 Architecture

### Middleware Stack
```javascript
// CORS Configuration
app.use(cors());

// JSON Body Parser
app.use(express.json());

// JWT Verification Middleware
function verifyJWT(req, res, next) {
  // Token validation logic
}
```

### Database Connection
```javascript
// MongoDB Connection
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dmb-cluster.6bs5ltd.mongodb.net/?retryWrites=true&w=majority&appName=DMB-Cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
```

### Error Handling
- **Try-Catch Blocks**: Comprehensive error catching
- **HTTP Status Codes**: Proper status code implementation
- **Error Logging**: Console logging for debugging
- **User-Friendly Messages**: Clear error responses

## 🧪 Development

### Scripts
```json
{
  "start": "node index.js",
  "start-dev": "nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Code Structure
```
server-side/
├── index.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── .env                  # Environment variables (create this)
```

### Development Setup
1. **Install nodemon globally** (optional):
   ```bash
   npm install -g nodemon
   ```

2. **Run in development mode**:
   ```bash
   npm run start-dev
   ```

3. **Monitor logs**:
   - Server starts on port specified in `.env` (default: 4000)
   - MongoDB connection status logged
   - All API requests logged to console

## 🌐 Integration

### Frontend Integration
This server is designed to work with the DigiMoney Bank React frontend:
- **CORS Enabled**: Cross-origin requests allowed
- **JSON APIs**: RESTful JSON responses
- **Token-based Auth**: JWT tokens for session management

### Database Integration
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Connection Pooling**: Automatic connection management
- **Aggregation Pipeline**: Complex data queries supported

## 📝 API Response Formats

### Success Response
```javascript
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Optional error details"
}
```

## 🚀 Deployment

### Environment Variables
Ensure all environment variables are set:
```env
PORT=4000
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
SECRET_KEY=your_jwt_secret_key_at_least_32_chars
DECRYPTION_KEY=your_aes_encryption_key
```

### Production Considerations
- **Process Manager**: Use PM2 or similar for production
- **Environment**: Set `NODE_ENV=production`
- **Security**: Use HTTPS in production
- **Monitoring**: Implement logging and monitoring
- **Database**: Ensure MongoDB Atlas security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙋‍♂️ Support

For support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/azizurrahman-zero/digimoney-bank_server-side/issues)
- **Email**: Contact the development team

## 🔗 Related Projects

- **Frontend Repository**: DigiMoney Bank React Client
- **Documentation**: API Documentation
- **Demo**: Live demo application

---

**DigiMoney Bank** - Modern Banking Made Simple 🏦✨
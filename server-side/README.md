# DigiMoney Bank Server Side

![DigiMoney API](https://img.shields.io/badge/DigiMoney-API-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)
![Express](https://img.shields.io/badge/Express-4.18+-orange)
![Node.js](https://img.shields.io/badge/Node.js-16+-brightgreen)

A comprehensive backend API for the DigiMoney Bank digital banking platform. This server provides secure endpoints for managing banking operations, user authentication, transaction processing, budget management, and financial analytics with JWT-based security and MongoDB integration.

## Important Links

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-2ea44f?style=for-the-badge&logo=vercel)](https://digimoney-bank.netlify.app/)
[![Client Repository](https://img.shields.io/badge/Client_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizerorahman/digimoney-bank/tree/main/client-side)
[![Server Repository](https://img.shields.io/badge/Server_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizerorahman/digimoney-bank/tree/main/server-side)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

- **Comprehensive Banking Operations**: Full suite of banking services including account management, transactions, and transfers
- **Multi-Role Authentication**: JWT-based secure authentication with role-based access control (User, Admin, Account Manager, CSR)
- **Real-time Transaction Processing**: Instant money transfers with fee calculation and balance updates
- **Advanced Budget Management**: Personal finance tracking with category-wise spending analysis and budget alerts
- **Investment Portfolio Tracking**: Investment management with performance analytics and portfolio insights
- **Financial Analytics**: Comprehensive spending breakdowns, transaction history, and time-based financial reports
- **User Verification System**: Multi-step account verification with document upload support
- **Secure APIs**: Protected endpoints with token verification and role-based access control
- **MongoDB Integration**: Persistent storage with optimized queries and aggregation pipelines

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing user data, transactions, and financial records
- **JSON Web Token (JWT)**: Secure authentication and authorization
- **Crypto-js**: Advanced encryption for password security
- **dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/azizerorahman/digimoney-bank.git
   cd digimoney-bank/server-side
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your credentials:

   ```plaintext
   MONGODB_USER=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   SECRET_KEY=your_jwt_secret_key_at_least_32_characters
   DECRYPTION_KEY=your_aes_encryption_key_32_characters
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   # or for development
   npm run start-dev
   ```

5. The server will be running at `http://localhost:5000`

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGODB_USER | MongoDB Atlas username |
| MONGODB_PASSWORD | MongoDB Atlas password |
| SECRET_KEY | Secret key for JWT token generation (min 32 characters) |
| DECRYPTION_KEY | AES encryption key for password security (32 characters) |
| PORT | Server port (defaults to 5000) |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | User login with email and password | No |
| POST | `/register` | Register new user account | No |
| PUT | `/token/:email` | Generate JWT token for user | No |
| GET | `/user-details` | Get authenticated user details | Yes |
| GET | `/verified/:email` | Check if user account is verified | No |
| GET | `/admin` | Check if user has admin privileges | Yes |
| GET | `/users` | Get all users | Yes |
| DELETE | `/users/:id` | Delete user by ID | Yes |
| GET | `/accounts` | Get user account details | Yes |
| GET | `/transactions` | Get user transaction history | Yes |
| GET | `/transaction-history` | Get aggregated transaction data by date | Yes |
| GET | `/spending-by-category` | Get spending breakdown by category | Yes |
| GET | `/budgets` | Get user budget information | Yes |

## Project Structure

```plaintext
digimoney-bank/server-side/
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

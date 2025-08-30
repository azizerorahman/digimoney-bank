# DigiMoney Bank

![React](https://img.shields.io/badge/React-18.0+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)
![Express](https://img.shields.io/badge/Express-4.18+-orange)

A comprehensive digital banking platform built with React and Node.js. This full-stack application provides secure banking operations, multi-role dashboards, real-time transactions, and advanced financial analytics.

## Important Links

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-2ea44f?style=for-the-badge&logo=vercel)](https://digimoney-bank.netlify.app/)
[![Client Repository](https://img.shields.io/badge/Client_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizerorahman/digimoney-bank/tree/main/client-side)
[![Server Repository](https://img.shields.io/badge/Server_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizerorahman/digimoney-bank/tree/main/server-side)

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase account and project setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/azizerorahman/digimoney-bank.git
   cd digimoney-bank
   ```

2. Setup Server:

   ```bash
   cd server-side
   npm install
   # Create .env file with your credentials
   npm start
   ```

3. Setup Client:

   ```bash
   cd ../client-side
   npm install
   # Create .env file with your credentials
   npm start
   ```

4. Open `http://localhost:3000` to view the application

## Features

- **Multi-Role Authentication**: Secure role-based access for different user types
- **Real-time Banking**: Live account balances, instant transfers, transaction history
- **Budget Management**: Personal finance tracking with spending analytics
- **Investment Portfolio**: Investment tracking and performance analytics
- **Financial Analytics**: Comprehensive spending breakdowns and insights
- **Responsive Design**: Works seamlessly across all devices

## Project Structure

```plaintext
digimoney-bank/
├── client-side/
│   ├── public/
│   ├── src/
│   ├── .env
|   ├── package.json
│   └── ...
└── server-side/
    ├── index.js
    ├── .env
    ├── package.json
    └── ...
```

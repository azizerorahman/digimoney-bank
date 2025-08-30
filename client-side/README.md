# DigiMoney Bank Client Side

![React](https://img.shields.io/badge/React-18.0+-blue)
![React Router](https://img.shields.io/badge/React_Router-6.0+-CA4245)
![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)

DigiMoney Bank is a comprehensive digital banking platform built with React and modern web technologies. This application provides a complete banking experience with role-based dashboards, real-time financial data, secure transactions, and intuitive user interfaces. Features include multi-tier user roles (User, Super Admin, Account Manager, Loan Officer, CSR), advanced budget management, investment tracking, and comprehensive financial analytics designed for modern digital banking needs.

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
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- **Multi-Role Dashboard System**: Comprehensive dashboards for Users, Super Admins, Account Managers, Loan Officers, and CSR staff with role-based access control
- **Secure Authentication**: Firebase authentication with Google login, JWT token management, and encrypted password storage
- **Real-time Banking Operations**: Live account balances, instant transfers, and real-time transaction history
- **Advanced Budget Management**: Personal finance tracking, spending analysis by category, and budget alerts
- **Investment Portfolio Tracking**: Investment performance monitoring, portfolio analytics, and financial health reports
- **Loan & Credit Management**: Loan applications, credit score monitoring, and mortgage management tools
- **Insurance Integration**: Policy management and coverage tracking
- **Transfer & Payment System**: Secure money transfers with recipient management and transaction verification
- **Financial Analytics**: Comprehensive spending analysis, transaction categorization, and financial insights
- **Dark/Light Mode**: Theme switching with persistent user preferences
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Protected Routes**: Secure navigation with comprehensive error handling
- **Real-time Notifications**: Banking alerts, transaction confirmations, and system notifications
- **Interactive Data Visualization**: Charts and graphs for financial data using Recharts
- **Region-based Services**: Location-aware banking services with map integration

## Technologies Used

- **React**: Frontend library for building user interfaces with hooks and concurrent features
- **React Router**: Navigation and routing for single-page application architecture
- **Firebase**: Authentication service with Google login and real-time database integration
- **Redux Toolkit**: State management with modern Redux patterns and RTK Query
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **DaisyUI**: Component library built on Tailwind CSS for consistent UI elements
- **Framer Motion & GSAP**: Advanced animations and smooth transitions
- **Recharts**: Data visualization library for financial charts and analytics
- **React Query**: Server state management and efficient data fetching
- **React Hook Form**: Form handling and validation with minimal re-renders
- **React Firebase Hooks**: Simplified Firebase integration with React hooks
- **React Toastify**: Toast notification system for user feedback
- **Crypto-js**: Client-side encryption for secure data handling
- **React Leaflet**: Interactive maps for location-based banking services
- **React Icons**: Comprehensive icon library for UI elements

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Firebase account and project setup
- The DigiMoney Bank backend API running (see [Server Side Code](https://github.com/azizerorahman/digimoney-bank/tree/main/server-side))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/azizerorahman/digimoney-bank.git
   cd digimoney-bank/client-side
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

   # API Configuration
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_BASE_URL=http://localhost:5000

   # Encryption Keys
   REACT_APP_ENCRYPTION_KEY=your_encryption_key_for_passwords
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

| Variable | Description |
|----------|-------------|
| REACT_APP_FIREBASE_API_KEY | Firebase API key for authentication |
| REACT_APP_FIREBASE_AUTH_DOMAIN | Firebase authentication domain |
| REACT_APP_FIREBASE_PROJECT_ID | Firebase project ID |
| REACT_APP_FIREBASE_STORAGE_BUCKET | Firebase storage bucket |
| REACT_APP_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging sender ID |
| REACT_APP_FIREBASE_APP_ID | Firebase application ID |
| REACT_APP_API_URL | Backend API base URL |
| REACT_APP_BASE_URL | Application base URL |
| REACT_APP_ENCRYPTION_KEY | Encryption key for secure data handling |

## Usage

### Home Page

The main interface displays featured banking services, financial news, currency converter, security features, and quick access to account management.

### Authentication

- Sign up or sign in using email/password or Google authentication
- Secure access to protected routes and role-specific features
- JWT token-based session management with automatic renewal

### User Dashboard

Navigate to your personal dashboard to:

- View real-time account balances and transaction history
- Transfer money between accounts and to external recipients
- Create and manage personal budgets with spending analytics
- Track investment portfolios and financial performance
- Monitor credit scores and financial health reports
- Apply for loans and manage insurance policies

### Super Admin Dashboard

Super Admin users can:

- Manage all user accounts and assign roles
- Monitor system-wide financial analytics and reports
- Configure platform settings and security parameters
- Track audit logs and compliance monitoring
- Oversee all banking operations and transactions

### Account Manager Dashboard

Account Managers can:

- Manage client portfolios and relationships
- Track investment performance and revenue analytics
- Schedule meetings and manage communications
- Monitor client transactions and provide support

### Loan Officer Dashboard

Loan Officers can:

- Process loan applications and manage portfolios
- Conduct credit analysis and risk assessments
- Communicate with clients and document interactions
- Track loan performance and repayment schedules

### CSR Dashboard

Customer Service Representatives can:

- Access comprehensive customer profiles
- Handle service requests and support tickets
- Perform quick banking operations for customers
- Assist with transaction disputes and resolutions

### Transfer & Payment System

Secure money transfer functionality:

- Internal bank transfers between accounts
- External transfers to other financial institutions
- Recipient management with saved contacts
- Real-time transaction confirmations and receipts

## Project Structure

```text
digimoney-bank/client-side/
├── public/
│   ├── favicon.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── map.png
│   ├── components/
│   │   ├── AnimatedSection.js
│   │   ├── Footer.js
│   │   ├── Loading.js
│   │   ├── NavBar.js
│   │   ├── RegionSelector.js
│   │   └── Modal.js
│   ├── hooks/
│   │   ├── useLoanOfficerData.js
│   │   ├── useSuperAdminData.js
│   │   └── useUserInfo.js
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── EncryptPassword.js
│   │   │   ├── Login.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.js
│   │   │   ├── Profile.js
│   │   │   ├── AccountManager/
│   │   │   ├── CSR/
│   │   │   ├── LoanOfficer/
│   │   │   ├── SuperAdmin/
│   │   │   └── User/
│   │   └── Home/
│   │       ├── Contact.js
│   │       ├── CurrencyConverter.js
│   │       ├── Features.js
│   │       ├── Header.js
│   │       ├── Home.js
│   │       ├── HowItWorks.js
│   │       ├── MobileApp.js
│   │       ├── Security.js
│   │       └── TestimonialsAndTrust.js
│   ├── App.css
│   ├── App.js
│   ├── firebase.init.js
│   ├── index.css
│   ├── index.js
│   └── reportWebVitals.js
├── .gitignore
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

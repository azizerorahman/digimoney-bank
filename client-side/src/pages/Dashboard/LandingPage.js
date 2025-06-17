// import React, { useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { FaPlay } from "react-icons/fa";
// import { ImUpload, ImDownload } from "react-icons/im";
// import TransactionRow from "./TransactionRow";
// import TransactionPieChart from "./TransactionPieChart";
// import TransactionBarChart from "./TransactionBarChart";
// import BalanceCard from "./BalanceCard";
// import useUserInfo from "../../hooks/useUserInfo";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchTransaction } from "../../redux/reducers/TransactionReducer";
// import useAdmin from "../../hooks/useAdmin";
// import AdminDashboard from "./AdminDashboard";

// const LandingPage = () => {
//   const [user] = useAuthState(auth);
//   const { admin, loadingAdmin } = useAdmin(user);
//   const { userInfo } = useUserInfo(user);
//   console.log(userInfo);
//   // const { transaction } = useSelector((state) => state.transaction);
//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(
//   //     fetchTransaction({ accountNumber: userInfo?.accountNumber, page: 0 })
//   //   );
//   // }, [dispatch, userInfo]);
//   // let totalSendMoney = 0;
//   // transaction.map((money) => (totalSendMoney += parseFloat(money.send_money)));
//   // let totalReceiveMoney = 0;
//   // transaction.map(
//   //   (money) => (totalReceiveMoney += parseFloat(money.receive_money))
//   // );
//   // let transactionHistory = [];
//   // transaction.forEach((element) => {
//   //   const getSendMoney = element.send_money;
//   //   const getNumber = Number(getSendMoney);

//   //   const newArray = { ...element, send_money: getNumber };

//   //   transactionHistory.push(newArray);
//   // });

//   if (loadingAdmin) {
//     return;
//   }
//   if (admin) {
//     return <AdminDashboard />;
//   }

//   return (
//     <section className="mt-8">
//       <div className="grid lg:grid-cols-3 gap-12">
//         <BalanceCard />

//         {/* Income Card Chart start */}
//         <div className="card bg-white  shadow-2xl  text-gray-200">
//           <div className=" p-5">
//             <div className="flex items-center justify-between mb-8 gap-x-8">
//               <span>
//                 <ImDownload className="h-12 w-12 bg-[#6160DC] p-2 rounded-full" />
//               </span>
//               <div>
//                 <p className="text-gray-400">Reveive Money</p>
//                 <h1 className="text-xl font-bold text-black">
//                   {/* ${totalReceiveMoney ? totalReceiveMoney : 0} */}
//                 </h1>
//               </div>
//               <div>
//                 <p className="flex justify-end ">
//                   <span className="flex flex-col items-center">
//                     <span>
//                       <FaPlay className="text-[#00A389] rotate-[30deg]" />
//                     </span>
//                     <span className="text-[#00A389] font-bold">+0,5%</span>
//                   </span>
//                 </p>
//                 <span className="text-gray-500">last month</span>
//               </div>
//             </div>
//             <div className="h-[120px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 {/* <LineChart width={500} height={300} data={transactionHistory}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="receive_money"
//                     padding={{ left: 30, right: 30 }}
//                   />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="receive_money"
//                     stroke="#8884d8"
//                     activeDot={{ r: 8 }}
//                   />
//                   <Line type="monotone" dataKey="send_money" stroke="#82ca9d" />
//                 </LineChart> */}
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//         {/* Income Card Chart end */}

//         {/* Expense Card Start */}
//         <div className="card bg-white  shadow-2xl  text-gray-200">
//           <div className=" p-5">
//             <div className="flex items-center justify-between mb-8 gap-x-8">
//               <span>
//                 <ImUpload className="h-12 w-12 bg-[#54C5EB] p-2 rounded-full" />
//               </span>
//               <div>
//                 <p className="text-gray-400">Send Money</p>
//                 <h1 className="text-xl font-bold text-black">
//                   {/* ${totalSendMoney ? totalSendMoney : 0} */}
//                 </h1>
//               </div>
//               <div>
//                 <p className="flex justify-end ">
//                   <span className="flex flex-col items-center">
//                     <span>
//                       <FaPlay className="text-[#00A389] rotate-[-30deg]" />
//                     </span>
//                     <span className="text-[#00A389] font-bold">+0,5%</span>
//                   </span>
//                 </p>
//                 <span className="text-gray-500">last month</span>
//               </div>
//             </div>
//             <div className="h-[120px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 {/* <LineChart width={500} height={300} data={transactionHistory}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="receive_money"
//                     padding={{ left: 30, right: 30 }}
//                   />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="send_money"
//                     stroke="#8884d8"
//                     activeDot={{ r: 8 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="reveive_money"
//                     stroke="#82ca9d"
//                   />
//                 </LineChart> */}
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//         {/* Expense Card End */}
//       </div>

//       {/* <div className="grid  lg:grid-cols-2 gap-x-16 mt-12">
//         {/* Bar Chart Start Start */}
//         {/* <TransactionBarChart transaction={transactionHistory} /> */}
//         {/* Bar Chart end */}
//         {/* Pie Chart Start */}

//         {/* <TransactionPieChart transaction={transactionHistory} /> */}
//         {/* Pie chart end */}
//       {/* </div> */}
//       {/* Transaction table start  */}
//       <section className="mt-12 bg-white shadow-2xl rounded-2xl">
//         <h1 className="text-3xl font-bold my-8 ml-2">Lastest Transaction</h1>
//         <div className="overflow-x-auto">
//           <table className="table table-zebra  w-full">
//             <tbody>
//               {/* {transaction.slice(0, 6).map((rowdata, i) => (
//                 <TransactionRow key={i} userInfo={userInfo} rowdata={rowdata} />
//               ))} */}
//             </tbody>
//           </table>
//         </div>
//       </section>
//       {/* Transaction table end */}
//     </section>
//   );
// };

// export default LandingPage;

// import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
// import useAdmin from "../../hooks/useAdmin";
// import AdminDashboard from "./AdminDashboard";
// // import LandingPage from "./LandingPage";
// // import { useSelector } from "react-redux";
// import { useUserInfo } from "../../hooks/useUserInfo";
//
//
//
/*User landing and all pages*/
// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';


// const LandingPage = () => {
//   const currentUser = {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@email.com",
//     accounts: [
//       {
//         id: 1,
//         type: "Checking",
//         accountName: "Premium Checking",
//         accountNumber: "**** **** **** 4521",
//         balance: 12450.75,
//         cardType: "Debit",
//         isActive: true
//       },
//       {
//         id: 2,
//         type: "Savings",
//         accountName: "High Yield Savings",
//         accountNumber: "**** **** **** 7832",
//         balance: 25300.20,
//         cardType: "Savings",
//         isActive: true
//       },
//       {
//         id: 3,
//         type: "Credit",
//         accountName: "Platinum Credit Card",
//         accountNumber: "**** **** **** 9156",
//         balance: -1250.00,
//         creditLimit: 5000.00,
//         cardType: "Credit",
//         isActive: true
//       }
//     ],
//     recentTransactions: [
//       { id: 1, accountId: 1, type: "deposit", description: "Salary Deposit", amount: 3500.00, date: "2024-05-29", category: "Income", merchant: "ABC Company" },
//       { id: 2, accountId: 1, type: "withdrawal", description: "ATM Withdrawal", amount: -200.00, date: "2024-05-28", category: "Cash", merchant: "Bank ATM" },
//       { id: 3, accountId: 3, type: "payment", description: "Grocery Store", amount: -85.50, date: "2024-05-27", category: "Food", merchant: "SuperMart" },
//       { id: 4, accountId: 2, type: "transfer", description: "Transfer to Savings", amount: 500.00, date: "2024-05-27", category: "Transfer", merchant: "Internal Transfer" },
//       { id: 5, accountId: 1, type: "payment", description: "Electric Bill", amount: -120.00, date: "2024-05-26", category: "Utilities", merchant: "Power Company" },
//       { id: 6, accountId: 3, type: "payment", description: "Online Shopping", amount: -320.75, date: "2024-05-25", category: "Shopping", merchant: "Amazon" },
//       { id: 7, accountId: 1, type: "payment", description: "Gas Station", amount: -45.00, date: "2024-05-24", category: "Transportation", merchant: "Shell" },
//       { id: 8, accountId: 2, type: "deposit", description: "Interest Payment", amount: 25.30, date: "2024-05-23", category: "Income", merchant: "Bank Interest" },
//       { id: 9, accountId: 3, type: "payment", description: "Restaurant", amount: -67.25, date: "2024-05-22", category: "Food", merchant: "Olive Garden" },
//       { id: 10, accountId: 1, type: "payment", description: "Gym Membership", amount: -29.99, date: "2024-05-21", category: "Health", merchant: "FitLife Gym" },
//       { id: 11, accountId: 1, type: "deposit", description: "Freelance Work", amount: 750.00, date: "2024-05-20", category: "Income", merchant: "Client XYZ" },
//       { id: 12, accountId: 3, type: "payment", description: "Movie Theater", amount: -24.50, date: "2024-05-19", category: "Entertainment", merchant: "AMC Theaters" }
//     ],
//     // Add investment portfolio data
//     investmentPortfolio: {
//       totalValue: 127850.45,
//       totalGainLoss: 8934.67,
//       totalGainLossPercentage: 7.51,
//       riskLevel: "Moderate",
//       riskScore: 6.2,
//       dividendYield: 2.34,
//       sectorDiversification: 8,
//       maxConcentration: 18.5,
      
//       composition: [
//         { name: "Stocks", value: 76710.27, percentage: 60.0, color: "#8884d8" },
//         { name: "Bonds", value: 25570.09, percentage: 20.0, color: "#82ca9d" },
//         { name: "ETFs", value: 19177.57, percentage: 15.0, color: "#ffc658" },
//         { name: "Mutual Funds", value: 6392.52, percentage: 5.0, color: "#ff7300" }
//       ],
      
//       holdings: [
//         {
//           id: 1,
//           symbol: "AAPL",
//           name: "Apple Inc.",
//           assetType: "Stock",
//           sector: "Technology",
//           shares: 85,
//           purchasePrice: 145.30,
//           currentPrice: 178.25,
//           purchaseDate: "2023-03-15",
//           beta: 1.24,
//           volatility: 0.28
//         },
//         {
//           id: 2,
//           symbol: "MSFT",
//           name: "Microsoft Corporation",
//           assetType: "Stock",
//           sector: "Technology",
//           shares: 45,
//           purchasePrice: 285.76,
//           currentPrice: 338.11,
//           purchaseDate: "2023-01-22",
//           beta: 0.89,
//           volatility: 0.24
//         },
//         {
//           id: 3,
//           symbol: "SPY",
//           name: "SPDR S&P 500 ETF Trust",
//           assetType: "ETF",
//           sector: "Diversified",
//           shares: 42,
//           purchasePrice: 412.50,
//           currentPrice: 456.78,
//           purchaseDate: "2023-02-10",
//           beta: 1.00,
//           volatility: 0.16
//         },
//         {
//           id: 4,
//           symbol: "BND",
//           name: "Vanguard Total Bond Market ETF",
//           assetType: "ETF",
//           sector: "Fixed Income",
//           shares: 120,
//           purchasePrice: 78.45,
//           currentPrice: 75.23,
//           purchaseDate: "2023-04-05",
//           beta: -0.12,
//           volatility: 0.08
//         },
//         {
//           id: 5,
//           symbol: "GOOGL",
//           name: "Alphabet Inc. Class A",
//           assetType: "Stock",
//           sector: "Technology",
//           shares: 28,
//           purchasePrice: 102.30,
//           currentPrice: 139.67,
//           purchaseDate: "2023-05-18",
//           beta: 1.06,
//           volatility: 0.31
//         },
//         {
//           id: 6,
//           symbol: "JNJ",
//           name: "Johnson & Johnson",
//           assetType: "Stock",
//           sector: "Healthcare",
//           shares: 65,
//           purchasePrice: 162.85,
//           currentPrice: 158.42,
//           purchaseDate: "2023-01-08",
//           beta: 0.68,
//           volatility: 0.15
//         },
//         {
//           id: 7,
//           symbol: "VTIAX",
//           name: "Vanguard Total International Stock Index Fund",
//           assetType: "Mutual Fund",
//           sector: "International",
//           shares: 245,
//           purchasePrice: 25.67,
//           currentPrice: 26.11,
//           purchaseDate: "2023-03-28",
//           beta: 0.85,
//           volatility: 0.22
//         },
//         {
//           id: 8,
//           symbol: "PG",
//           name: "Procter & Gamble Co.",
//           assetType: "Stock",
//           sector: "Consumer Goods",
//           shares: 38,
//           purchasePrice: 148.92,
//           currentPrice: 156.73,
//           purchaseDate: "2023-02-14",
//           beta: 0.52,
//           volatility: 0.18
//         }
//       ],
      
//       performanceHistory: [
//         { month: "Jul", value: 118450 },
//         { month: "Aug", value: 121200 },
//         { month: "Sep", value: 119800 },
//         { month: "Oct", value: 123600 },
//         { month: "Nov", value: 125900 },
//         { month: "Dec", value: 127850 }
//       ]
//     },

// // LOANS SECTION
// loans: [
//   {
//     id: 1,
//     type: "Mortgage",
//     lender: "Wells Fargo Bank",
//     originalAmount: 450000,
//     currentBalance: 387420.15,
//     interestRate: 6.75,
//     monthlyPayment: 2918.32,
//     remainingMonths: 312,
//     startDate: "2022-03-15",
//     maturityDate: "2048-03-15",
//     loanTerm: 360,
//     paymentsMade: 48,
//     principalPaid: 62579.85,
//     interestPaid: 77499.36,
//     nextPaymentDate: "2025-07-01",
//     escrowBalance: 4250.80,
//     propertyTaxes: 8400,
//     homeInsurance: 2100,
//     pmi: 285.50,
//     loanToValue: 0.86,
//     // ADD payment history for mortgage
//     paymentHistory: [
//       { date: "2025-05-01", amount: 2918.32, principal: 1245.67, interest: 1672.65 },
//       { date: "2025-04-01", amount: 2918.32, principal: 1238.45, interest: 1679.87 },
//       { date: "2025-03-01", amount: 2918.32, principal: 1231.22, interest: 1687.10 }
//     ]
//   },
//   {
//     id: 2,
//     type: "Auto Loan",
//     lender: "Toyota Financial Services",
//     originalAmount: 35000,
//     currentBalance: 18742.33,
//     interestRate: 4.25,
//     monthlyPayment: 648.50,
//     remainingMonths: 31,
//     startDate: "2022-08-10",
//     maturityDate: "2027-08-10",
//     loanTerm: 60,
//     paymentsMade: 29,
//     principalPaid: 16257.67,
//     interestPaid: 2548.83,
//     nextPaymentDate: "2025-07-10",
//     vehicleValue: 22500,
//     loanToValue: 0.83,
//     gapInsurance: true,
//     // ADD payment history for auto loan
//     paymentHistory: [
//       { date: "2025-05-10", amount: 648.50, principal: 520.30, interest: 128.20 },
//       { date: "2025-04-10", amount: 648.50, principal: 518.45, interest: 130.05 },
//       { date: "2025-03-10", amount: 648.50, principal: 516.60, interest: 131.90 }
//     ]
//   },
//   {
//     id: 3,
//     type: "Student Loan",
//     lender: "Federal Direct Loan",
//     originalAmount: 65000,
//     currentBalance: 52340.78,
//     interestRate: 5.50,
//     monthlyPayment: 425.75,
//     remainingMonths: 156,
//     startDate: "2018-09-01",
//     maturityDate: "2031-09-01",
//     loanTerm: 156,
//     paymentsMade: 69,
//     principalPaid: 12659.22,
//     interestPaid: 16736.53,
//     nextPaymentDate: "2025-07-01",
//     repaymentPlan: "Standard",
//     subsidized: false,
//     incomeDriven: false,
//     // ADD payment history for student loan
//     paymentHistory: [
//       { date: "2025-05-01", amount: 425.75, principal: 186.50, interest: 239.25 },
//       { date: "2025-04-01", amount: 425.75, principal: 185.65, interest: 240.10 },
//       { date: "2025-03-01", amount: 425.75, principal: 184.80, interest: 240.95 }
//     ]
//   },
//   {
//     id: 4,
//     type: "Personal Loan",
//     lender: "Marcus by Goldman Sachs",
//     originalAmount: 15000,
//     currentBalance: 8945.67,
//     interestRate: 11.99,
//     monthlyPayment: 467.89,
//     remainingMonths: 21,
//     startDate: "2023-06-15",
//     maturityDate: "2026-06-15",
//     loanTerm: 36,
//     paymentsMade: 15,
//     principalPaid: 6054.33,
//     interestPaid: 963.02,
//     nextPaymentDate: "2025-07-15",
//     purpose: "Debt Consolidation",
//     unsecured: true,
//     // CORRECTED payment history for personal loan (not mortgage amounts!)
//     paymentHistory: [
//       { date: "2025-05-15", amount: 467.89, principal: 378.45, interest: 89.44 },
//       { date: "2025-04-15", amount: 467.89, principal: 375.20, interest: 92.69 },
//       { date: "2025-03-15", amount: 467.89, principal: 371.95, interest: 95.94 }
//     ]
//   }
// ],
// totalDebt: 467448.93,
// monthlyDebtPayments: 4460.46,
// debtToIncomeRatio: 0.28,
// averageInterestRate: 6.42,


//   // CREDIT SCORE SECTION
//   creditScore: {
//     score: 742,
//     range: "Good",
//     lastUpdated: "2025-05-15",
//     bureau: "Experian",
    
//     factors: {
//       paymentHistory: {
//         score: 85,
//         weight: 35,
//         impact: "Excellent",
//         details: {
//           onTimePayments: 98.2,
//           latePayments: 2,
//           missedPayments: 0,
//           accountsInGoodStanding: 14,
//           totalAccounts: 16
//         }
//       },
//       creditUtilization: {
//         score: 78,
//         weight: 30,
//         impact: "Good",
//         details: {
//           totalCreditLimit: 85000,
//           totalBalance: 12750,
//           utilizationRatio: 0.15,
//           cardsAtZeroBalance: 4,
//           highestUtilization: 0.35
//         }
//       },
//       creditHistory: {
//         score: 88,
//         weight: 15,
//         impact: "Excellent",
//         details: {
//           averageAccountAge: 8.5,
//           oldestAccount: 15.2,
//           newestAccount: 0.8,
//           closedAccounts: 3
//         }
//       },
//       creditMix: {
//         score: 75,
//         weight: 10,
//         impact: "Good",
//         details: {
//           creditCards: 6,
//           installmentLoans: 4,
//           mortgages: 1,
//           retailAccounts: 2,
//           totalAccountTypes: 4
//         }
//       },
//       newCredit: {
//         score: 82,
//         weight: 10,
//         impact: "Very Good",
//         details: {
//           hardInquiries: 2,
//           newAccountsLast12Months: 1,
//           newAccountsLast24Months: 2,
//           lastInquiry: "2024-11-15"
//         }
//       }
//     },
    
//     recommendations: [
//       "Keep credit utilization below 10% for optimal scoring",
//       "Continue making all payments on time",
//       "Avoid opening new credit accounts in the next 6 months",
//       "Consider paying down the highest utilization cards first"
//     ],
    
//     monthlyTrend: [
//       { month: "Jan", score: 738 },
//       { month: "Feb", score: 740 },
//       { month: "Mar", score: 741 },
//       { month: "Apr", score: 739 },
//       { month: "May", score: 742 },
//       { month: "Jun", score: 742 }
//     ],
  
//     // ADD THE NEW DATA HERE ⬇️
//     // NEW: Credit Score Trend Data
//     scoreHistory: [
//       { month: 'Jan 2024', score: 742 },
//       { month: 'Feb 2024', score: 745 },
//       { month: 'Mar 2024', score: 748 },
//       { month: 'Apr 2024', score: 751 },
//       { month: 'May 2024', score: 755 },
//       { month: 'Jun 2024', score: 758 }
//     ],
    
//     // NEW: Credit Utilization Details
//     utilizationRate: 23.4,
//     totalCreditUsed: 5850,
//     totalCreditLimit: 25000,
    
//     // NEW: Visual Alerts
//     alerts: [
//       {
//         type: 'success',
//         title: 'Credit Score Improved',
//         message: 'Your credit score increased by 13 points this month!',
//         date: '2024-06-01'
//       },
//       {
//         type: 'warning', 
//         title: 'High Credit Utilization',
//         message: 'Consider paying down balances to improve your score.',
//         date: '2024-05-28'
//       },
//       {
//         type: 'info',
//         title: 'New Credit Inquiry',
//         message: 'A soft inquiry was made by your bank for a pre-approval offer.',
//         date: '2024-05-25'
//       }
//     ]
//   },

//   // INSURANCE SECTION
//   insurance: {
//     totalPremiums: 8945.60,
    
//     policies: [
//       {
//         id: 1,
//         type: "Auto Insurance",
//         provider: "State Farm",
//         policyNumber: "SF-789456123",
//         premium: 1680.00,
//         deductible: 1000,
//         coverage: {
//           liability: 300000,
//           collision: 50000,
//           comprehensive: 50000,
//           uninsuredMotorist: 100000,
//           medicalPayments: 10000
//         },
//         vehicles: [
//           {
//             year: 2021,
//             make: "Toyota",
//             model: "Camry",
//             vin: "4T1C11AK5MU123456",
//             value: 22500,
//             usage: "Commuting"
//           }
//         ],
//         discounts: ["Multi-Policy", "Safe Driver", "Good Student"],
//         discountAmount: 420.00,
//         riskFactors: {
//           drivingRecord: "Clean",
//           creditScore: "Good",
//           location: "Suburban",
//           annualMileage: 12000
//         }
//       },
//       {
//         id: 2,
//         type: "Homeowners Insurance",
//         provider: "Allstate",
//         policyNumber: "AL-456789012",
//         premium: 2850.00,
//         deductible: 2500,
//         coverage: {
//           dwelling: 650000,
//           personalProperty: 325000,
//           liability: 500000,
//           medicalPayments: 5000,
//           lossOfUse: 130000
//         },
//         property: {
//           address: "123 Oak Street, Suburb, ST 12345",
//           yearBuilt: 1995,
//           squareFootage: 2800,
//           constructionType: "Frame",
//           roofType: "Asphalt Shingle",
//           foundationType: "Slab"
//         },
//         discounts: ["Multi-Policy", "Security System", "Claims-Free"],
//         discountAmount: 570.00,
//         riskFactors: {
//           floodZone: "X",
//           hurricaneZone: "No",
//           earthquakeRisk: "Low",
//           crimeRate: "Low"
//         }
//       },
//       {
//         id: 3,
//         type: "Life Insurance",
//         provider: "Northwestern Mutual",
//         policyNumber: "NM-987654321",
//         premium: 2880.00,
//         policyType: "Term Life",
//         termLength: 20,
//         faceValue: 750000,
//         cashValue: 0,
//         beneficiaries: [
//           { name: "Jane Doe", relationship: "Spouse", percentage: 60 },
//           { name: "John Doe Jr.", relationship: "Child", percentage: 40 }
//         ],
//         riskFactors: {
//           age: 35,
//           gender: "Male",
//           smoker: false,
//           healthClass: "Preferred Plus",
//           occupation: "Software Engineer",
//           hobbies: ["Running", "Reading"]
//         }
//       },
//       {
//         id: 4,
//         type: "Health Insurance",
//         provider: "Blue Cross Blue Shield",
//         policyNumber: "BC-147258369",
//         premium: 1535.60,
//         planType: "PPO",
//         deductible: 3000,
//         outOfPocketMax: 8000,
//         coverage: {
//           inNetwork: 90,
//           outOfNetwork: 70,
//           prescription: 80,
//           preventive: 100
//         },
//         family: {
//           employees: 1,
//           spouses: 1,
//           dependents: 2
//         },
//         employerContribution: 75
//       }
//     ],
    
//     claimsHistory: [
//       {
//         date: "2024-03-15",
//         type: "Auto",
//         amount: 3200,
//         status: "Settled",
//         description: "Rear-end collision"
//       },
//       {
//         date: "2023-08-22",
//         type: "Health",
//         amount: 850,
//         status: "Paid",
//         description: "Emergency room visit"
//       }
//     ]
//   },

//   // ENHANCED BANKING SECTION (replace your existing banking data)
//   banking: {
//     totalBalance: 47850.75,
    
//     accounts: [
//       {
//         id: 1,
//         type: "Checking",
//         bank: "Chase Bank",
//         accountNumber: "****1234",
//         balance: 8450.25,
//         interestRate: 0.01,
//         minimumBalance: 1500,
//         monthlyFee: 12.00,
//         feeWaived: true,
//         overdraftProtection: true,
//         overdraftLimit: 1000,
//         averageDailyBalance: 7850.30,
//         transactionsThisMonth: 47
//       },
//       {
//         id: 2,
//         type: "Savings",
//         bank: "Chase Bank",
//         accountNumber: "****5678",
//         balance: 25400.50,
//         interestRate: 4.25,
//         minimumBalance: 300,
//         monthlyFee: 0,
//         compoundingFrequency: "Daily",
//         annualPercentageYield: 4.33,
//         interestEarnedYTD: 856.75,
//         withdrawalsThisMonth: 2,
//         withdrawalLimit: 6
//       },
//       {
//         id: 3,
//         type: "Money Market",
//         bank: "Marcus by Goldman Sachs",
//         accountNumber: "****9012",
//         balance: 14000.00,
//         interestRate: 4.75,
//         minimumBalance: 500,
//         monthlyFee: 0,
//         compoundingFrequency: "Daily",
//         annualPercentageYield: 4.87,
//         interestEarnedYTD: 1125.40,
//         checkWritingPrivileges: true,
//         checksWrittenThisMonth: 1
//       }
//     ],
    
//     recentTransactions: [
//       {
//         id: 1,
//         date: "2025-06-01",
//         description: "Direct Deposit - Salary",
//         amount: 4250.00,
//         type: "Credit",
//         account: "Checking",
//         category: "Income",
//         balance: 8450.25
//       },
//       {
//         id: 2,
//         date: "2025-05-31",
//         description: "Mortgage Payment",
//         amount: -2918.32,
//         type: "Debit",
//         account: "Checking",
//         category: "Housing",
//         balance: 4200.25
//       },
//       {
//         id: 3,
//         date: "2025-05-30",
//         description: "Grocery Store",
//         amount: -156.78,
//         type: "Debit",
//         account: "Checking",
//         category: "Food",
//         balance: 7118.57
//       },
//       {
//         id: 4,
//         date: "2025-05-29",
//         description: "Gas Station",
//         amount: -68.45,
//         type: "Debit",
//         account: "Checking",
//         category: "Transportation",
//         balance: 7275.35
//       },
//       {
//         id: 5,
//         date: "2025-05-28",
//         description: "Interest Payment",
//         amount: 14.25,
//         type: "Credit",
//         account: "Savings",
//         category: "Interest",
//         balance: 25400.50
//       }
//     ],
    
//     monthlyAnalysis: {
//       totalIncome: 4250.00,
//       totalExpenses: 3847.65,
//       netCashFlow: 402.35,
//       expenseCategories: {
//         housing: 2918.32,
//         transportation: 425.80,
//         food: 312.45,
//         utilities: 191.08
//       }
//     }
//   },

//   // ENHANCED BUDGET SECTION (replace your existing budget data)
//   budget: {
//     monthlyIncome: 15950.00,
//     monthlyExpenses: 13247.85,
//     netIncome: 2702.15,
//     savingsRate: 0.169,
    
//     incomeStreams: [
//       {
//         source: "Primary Job - Software Engineer",
//         amount: 12500.00,
//         type: "Salary",
//         frequency: "Monthly",
//         taxable: true,
//         benefits: {
//           health: 450.00,
//           dental: 35.00,
//           vision: 15.00,
//           retirement401k: 1250.00
//         }
//       },
//       {
//         source: "Freelance Consulting",
//         amount: 2800.00,
//         type: "1099",
//         frequency: "Variable",
//         taxable: true,
//         estimatedTaxes: 420.00
//       },
//       {
//         source: "Investment Dividends",
//         amount: 450.00,
//         type: "Investment Income",
//         frequency: "Quarterly Average",
//         taxable: true,
//         qualified: true
//       },
//       {
//         source: "Rental Property",
//         amount: 200.00,
//         type: "Passive Income",
//         frequency: "Monthly",
//         taxable: true,
//         expenses: 1800.00
//       }
//     ],
    
//     categories: [
//       {
//         id: 1,
//         name: "Housing",
//         budgeted: 3500.00,
//         spent: 3418.32,
//         remaining: 81.68,
//         percentage: 25.8,
//         subcategories: {
//           mortgage: 2918.32,
//           propertyTax: 200.00,
//           homeInsurance: 175.00,
//           utilities: 125.00
//         },
//         essential: true
//       },
//       {
//         id: 2,
//         name: "Transportation",
//         budgeted: 950.00,
//         spent: 1024.75,
//         remaining: -74.75,
//         percentage: 7.7,
//         subcategories: {
//           carPayment: 648.50,
//           gasoline: 180.25,
//           maintenance: 125.00,
//           insurance: 71.00
//         },
//         essential: true
//       },
//       {
//         id: 3,
//         name: "Food & Dining",
//         budgeted: 800.00,
//         spent: 756.45,
//         remaining: 43.55,
//         percentage: 5.7,
//         subcategories: {
//           groceries: 520.30,
//           restaurants: 236.15
//         },
//         essential: true
//       },
//       {
//         id: 4,
//         name: "Insurance",
//         budgeted: 745.00,
//         spent: 745.47,
//         remaining: -0.47,
//         percentage: 5.6,
//         subcategories: {
//           health: 127.97,
//           life: 240.00,
//           disability: 85.50,
//           umbrella: 45.00,
//           auto: 140.00,
//           home: 107.00
//         },
//         essential: true
//       },
//       {
//         id: 5,
//         name: "Debt Payments",
//         budgeted: 1325.00,
//         spent: 1325.89,
//         remaining: -0.89,
//         percentage: 10.0,
//         subcategories: {
//           studentLoan: 425.75,
//           personalLoan: 467.89,
//           creditCards: 431.25
//         },
//         essential: true
//       },
//       {
//         id: 6,
//         name: "Savings & Investments",
//         budgeted: 2700.00,
//         spent: 2700.00,
//         remaining: 0.00,
//         percentage: 16.9,
//         subcategories: {
//           emergencyFund: 500.00,
//           retirement401k: 1250.00,
//           rothIRA: 500.00,
//           brokerage: 450.00
//         },
//         essential: false
//       },
//       {
//         id: 7,
//         name: "Entertainment",
//         budgeted: 400.00,
//         spent: 342.78,
//         remaining: 57.22,
//         percentage: 2.6,
//         subcategories: {
//           streaming: 45.97,
//           movies: 85.50,
//           hobbies: 125.31,
//           miscellaneous: 86.00
//         },
//         essential: false
//       },
//       {
//         id: 8,
//         name: "Personal Care",
//         budgeted: 250.00,
//         spent: 198.45,
//         remaining: 51.55,
//         percentage: 1.5,
//         subcategories: {
//           healthcare: 125.00,
//           grooming: 73.45
//         },
//         essential: false
//       },
//       {
//         id: 9,
//         name: "Shopping",
//         budgeted: 500.00,
//         spent: 456.89,
//         remaining: 43.11,
//         percentage: 3.4,
//         subcategories: {
//           clothing: 245.50,
//           electronics: 125.39,
//           household: 86.00
//         },
//         essential: false
//       },
//       {
//         id: 10,
//         name: "Miscellaneous",
//         budgeted: 300.00,
//         spent: 278.85,
//         remaining: 21.15,
//         percentage: 2.1,
//         subcategories: {
//           gifts: 125.00,
//           donations: 100.00,
//           other: 53.85
//         },
//         essential: false
//       }
//     ],
    
//     budgetAnalysis: {
//       totalBudgeted: 11470.00,
//       totalSpent: 11247.85,
//       variance: 222.15,
//       overBudgetCategories: 2,
//       underBudgetCategories: 8,
//       essentialExpenses: 8269.88,
//       discretionaryExpenses: 2977.97,
//       fixedExpenses: 6842.18,
//       variableExpenses: 4405.67
//     },
    
//     monthlyTrend: [
//       { month: "Jan", income: 15200, expenses: 12850, savings: 2350 },
//       { month: "Feb", income: 15450, expenses: 13100, savings: 2350 },
//       { month: "Mar", income: 15800, expenses: 13250, savings: 2550 },
//       { month: "Apr", income: 15950, expenses: 13150, savings: 2800 },
//       { month: "May", income: 15950, expenses: 13400, savings: 2550 },
//       { month: "Jun", income: 15950, expenses: 13248, savings: 2702 }
//     ]
//   },

//     // Extended transaction data for charts
//     transactionHistory: [
//       { date: "2024-05-15", income: 3500, spending: 450 },
//       { date: "2024-05-16", income: 0, spending: 120 },
//       { date: "2024-05-17", income: 750, spending: 200 },
//       { date: "2024-05-18", income: 0, spending: 85 },
//       { date: "2024-05-19", income: 25, spending: 320 },
//       { date: "2024-05-20", income: 0, spending: 180 },
//       { date: "2024-05-21", income: 0, spending: 95 },
//       { date: "2024-05-22", income: 500, spending: 67 },
//       { date: "2024-05-23", income: 0, spending: 45 },
//       { date: "2024-05-24", income: 0, spending: 30 },
//       { date: "2024-05-25", income: 0, spending: 150 },
//       { date: "2024-05-26", income: 0, spending: 200 },
//       { date: "2024-05-27", income: 0, spending: 85 },
//       { date: "2024-05-28", income: 0, spending: 200 },
//       { date: "2024-05-29", income: 3500, spending: 0 }
//     ],
//     // Monthly spending data for trends
//     monthlySpending: [
//       { month: "Jan 2024", spending: 2850, budget: 3000 },
//       { month: "Feb 2024", spending: 3200, budget: 3000 },
//       { month: "Mar 2024", spending: 2750, budget: 3000 },
//       { month: "Apr 2024", spending: 3100, budget: 3000 },
//       { month: "May 2024", spending: 2900, budget: 3000 },
//       { month: "Jun 2024", spending: 1950, budget: 3000 }
//     ],
//     // ADD THIS TO YOUR currentUser OBJECT
// comparison: {
//   spendingComparison: {
//     currentPeriod: [
//       { category: 'Housing', current: 3418, previous: 3200, avgUsers: 2800 },
//       { category: 'Transport', current: 1025, previous: 850, avgUsers: 900 },
//       { category: 'Food', current: 756, previous: 680, avgUsers: 750 },
//       { category: 'Shopping', current: 457, previous: 320, avgUsers: 400 },
//       { category: 'Entertainment', current: 343, previous: 280, avgUsers: 350 }
//     ],
    
//     benchmarks: [
//       { 
//         metric: 'Monthly Spending', 
//         yourValue: 11248, 
//         benchmark: 9500, 
//         percentile: 75,
//         icon: '💰',
//         status: 'above'
//       },
//       { 
//         metric: 'Savings Rate', 
//         yourValue: 16.9, 
//         benchmark: 12.0, 
//         percentile: 85,
//         icon: '💰',
//         status: 'above',
//         suffix: '%'
//       },
//       { 
//         metric: 'Debt-to-Income', 
//         yourValue: 28, 
//         benchmark: 35, 
//         percentile: 25,
//         icon: '📊',
//         status: 'below',
//         suffix: '%'
//       },
//       { 
//         metric: 'Emergency Fund', 
//         yourValue: 6.2, 
//         benchmark: 3.0, 
//         percentile: 90,
//         icon: '🛡️',
//         status: 'above',
//         suffix: ' months'
//       }
//     ]
//   },

//   recommendations: {
//     savingOpportunities: [
//       {
//         title: 'Reduce Transportation Spending',
//         description: 'You spent $74.75 over budget this month',
//         potential: 900,
//         difficulty: 'Easy',
//         icon: '🚗',
//         action: 'Consider carpooling or public transport'
//       },
//       {
//         title: 'Optimize Subscription Services',
//         description: 'Review recurring subscriptions',
//         potential: 180,
//         difficulty: 'Easy',
//         icon: '📱',
//         action: 'Cancel unused streaming services'
//       },
//       {
//         title: 'Energy Efficiency Improvements',
//         description: 'Your utility bills are 15% above average',
//         potential: 450,
//         difficulty: 'Medium',
//         icon: '⚡',
//         action: 'Switch to LED bulbs, adjust thermostat'
//       }
//     ],

//     investmentOpportunities: [
//       {
//         title: 'Increase 401(k) Contribution',
//         description: 'You\'re contributing 10%, consider 15%',
//         potential: 2400,
//         risk: 'Low',
//         icon: '🏦',
//         action: 'Increase by 2% to get full employer match'
//       },
//       {
//         title: 'Open High-Yield Savings',
//         description: 'Your savings earn only 0.01% interest',
//         potential: 1200,
//         risk: 'None',
//         icon: '💎',
//         action: 'Move to 4.5% APY account'
//       },
//       {
//         title: 'Diversify Portfolio',
//         description: 'Consider international exposure',
//         potential: 3600,
//         risk: 'Medium',
//         icon: '🌍',
//         action: 'Add 20% international index funds'
//       }
//     ],

//     financialHealthTips: [
//       {
//         title: 'Build Emergency Fund',
//         description: 'You have 6.2 months - excellent!',
//         status: 'excellent',
//         icon: '🛡️',
//         action: 'Maintain current level'
//       },
//       {
//         title: 'Pay Down High-Interest Debt',
//         description: 'Personal loan at 11.99% APR',
//         status: 'priority',
//         icon: '💳',
//         action: 'Pay extra $200/month to save $800 interest'
//       },
//       {
//         title: 'Review Insurance Coverage',
//         description: 'Last reviewed 2 years ago',
//         status: 'review',
//         icon: '📋',
//         action: 'Shop for better rates annually'
//       },
//       {
//         title: 'Estate Planning',
//         description: 'Consider updating beneficiaries',
//         status: 'consider',
//         icon: '📜',
//         action: 'Review will and beneficiary designations'
//       }
//     ],

//     potentialImpact: {
//       totalSavings: 1530,
//       investmentGrowth: 7200,
//       totalGain: 8730
//     }
//   }
// }
// };


//   const [selectedAccount, setSelectedAccount] = useState(currentUser.accounts[0]);
  
  
//   // Transaction History States
//   const [timeRange, setTimeRange] = useState('7days');
//   const [chartType, setChartType] = useState('timeline');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterAccountType, setFilterAccountType] = useState('all');
//   const [filterDateFrom, setFilterDateFrom] = useState('');
//   const [filterDateTo, setFilterDateTo] = useState('');
//   const [filterAmountMin, setFilterAmountMin] = useState('');
//   const [filterAmountMax, setFilterAmountMax] = useState('');

//   // Spending analysis states
//   const [spendingAnalysisView, setSpendingAnalysisView] = useState('trends');

//   // Budget Management States
//   const [budgets, setBudgets] = useState([
//     { id: 1, category: "Food", budgeted: 600, actual: 520, color: "#ff6b6b", isActive: true, description: "Monthly food and dining expenses" },
//     { id: 2, category: "Transportation", budgeted: 300, actual: 280, color: "#4ecdc4", isActive: true, description: "Gas, public transport, and car maintenance" },
//     { id: 3, category: "Utilities", budgeted: 250, actual: 320, color: "#45b7d1", isActive: true, description: "Electricity, water, internet bills" },
//     { id: 4, category: "Shopping", budgeted: 400, actual: 650, color: "#96ceb4", isActive: true, description: "Clothing, electronics, and general shopping" },
//     { id: 5, category: "Entertainment", budgeted: 200, actual: 150, color: "#feca57", isActive: true, description: "Movies, games, and leisure activities" },
//     { id: 6, category: "Health", budgeted: 150, actual: 120, color: "#ff9ff3", isActive: true, description: "Medical expenses and gym membership" },
//     { id: 7, category: "Cash", budgeted: 100, actual: 200, color: "#54a0ff", isActive: true, description: "ATM withdrawals and cash expenses" }
//   ]);

//   // Budget Management Modal States
//   const [showBudgetModal, setShowBudgetModal] = useState(false);
//   const [editingBudget, setEditingBudget] = useState(null);
//   const [budgetForm, setBudgetForm] = useState({
//     category: '',
//     budgeted: '',
//     color: '#4ecdc4',
//     description: '',
//     customCategory: ''
//   });

//   // Monthly Budget States
//   const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(3000);
//   const [showMonthlyBudgetModal, setShowMonthlyBudgetModal] = useState(false);
//   const [tempMonthlyBudget, setTempMonthlyBudget] = useState(monthlyBudgetLimit);

//   // Available categories for budgeting (now includes "Others")
//   const availableCategories = [
//     'Food', 'Transportation', 'Utilities', 'Shopping', 'Entertainment', 
//     'Health', 'Cash', 'Education', 'Insurance', 'Subscriptions', 'Travel', 
//     'Gifts', 'Personal Care', 'Home Maintenance', 'Others'
//   ];
  
//   // Predefined colors for new budgets
//   const availableColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3', '#feca57'];

//   // Theme configurations for each card type
// const themes = {
//   Checking: {
//     primary: '#6366f1',        // Indigo-600
//     primaryLight: '#a5b4fc',   // Indigo-300
//     secondary: '#4f46e5',      // Indigo-700
//     accent: '#8b5cf6',         // Violet-500
//     gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',           
//     lightGradient: 'linear-gradient(135deg, #a5b4fc 0%, #8b5cf6 100%)',     
//     shadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
//     name: 'Checking'
//   },
//   Savings: {
//     primary: '#10b981',        // Emerald-500
//     primaryLight: '#6ee7b7',   // Emerald-300
//     secondary: '#059669',      // Emerald-600
//     accent: '#34d399',         // Emerald-400
//     gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',         
//     lightGradient: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',     
//     shadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
//     name: 'Savings'
//   },
//   Credit: {
//     primary: '#8b5cf6',        // Violet-500
//     primaryLight: '#c4b5fd',   // Violet-300
//     secondary: '#7c3aed',      // Violet-600
//     accent: '#a78bfa',         // Violet-400
//     gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',       
//     lightGradient: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',    
//     shadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
//     name: 'Credit'
//   }
// };


//   // Chart color constants
//   const chartColors = {
//     income: '#22c55e',
//     spending: '#ef4444'
//   };

//   const currentTheme = themes[selectedAccount.type];

//   // Budget Management Functions
//   const handleAddBudget = () => {
//     setEditingBudget(null);
//     setBudgetForm({
//       category: '',
//       budgeted: '',
//       color: availableColors[Math.floor(Math.random() * availableColors.length)],
//       description: '',
//       customCategory: ''
//     });
//     setShowBudgetModal(true);
//   };
  

//   const handleEditBudget = (budget) => {
//     setEditingBudget(budget);
//     setBudgetForm({
//       category: budget.category,
//       budgeted: budget.budgeted.toString(),
//       color: budget.color,
//       description: budget.description || '',
//       customCategory: budget.category === 'Others' ? budget.customCategory || '' : ''
//     });
//     setShowBudgetModal(true);
//   };

//   const handleSaveBudget = () => {
//     let finalCategory = budgetForm.category;
    
//     // Handle "Others" category with custom name
//     if (budgetForm.category === 'Others') {
//       if (!budgetForm.customCategory.trim()) {
//         alert('Please enter a custom category name for "Others"');
//         return;
//       }
//       finalCategory = budgetForm.customCategory.trim();
//     }

//     if (!budgetForm.category || !budgetForm.budgeted) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const budgetAmount = parseFloat(budgetForm.budgeted);
//     if (isNaN(budgetAmount) || budgetAmount <= 0) {
//       alert('Please enter a valid budget amount');
//       return;
//     }

//     // Check if category already exists (when adding new)
//     if (!editingBudget && budgets.some(b => b.category === finalCategory)) {
//       alert('Budget for this category already exists');
//       return;
//     }

//     if (editingBudget) {
//       // Update existing budget
//       setBudgets(budgets.map(budget => 
//         budget.id === editingBudget.id 
//           ? { 
//               ...budget, 
//               category: finalCategory, 
//               budgeted: budgetAmount, 
//               color: budgetForm.color,
//               description: budgetForm.description,
//               customCategory: budgetForm.category === 'Others' ? budgetForm.customCategory : undefined
//             }
//           : budget
//       ));
//     } else {
//       // Add new budget
//       const newBudget = {
//         id: Date.now(),
//         category: finalCategory,
//         budgeted: budgetAmount,
//         actual: calculateActualSpending(finalCategory),
//         color: budgetForm.color,
//         isActive: true,
//         description: budgetForm.description,
//         customCategory: budgetForm.category === 'Others' ? budgetForm.customCategory : undefined
//       };
//       setBudgets([...budgets, newBudget]);
//     }

//     setShowBudgetModal(false);
//     setBudgetForm({ category: '', budgeted: '', color: '#4ecdc4', description: '', customCategory: '' });
//     setEditingBudget(null);
//   };

//   const handleDeleteBudget = (budgetId) => {
//     if (window.confirm('Are you sure you want to delete this budget?')) {
//       setBudgets(budgets.filter(budget => budget.id !== budgetId));
//     }
//   };

//   const handleToggleBudget = (budgetId) => {
//     setBudgets(budgets.map(budget => 
//       budget.id === budgetId 
//         ? { ...budget, isActive: !budget.isActive }
//         : budget
//     ));
//   };

//   const calculateActualSpending = (category) => {
//     return currentUser.recentTransactions
//       .filter(t => t.category === category && t.amount < 0)
//       .reduce((sum, t) => sum + Math.abs(t.amount), 0);
//   };

//   const handleSaveMonthlyBudget = () => {
//     if (tempMonthlyBudget <= 0) {
//       alert('Please enter a valid monthly budget amount');
//       return;
//     }
//     setMonthlyBudgetLimit(tempMonthlyBudget);
//     setShowMonthlyBudgetModal(false);
//   };

//   const getTotalBudgeted = () => {
//     return budgets.filter(b => b.isActive).reduce((sum, budget) => sum + budget.budgeted, 0);
//   };

//   const getTotalActualSpending = () => {
//     return budgets.filter(b => b.isActive).reduce((sum, budget) => sum + budget.actual, 0);
//   };

//   // Update actual spending for budgets based on current transactions
//   const updateBudgetActuals = () => {
//     setBudgets(budgets.map(budget => ({
//       ...budget,
//       actual: calculateActualSpending(budget.category)
//     })));
//   };

//   // Call this when component mounts or transactions change
//   React.useEffect(() => {
//     updateBudgetActuals();
//   }, [currentUser.recentTransactions]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(Math.abs(amount));
//   };

//   const getTransactionIcon = (type) => {
//     switch (type) {
//       case 'deposit':
//         return '↗️';
//       case 'withdrawal':
//         return '↙️';
//       case 'payment':
//         return '💳';
//       case 'transfer':
//         return '🔄';
//       default:
//         return '💰';
//     }
//   };

//     // Get account type color
//     const getAccountColor = (type) => {
//       switch (type) {
//         case "Checking":
//           return "from-indigo-500 to-indigo-700";    // Blue to darker blue
//         case "Savings":
//           return "from-emerald-500 to-emerald-600";  // Green to darker green
//         case "Credit":
//           return "from-violet-500 to-violet-600";    // Purple to darker purple
//         default:
//           return "from-gray-500 to-gray-600";
//       }
//     };

//       // Get account type icon
//   const getAccountIcon = (type) => {
//     switch (type) {
//       case "Checking":
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//           </svg>
//         );
//       case "Savings":
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//           </svg>
//         );
//       case "Credit":
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case 'Food':
//         return '🍽️';
//       case 'Transportation':
//         return '🚗';
//       case 'Utilities':
//         return '⚡';
//       case 'Shopping':
//         return '🛍️';
//       case 'Entertainment':
//         return '🎬';
//       case 'Health':
//         return '💪';
//       case 'Income':
//         return '💰';
//       case 'Transfer':
//         return '🔄';
//       case 'Cash':
//         return '💵';
//       case 'Education':
//         return '📚';
//       case 'Insurance':
//         return '🛡️';
//       case 'Subscriptions':
//         return '📱';
//       case 'Travel':
//         return '✈️';
//       case 'Gifts':
//         return '🎁';
//       case 'Personal Care':
//         return '💄';
//       case 'Home Maintenance':
//         return '🔧';
//       case 'Others':
//         return '📋';
//       default:
//         return '📊';
//     }
//   };

//   const getCardGradient = (type) => {
//     return themes[type].gradient;
//   };

//   const getTotalBalance = () => {
//     return currentUser.accounts
//       .filter(account => account.type !== 'Credit')
//       .reduce((sum, account) => sum + account.balance, 0);
//   };

//   const getAccountTransactions = (accountId) => {
//     return currentUser.recentTransactions
//       .filter(transaction => transaction.accountId === accountId)
//       .slice(0, 4);
//   };

//   const getCreditUtilization = (account) => {
//     if (account.type !== 'Credit') return 0;
//     return (Math.abs(account.balance) / account.creditLimit) * 100;
//   };

//   const getAccountTypeById = (accountId) => {
//     const account = currentUser.accounts.find(acc => acc.id === accountId);
//     return account ? account.type : null;
//   };

//   const getAccountNameById = (accountId) => {
//     const account = currentUser.accounts.find(acc => acc.id === accountId);
//     return account ? account.accountName : 'Unknown Account';
//   };

//   const getFilteredTransactions = () => {
//     let filtered = currentUser.recentTransactions;

//     if (searchTerm) {
//       filtered = filtered.filter(t => 
//         t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         t.merchant.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterCategory !== 'all') {
//       filtered = filtered.filter(t => t.category === filterCategory);
//     }

//     if (filterAccountType !== 'all') {
//       if (filterAccountType === 'allTransactions') {
//         // Show all transactions from all accounts
//       } else {
//         const accountsOfType = currentUser.accounts
//           .filter(acc => acc.type === filterAccountType)
//           .map(acc => acc.id);
//         filtered = filtered.filter(t => accountsOfType.includes(t.accountId));
//       }
//     }

//     if (filterDateFrom) {
//       filtered = filtered.filter(t => new Date(t.date) >= new Date(filterDateFrom));
//     }
//     if (filterDateTo) {
//       filtered = filtered.filter(t => new Date(t.date) <= new Date(filterDateTo));
//     }

//     if (filterAmountMin) {
//       filtered = filtered.filter(t => Math.abs(t.amount) >= parseFloat(filterAmountMin));
//     }
//     if (filterAmountMax) {
//       filtered = filtered.filter(t => Math.abs(t.amount) <= parseFloat(filterAmountMax));
//     }

//     return filtered;
//   };

//   const getCategoryBreakdown = () => {
//     let transactions = currentUser.recentTransactions;
    
//     if (filterAccountType !== 'all' && filterAccountType !== 'allTransactions') {
//       const accountsOfType = currentUser.accounts
//         .filter(acc => acc.type === filterAccountType)
//         .map(acc => acc.id);
//       transactions = transactions.filter(t => accountsOfType.includes(t.accountId));
//     }

//     const categories = {};
//     transactions
//       .filter(t => t.amount < 0)
//       .forEach(transaction => {
//         const category = transaction.category;
//         if (!categories[category]) {
//           categories[category] = 0;
//         }
//         categories[category] += Math.abs(transaction.amount);
//       });
    
//     return Object.entries(categories)
//       .map(([category, amount]) => ({ category, amount }))
//       .sort((a, b) => b.amount - a.amount);
//   };

//   const getTimelineData = () => {
//     const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
//     return currentUser.transactionHistory.slice(-days);
//   };

//   const getMaxValue = (data) => {
//     const maxIncome = Math.max(...data.map(d => d.income));
//     const maxSpending = Math.max(...data.map(d => d.spending));
//     return Math.max(maxIncome, maxSpending);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilterCategory('all');
//     setFilterAccountType('all');
//     setFilterDateFrom('');
//     setFilterDateTo('');
//     setFilterAmountMin('');
//     setFilterAmountMax('');
//   };

//   // Updated functions for spending analysis with dynamic budget data
//   const getMonthlySpendingTrends = () => {
//     return currentUser.monthlySpending.map(month => ({
//       ...month,
//       budget: monthlyBudgetLimit // Use user-set monthly budget
//     }));
//   };

//   const getCategoryWiseSpending = () => {
//     const categoryData = getCategoryBreakdown();
//     const totalSpending = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
    
//     return categoryData.map((item, index) => ({
//       ...item,
//       percentage: totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0,
//       color: `hsl(${index * 45}, 70%, 60%)`
//     }));
//   };

//   const getBudgetVsActual = () => {
//     return budgets.filter(budget => budget.isActive).map(budget => ({
//       ...budget,
//       variance: budget.actual - budget.budgeted,
//       variancePercentage: budget.budgeted > 0 ? ((budget.actual - budget.budgeted) / budget.budgeted) * 100 : 0
//     }));
//   };

//   const categories = ['all', 'Income', 'Food', 'Transportation', 'Utilities', 'Shopping', 'Entertainment', 'Health', 'Transfer', 'Cash', 'Others'];
  
//   const accountTypeOptions = [
//     { value: 'allTransactions', label: 'All Transactions' },
//     { value: 'Checking', label: 'Checking Accounts' },
//     { value: 'Savings', label: 'Savings Accounts' },
//     { value: 'Credit', label: 'Credit Accounts' }
//   ];

    
//     // Risk level color mapping
//     const getRiskColor = (level) => {
//       switch (level) {
//         case "Low": return "#00A389";
//         case "Moderate": return "#ffc658";
//         case "High": return "#ff4444";
//         default: return "#gray";
//       }
//     };
  
//     // Risk indicator component
//     const RiskIndicator = ({ level, score }) => (
//       <div className="flex items-center space-x-2">
//         <div className="w-20 bg-gray-200 rounded-full h-2">
//           <div 
//             className="h-2 rounded-full transition-all duration-300"
//             style={{ 
//               width: `${(score / 10) * 100}%`,
//               backgroundColor: getRiskColor(level)
//             }}
//           />
//         </div>
//         <span className={`text-sm font-medium`} style={{ color: getRiskColor(level) }}>
//           {level} ({score}/10)
//         </span>
//       </div>
//     );
//     const transactionAlerts = [
//       {
//         type: 'info',
//         title: 'Large Transaction Detected',
//         message: 'Transaction of $2,918.32 for Mortgage Payment processed',
//         date: '2025-06-01',
//         icon: '💰',
//         amount: 2918.32
//       },
//       {
//         type: 'warning',
//         title: 'Unusual Spending',
//         message: 'Your spending is 25% higher than usual this month',
//         date: '2025-05-30',
//         icon: '📊'
//       }
//     ];
    
//     const securityAlerts = [
//       {
//         type: 'danger',
//         title: 'Suspicious Activity',
//         message: 'Login attempt from unrecognized device in New York',
//         date: '2025-06-02',
//         icon: '🔒',
//         severity: 'high'
//       },
//       {
//         type: 'warning',
//         title: 'Multiple Failed Login Attempts',
//         message: '3 failed login attempts detected on your account',
//         date: '2025-06-01',
//         icon: '🛡️'
//       }
//     ];
    

//   return (
//     <section className="mt-8" style={{ fontFamily: 'var(--font-sans)', padding: '0', margin: '0 20px' }}>
//       <div className="max-w-7xl mx-auto px-4" style={{ padding: '0', margin: '0' }}>
//         {/* Welcome Header with Theme */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
//             Welcome back, {currentUser.name}
//           </h1>
//           <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
//             Here's your <span style={{ color: currentTheme.primary, fontWeight: '600' }}>{currentTheme.name}</span> account overview for today
//           </p>
//         </div>

//         {/* Budget Management Modal */}
//         {showBudgetModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div 
//               className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
//               style={{
//                 background: 'var(--surface)',
//                 border: `2px solid ${currentTheme.primary}`,
//                 borderRadius: 'var(--radius-lg)',
//                 boxShadow: currentTheme.shadow
//               }}
//             >
//               <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
//                 {editingBudget ? 'Edit Budget' : 'Add New Budget'}
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Category *
//                   </label>
//                   <select
//                     value={budgetForm.category}
//                     onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value, customCategory: '' })}
//                     className="w-full px-3 py-2 rounded-lg border"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   >
//                     <option value="">Select Category</option>
//                     {availableCategories
//                       .filter(cat => editingBudget?.category === cat || !budgets.some(b => b.category === cat))
//                       .map(category => (
//                         <option key={category} value={category}>
//                           {getCategoryIcon(category)} {category}
//                         </option>
//                       ))}
//                   </select>
//                 </div>

//                 {/* Custom Category Name for "Others" */}
//                 {budgetForm.category === 'Others' && (
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                       Custom Category Name *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter custom category name (e.g., Pet Expenses, Hobbies)"
//                       value={budgetForm.customCategory}
//                       onChange={(e) => setBudgetForm({ ...budgetForm, customCategory: e.target.value })}
//                       className="w-full px-3 py-2 rounded-lg border"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}40`,
//                         color: 'var(--text-primary)'
//                       }}
//                     />
//                     <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                       This will be the display name for your custom category
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Monthly Budget Amount *
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="Enter budget amount"
//                     value={budgetForm.budgeted}
//                     onChange={(e) => setBudgetForm({ ...budgetForm, budgeted: e.target.value })}
//                     className="w-full px-3 py-2 rounded-lg border"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Description (Optional)
//                   </label>
//                   <textarea
//                     placeholder="Add a description for this budget category..."
//                     value={budgetForm.description}
//                     onChange={(e) => setBudgetForm({ ...budgetForm, description: e.target.value })}
//                     rows={3}
//                     className="w-full px-3 py-2 rounded-lg border resize-none"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   />
//                   <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                     Describe what expenses this budget will cover
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Color Theme
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {availableColors.map(color => (
//                       <button
//                         key={color}
//                         onClick={() => setBudgetForm({ ...budgetForm, color })}
//                         className={`w-8 h-8 rounded-full border-2 ${budgetForm.color === color ? 'ring-2 ring-offset-2' : ''}`}
//                         style={{background: color,
//                           borderColor: budgetForm.color === color ? currentTheme.primary : 'transparent',
//                           ringColor: currentTheme.primary
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   onClick={() => setShowBudgetModal(false)}
//                   className="px-4 py-2 rounded-lg font-medium"
//                   style={{
//                     background: 'var(--background)',
//                     border: `1px solid ${currentTheme.primary}40`,
//                     color: 'var(--text-secondary)'
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveBudget}
//                   className="px-4 py-2 rounded-lg font-medium text-white"
//                   style={{
//                     background: currentTheme.gradient,
//                     boxShadow: currentTheme.shadow
//                   }}
//                 >
//                   {editingBudget ? 'Update Budget' : 'Create Budget'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Monthly Budget Modal */}
//         {showMonthlyBudgetModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div 
//               className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
//               style={{
//                 background: 'var(--surface)',
//                 border: `2px solid ${currentTheme.primary}`,
//                 borderRadius: 'var(--radius-lg)',
//                 boxShadow: currentTheme.shadow
//               }}
//             >
//               <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
//                 Set Monthly Budget Limit
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Monthly Budget Limit
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="Enter monthly budget limit"
//                     value={tempMonthlyBudget}
//                     onChange={(e) => setTempMonthlyBudget(parseFloat(e.target.value) || 0)}
//                     className="w-full px-3 py-2 rounded-lg border"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   />
//                   <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                     This will be used as your overall monthly spending target
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   onClick={() => setShowMonthlyBudgetModal(false)}
//                   className="px-4 py-2 rounded-lg font-medium"
//                   style={{
//                     background: 'var(--background)',
//                     border: `1px solid ${currentTheme.primary}40`,
//                     color: 'var(--text-secondary)'
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveMonthlyBudget}
//                   className="px-4 py-2 rounded-lg font-medium text-white"
//                   style={{
//                     background: currentTheme.gradient,
//                     boxShadow: currentTheme.shadow
//                   }}
//                 >
//                   Save Budget
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//                 {/* Total Balance Card */}
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-indigo-200 text-lg">Total Balance</p>
//               <h2 className="text-4xl font-bold">{formatCurrency(getTotalBalance())}</h2>
//               <p className="text-indigo-200 mt-2">Across {currentUser.accounts.length} accounts</p>
//             </div>
//             <div className="hidden md:block">
//               <svg className="w-20 h-20 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Account Cards */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
//             Your Accounts
//           </h2>
//           <div className="grid lg:grid-cols-3 gap-6 mb-8">
//   {currentUser.accounts.map((account) => (
//     <div
//       key={account.id}
//       className={`bg-gradient-to-br ${getAccountColor(account.type)} rounded-2xl p-6 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
//         selectedAccount?.id === account.id ? 'ring-4 ring-white ring-opacity-50' : ''
//       }`}
//       onClick={() => setSelectedAccount(account)}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           {getAccountIcon(account.type)}
//           <span className="font-semibold">{account.type}</span>
//         </div>
//         <div className={`w-3 h-3 rounded-full ${account.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
//       </div>
      
//       <h3 className="text-xl font-bold mb-2">{account.accountName}</h3>
//       <p className="text-sm opacity-90 mb-4">{account.accountNumber}</p>
      
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm opacity-90">
//             {account.type === "Credit" ? "Balance" : "Available"}
//           </p>
//           <p className="text-2xl font-bold">
//             ${Math.abs(account.balance).toLocaleString()}
//           </p>
//           {account.type === "Credit" && (
//             <p className="text-sm opacity-90">
//               Limit: ${account.creditLimit.toLocaleString()}
//             </p>
//           )}
//         </div>
//         <div className="text-right">
//           <p className="text-sm opacity-90">{account.cardType}</p>
//           <svg className="w-8 h-8 mt-1" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v2h16V6H4zm0 4v8h16v-8H4z"/>
//           </svg>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
//         </div>

//         {/* Main Dashboard Content with Dynamic Theme */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           <div 
//             className="p-6 rounded-lg transition-all duration-500"
//             style={{
//               background: 'var(--surface)',
//               border: `2px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-lg)',
//               boxShadow: currentTheme.shadow
//             }}
//           >
//             <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
//               Total Balance Overview
//             </h3>
//             <div className="text-center">
//               <div 
//                 className="text-4xl font-bold mb-2 transition-colors duration-500"
//                 style={{ color: currentTheme.primary }}
//               >
//                 {formatCurrency(getTotalBalance())}
//               </div>
//               <div className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
//                 Total Available Funds
//               </div>
              
//               <div 
//                 className="p-4 rounded-lg transition-all duration-500"
//                 style={{ 
//                   background: currentTheme.lightGradient,
//                   color: 'white'
//                 }}
//               >
//                 <div className="text-sm font-medium mb-2 opacity-90">
//                   Selected Account: {selectedAccount.accountName}
//                 </div>
//                 <div className="text-2xl font-bold">
//                   {selectedAccount.type === 'Credit' && selectedAccount.balance < 0 ? '-' : ''}
//                   {formatCurrency(selectedAccount.balance)}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <div className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
//                   Account Health
//                 </div>
//                 <div className="w-full h-2 rounded-full" style={{ background: 'var(--surface-variant)' }}>
//                   <div 
//                     className="h-2 rounded-full transition-all duration-1000"
//                     style={{
//                       background: currentTheme.gradient,
//                       width: selectedAccount.type === 'Credit' 
//                         ? `${100 - getCreditUtilization(selectedAccount)}%`
//                         : `${Math.min((selectedAccount.balance / 30000) * 100, 100)}%`
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div 
//             className="p-6 rounded-lg transition-all duration-500"
//             style={{
//               background: 'var(--surface)',
//               border: `1px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-lg)',
//               boxShadow: 'var(--shadow-md)'
//             }}
//           >
//             <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
//               Account Summary
//             </h3>
//             <div className="space-y-4">
//               {currentUser.accounts.map((account) => (
//                 <div 
//                   key={account.id} 
//                   className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
//                     selectedAccount.id === account.id ? 'ring-2 ring-offset-1 transform scale-105' : 'hover:scale-102'
//                   }`}
//                   style={{ 
//                     background: selectedAccount.id === account.id 
//                       ? currentTheme.lightGradient
//                       : 'var(--background)',
//                     ringColor: currentTheme.primary
//                   }}
//                   onClick={() => setSelectedAccount(account)}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div 
//                       className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300"
//                       style={{
//                         background: selectedAccount.id === account.id 
//                           ? 'rgba(255,255,255,0.2)'
//                           : themes[account.type].primary
//                       }}
//                     >
//                       {account.type === 'Checking' ? '💳' : 
//                        account.type === 'Savings' ? '🏦' : '💰'}
//                     </div>
//                     <div>
//                       <div 
//                         className="font-medium text-sm"
//                         style={{
//                           color: selectedAccount.id === account.id 
//                             ? 'white' 
//                             : 'var(--text-primary)'
//                         }}
//                       >
//                         {account.accountName}
//                       </div>
//                       <div 
//                         className="text-xs"
//                         style={{
//                           color: selectedAccount.id === account.id 
//                             ? 'rgba(255,255,255,0.75)' 
//                             : 'var(--text-secondary)'
//                         }}
//                       >
//                         {account.accountNumber}
//                       </div>
//                     </div>
//                   </div>
//                   <div 
//                     className="font-bold text-sm transition-colors duration-300"
//                     style={{ 
//                       color: selectedAccount.id === account.id 
//                         ? 'white'
//                         : account.balance < 0 
//                           ? '#ff3b5c' 
//                           : 'var(--text-primary)'
//                     }}
//                   >
//                     {account.balance < 0 ? '-' : ''}{formatCurrency(account.balance)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div 
//             className="p-6 rounded-lg transition-all duration-500"
//             style={{
//               background: 'var(--surface)',
//               border: `1px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-lg)',
//               boxShadow: 'var(--shadow-md)'
//             }}
//           >
//             <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
//               Recent Transactions
//             </h3>
//             <div className="text-sm mb-4" style={{ color: currentTheme.primary, fontWeight: '600' }}>
//               {selectedAccount.accountName}
//             </div>
//             <div className="space-y-3">
//               {getAccountTransactions(selectedAccount.id).map((transaction) => (
//                 <div 
//                   key={transaction.id} 
//                   className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-102" 
//                   style={{ 
//                     background: 'var(--background)',
//                     border: `1px solid ${currentTheme.primary}20`
//                   }}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div 
//                       className="text-lg w-8 h-8 rounded-full flex items-center justify-center"
//                       style={{ background: `${currentTheme.primary}20` }}
//                     >
//                       {getTransactionIcon(transaction.type)}
//                     </div>
//                     <div>
//                       <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
//                         {transaction.description}
//                       </div>
//                       <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                         {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
//                       </div>
//                     </div>
//                   </div>
//                   <div 
//                     className={`font-bold text-sm transition-colors duration-300`}
//                     style={{
//                       color: transaction.amount < 0 ? chartColors.spending : chartColors.income
//                     }}
//                   >
//                     {transaction.amount < 0 ? '-' : '+'}{formatCurrency(transaction.amount)}
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <button 
//               className="w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
//               style={{
//                 background: currentTheme.gradient,
//                 color: 'white',
//                 borderRadius: 'var(--radius-sm)',
//                 boxShadow: currentTheme.shadow
//               }}
//             >
//               View All Transactions
//             </button>
//           </div>
//         </div>

//         {/* BUDGET MANAGEMENT SECTION */}
//         <div className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
//               Budget Management & Spending Analysis
//             </h2>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowMonthlyBudgetModal(true)}
//                 className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
//                 style={{
//                   background: 'var(--background)',
//                   border: `2px solid ${currentTheme.primary}`,
//                   color: currentTheme.primary
//                 }}
//               >
//                 📊 Set Monthly Budget
//               </button>
//               <button
//                 onClick={handleAddBudget}
//                 className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
//                 style={{
//                   background: currentTheme.gradient,
//                   boxShadow: currentTheme.shadow
//                 }}
//               >
//                 ➕ Add Budget Category
//               </button>
//             </div>
//           </div>

//           {/* Budget Overview Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div 
//               className="p-4 rounded-lg text-center"
//               style={{
//                 background: `${chartColors.income}20`,
//                 border: `1px solid ${chartColors.income}40`
//               }}
//             >
//               <div className="text-2xl font-bold" style={{ color: chartColors.income }}>
//                 {formatCurrency(getTotalBudgeted())}
//               </div>
//               <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                 Total Budgeted
//               </div>
//             </div>
            
//             <div 
//               className="p-4 rounded-lg text-center"
//               style={{
//                 background: `${chartColors.spending}20`,
//                 border: `1px solid ${chartColors.spending}40`
//               }}
//             >
//               <div className="text-2xl font-bold" style={{ color: chartColors.spending }}>
//                 {formatCurrency(getTotalActualSpending())}
//               </div>
//               <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                 Total Spent
//               </div>
//             </div>
            
//             <div 
//               className="p-4 rounded-lg text-center"
//               style={{
//                 background: `${currentTheme.primary}20`,
//                 border: `1px solid ${currentTheme.primary}40`
//               }}
//             >
//               <div className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
//                 {formatCurrency(Math.abs(getTotalBudgeted() - getTotalActualSpending()))}
//               </div>
//               <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                 {getTotalBudgeted() > getTotalActualSpending() ? 'Remaining' : 'Over Budget'}
//               </div>
//             </div>

//             <div 
//               className="p-4 rounded-lg text-center"
//               style={{
//                 background: `${currentTheme.primary}20`,
//                 border: `1px solid ${currentTheme.primary}40`
//               }}
//             >
//               <div className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
//                 {formatCurrency(monthlyBudgetLimit)}
//               </div>
//               <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                 Monthly Limit
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//               <select
//                 value={spendingAnalysisView}
//                 onChange={(e) => setSpendingAnalysisView(e.target.value)}
//                 className="px-4 py-2 my-2 rounded-lg text-sm font-medium transition-all duration-300"
//                 style={{
//                   background: 'var(--surface)',
//                   border: `1px solid ${currentTheme.primary}`,
//                   color: 'var(--text-primary)',
//                   marginLeft: 'auto'  // This pushes it to the right
//                 }}
//               >
//                 <option value="trends">Monthly Spending Trends</option>
//                 <option value="categories">Category-wise Spending</option>
//                 <option value="budget">Budget vs Actual</option>
//               </select>
//             </div>
                          
//           {/* Spending Analysis Charts */}
//           <div 
//             className="p-6 rounded-lg transition-all duration-500"
//             style={{
//               background: 'var(--surface)',
//               border: `1px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-lg)',
//               boxShadow: 'var(--shadow-md)',
//               paddingBottom: '60px'
//             }}
//           >
//             {spendingAnalysisView === 'trends' && (
//               <>
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
//                     Monthly Spending Trends
//                   </h3>
//                   <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                     Monthly Budget: {formatCurrency(monthlyBudgetLimit)}
//                   </div>
//                 </div>
//                 <div className="relative h-80">
//                   <div className="flex items-end justify-between h-full space-x-4">
//                     {getMonthlySpendingTrends().map((data, index) => {
//                       const maxValue = Math.max(...getMonthlySpendingTrends().map(d => Math.max(d.spending, d.budget)));
//                       const spendingHeight = (data.spending / maxValue) * 100;
//                       const budgetHeight = (data.budget / maxValue) * 100;
//                       const isOverBudget = data.spending > data.budget;
                      
//                       return (
//                         <div key={index} className="flex-1 flex flex-col items-center space-y-2">
//                           <div className="flex items-end space-x-2 h-64 relative">
//                             {/* Budget Line (background) */}
//                             <div
//                               className="w-8 rounded-t transition-all duration-1000 opacity-40"
//                               style={{
//                                 height: `${budgetHeight}%`,
//                                 background: currentTheme.primary,
//                                 minHeight: '4px'
//                               }}
//                               title={`Budget: ${formatCurrency(data.budget)}`}
//                             ></div>
//                             {/* Actual Spending Bar */}
//                             <div
//                               className="w-8 rounded-t transition-all duration-1000 hover:opacity-80 absolute left-0"
//                               style={{
//                                 height: `${spendingHeight}%`,
//                                 background: isOverBudget ? chartColors.spending : chartColors.income,
//                                 minHeight: '4px'
//                               }}
//                               title={`Spending: ${formatCurrency(data.spending)}`}
//                             ></div>
//                             {/* Over budget indicator */}
//                             {isOverBudget && (
//                               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//                                 <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
//                                   <span className="text-white text-xs">!</span>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                           <div className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
//                             {data.month}
//                           </div>
//                           <div className="text-xs text-center space-y-1">
//                             <div style={{ color: isOverBudget ? chartColors.spending : chartColors.income }}>
//                               {formatCurrency(data.spending)}
//                             </div>
//                             <div style={{ color: 'var(--text-secondary)' }}>
//                               vs {formatCurrency(data.budget)}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
                  
//                   {/* Legend */}
//                   <div className="flex items-center justify-center space-x-6 mt-6">
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="w-4 h-4 rounded opacity-40"
//                         style={{ background: currentTheme.primary }}
//                       ></div>
//                       <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Budget</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="w-4 h-4 rounded"
//                         style={{ background: chartColors.income }}
//                       ></div>
//                       <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Under Budget</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="w-4 h-4 rounded"
//                         style={{ background: chartColors.spending }}
//                       ></div>
//                                               <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Over Budget</span>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {spendingAnalysisView === 'categories' && (
//               <>
//                 <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
//                   Category-wise Spending Distribution
//                 </h3>
//                 <div className="grid lg:grid-cols-2 gap-8">
//                   {/* Pie Chart Representation */}
//                   <div className="flex items-center justify-center">
//                     <div className="relative w-64 h-64">
//                       {/* Circular Progress Rings */}
//                       <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
//                         {getCategoryWiseSpending().map((item, index) => {
//                           const radius = 35 - (index * 3);
//                           const circumference = 2 * Math.PI * radius;
//                           const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
//                           const rotation = getCategoryWiseSpending()
//                             .slice(0, index)
//                             .reduce((sum, prev) => sum + (prev.percentage / 100) * 360, 0);
                          
//                           return (
//                             <circle
//                               key={index}
//                               cx="50"
//                               cy="50"
//                               r={radius}
//                               fill="none"
//                               stroke={item.color}
//                               strokeWidth="3"
//                               strokeDasharray={strokeDasharray}
//                               strokeLinecap="round"
//                               style={{
//                                 transformOrigin: '50% 50%',
//                                 transform: `rotate(${rotation}deg)`
//                               }}
//                               className="transition-all duration-1000"
//                             />
//                           );
//                         })}
//                       </svg>
                      
//                       {/* Center Total */}
//                       <div className="absolute inset-0 flex items-center justify-center flex-col">
//                         <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
//                           Total
//                         </div>
//                         <div className="text-xl font-bold" style={{ color: currentTheme.primary }}>
//                           {formatCurrency(getCategoryWiseSpending().reduce((sum, cat) => sum + cat.amount, 0))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Category Breakdown */}
//                   <div className="space-y-4">
//                     {getCategoryWiseSpending().map((item, index) => (
//                       <div key={index} className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <div 
//                               className="w-4 h-4 rounded-full"
//                               style={{ background: item.color }}
//                             ></div>
//                             <span className="text-lg">{getCategoryIcon(item.category)}</span>
//                             <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
//                               {item.category}
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
//                               {formatCurrency(item.amount)}
//                             </div>
//                             <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                               {item.percentage.toFixed(1)}%
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-full h-2 rounded-full" style={{ background: 'var(--surface-variant)' }}>
//                           <div
//                             className="h-2 rounded-full transition-all duration-1000"
//                             style={{
//                               width: `${item.percentage}%`,
//                               background: item.color
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}

//             {spendingAnalysisView === 'budget' && (
//               <>
//                 <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
//               Budget Categories
//             </h3>
            
//             {budgets.length > 0 ? (
//               <div className="space-y-4 " style={{ maxHeight: '60vh', overflowY: 'auto' }}>
//                 {budgets.map((budget) => {
//                   const isOverBudget = budget.actual > budget.budgeted;
//                   const percentage = budget.budgeted > 0 ? (budget.actual / budget.budgeted) * 100 : 0;
                  
//                   return (
//                     <div 
//                       key={budget.id}
//                       className={`p-4 rounded-lg transition-all duration-300 ${budget.isActive ? '' : 'opacity-50'}`}
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${budget.isActive ? budget.color : 'var(--surface-variant)'}40`
//                       }}
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                           <span className="text-xl">{getCategoryIcon(budget.category)}</span>
//                           <div>
//                             <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
//                               {budget.category}
//                             </div>
//                             {budget.description && (
//                               <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                                 {budget.description}
//                               </div>
//                             )}
//                             <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                               {isOverBudget ? 'Over Budget' : 'Under Budget'} by {formatCurrency(Math.abs(budget.actual - budget.budgeted))}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleToggleBudget(budget.id)}
//                             className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300`}
//                             style={{
//                               background: budget.isActive ? `${budget.color}20` : 'var(--surface-variant)',
//                               color: budget.isActive ? budget.color : 'var(--text-secondary)',
//                               border: `1px solid ${budget.isActive ? budget.color : 'var(--surface-variant)'}40`
//                             }}
//                           >
//                             {budget.isActive ? 'Active' : 'Inactive'}
//                           </button>
//                           <button
//                             onClick={() => handleEditBudget(budget)}
//                             className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
//                             style={{
//                               background: `${currentTheme.primary}20`,
//                               color: currentTheme.primary,
//                               border: `1px solid ${currentTheme.primary}40`
//                             }}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteBudget(budget.id)}
//                             className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
//                             style={{
//                               background: `${chartColors.spending}20`,
//                               color: chartColors.spending,
//                               border: `1px solid ${chartColors.spending}40`
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       {/* Budget Progress Bars */}
//                       <div className="space-y-3">
//                         <div>
//                           <div className="flex justify-between text-sm mb-1">
//                             <span style={{ color: 'var(--text-secondary)' }}>Budgeted</span>
//                             <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(budget.budgeted)}</span>
//                           </div>
//                           <div className="w-full h-3 rounded-full" style={{ background: 'var(--surface-variant)' }}>
//                             <div
//                               className="h-3 rounded-full transition-all duration-1000"
//                               style={{
//                                 width: '100%',
//                                 background: budget.color,
//                                 opacity: 0.3
//                               }}
//                             ></div>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="flex justify-between text-sm mb-1">
//                             <span style={{ color: 'var(--text-secondary)' }}>Actual Spending</span>
//                             <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(budget.actual)}</span>
//                           </div>
//                           <div className="w-full h-3 rounded-full" style={{ background: 'var(--surface-variant)' }}>
//                             <div
//                               className="h-3 rounded-full transition-all duration-1000"
//                               style={{
//                                 width: `${Math.min(percentage, 100)}%`,
//                                 background: isOverBudget ? chartColors.spending : budget.color
//                               }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Budget Status */}
//                       <div className="mt-3 flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <div 
//                             className="w-3 h-3 rounded-full"
//                             style={{ background: isOverBudget ? chartColors.spending : chartColors.income }}
//                           ></div>
//                           <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                             {percentage.toFixed(1)}% of budget used
//                           </span>
//                         </div>
                        
//                         <div 
//                           className="text-sm font-medium"
//                           style={{ color: isOverBudget ? chartColors.spending : chartColors.income }}
//                         >
//                           {isOverBudget 
//                             ? `${(percentage - 100).toFixed(1)}% over budget`
//                             : `${(100 - percentage).toFixed(1)}% remaining`
//                           }
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="text-4xl mb-4">💰</div>
//                 <div className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
//                   No Budget Categories Set
//                 </div>
//                 <div className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
//                   Start managing your finances by creating budget categories
//                 </div>
//                 <button
//                   onClick={handleAddBudget}
//                   className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
//                   style={{
//                     background: currentTheme.gradient,
//                     boxShadow: currentTheme.shadow
//                   }}
//                 >
//                   Create Your First Budget
//                 </button>
//               </div>
//             )}

//                 {/* Budget Summary */}
//                 {getBudgetVsActual().length > 0 && (
//                   <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div 
//                       className="p-4 rounded-lg text-center"
//                       style={{
//                         background: `${chartColors.income}20`,
//                         border: `1px solid ${chartColors.income}40`
//                       }}
//                     >
//                       <div className="text-2xl font-bold" style={{ color: chartColors.income }}>
//                         {getBudgetVsActual().filter(b => b.variance <= 0).length}
//                       </div>
//                       <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                         Categories Under Budget
//                       </div>
//                     </div>
                    
//                     <div 
//                       className="p-4 rounded-lg text-center"
//                       style={{
//                         background: `${chartColors.spending}20`,
//                         border: `1px solid ${chartColors.spending}40`
//                       }}
//                     >
//                       <div className="text-2xl font-bold" style={{ color: chartColors.spending }}>
//                         {getBudgetVsActual().filter(b => b.variance > 0).length}
//                       </div>
//                       <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                         Categories Over Budget
//                       </div>
//                     </div>
                    
//                     <div 
//                       className="p-4 rounded-lg text-center"
//                       style={{
//                         background: `${currentTheme.primary}20`,
//                         border: `1px solid ${currentTheme.primary}40`
//                       }}
//                     >
//                       <div className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
//                         {formatCurrency(getBudgetVsActual().reduce((sum, b) => sum + Math.abs(b.variance), 0))}
//                       </div>
//                       <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                         Total Variance
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
            
//           </div>
//         </div>

//         {/* Transaction History Section */}
//         <div className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
//               Transaction History
//             </h2>
//             <div className="flex items-center space-x-4">
//               <select
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
//                 style={{
//                   background: 'var(--surface)',
//                   border: `1px solid ${currentTheme.primary}`,
//                   color: 'var(--text-primary)'
//                 }}
//               >
//                 <option value="7days">Last 7 Days</option>
//                 <option value="30days">Last 30 Days</option>
//                 <option value="90days">Last 90 Days</option>
//               </select>
              
//               <select
//                 value={chartType}
//                 onChange={(e) => setChartType(e.target.value)}
//                 className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
//                 style={{
//                   background: 'var(--surface)',
//                   border: `1px solid ${currentTheme.primary}`,
//                   color: 'var(--text-primary)'
//                 }}
//               >
//                 <option value="timeline">Timeline Chart</option>
//                 <option value="category">Category Breakdown</option>
//               </select>
//             </div>
//           </div>

//           <div 
//             className="p-6 rounded-lg transition-all duration-500 mb-8"
//             style={{
//               background: 'var(--surface)',
//               border: `1px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-lg)',
//               boxShadow: 'var(--shadow-md)',
//               paddingBottom: '55px'
//             }}
//           >
//             {chartType === 'timeline' ? (
//               <>
//                 <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
//                   Income vs Spending Timeline
//                 </h3>
//                 <div className="relative h-64">
//                   <div className="flex items-end justify-between h-full space-x-2">
//                     {getTimelineData().map((data, index) => {
//                       const maxValue = getMaxValue(getTimelineData());
//                       const incomeHeight = (data.income / maxValue) * 100;
//                       const spendingHeight = (data.spending / maxValue) * 100;
                      
//                       return (
//                         <div key={index} className="flex-1 flex flex-col items-center space-y-1">
//                           <div className="flex items-end space-x-1 h-48">
//                             <div
//                               className="w-4 rounded-t transition-all duration-1000 hover:opacity-80"
//                               style={{
//                                 height: `${incomeHeight}%`,
//                                 background: chartColors.income,
//                                 minHeight: data.income > 0 ? '4px' : '0'
//                               }}
//                               title={`Income: ${formatCurrency(data.income)}`}
//                             ></div>
//                             <div
//                               className="w-4 rounded-t transition-all duration-1000 hover:opacity-80"
//                               style={{
//                                 height: `${spendingHeight}%`,
//                                 background: chartColors.spending,
//                                 minHeight: data.spending > 0 ? '4px' : '0'
//                               }}
//                               title={`Spending: ${formatCurrency(data.spending)}`}
//                             ></div>
//                           </div>
//                           <div className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
//                             {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
                  
//                   <div className="flex items-center justify-center space-x-6 mt-4">
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="w-4 h-4 rounded"
//                         style={{ background: chartColors.income }}
//                       ></div>
//                       <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Income</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div 
//                         className="w-4 h-4 rounded"
//                         style={{ background: chartColors.spending }}
//                       ></div>
//                       <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Spending</span>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
//                   Spending by Category
//                   {filterAccountType !== 'all' && filterAccountType !== 'allTransactions' && (
//                     <span className="text-sm font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
//                       ({filterAccountType} accounts only)
//                     </span>
//                   )}
//                   {filterAccountType === 'allTransactions' && (
//                     <span className="text-sm font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
//                       (All accounts)
//                     </span>
//                   )}
//                 </h3>
//                 <div className="space-y-4">
//                   {getCategoryBreakdown().map((item, index) => {
//                     const totalSpending = getCategoryBreakdown().reduce((sum, cat) => sum + cat.amount, 0);
//                     const percentage = totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0;
                    
//                     return (
//                       <div key={index} className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <span className="text-lg">{getCategoryIcon(item.category)}</span>
//                             <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
//                               {item.category}
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
//                               {formatCurrency(item.amount)}
//                             </div>
//                             <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                               {percentage.toFixed(1)}%
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-full h-3 rounded-full" style={{ background: 'var(--surface-variant)' }}>
//                           <div
//                             className="h-3 rounded-full transition-all duration-1000"
//                             style={{
//                               width: `${percentage}%`,
//                               background: `hsl(${index * 45}, 70%, 60%)`
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   {getCategoryBreakdown().length === 0 && (
//                     <div className="text-center py-8">
//                       <div className="text-4xl mb-4">📊</div>
//                       <div className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
//                         No spending data found
//                       </div>
//                       <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                         No spending transactions match the current filter criteria
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Transaction Details and Filter Section */}
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div 
//               className="lg:col-span-2 p-6 rounded-lg transition-all duration-500 flex flex-col"
//               style={{
//                 background: 'var(--surface)',
//                 border: `1px solid ${currentTheme.primary}`,
//                 borderRadius: 'var(--radius-lg)',
//                 boxShadow: 'var(--shadow-md)',
//                 height: '652px'
//               }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
//                   Transaction Details
//                   {filterAccountType !== 'all' && (
//                     <span className="text-sm font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
//                       {filterAccountType === 'allTransactions' ? '(All Accounts)' : `(${filterAccountType} Accounts)`}
//                     </span>
//                   )}
//                 </h3>
//                 <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                   Showing {getFilteredTransactions().length} of {currentUser.recentTransactions.length} transactions
//                 </div>
//               </div>

//               <div className="space-y-3 overflow-y-auto flex-1">
//                 {getFilteredTransactions().length > 0 ? (
//                   getFilteredTransactions().map((transaction) => (
//                     <div
//                       key={transaction.id}
//                       className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-102"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}20`
//                       }}
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div 
//                           className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
//                           style={{ background: `${currentTheme.primary}20` }}
//                         >
//                           {getCategoryIcon(transaction.category)}
//                         </div>
//                         <div>
//                           <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
//                             {transaction.description}
//                           </div>
//                           <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                             {transaction.merchant} • {new Date(transaction.date).toLocaleDateString()}
//                           </div>
//                           <div className="flex items-center space-x-2 mt-1">
//                             <div 
//                               className="text-xs px-2 py-1 rounded-full inline-block"
//                               style={{
//                                 background: `${currentTheme.primary}20`,
//                                 color: currentTheme.primary
//                               }}
//                             >
//                               {transaction.category}
//                             </div>
//                             <div 
//                               className="text-xs px-2 py-1 rounded-full inline-block"
//                               style={{
//                                 background: `${themes[getAccountTypeById(transaction.accountId)]?.primary || currentTheme.primary}20`,
//                                 color: themes[getAccountTypeById(transaction.accountId)]?.primary || currentTheme.primary
//                               }}
//                             >
//                               {getAccountNameById(transaction.accountId)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div 
//                           className="font-bold text-lg"
//                           style={{
//                             color: transaction.amount < 0 ? chartColors.spending : chartColors.income
//                           }}
//                         >
//                           {transaction.amount < 0 ? '-' : '+'}{formatCurrency(transaction.amount)}
//                         </div>
//                         <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                           {getTransactionIcon(transaction.type)} {transaction.type}
//                         </div>
//                         <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                           {getAccountTypeById(transaction.accountId)} Account
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="text-4xl mb-4">🔍</div>
//                     <div className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
//                       No transactions found
//                     </div>
//                     <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                       Try adjusting your search criteria or filters
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Search and Filter Section */}
//             <div 
//               className="p-6 rounded-lg transition-all duration-500"
//               style={{
//                 background: 'var(--surface)',
//                 border: `1px solid ${currentTheme.primary}`,
//                 borderRadius: 'var(--radius-lg)',
//                 boxShadow: 'var(--shadow-md)'
//               }}
//             >
//               <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
//                 Search & Filter
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Search Transactions
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Search by description or merchant..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Account Type
//                   </label>
//                   <select
//                     value={filterAccountType}
//                     onChange={(e) => setFilterAccountType(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   >
//                     {accountTypeOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                     {filterAccountType === 'all' && `Showing transactions from: ${selectedAccount.accountName}`}
//                     {filterAccountType === 'allTransactions' && 'Showing transactions from all accounts'}
//                     {filterAccountType !== 'all' && filterAccountType !== 'allTransactions' && 
//                       `Showing transactions from all ${filterAccountType} accounts`}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Category
//                   </label>
//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                     style={{
//                       background: 'var(--background)',
//                       border: `1px solid ${currentTheme.primary}40`,
//                       color: 'var(--text-primary)'
//                     }}
//                   >
//                     {categories.map(category => (
//                       <option key={category} value={category}>
//                         {category === 'all' ? 'All Categories' : category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Date Range
//                   </label>
//                   <div className="grid grid-cols-2 gap-2">
//                   <input
//                       type="date"
//                       value={filterDateFrom}
//                       onChange={(e) => setFilterDateFrom(e.target.value)}
//                       className="px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}40`,
//                         color: 'var(--text-primary)'
//                       }}
//                     />
//                     <input
//                       type="date"
//                       value={filterDateTo}
//                       onChange={(e) => setFilterDateTo(e.target.value)}
//                       className="px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}40`,
//                         color: 'var(--text-primary)'
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Amount Range
//                   </label>
//                   <div className="grid grid-cols-2 gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min amount"
//                       value={filterAmountMin}
//                       onChange={(e) => setFilterAmountMin(e.target.value)}
//                       className="px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}40`,
//                         color: 'var(--text-primary)'
//                       }}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Max amount"
//                       value={filterAmountMax}
//                       onChange={(e) => setFilterAmountMax(e.target.value)}
//                       className="px-3 py-2 rounded-lg text-sm transition-all duration-300"
//                       style={{
//                         background: 'var(--background)',
//                         border: `1px solid ${currentTheme.primary}40`,
//                         color: 'var(--text-primary)'
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <button
//                   onClick={clearFilters}
//                   className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
//                   style={{
//                     background: 'var(--background)',
//                     border: `2px solid ${currentTheme.primary}`,
//                     color: currentTheme.primary
//                   }}
//                 >
//                   Clear All Filters
//                 </button>

//                 <div 
//                   className="p-3 rounded-lg text-center"
//                   style={{
//                     background: `${currentTheme.primary}10`,
//                     border: `1px solid ${currentTheme.primary}30`
//                   }}
//                 >
//                   <div className="text-sm font-medium" style={{ color: currentTheme.primary }}>
//                     {getFilteredTransactions().length} transactions found
//                   </div>
//                   {filterAccountType !== 'all' && (
//                     <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//                       {filterAccountType === 'allTransactions' ? 'From all accounts' : `From ${filterAccountType} accounts`}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats with Theme */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
//           <div 
//             className="p-4 rounded-lg text-center transition-all duration-500 hover:scale-105"
//             style={{
//               background: currentTheme.lightGradient,
//               color: 'white',
//               borderRadius: 'var(--radius-md)',
//               boxShadow: currentTheme.shadow
//             }}
//           >
//             <div className="text-2xl font-bold">
//               {currentUser.accounts.length}
//             </div>
//             <div className="text-sm opacity-90">
//               Active Accounts
//             </div>
//           </div>
          
//           <div 
//             className="p-4 rounded-lg text-center transition-all duration-500 hover:scale-105"
//             style={{
//               background: 'var(--surface)',
//               border: `2px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-md)',
//               boxShadow: 'var(--shadow-sm)'
//             }}
//           >
//             <div className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
//               {currentUser.recentTransactions.filter(t => t.amount > 0).length}
//             </div>
//             <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//               Recent Deposits
//             </div>
//           </div>
          
//           <div 
//             className="p-4 rounded-lg text-center transition-all duration-500 hover:scale-105"
//             style={{
//               background: 'var(--surface)',
//               border: `2px solid ${currentTheme.primary}`,
//               borderRadius: 'var(--radius-md)',
//               boxShadow: 'var(--shadow-sm)'
//             }}
//           >
//             <div className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
//               {formatCurrency(currentUser.accounts.find(acc => acc.type === 'Credit')?.balance || 0)}
//             </div>
//             <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//               Credit Balance
//             </div>
//           </div>

//           <div 
//             className="p-4 rounded-lg text-center transition-all duration-500 hover:scale-105"
//             style={{
//               background: currentTheme.gradient,
//               color: 'white',
//               borderRadius: 'var(--radius-md)',
//               boxShadow: currentTheme.shadow
//             }}
//           >
//             <div className="text-2xl font-bold">
//               {formatCurrency(getTotalBalance())}
//             </div>
//             <div className="text-sm opacity-90">
//               Net Worth
//             </div>
//           </div>
//         </div>
//           {/* Investment Portfolio Section */}
//           <section className="mt-12">
//           <h2 className="text-3xl font-bold mb-8 text-gray-800">Investment Portfolio</h2>
          
//           {/* Portfolio Overview Cards */}
//           <div className="grid lg:grid-cols-3 gap-6 mb-8">
//             {/* Total Portfolio Value */}
//             <div className="bg-white shadow-2xl rounded-2xl p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Total Portfolio Value</p>
//                   <h3 className="text-2xl font-bold text-gray-800" style={{marginTop:'5px'}}>
//                     ${currentUser.investmentPortfolio.totalValue.toLocaleString()}
//                   </h3>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Total Gain/Loss */}
//             <div className="bg-white shadow-2xl rounded-2xl p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Total Gain/Loss</p>
//                   <h3 className={`text-2xl font-bold ${currentUser.investmentPortfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                     {currentUser.investmentPortfolio.totalGainLoss >= 0 ? '+' : ''}${currentUser.investmentPortfolio.totalGainLoss.toLocaleString()}
//                   </h3>
//                   <p className={`text-sm ${currentUser.investmentPortfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                     ({currentUser.investmentPortfolio.totalGainLoss >= 0 ? '+' : ''}{currentUser.investmentPortfolio.totalGainLossPercentage}%)
//                   </p>
//                 </div>
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentUser.investmentPortfolio.totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
//                   <svg className={`w-6 h-6 ${currentUser.investmentPortfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentUser.investmentPortfolio.totalGainLoss >= 0 ? "M7 11l5-5m0 0l5 5m-5-5v12" : "M17 13l-5 5m0 0l-5-5m5 5V6"} />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Risk Analysis */}
//             <div className="bg-white shadow-2xl rounded-2xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-gray-500 text-sm">Portfolio Risk</p>
//                   <h3 className="text-xl font-bold text-gray-800">{currentUser.investmentPortfolio.riskLevel}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 </div>
//               </div>
//               <RiskIndicator 
//                 level={currentUser.investmentPortfolio.riskLevel} 
//                 score={currentUser.investmentPortfolio.riskScore} 
//               />
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Portfolio Composition - Pie Chart */}
//             <div className="bg-white shadow-2xl rounded-2xl p-6">
//               <h3 className="text-xl font-bold mb-6 text-gray-800">Portfolio Composition</h3>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={currentUser.investmentPortfolio.composition}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percentage }) => `${name} ${percentage}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {currentUser.investmentPortfolio.composition.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
              
//               {/* Legend */}
//               <div className="grid grid-cols-2 gap-4 mt-4">
//                 {currentUser.investmentPortfolio.composition.map((item, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <div 
//                       className="w-4 h-4 rounded-full" 
//                       style={{ backgroundColor: item.color }}
//                     />
//                     <span className="text-sm text-gray-600">{item.name}</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       ${item.value.toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Performance Over Time - Line Chart */}
//             <div className="bg-white shadow-2xl rounded-2xl p-6">
//               <h3 className="text-xl font-bold mb-6 text-gray-800">Performance Over Time</h3>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={currentUser.investmentPortfolio.performanceHistory}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis 
//                       tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
//                     />
//                     <Tooltip 
//                       formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
//                       labelFormatter={(label) => `Month: ${label}`}
//                     />
//                     <Legend />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#8884d8" 
//                       strokeWidth={3}
//                       dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
//                       activeDot={{ r: 8 }}
//                       name="Portfolio Value"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
              
//               {/* Performance Summary */}
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">6-Month Performance</span>
//                   <span className="text-sm font-medium text-green-600">
//                     +{((currentUser.investmentPortfolio.totalValue - currentUser.investmentPortfolio.performanceHistory[0].value) / currentUser.investmentPortfolio.performanceHistory[0].value * 100).toFixed(2)}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

// {/* Enhanced Loan Management Section */}
// <section className="mt-12">
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Loan & Mortgage Management</h2>
  
//   {/* Outstanding Balance with Full Circle Gauge */}
// <div className="grid lg:grid-cols-3 gap-6 mb-8">
//   <div className="bg-white shadow-2xl rounded-2xl p-6">
//     <h3 className="text-xl font-bold mb-6 text-gray-800">Outstanding Balance</h3>
//     <div className="flex flex-col items-center">
//       {/* Full Circle Gauge - Larger */}
//       <div className="relative w-52 h-52 mb-4">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={[
//                 { 
//                   name: 'Paid', 
//                   value: currentUser.loans[0].originalAmount - currentUser.loans[0].currentBalance 
//                 },
//                 { 
//                   name: 'Remaining', 
//                   value: currentUser.loans[0].currentBalance 
//                 }
//               ]}
//               cx="50%"
//               cy="50%"
//               innerRadius={75}
//               outerRadius={95}
//               dataKey="value"
//               startAngle={90}
//               endAngle={450}
//             >
//               <Cell fill="#10B981" />
//               <Cell fill="#EF4444" />
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
        
//         {/* Center Content - More space due to larger inner radius */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <div className="text-xl font-bold text-gray-800 mb-2">
//             ${currentUser.loans[0].currentBalance.toLocaleString()}
//           </div>
//           <div className="text-base text-gray-500 font-medium">
//             Remaining
//           </div>
//           <div className="text-sm text-green-600 font-semibold mt-2">
//             {((currentUser.loans[0].originalAmount - currentUser.loans[0].currentBalance) / currentUser.loans[0].originalAmount * 100).toFixed(1)}% Paid
//           </div>
//         </div>
//       </div>
      
//       {/* Progress Stats */}
//       <div className="text-center space-y-3 w-full">
//         <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
//           <span className="text-sm text-gray-600">Total Loan</span>
//           <span className="font-semibold text-gray-800">
//             ${currentUser.loans[0].originalAmount.toLocaleString()}
//           </span>
//         </div>
        
//         <div className="text-xs text-gray-400">
//           ${(currentUser.loans[0].originalAmount - currentUser.loans[0].currentBalance).toLocaleString()} already paid
//         </div>
//       </div>
//     </div>
//   </div>


//     {/* Payment Schedule Timeline */}
//     <div className="lg:col-span-2 bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Schedule Timeline</h3>
//       <div className="space-y-4">
//         {currentUser.loans[0].paymentHistory && currentUser.loans[0].paymentHistory.slice(-3).map((payment, index) => (
//           <div key={index} className="flex items-center space-x-4 text-black">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex justify-between">
//                 <span className="font-medium">{payment.date}</span>
//                 <span className="text-green-600 font-bold">${payment.amount.toLocaleString()}</span>
//               </div>
//               <div className="text-sm text-gray-500">
//                 Principal: ${payment.principal.toLocaleString()} | Interest: ${payment.interest.toLocaleString()}
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {/* Upcoming Payments */}
//         <div className="border-t pt-4">
//           <h4 className="font-medium text-gray-700 mb-2">Upcoming Payments</h4>
//           {['2025-07-01', '2025-08-01', '2025-09-01'].map((date, index) => (
//             <div key={index} className="flex items-center space-x-4 opacity-100 text-black">
//               <div className="w-3 h-3 bg-red-600 rounded-full"></div>
//               <div className="flex-1">
//                 <div className="flex justify-between">
//                   <span className="font-medium">{date}</span>
//                   <span className="font-bold">${currentUser.loans[0].monthlyPayment.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Principal vs Interest Breakdown */}
//   <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8">
//     <h3 className="text-xl font-bold mb-6 text-gray-800">Principal vs Interest Breakdown</h3>
//     <div className="grid lg:grid-cols-2 gap-8">
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={[
//                 { 
//                   name: 'Principal Paid', 
//                   value: currentUser.loans[0].principalPaid,
//                   color: '#10B981'
//                 },
//                 { 
//                   name: 'Interest Paid', 
//                   value: currentUser.loans[0].interestPaid,
//                   color: '#F59E0B'
//                 }
//               ]}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
//               outerRadius={100}
//               dataKey="value"
//             >
//               <Cell fill="#10B981" />
//               <Cell fill="#F59E0B" />
//             </Pie>
//             <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
      
//       <div className="space-y-6">
//         <div className="p-4 bg-green-50 rounded-lg">
//           <h4 className="font-bold text-green-800">Total Principal Paid</h4>
//           <p className="text-2xl font-bold text-green-600">
//             ${currentUser.loans[0].principalPaid.toLocaleString()}
//           </p>
//         </div>
//         <div className="p-4 bg-yellow-50 rounded-lg">
//           <h4 className="font-bold text-yellow-800">Total Interest Paid</h4>
//           <p className="text-2xl font-bold text-yellow-600">
//             ${currentUser.loans[0].interestPaid.toLocaleString()}
//           </p>
//         </div>
//         <div className="p-4 bg-blue-50 rounded-lg">
//           <h4 className="font-bold text-blue-800">Interest Savings</h4>
//           <p className="text-sm text-blue-600">
//             Early payments could save ${(currentUser.loans[0].currentBalance * 0.15).toLocaleString()} in interest
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>



// {/* CREDIT SCORE SECTION */}
// {/* Enhanced Credit Score & Reports Section */}
// <section className="mt-12">
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Credit Score & Reports</h2>
  
//   {/* Credit Score Trend Line Chart */}
//   <div className="grid lg:grid-cols-2 gap-8"style={{marginBottom:'48px'}}>
//     <div className="bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-6 text-gray-800">Credit Score Trend</h3>
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={currentUser.creditHistory?.scoreHistory || currentUser.creditScore.monthlyTrend}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis domain={[300, 850]} />
//             <Tooltip 
//               formatter={(value) => [value, 'Credit Score']}
//               labelFormatter={(label) => `Month: ${label}`}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="score" 
//               stroke="#8B5CF6" 
//               strokeWidth={3}
//               dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
//               activeDot={{ r: 8 }}
//             />
//             {/* Credit Score Ranges */}
//             <ReferenceLine y={580} stroke="#EF4444" strokeDasharray="5 5" label="Fair" />
//             <ReferenceLine y={670} stroke="#F59E0B" strokeDasharray="5 5" label="Good" />
//             <ReferenceLine y={740} stroke="#10B981" strokeDasharray="5 5" label="Very Good" />
//             <ReferenceLine y={800} stroke="#059669" strokeDasharray="5 5" label="Excellent" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>

//     {/* Credit Utilization Gauge */}
//     <div className="bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-6 text-gray-800">Credit Utilization</h3>
//       <div className="flex flex-col items-center">
//         <div className="relative w-48 h-48 mb-4">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: 'Used', value: currentUser.creditHistory?.utilizationRate || 23.4 },
//                   { name: 'Available', value: 100 - (currentUser.creditHistory?.utilizationRate || 23.4) }
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 startAngle={180}
//                 endAngle={0}
//                 innerRadius={70}
//                 outerRadius={90}
//                 dataKey="value"
//               >
//                 <Cell fill={(currentUser.creditHistory?.utilizationRate || 23.4) > 30 ? '#EF4444' : '#10B981'} />
//                 <Cell fill="#E5E7EB" />
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-3xl font-bold text-gray-800">
//               {currentUser.creditHistory?.utilizationRate || 23.4}%
//             </span>
//             <span className="text-sm text-gray-500">Utilized</span>
//           </div>
//         </div>
        
//         <div className="w-full space-y-2">
//           <div className="flex justify-between text-sm">
//             <span>Total Credit Used</span>
//             <span className="font-bold">${(currentUser.creditHistory?.totalCreditUsed || 5850).toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Total Credit Limit</span>
//             <span className="font-bold">${(currentUser.creditHistory?.totalCreditLimit || 25000).toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Available Credit</span>
//             <span className="font-bold text-green-600">
//               ${((currentUser.creditHistory?.totalCreditLimit || 25000) - (currentUser.creditHistory?.totalCreditUsed || 5850)).toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Visual Alerts Section */}
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Alerts & Notifications</h2>
//   <div className="bg-white shadow-2xl rounded-2xl p-6">
//     <h3 className="text-xl font-bold mb-6 text-gray-800">Credit Alerts & Notifications</h3>
//     <div className="space-y-4">
//       {(currentUser.creditHistory?.alerts || []).map((alert, index) => (
//         <div key={index} className={`p-4 rounded-lg border-l-4 ${
//           alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
//           alert.type === 'success' ? 'bg-green-50 border-green-400' :
//           alert.type === 'danger' ? 'bg-red-50 border-red-400' :
//           'bg-blue-50 border-blue-400'
//         }`}>
//           <div className="flex items-start space-x-3">
//             <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//               alert.type === 'warning' ? 'bg-yellow-400' :
//               alert.type === 'success' ? 'bg-green-400' :
//               alert.type === 'danger' ? 'bg-red-400' :
//               'bg-blue-400'
//             }`}>
//               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {alert.type === 'warning' && (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 )}
//                 {alert.type === 'success' && (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 )}
//                 {alert.type === 'danger' && (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 )}
//                 {alert.type === 'info' && (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 )}
//               </svg>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-bold text-gray-800">{alert.title}</h4>
//               <p className="text-sm text-gray-600">{alert.message}</p>
//               <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
//             </div>
//           </div>
//         </div>
//       ))}
      
//       {/* Default alerts if none exist */}
//       {(!currentUser.creditHistory?.alerts || currentUser.creditHistory.alerts.length === 0) && (
//         <div className="text-center py-8">
//           <div className="text-4xl mb-4">🔔</div>
//           <div className="text-lg font-medium mb-2 text-gray-800">No Recent Alerts</div>
//           <div className="text-sm text-gray-600">Your credit profile is stable with no recent changes</div>
//         </div>
//       )}
//     </div>
//   </div>
// </section>

// {/* COMPREHENSIVE ALERTS & NOTIFICATIONS SECTION */}
// <section className="mt-12">
//   {/* Alert Summary Cards */}
//   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//     <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//       <div className="text-2xl font-bold text-red-600">2</div>
//       <div className="text-sm text-red-700">Critical Alerts</div>
//     </div>
//     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//       <div className="text-2xl font-bold text-yellow-600">5</div>
//       <div className="text-sm text-yellow-700">Warnings</div>
//     </div>
//     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
//       <div className="text-2xl font-bold text-blue-600">3</div>
//       <div className="text-sm text-blue-700">Info Updates</div>
//     </div>
//     <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
//       <div className="text-2xl font-bold text-green-600">1</div>
//       <div className="text-sm text-green-700">Good News</div>
//     </div>
//   </div>

//   {/* All Alerts Combined */}
//   <div className="bg-white shadow-2xl rounded-2xl p-6">
//     <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Alerts & Notifications</h3>
//     <div className="space-y-4 max-h-96 overflow-y-auto">
      
//       {/* Low Balance Alerts */}
//       <div className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
//             <span className="text-white">⚠️</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Low Balance Alert</h4>
//             <p className="text-sm text-gray-600">Your Checking account balance is below $500</p>
//             <p className="text-xs text-gray-500 mt-1">Today, 7:23 AM</p>
//           </div>
//           <div className="text-right">
//             <span className="text-lg font-bold text-yellow-600">$450.25</span>
//             <p className="text-xs text-gray-500">Current Balance</p>
//           </div>
//         </div>
//       </div>

//       {/* Large Transaction Alert */}
//       <div className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
//             <span className="text-white">💰</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Large Transaction Detected</h4>
//             <p className="text-sm text-gray-600">Transaction of $2,918.32 for Mortgage Payment processed</p>
//             <p className="text-xs text-gray-500 mt-1">June 1, 2025</p>
//           </div>
//           <div className="text-right">
//             <span className="text-lg font-bold text-blue-600">-$2,918.32</span>
//             <p className="text-xs text-gray-500">Auto Payment</p>
//           </div>
//         </div>
//       </div>

//       {/* Suspicious Activity Alert */}
//       <div className="p-4 rounded-lg border-l-4 bg-red-50 border-red-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
//             <span className="text-white">🔒</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Suspicious Activity Detected</h4>
//             <p className="text-sm text-gray-600">Login attempt from unrecognized device in New York</p>
//             <p className="text-xs text-gray-500 mt-1">June 2, 2025 - 11:45 PM</p>
//           </div>
//           <div className="text-right">
//             <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
//               Review
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Budget Alert */}
//       <div className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
//             <span className="text-white">📊</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Budget Exceeded</h4>
//             <p className="text-sm text-gray-600">You've exceeded your Transportation budget by $74.75</p>
//             <p className="text-xs text-gray-500 mt-1">May 30, 2025</p>
//           </div>
//           <div className="text-right">
//             <span className="text-lg font-bold text-yellow-600">107.9%</span>
//             <p className="text-xs text-gray-500">of Budget Used</p>
//           </div>
//         </div>
//       </div>

//       {/* Credit Score Improvement */}
//       <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
//             <span className="text-white">📈</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Credit Score Improved</h4>
//             <p className="text-sm text-gray-600">Your credit score increased by 13 points this month!</p>
//             <p className="text-xs text-gray-500 mt-1">June 1, 2025</p>
//           </div>
//           <div className="text-right">
//             <span className="text-lg font-bold text-green-600">+13</span>
//             <p className="text-xs text-gray-500">Points</p>
//           </div>
//         </div>
//       </div>

//       {/* Payment Reminder */}
//       <div className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-400">
//         <div className="flex items-start space-x-3">
//           <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
//             <span className="text-white">📅</span>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">Payment Due Reminder</h4>
//             <p className="text-sm text-gray-600">Auto loan payment of $648.50 is due in 7 days</p>
//             <p className="text-xs text-gray-500 mt-1">Due: July 10, 2025</p>
//           </div>
//           <div className="text-right">
//             <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   </div>
// </section>

// {/* INSURANCE SECTION */}
// <section className="mt-12">
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Insurance Coverage</h2>
  
//   {/* Insurance Overview */}
//   <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8">
//     <div className="flex items-center justify-between mb-6">
//       <h3 className="text-xl font-bold text-gray-800">Total Annual Premiums</h3>
//       <div className="text-3xl font-bold text-blue-600">
//         ${currentUser.insurance.totalPremiums.toLocaleString()}
//       </div>
//     </div>
    
//     {/* Insurance Policies Grid */}
//     <div className="grid lg:grid-cols-2 gap-6">
//       {currentUser.insurance.policies.map((policy) => (
//         <div key={policy.id} className="border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800">{policy.type}</h4>
//               <p className="text-sm text-gray-600">{policy.provider}</p>
//               <p className="text-xs text-gray-500">Policy: {policy.policyNumber}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-xl font-bold text-gray-800">
//                 ${policy.premium.toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-600">Annual Premium</p>
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Deductible</span>
//               <span className="font-medium">${policy.deductible?.toLocaleString() || 'N/A'}</span>
//             </div>
            
//             {policy.type === "Auto Insurance" && policy.vehicles && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Vehicle: </span>
//                 <span className="font-medium">
//                   {policy.vehicles[0].year} {policy.vehicles[0].make} {policy.vehicles[0].model}
//                 </span>
//               </div>
//             )}
            
//             {policy.type === "Life Insurance" && (
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Coverage Amount</span>
//                 <span className="font-medium">${policy.faceValue?.toLocaleString()}</span>
//               </div>
//             )}
            
//             {policy.discounts && policy.discounts.length > 0 && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Discounts: </span>
//                 <span className="font-medium text-green-600">
//                   {policy.discounts.join(', ')}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
  
//   {/* Claims History */}
//   {currentUser.insurance.claimsHistory.length > 0 && (
//     <div className="bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Claims</h3>
//       <div className="space-y-4">
//         {currentUser.insurance.claimsHistory.map((claim, index) => (
//           <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//             <div>
//               <p className="font-medium text-gray-800">{claim.description}</p>
//               <p className="text-sm text-gray-600">{claim.type} • {new Date(claim.date).toLocaleDateString()}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-bold text-gray-800">${claim.amount.toLocaleString()}</p>
//               <p className={`text-sm ${claim.status === 'Settled' || claim.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
//                 {claim.status}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}
// </section>

//         {/* Quick Actions */}
//         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { name: "Transfer Money", icon: "↔️", color: "bg-blue-500" },
//             { name: "Pay Bills", icon: "💳", color: "bg-green-500" },
//             { name: "Deposit Check", icon: "📄", color: "bg-purple-500" },
//             { name: "Find ATM", icon: "🏧", color: "bg-orange-500" }
//           ].map((action, index) => (
//             <button
//               key={index}
//               className={`${action.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
//             >
//               <div className="text-2xl mb-2">{action.icon}</div>
//               <div className="text-sm font-semibold">{action.name}</div>
//             </button>
//           ))}
//         </div>

//         {/* COMPARISON AND RECOMMENDATIONS SECTION */}
// <section className="mt-12">
//   <h2 className="text-3xl font-bold mb-8 text-gray-800">Comparison & Recommendations</h2>
  
//   {/* Spending Comparison */}
//   <div className="grid lg:grid-cols-2 gap-8 mb-8">
//     {/* Period Comparison Chart */}
//     <div className="bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-6 text-gray-800">Spending Comparison</h3>
      
//       {/* Time Period Selector */}
//       <div className="flex space-x-2 mb-6">
//         {['This Month vs Last Month', 'This Quarter vs Last Quarter', 'This Year vs Last Year'].map((period, index) => (
//           <button
//             key={index}
//             className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
//               index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {period.split(' vs ')[0]}
//           </button>
//         ))}
//       </div>

//       {/* Comparison Chart */}
//       <div className="h-64">
//         <div className="flex items-end justify-between h-full space-x-4">
//           {currentUser.comparison.spendingComparison.currentPeriod.map((data, index) => {
//             const maxValue = Math.max(data.current, data.previous, data.avgUsers);
//             const currentHeight = (data.current / maxValue) * 100;
//             const previousHeight = (data.previous / maxValue) * 100;
//             const avgHeight = (data.avgUsers / maxValue) * 100;
            
//             return (
//               <div key={index} className="flex-1 flex flex-col items-center space-y-2">
//                 <div className="flex items-end space-x-1 h-48">
//                   {/* Current Month */}
//                   <div
//                     className="w-6 rounded-t transition-all duration-1000 bg-blue-600"
//                     style={{ height: `${currentHeight}%`, minHeight: '4px' }}
//                     title={`Current: $${data.current}`}
//                   ></div>
//                   {/* Previous Month */}
//                   <div
//                     className="w-6 rounded-t transition-all duration-1000 bg-gray-400"
//                     style={{ height: `${previousHeight}%`, minHeight: '4px' }}
//                     title={`Previous: $${data.previous}`}
//                   ></div>
//                   {/* Average Users */}
//                   <div
//                     className="w-6 rounded-t transition-all duration-1000 bg-green-500"
//                     style={{ height: `${avgHeight}%`, minHeight: '4px' }}
//                     title={`Avg Users: $${data.avgUsers}`}
//                   ></div>
//                 </div>
//                 <div className="text-xs text-center text-gray-600">
//                   {data.category}
//                 </div>
//                 <div className="text-xs text-center space-y-1">
//                   <div className="text-blue-600 font-bold">${data.current}</div>
//                   <div className={`text-xs ${data.current > data.previous ? 'text-red-500' : 'text-green-500'}`}>
//                     {data.current > data.previous ? '↗' : '↘'} {Math.abs(((data.current - data.previous) / data.previous * 100)).toFixed(0)}%
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Legend */}
//         <div className="flex items-center justify-center space-x-6 mt-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 rounded bg-blue-600"></div>
//             <span className="text-sm text-gray-600">This Month</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 rounded bg-gray-400"></div>
//             <span className="text-sm text-gray-600">Last Month</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 rounded bg-green-500"></div>
//             <span className="text-sm text-gray-600">Average Users</span>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Benchmark Comparison */}
//     <div className="bg-white shadow-2xl rounded-2xl p-6">
//       <h3 className="text-xl font-bold mb-6 text-gray-800">How You Compare</h3>
      
//       <div className="space-y-6">
//         {currentUser.comparison.spendingComparison.benchmarks.map((item, index) => (
//           <div key={index} className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">{item.icon}</span>
//                 <div>
//                   <div className="font-medium text-gray-800">{item.metric}</div>
//                   <div className="text-sm text-gray-600">
//                     You: <span className="font-bold">{item.yourValue.toLocaleString()}{item.suffix || ''}</span> | 
//                     Avg: <span className="font-bold">{item.benchmark.toLocaleString()}{item.suffix || ''}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className={`text-lg font-bold ${item.status === 'above' ? 'text-green-600' : 'text-blue-600'}`}>
//                   {item.percentile}th
//                 </div>
//                 <div className="text-xs text-gray-500">percentile</div>
//               </div>
//             </div>
            
//             {/* Progress Bar */}
//             <div className="w-full h-3 bg-gray-200 rounded-full">
//               <div
//                 className={`h-3 rounded-full transition-all duration-1000 ${
//                   item.status === 'above' ? 'bg-green-500' : 'bg-blue-500'
//                 }`}
//                 style={{ width: `${item.percentile}%` }}
//               ></div>
//             </div>
            
//             <div className={`text-sm ${item.status === 'above' ? 'text-green-600' : 'text-blue-600'}`}>
//               {item.status === 'above' 
//                 ? `You're doing better than ${item.percentile}% of users` 
//                 : `You're in the top ${100 - item.percentile}% for this metric`
//               }
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>

//   {/* Personalized Recommendations */}
//   <div className="bg-white shadow-2xl rounded-2xl p-6">
//     <h3 className="text-xl font-bold mb-6 text-gray-800">Personalized Recommendations</h3>
    
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Saving Recommendations */}
//       <div className="space-y-4">
//         <h4 className="text-lg font-semibold text-green-600 flex items-center space-x-2">
//           <span>💰</span>
//           <span>Saving Opportunities</span>
//         </h4>
        
//         {currentUser.comparison.recommendations.savingOpportunities.map((rec, index) => (
//           <div key={index} className="p-4 border border-green-200 rounded-lg bg-green-50">
//             <div className="flex items-start space-x-3">
//               <span className="text-2xl">{rec.icon}</span>
//               <div className="flex-1">
//                 <h5 className="font-medium text-gray-800">{rec.title}</h5>
//                 <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
//                 <p className="text-xs text-gray-500 mt-2">{rec.action}</p>
//                 <div className="flex items-center justify-between mt-3">
//                   <span className="text-sm font-bold text-green-600">
//                     Save ${rec.potential}/year
//                   </span>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {rec.difficulty}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Investment Recommendations */}
//       <div className="space-y-4">
//         <h4 className="text-lg font-semibold text-blue-600 flex items-center space-x-2">
//           <span>📈</span>
//           <span>Investment Opportunities</span>
//         </h4>
        
//         {currentUser.comparison.recommendations.investmentOpportunities.map((rec, index) => (
//           <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
//             <div className="flex items-start space-x-3">
//               <span className="text-2xl">{rec.icon}</span>
//               <div className="flex-1">
//                 <h5 className="font-medium text-gray-800">{rec.title}</h5>
//                 <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
//                 <p className="text-xs text-gray-500 mt-2">{rec.action}</p>
//                 <div className="flex items-center justify-between mt-3">
//                   <span className="text-sm font-bold text-blue-600">
//                     +${rec.potential}/year potential
//                   </span>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     rec.risk === 'None' ? 'bg-green-100 text-green-700' :
//                     rec.risk === 'Low' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {rec.risk} Risk
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Financial Health Tips */}
//       <div className="space-y-4">
//         <h4 className="text-lg font-semibold text-purple-600 flex items-center space-x-2">
//           <span>🎯</span>
//           <span>Financial Health Tips</span>
//         </h4>
        
//         {currentUser.comparison.recommendations.financialHealthTips.map((rec, index) => (
//           <div key={index} className={`p-4 border rounded-lg ${
//             rec.status === 'excellent' ? 'border-green-200 bg-green-50' :
//             rec.status === 'priority' ? 'border-red-200 bg-red-50' :
//             rec.status === 'review' ? 'border-yellow-200 bg-yellow-50' :
//             'border-purple-200 bg-purple-50'
//           }`}>
//             <div className="flex items-start space-x-3">
//               <span className="text-2xl">{rec.icon}</span>
//               <div className="flex-1">
//                 <h5 className="font-medium text-gray-800">{rec.title}</h5>
//                 <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
//                 <p className="text-xs text-gray-500 mt-2">{rec.action}</p>
//                 <div className="mt-3">
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     rec.status === 'excellent' ? 'bg-green-100 text-green-700' :
//                     rec.status === 'priority' ? 'bg-red-100 text-red-700' :
//                     rec.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
//                     'bg-purple-100 text-purple-700'
//                   }`}>
//                     {rec.status === 'excellent' ? 'Excellent' :
//                      rec.status === 'priority' ? 'High Priority' :
//                      rec.status === 'review' ? 'Needs Review' : 'Consider'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>

//   {/* Action Summary */}
//   <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
//     <h3 className="text-xl font-bold mb-4">Potential Annual Impact</h3>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="text-center">
//         <div className="text-3xl font-bold">${currentUser.comparison.recommendations.potentialImpact.totalSavings.toLocaleString()}</div>
//         <div className="text-sm opacity-90">Potential Savings</div>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold">${currentUser.comparison.recommendations.potentialImpact.investmentGrowth.toLocaleString()}</div>
//         <div className="text-sm opacity-90">Investment Growth</div>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold">${currentUser.comparison.recommendations.potentialImpact.totalGain.toLocaleString()}</div>
//         <div className="text-sm opacity-90">Total Potential Gain</div>
//       </div>
//     </div>
//     <div className="mt-4 text-center">
//       <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
//         Create Action Plan
//       </button>
//     </div>
//   </div>
// </section>
//       </div>
//     </section>
  
//   );
// };

// export default LandingPage;





//Spuer admin
import React, { useState, useEffect } from 'react';
import { 
  Search, User, Users, DollarSign, TrendingUp, TrendingDown, 
  Calendar, Phone, Mail, FileText, Settings, AlertTriangle,
  CheckCircle, XCircle, Clock, BarChart3, PieChart, Target,
  Briefcase, CreditCard, Building, Home, Car, GraduationCap,
  MessageSquare, Video, Edit, Plus, Filter, Download, Upload,
  ArrowUp, ArrowDown, ArrowRight, Star, MapPin, Shield,
  Activity, Zap, Globe, Award, BookOpen, Bell, ArrowUpDown,
  Eye, Flag, ArrowLeft, Server, Database, Lock, Unlock,
  UserCheck, UserX, RefreshCw, HardDrive, Wifi, WifiOff,
  AlertCircle, TrendingUp as TrendUp, Monitor, Key, FileCheck,
  BarChart, LineChart, PieChart as Pie, Gauge, Power, PowerOff,
  UserPlus, UserMinus, RotateCcw, Save, Trash2, Copy
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUserType, setFilterUserType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState('24h');
  const [isQuickActionsCollapsed, setIsQuickActionsCollapsed] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showSecurityEventModal, setShowSecurityEventModal] = useState(false);
  const [selectedSecurityEvent, setSelectedSecurityEvent] = useState(null);
  

  // Mock data for Super Admin Dashboard
  const superAdminData = {
    systemOverview: {
      bankWideMetrics: {
        totalDeposits: 2450000000,
        totalLoans: 1850000000,
        activeAccounts: 125000,
        totalRevenue: 45000000,
        netProfit: 12500000,
        totalUsers: 15420,
        activeUsers: 12850,
        systemUptime: 99.97
      },
      systemHealth: {
        serverUptime: 99.97,
        avgResponseTime: 145,
        errorRate: 0.02,
        transactionThroughput: 2450,
        cpuUsage: 68,
        memoryUsage: 72,
        diskUsage: 45,
        networkLatency: 23
      },
      recentActivity: {
        totalLogins: 8420,
        failedLogins: 127,
        newAccounts: 45,
        suspiciousActivities: 8,
        systemChanges: 12
      }
    },

    userManagement: {
      userStats: {
        totalEmployees: 1250,
        activeEmployees: 1180,
        customers: 124500,
        activeCustomers: 118200,
        adminUsers: 25,
        suspendedUsers: 85
      },
      userList: [
        {
          id: "EMP-001",
          name: "Alexandra Chen",
          email: "a.chen@bank.com",
          role: "Account Manager",
          department: "Private Banking",
          status: "Active",
          lastLogin: "2024-06-05 09:15",
          loginCount: 1250,
          permissions: ["read_customer_data", "create_accounts", "schedule_meetings"],
          createdDate: "2019-03-15",
          lastActivity: "2024-06-05 14:30"
        },
        {
          id: "EMP-002",
          name: "Michael Rodriguez",
          email: "m.rodriguez@bank.com",
          role: "Loan Officer",
          department: "Commercial Lending",
          status: "Active",
          lastLogin: "2024-06-05 08:45",
          loginCount: 980,
          permissions: ["read_loan_data", "approve_loans", "risk_assessment"],
          createdDate: "2020-07-22",
          lastActivity: "2024-06-05 13:20"
        },
        {
          id: "EMP-003",
          name: "Sarah Johnson",
          email: "s.johnson@bank.com",
          role: "Compliance Officer",
          department: "Risk & Compliance",
          status: "Active",
          lastLogin: "2024-06-05 07:30",
          loginCount: 1450,
          permissions: ["full_audit_access", "compliance_reports", "user_management"],
          createdDate: "2018-11-08",
          lastActivity: "2024-06-05 15:45"
        },
        {
          id: "CUST-001",
          name: "Robert Martinez",
          email: "r.martinez@email.com",
          role: "Customer",
          department: "N/A",
          status: "Active",
          lastLogin: "2024-06-04 19:20",
          loginCount: 245,
          permissions: ["view_own_accounts", "transfer_funds", "pay_bills"],
          createdDate: "2021-05-12",
          lastActivity: "2024-06-04 19:35"
        },
        {
          id: "EMP-004",
          name: "David Kim",
          email: "d.kim@bank.com",
          role: "IT Administrator",
          department: "Information Technology",
          status: "Suspended",
          lastLogin: "2024-06-01 16:45",
          loginCount: 2100,
          permissions: ["system_admin", "user_management", "security_config"],
          createdDate: "2017-02-28",
          lastActivity: "2024-06-01 17:30"
        }
      ],
      roleDefinitions: [
        {
          role: "Super Admin",
          userCount: 3,
          permissions: ["full_system_access", "user_management", "system_config", "audit_logs"],
          description: "Complete system access and control"
        },
        {
          role: "Account Manager",
          userCount: 45,
          permissions: ["customer_management", "account_operations", "reporting"],
          description: "Customer relationship and account management"
        },
        {
          role: "Loan Officer",
          userCount: 32,
          permissions: ["loan_processing", "credit_analysis", "approval_workflows"],
          description: "Loan origination and management"
        },
        {
          role: "Compliance Officer",
          userCount: 12,
          permissions: ["compliance_monitoring", "audit_access", "regulatory_reporting"],
          description: "Regulatory compliance and risk monitoring"
        },
        {
          role: "Customer",
          userCount: 124500,
          permissions: ["account_access", "transaction_history", "bill_payment"],
          description: "Standard customer banking access"
        }
      ]
    },

    complianceAndSecurity: {
      fraudDetection: {
        totalAlerts: 156,
        highRiskAlerts: 23,
        mediumRiskAlerts: 87,
        lowRiskAlerts: 46,
        resolvedToday: 34,
        pendingInvestigation: 89
      },
      securityMetrics: {
        failedLoginAttempts: 127,
        blockedIPs: 45,
        suspiciousTransactions: 23,
        securityIncidents: 2,
        vulnerabilitiesFound: 8,
        patchesApplied: 15
      },
      complianceStatus: {
        kycCompliance: 98.5,
        amlCompliance: 99.2,
        regulatoryReports: 12,
        auditFindings: 3,
        complianceScore: 96.8
      },
      recentSecurityEvents: [
        {
          id: "SEC-001",
          type: "Failed Login Attempt",
          severity: "Medium",
          description: "Multiple failed login attempts from IP 192.168.1.100",
          timestamp: "2024-06-05 14:30",
          status: "Investigating",
          affectedUser: "EMP-004"
        },
        {
          id: "SEC-002",
          type: "Suspicious Transaction",
          severity: "High",
          description: "Large wire transfer outside normal pattern",
          timestamp: "2024-06-05 13:45",
          status: "Under Review",
          affectedUser: "CUST-789"
        },
        {
          id: "SEC-003",
          type: "Permission Change",
          severity: "Low",
          description: "User role updated for employee",
          timestamp: "2024-06-05 12:15",
          status: "Completed",
          affectedUser: "EMP-025"
        }
      ]
    },

    financialReporting: {
      profitLoss: {
        totalRevenue: 45000000,
        totalExpenses: 32500000,
        netIncome: 12500000,
        operatingIncome: 15200000,
        interestIncome: 28000000,
        feeIncome: 17000000,
        operatingExpenses: 25000000,
        provisionForLosses: 7500000
      },
      riskManagement: {
        creditRisk: {
          totalExposure: 1850000000,
          nonPerformingLoans: 92500000,
          nplRatio: 5.0,
          provisioning: 55500000,
          riskWeightedAssets: 2100000000
        },
        marketRisk: {
          var95: 2500000,
          interestRateRisk: 1200000,
          currencyRisk: 800000,
          equityRisk: 500000
        },
        operationalRisk: {
          riskEvents: 12,
          totalLosses: 450000,
          avgLossPerEvent: 37500,
          riskCapital: 25000000
        }
      },
      capitalAdequacy: {
        tier1Capital: 185000000,
        tier2Capital: 95000000,
        totalCapital: 280000000,
        riskWeightedAssets: 2100000000,
        capitalRatio: 13.33,
        tier1Ratio: 8.81,
        leverageRatio: 6.2
      },
      performanceMetrics: {
        roa: 1.25,
        roe: 15.8,
        nim: 3.2,
        costToIncomeRatio: 65.5,
        efficiencyRatio: 58.2
      }
    },

    systemConfiguration: {
      systemParameters: {
        interestRates: {
          savingsRate: 2.5,
          checkingRate: 0.1,
          loanBaseRate: 5.25,
          mortgageRate: 4.75,
          creditCardRate: 18.99
        },
        fees: {
          wireTransferFee: 25,
          overdraftFee: 35,
          monthlyMaintenanceFee: 12,
          atmFee: 3,
          foreignTransactionFee: 2.5
        },
        limits: {
          dailyWithdrawalLimit: 1000,
          dailyTransferLimit: 10000,
          monthlyTransferLimit: 50000,
          checkDepositLimit: 25000
        },
        securitySettings: {
          passwordExpiry: 90,
          maxLoginAttempts: 3,
          sessionTimeout: 30,
          twoFactorRequired: true,
          ipWhitelistEnabled: false
        }
      },
      backupStatus: {
        lastFullBackup: "2024-06-05 02:00",
        lastIncrementalBackup: "2024-06-05 14:00",
        backupSize: "2.5 TB",
        backupStatus: "Successful",
        retentionPeriod: "7 years",
        offSiteBackup: "Enabled"
      },
      systemMaintenance: {
        nextScheduledMaintenance: "2024-06-08 02:00",
        lastMaintenance: "2024-06-01 02:00",
        maintenanceWindow: "02:00 - 06:00",
        estimatedDowntime: "4 hours",
        affectedServices: ["Online Banking", "Mobile App", "ATM Network"]
      }
    },

    auditLogs: [
      {
        id: "AUDIT-001",
        timestamp: "2024-06-05 14:45",
        user: "admin@bank.com",
        action: "User Role Updated",
        details: "Changed role from Loan Officer to Senior Loan Officer for user EMP-025",
        ipAddress: "192.168.1.50",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success"
      },
      {
        id: "AUDIT-002",
        timestamp: "2024-06-05 14:30",
        user: "s.johnson@bank.com",
        action: "Compliance Report Generated",
        details: "Generated monthly AML compliance report",
        ipAddress: "192.168.1.75",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success"
      },
      {
        id: "AUDIT-003",
        timestamp: "2024-06-05 13:15",
        user: "system",
        action: "System Configuration Changed",
        details: "Updated daily withdrawal limit from $800 to $1000",
        ipAddress: "127.0.0.1",
        userAgent: "System Process",
        status: "Success"
      },
      {
        id: "AUDIT-004",
        timestamp: "2024-06-05 12:45",
        user: "d.kim@bank.com",
        action: "Failed Login Attempt",
        details: "Multiple failed login attempts - account temporarily locked",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Failed"
      }
    ]
  };

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'Suspended': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'Pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'Low': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400';
      case 'Account Manager': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'Loan Officer': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'Compliance Officer': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400';
      case 'Customer': return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = superAdminData.userManagement.userList.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setShowSearchResults(false);
    setSearchQuery('');
    setShowUserDetails(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };
  
  const handleViewSecurityEvent = (event) => {
    setSelectedSecurityEvent(event);
    setShowSecurityEventModal(true);
  };
  
  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 100) + 12800,
        transactionThroughput: Math.floor(Math.random() * 500) + 2200,
        systemLoad: Math.floor(Math.random() * 20) + 60
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredUsers = superAdminData.userManagement.userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterUserType === 'all' || 
                       (filterUserType === 'employees' && ['Account Manager', 'Loan Officer', 'Compliance Officer', 'IT Administrator'].includes(user.role)) ||
                       (filterUserType === 'customers' && user.role === 'Customer') ||
                       (filterUserType === 'admins' && ['Super Admin', 'Admin'].includes(user.role)) ||
                       (filterUserType === 'suspended' && user.status === 'Suspended');
                       
    return matchesSearch && matchesType;
  });
  
  const filteredSecurityEvents = superAdminData.complianceAndSecurity.recentSecurityEvents.filter(event => {
    const matchesSeverity = filterSeverity === 'all' || event.severity.toLowerCase() === filterSeverity.toLowerCase();
    return matchesSeverity;
  });
  
  const filteredAuditLogs = superAdminData.auditLogs.filter(log => {
    const matchesAction = filterAction === 'all' || 
                         (filterAction === 'user_management' && log.action.toLowerCase().includes('user')) ||
                         (filterAction === 'system_configuration' && log.action.toLowerCase().includes('config')) ||
                         (filterAction === 'security_events' && log.action.toLowerCase().includes('security')) ||
                         (filterAction === 'financial_operations' && log.action.toLowerCase().includes('financial'));
    
    return matchesAction;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white">Super Admin Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                System-wide monitoring and administration
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users, logs, configurations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map(user => (
                      <div
                        key={user.id}
                        onClick={() => selectUser(user)}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-black dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 dark:text-gray-400">No users found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* System Status Bar */}
          <div className="grid grid-cols-6 gap-6 mt-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">System Uptime</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">
                    {superAdminData.systemOverview.systemHealth.serverUptime}%
                  </p>
                </div>
                <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Active Users</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatNumber(realTimeData.activeUsers || superAdminData.systemOverview.bankWideMetrics.activeUsers)}
                  </p>
                </div>
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Transactions/min</p>
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                    {formatNumber(realTimeData.transactionThroughput || superAdminData.systemOverview.systemHealth.transactionThroughput)}
                  </p>
                </div>
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Security Alerts</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
                    {superAdminData.complianceAndSecurity.fraudDetection.highRiskAlerts}
                  </p>
                </div>
                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">Failed Logins</p>
                  <p className="text-xl font-bold text-red-700 dark:text-red-300">
                    {superAdminData.systemOverview.recentActivity.failedLogins}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">System Load</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    {realTimeData.systemLoad || superAdminData.systemOverview.systemHealth.cpuUsage}%
                  </p>
                </div>
                <Gauge className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'System Overview', icon: Monitor },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'security', label: 'Security & Compliance', icon: Shield },
              { id: 'financial', label: 'Financial Reports', icon: BarChart3 },
              { id: 'configuration', label: 'System Config', icon: Settings },
              { id: 'audit', label: 'Audit Logs', icon: FileCheck }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* System Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Bank-wide Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Deposits</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(superAdminData.systemOverview.bankWideMetrics.totalDeposits)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 ml-1">+5.2% from last month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Loans</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(superAdminData.systemOverview.bankWideMetrics.totalLoans)}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 ml-1">+3.8% from last month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Accounts</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatNumber(superAdminData.systemOverview.bankWideMetrics.activeAccounts)}
                    </p>
                    </div>
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-600 dark:text-green-400 ml-1">+2.1% from last month</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Net Profit</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {formatCurrency(superAdminData.systemOverview.bankWideMetrics.netProfit)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-600 dark:text-green-400 ml-1">+8.5% from last month</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Health Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full"
                        style={{ width: `${superAdminData.systemOverview.systemHealth.serverUptime}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white w-12">
                      {superAdminData.systemOverview.systemHealth.serverUptime}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          superAdminData.systemOverview.systemHealth.cpuUsage > 80 
                            ? 'bg-red-600 dark:bg-red-400' 
                            : superAdminData.systemOverview.systemHealth.cpuUsage > 60 
                            ? 'bg-yellow-600 dark:bg-yellow-400' 
                            : 'bg-green-600 dark:bg-green-400'
                        }`}
                        style={{ width: `${superAdminData.systemOverview.systemHealth.cpuUsage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white w-12">
                      {superAdminData.systemOverview.systemHealth.cpuUsage}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          superAdminData.systemOverview.systemHealth.memoryUsage > 80 
                            ? 'bg-red-600 dark:bg-red-400' 
                            : superAdminData.systemOverview.systemHealth.memoryUsage > 60 
                            ? 'bg-yellow-600 dark:bg-yellow-400' 
                            : 'bg-green-600 dark:bg-green-400'
                        }`}
                        style={{ width: `${superAdminData.systemOverview.systemHealth.memoryUsage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white w-12">
                      {superAdminData.systemOverview.systemHealth.memoryUsage}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Disk Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                        style={{ width: `${superAdminData.systemOverview.systemHealth.diskUsage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white w-12">
                      {superAdminData.systemOverview.systemHealth.diskUsage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {superAdminData.systemOverview.systemHealth.avgResponseTime}ms
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {superAdminData.systemOverview.systemHealth.errorRate}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Error Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatNumber(superAdminData.systemOverview.systemHealth.transactionThroughput)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transactions/min</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {superAdminData.systemOverview.systemHealth.networkLatency}ms
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Network Latency</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Recent Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {formatNumber(superAdminData.systemOverview.recentActivity.totalLogins)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Logins Today</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {superAdminData.systemOverview.recentActivity.failedLogins}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {superAdminData.systemOverview.recentActivity.newAccounts}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">New Accounts</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {superAdminData.systemOverview.recentActivity.suspiciousActivities}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Security Alerts</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {superAdminData.systemOverview.recentActivity.systemChanges}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">System Changes</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatNumber(superAdminData.userManagement.userStats.totalEmployees)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Employees</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatNumber(superAdminData.userManagement.userStats.activeEmployees)}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatNumber(superAdminData.userManagement.userStats.customers)}
                    </p>
                  </div>
                  <User className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Customers</p>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {formatNumber(superAdminData.userManagement.userStats.activeCustomers)}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Admin Users</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {superAdminData.userManagement.userStats.adminUsers}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {superAdminData.userManagement.userStats.suspendedUsers}
                    </p>
                  </div>
                  <UserX className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            
            {/* User List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
  <h3 className="text-lg font-semibold text-black dark:text-white">User Management</h3>
  <div className="flex space-x-2">
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700"
    />
    <select
      value={filterUserType}
      onChange={(e) => setFilterUserType(e.target.value)}
      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700"
    >
      <option value="all">All Users</option>
      <option value="employees">Employees</option>
      <option value="customers">Customers</option>
      <option value="admins">Admins</option>
      <option value="suspended">Suspended</option>
    </select>
    <button 
      onClick={() => setShowUserModal(true)}
      className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
    >
      <UserPlus className="h-4 w-4 inline mr-1" />
      Add User
    </button>
  </div>
</div>

              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black dark:text-white">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => selectUser(user)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
  onClick={() => handleEditUser(user)}
  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
>
  <Edit className="h-4 w-4" />
</button>
                            {user.status === 'Active' ? (
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                <UserX className="h-4 w-4" />
                              </button>
                            ) : (
                              <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                                <UserCheck className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Role Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Role Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {superAdminData.userManagement.roleDefinitions.map((role, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-black dark:text-white">{role.role}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{formatNumber(role.userCount)} users</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{role.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Permissions:</p>
                      {role.permissions.slice(0, 3).map((permission, permIdx) => (
                        <div key={permIdx} className="text-xs text-gray-500 dark:text-gray-400">
                          • {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      ))}
                      {role.permissions.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{role.permissions.length - 3} more permissions
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security & Compliance Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Security Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fraud Alerts</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {superAdminData.complianceAndSecurity.fraudDetection.totalAlerts}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {superAdminData.complianceAndSecurity.fraudDetection.highRiskAlerts} high risk
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {superAdminData.complianceAndSecurity.securityMetrics.failedLoginAttempts}
                    </p>
                  </div>
                  <Lock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-orange-600 dark:text-orange-400">
                    {superAdminData.complianceAndSecurity.securityMetrics.blockedIPs} IPs blocked
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compliance Score</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {superAdminData.complianceAndSecurity.complianceStatus.complianceScore}%
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Excellent rating
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Security Incidents</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {superAdminData.complianceAndSecurity.securityMetrics.securityIncidents}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    This month
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fraud Detection Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Fraud Detection Dashboard</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-300">High Risk Alerts</p>
                        <p className="text-sm text-red-600 dark:text-red-400">Require immediate attention</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {superAdminData.complianceAndSecurity.fraudDetection.highRiskAlerts}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-300">Medium Risk Alerts</p>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">Under investigation</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                      {superAdminData.complianceAndSecurity.fraudDetection.mediumRiskAlerts}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">Resolved Today</p>
                        <p className="text-sm text-green-600 dark:text-green-400">Successfully handled</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {superAdminData.complianceAndSecurity.fraudDetection.resolvedToday}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Compliance Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">KYC Compliance</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {superAdminData.complianceAndSecurity.complianceStatus.kycCompliance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full"
                        style={{ width: `${superAdminData.complianceAndSecurity.complianceStatus.kycCompliance}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">AML Compliance</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {superAdminData.complianceAndSecurity.complianceStatus.amlCompliance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full"
                        style={{ width: `${superAdminData.complianceAndSecurity.complianceStatus.amlCompliance}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {superAdminData.complianceAndSecurity.complianceStatus.regulatoryReports}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reports Filed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {superAdminData.complianceAndSecurity.complianceStatus.auditFindings}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Audit Findings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Security Events */}
            {/* Recent Security Events */}
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-black dark:text-white">Recent Security Events</h3>
      <div className="flex space-x-4">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700"
        >
          <option value="all">All Severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700">
          <option>All Users</option>
          <option>Admin Users</option>
          <option>System</option>
        </select>
        <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Custom Range</option>
        </select>
        <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600">
          <Download className="h-4 w-4 inline mr-1" />
          Export
        </button>
      </div>
    </div>
  </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSecurityEvents.map(event => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-black dark:text-white">{event.type}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{event.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black dark:text-white">{event.description}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">User: {event.affectedUser}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {event.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                          <button 
  onClick={() => handleViewSecurityEvent(event)}
  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
>
  <Eye className="h-4 w-4" />
</button>
                            <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                              <Flag className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Financial Reports Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(superAdminData.financialReporting.profitLoss.totalRevenue)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 ml-1">+12.5% YoY</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Net Income</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(superAdminData.financialReporting.profitLoss.netIncome)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 ml-1">+8.2% YoY</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ROA</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {superAdminData.financialReporting.performanceMetrics.roa}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Return on Assets</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ROE</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {superAdminData.financialReporting.performanceMetrics.roe}%
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Return on Equity</div>
                </div>
              </div>
            </div>
            
            {/* Profit & Loss Statement */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Profit & Loss Statement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">Revenue</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Interest Income</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.interestIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Fee Income</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.feeIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span className="text-sm font-medium text-black dark:text-white">Total Revenue</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.totalRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-3">Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Operating Expenses</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.operatingExpenses)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Provision for Losses</span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.provisionForLosses)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span className="text-sm font-medium text-black dark:text-white">Total Expenses</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(superAdminData.financialReporting.profitLoss.totalExpenses)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-black dark:text-white">Net Income</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(superAdminData.financialReporting.profitLoss.netIncome)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Risk Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Credit Risk</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Exposure</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {formatCurrency(superAdminData.financialReporting.riskManagement.creditRisk.totalExposure)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">NPL Ratio</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      {superAdminData.financialReporting.riskManagement.creditRisk.nplRatio}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Provisioning</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {formatCurrency(superAdminData.financialReporting.riskManagement.creditRisk.provisioning)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Market Risk</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">VaR (95%)</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {formatCurrency(superAdminData.financialReporting.riskManagement.marketRisk.var95)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Interest Rate Risk</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {formatCurrency(superAdminData.financialReporting.riskManagement.marketRisk.interestRateRisk)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Currency Risk</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {formatCurrency(superAdminData.financialReporting.riskManagement.marketRisk.currencyRisk)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Capital Adequacy</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Capital Ratio</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {superAdminData.financialReporting.capitalAdequacy.capitalRatio}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tier 1 Ratio</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {superAdminData.financialReporting.capitalAdequacy.tier1Ratio}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Leverage Ratio</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {superAdminData.financialReporting.capitalAdequacy.leverageRatio}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Configuration Tab */}
        {activeTab === 'configuration' && (
          <div className="space-y-6">
            {/* System Parameters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Interest Rates</h3>
                  <button 
                    onClick={() => setShowConfigModal(true)}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Savings Rate</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.interestRates.savingsRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Checking Rate</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.interestRates.checkingRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Loan Base Rate</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.interestRates.loanBaseRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mortgage Rate</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.interestRates.mortgageRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Credit Card Rate</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.interestRates.creditCardRate}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Fee Structure</h3>
                  <button 
  onClick={() => setShowFeeModal(true)}
  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
>
  <Edit className="h-4 w-4 inline mr-1" />
  Edit
</button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wire Transfer Fee</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${superAdminData.systemConfiguration.systemParameters.fees.wireTransferFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Overdraft Fee</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${superAdminData.systemConfiguration.systemParameters.fees.overdraftFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Maintenance</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${superAdminData.systemConfiguration.systemParameters.fees.monthlyMaintenanceFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ATM Fee</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${superAdminData.systemConfiguration.systemParameters.fees.atmFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Foreign Transaction</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.fees.foreignTransactionFee}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transaction Limits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Transaction Limits</h3>
                  <button 
  onClick={() => setShowLimitsModal(true)}
  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
>
  <Edit className="h-4 w-4 inline mr-1" />
  Edit
</button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Daily Withdrawal Limit</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${formatNumber(superAdminData.systemConfiguration.systemParameters.limits.dailyWithdrawalLimit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Daily Transfer Limit</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${formatNumber(superAdminData.systemConfiguration.systemParameters.limits.dailyTransferLimit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Transfer Limit</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${formatNumber(superAdminData.systemConfiguration.systemParameters.limits.monthlyTransferLimit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Check Deposit Limit</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      ${formatNumber(superAdminData.systemConfiguration.systemParameters.limits.checkDepositLimit)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Security Settings</h3>
                  <button 
  onClick={() => setShowSecurityModal(true)}
  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
>
  <Edit className="h-4 w-4 inline mr-1" />
  Edit
</button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Password Expiry</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.securitySettings.passwordExpiry} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Max Login Attempts</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.securitySettings.maxLoginAttempts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Session Timeout</span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {superAdminData.systemConfiguration.systemParameters.securitySettings.sessionTimeout} minutes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Two-Factor Auth</span>
                    <span className={`text-sm font-medium ${
                      superAdminData.systemConfiguration.systemParameters.securitySettings.twoFactorRequired 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {superAdminData.systemConfiguration.systemParameters.securitySettings.twoFactorRequired ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Backup and System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Backup Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">Last Full Backup</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {superAdminData.systemConfiguration.backupStatus.lastFullBackup}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {superAdminData.systemConfiguration.backupStatus.backupStatus}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-300">Last Incremental</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {superAdminData.systemConfiguration.backupStatus.lastIncrementalBackup}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {superAdminData.systemConfiguration.backupStatus.backupSize}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Retention Period</p>
                      <p className="font-medium text-black dark:text-white">
                        {superAdminData.systemConfiguration.backupStatus.retentionPeriod}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Off-site Backup</p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {superAdminData.systemConfiguration.backupStatus.offSiteBackup}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">System Maintenance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="font-medium text-orange-800 dark:text-orange-300">Next Maintenance</p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                          {superAdminData.systemConfiguration.systemMaintenance.nextScheduledMaintenance}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      {superAdminData.systemConfiguration.systemMaintenance.estimatedDowntime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Last Maintenance</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {superAdminData.systemConfiguration.systemMaintenance.lastMaintenance}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Affected Services:</p>
                    <div className="space-y-1">
                      {superAdminData.systemConfiguration.systemMaintenance.affectedServices.map((service, idx) => (
                        <div key={idx} className="text-sm text-black dark:text-white">• {service}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            {/* Audit Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">Audit Log Filters</h3>
                <div className="flex space-x-4">
  <select
    value={filterAction}
    onChange={(e) => setFilterAction(e.target.value)}
    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700"
  >
    <option value="all">All Actions</option>
    <option value="user_management">User Management</option>
    <option value="system_configuration">System Configuration</option>
    <option value="security_events">Security Events</option>
    <option value="financial_operations">Financial Operations</option>
  </select>
  <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700">
    <option>All Users</option>
    <option>Admin Users</option>
    <option>System</option>
  </select>
  <select
    value={filterTimeRange}
    onChange={(e) => setFilterTimeRange(e.target.value)}
    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-black dark:text-white bg-white dark:bg-gray-700"
  >
    <option value="24h">Last 24 Hours</option>
    <option value="7d">Last 7 Days</option>
    <option value="30d">Last 30 Days</option>
    <option value="custom">Custom Range</option>
  </select>
  <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600">
    <Download className="h-4 w-4 inline mr-1" />
    Export
  </button>
</div>
              </div>
            </div>
            
            {/* Audit Log Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredAuditLogs.map(log => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-black dark:text-white">{log.user}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{log.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-black dark:text-white">{log.action}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black dark:text-white max-w-xs truncate">{log.details}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {log.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            log.status === 'Success' 
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">User Details</h3>
                <button 
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">User ID:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Role:</span>
                      <span className={`text-sm px-2 py-1 rounded ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Department:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">Activity Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Login:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Login Count:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{formatNumber(selectedUser.loginCount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Activity:</span>
                      <span className="text-sm font-medium text-black dark:text-white">{selectedUser.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-black dark:text-white mb-3">Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUser.permissions.map((permission, idx) => (
                    <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button  onClick={() => handleEditUser(User)} className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit User
                </button>
                <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600">
                  <Key className="h-4 w-4 inline mr-1" />
                  Reset Password
                </button>
                {selectedUser.status === 'Active' ? (
                  <button className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 dark:hover:bg-red-600">
                    <UserX className="h-4 w-4 inline mr-1" />
                    Suspend User
                  </button>
                ) : (
                  <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600">
                    <UserCheck className="h-4 w-4 inline mr-1" />
                    Activate User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Event Details Modal */}
{showSecurityEventModal && selectedSecurityEvent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">Security Event Details</h3>
          <button 
            onClick={() => setShowSecurityEventModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Event Type</label>
            <p className="mt-1 text-sm text-black dark:text-white">{selectedSecurityEvent.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Severity</label>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              selectedSecurityEvent.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              selectedSecurityEvent.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {selectedSecurityEvent.severity}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">User</label>
            <p className="mt-1 text-sm text-black dark:text-white">{selectedSecurityEvent.user}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</label>
            <p className="mt-1 text-sm text-black dark:text-white">{selectedSecurityEvent.timestamp}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">IP Address</label>
            <p className="mt-1 text-sm text-black dark:text-white">{selectedSecurityEvent.ipAddress || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              selectedSecurityEvent.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              selectedSecurityEvent.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {selectedSecurityEvent.status}
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Event Description</label>
          <p className="mt-2 text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            {selectedSecurityEvent.description || 'No additional details available for this security event.'}
          </p>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Actions Taken</label>
          <p className="mt-2 text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            {selectedSecurityEvent.actionsTaken || 'No actions recorded for this event.'}
          </p>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setShowSecurityEventModal(false)}
            className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Edit User Modal */}
{showEditUserModal && editingUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">Edit User</h3>
          <button 
            onClick={() => setShowEditUserModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Full Name</label>
            <input 
              type="text" 
              defaultValue={editingUser.name}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Email</label>
            <input 
              type="email" 
              defaultValue={editingUser.email}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Role</label>
            <select 
              defaultValue={editingUser.role}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
            >
              <option>Account Manager</option>
              <option>Loan Officer</option>
              <option>Compliance Officer</option>
              <option>IT Administrator</option>
              <option>Super Admin</option>
              <option>Customer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Department</label>
            <select 
              defaultValue={editingUser.department}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
            >
              <option>Private Banking</option>
              <option>Commercial Lending</option>
              <option>Risk & Compliance</option>
              <option>Information Technology</option>
              <option>N/A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Status</label>
            <select 
              defaultValue={editingUser.status}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
            >
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button 
              type="button"
              onClick={() => setShowEditUserModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">Add New User</h3>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700">
                    <option>Select Role</option>
                    <option>Account Manager</option>
                    <option>Loan Officer</option>
                    <option>Compliance Officer</option>
                    <option>IT Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700">
                    <option>Select Department</option>
                    <option>Private Banking</option>
                    <option>Commercial Lending</option>
                    <option>Risk & Compliance</option>
                    <option>Information Technology</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">Edit Interest Rates</h3>
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
            <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Savings Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={superAdminData.systemConfiguration.systemParameters.interestRates.savingsRate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Checking Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={superAdminData.systemConfiguration.systemParameters.interestRates.checkingRate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Loan Base Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={superAdminData.systemConfiguration.systemParameters.interestRates.loanBaseRate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Mortgage Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={superAdminData.systemConfiguration.systemParameters.interestRates.mortgageRate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">Credit Card Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={superAdminData.systemConfiguration.systemParameters.interestRates.creditCardRate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
                  />
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <Save className="h-4 w-4 inline mr-1" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Fee Structure Modal */}
{showFeeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">Edit Fee Structure</h3>
          <button 
            onClick={() => setShowFeeModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Wire Transfer Fee ($)</label>
            <input 
              type="number" 
              step="0.01" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.fees.wireTransferFee}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Overdraft Fee ($)</label>
            <input 
              type="number" 
              step="0.01" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.fees.overdraftFee}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Monthly Maintenance Fee ($)</label>
            <input 
              type="number" 
              step="0.01" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.fees.monthlyMaintenanceFee}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">ATM Fee ($)</label>
            <input 
              type="number" 
              step="0.01" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.fees.atmFee}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Foreign Transaction Fee (%)</label>
            <input 
              type="number" 
              step="0.01" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.fees.foreignTransactionFee}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button 
              type="button"
              onClick={() => setShowFeeModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

{/* Transaction Limits Modal */}
{showLimitsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">Edit Transaction Limits</h3>
          <button 
            onClick={() => setShowLimitsModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Daily Withdrawal Limit ($)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.limits.dailyWithdrawalLimit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Daily Transfer Limit ($)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.limits.dailyTransferLimit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Monthly Transfer Limit ($)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.limits.monthlyTransferLimit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Check Deposit Limit ($)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.limits.checkDepositLimit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button 
              type="button"
              onClick={() => setShowLimitsModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

{/* Security Settings Modal */}
{showSecurityModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">Edit Security Settings</h3>
          <button 
            onClick={() => setShowSecurityModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Password Expiry (days)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.securitySettings.passwordExpiry}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Max Login Attempts</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.securitySettings.maxLoginAttempts}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Session Timeout (minutes)</label>
            <input 
              type="number" 
              defaultValue={superAdminData.systemConfiguration.systemParameters.securitySettings.sessionTimeout}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">Two-Factor Authentication</label>
            <select 
              defaultValue={superAdminData.systemConfiguration.systemParameters.securitySettings.twoFactorRequired}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
            >
              <option value={true}>Enabled</option>
              <option value={false}>Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1">IP Whitelist</label>
            <select 
              defaultValue={superAdminData.systemConfiguration.systemParameters.securitySettings.ipWhitelistEnabled}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
            >
              <option value={true}>Enabled</option>
              <option value={false}>Disabled</option>
            </select>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button 
              type="button"
              onClick={() => setShowSecurityModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {/* Quick Actions Sidebar */}
      <div className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 ${
        isQuickActionsCollapsed ? 'translate-x-full' : 'translate-x-0'
      }`} style={{ width: '320px' }}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-black dark:text-white">Quick Actions</h3>
            <button 
              onClick={() => setIsQuickActionsCollapsed(!isQuickActionsCollapsed)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isQuickActionsCollapsed ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* System Controls */}
          <div className="space-y-2">
            <h4 className="font-medium text-black dark:text-white text-sm">System Controls</h4>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
              <Power className="h-4 w-4" />
              <span className="text-sm">System Restart</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Force Backup</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Maintenance Mode</span>
            </button>
          </div>
          
          {/* User Actions */}
          <div className="space-y-2">
            <h4 className="font-medium text-black dark:text-white text-sm">User Actions</h4>
            <button 
              onClick={() => setShowUserModal(true)}
              className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm">Add New User</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
              <UserX className="h-4 w-4" />
              <span className="text-sm">Bulk Suspend</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
              <Key className="h-4 w-4" />
              <span className="text-sm">Password Reset</span>
            </button>
          </div>
          
          {/* Reports */}
          <div className="space-y-2">
            <h4 className="font-medium text-black dark:text-white text-sm">Reports</h4>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <Download className="h-4 w-4" />
              <span className="text-sm">Export Audit Log</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <FileText className="h-4 w-4" />
              <span className="text-sm">System Report</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Performance Report</span>
            </button>
          </div>
          
          {/* Recent Alerts */}
          <div className="space-y-2">
            <h4 className="font-medium text-black dark:text-white text-sm">Recent Alerts</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {superAdminData.complianceAndSecurity.recentSecurityEvents.slice(0, 3).map(event => (
                <div key={event.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {event.timestamp.split(' ')[1]}
                    </span>
                  </div>
                  <p className="text-xs text-black dark:text-white mt-1 truncate">{event.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collapse/Expand Button for Quick Actions */}
      {isQuickActionsCollapsed && (
        <button 
          onClick={() => setIsQuickActionsCollapsed(false)}
          className="fixed right-4 top-20 transform -translate-y-1/2 bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-l-lg shadow-lg z-30 hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {/* System Alerts Toast */}
      {systemAlerts.length > 0 && (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          {systemAlerts.map((alert, idx) => (
            <div key={idx} className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{alert.title}</p>
                  <p className="text-xs text-red-600 dark:text-red-400">{alert.message}</p>
                </div>
                <button 
                  onClick={() => setSystemAlerts(systemAlerts.filter((_, i) => i !== idx))}
                  className="ml-2 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-8">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span>© 2024 Bank Management System - Super Admin Dashboard</span>
          </div>
          <div className="flex space-x-4">
            <span>Version 2.1.0</span>
            <span>•</span>
            <span>Last Updated: June 5, 2024</span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SuperAdminDashboard;
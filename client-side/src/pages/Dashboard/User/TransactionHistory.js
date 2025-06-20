import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const TransactionHistory = ({ userInfo }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const balanceCardRef = useRef(null);
  const actionsRef = useRef(null);
  const accountsRef = useRef(null);
  const dashboardRef = useRef(null);

  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!uId) return;
      setAccountsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/accounts`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // The API returns { success, accounts }
        if (res.data && res.data.success) {
          setAccounts(res.data.accounts);
        } else {
          toast.error("Failed to fetch accounts");
        }
      } catch (error) {
        toast.error("Failed to fetch accounts");
      } finally {
        setAccountsLoading(false);
      }
    };
    fetchAccounts();
  }, [uId]);

  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!uId) return;
      setTransactionsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/transactions`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.success) {
          setTransactions(res.data.transactions);
        } else {
          toast.error("Failed to fetch transactions");
        }
      } catch (error) {
        toast.error("Failed to fetch transactions");
      } finally {
        setTransactionsLoading(false);
      }
    };
    fetchTransactions();
  }, [uId]);

  console.log(transactions, "dsvsffsbsfb");

  // Fetch transaction history
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionHistoryLoading, setTransactionHistoryLoading] =
    useState(false);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!uId) return;
      setTransactionHistoryLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/transaction-history`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.success) {
          // Transform the data to match the expected format for the chart
          const transformedData = res.data.transactions.map((transaction) => ({
            date: transaction.date,
            income: transaction.credit || 0,
            spending: Math.abs(transaction.debit) || 0, // Convert negative values to positive
          }));
          setTransactionHistory(transformedData);
        } else {
          toast.error("Failed to fetch transaction history");
        }
      } catch (error) {
        toast.error("Failed to fetch transaction history");
      } finally {
        setTransactionHistoryLoading(false);
      }
    };
    fetchTransactionHistory();
  }, [uId]);

  console.log("Transaction History:", transactionHistory);

  const [spendingData, setSpendingData] = useState({
    totalSpending: 0,
    categories: [],
  });
  const [displayData, setDisplayData] = useState([]);
  const [spendingDataLoading, setSpendingDataLoading] = useState(false);

  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    const fetchSpendingByCategory = async () => {
      setSpendingDataLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token exists:", !!token); // Debug if token exists

        if (!token) {
          toast.error("You are not logged in");
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/spending-by-category`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", res.data);

        if (res.data && res.data.success) {
          setSpendingData(res.data.data.categories);
        } else {
          toast.error(
            res.data?.message || "Failed to fetch spending by category"
          );
        }
      } catch (error) {
        toast.error("Failed to fetch spending by category");
        console.error("Error fetching spending by category:", error);

        // Additional error logging
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      } finally {
        setSpendingDataLoading(false);
      }
    };

    fetchSpendingByCategory();
  }, [uId]);

  useEffect(() => {
    if (spendingData && spendingData.length > 0) {
      const transformedData = transformDataByTimeRange(spendingData, timeRange);
      setDisplayData(transformedData);
    }
  }, [timeRange, spendingData]);

  const transformDataByTimeRange = (data, selectedTimeRange) => {
    if (!data || data.length === 0) return [];

    return data
      .map((category) => {
        let amount, percentage;

        switch (selectedTimeRange) {
          case "7days":
            amount = category.last7Days.amount;
            percentage = category.last7Days.percentage;
            break;
          case "30days":
            amount = category.last30Days.amount;
            percentage = category.last30Days.percentage;
            break;
          case "90days":
            amount = category.last90Days.amount;
            percentage = category.last90Days.percentage;
            break;
          default:
            amount = category.totalAmount;
            percentage = category.percentage;
        }

        return {
          category: category.category,
          amount: amount,
          percentage: percentage,
        };
      })
      .filter((item) => item.amount > 0) // Only show categories with spending
      .sort((a, b) => b.amount - a.amount); // Sort by amount descending
  };

  console.log("Spending Data:", spendingData);

  const currentUser = {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    accounts: [
      {
        id: 1,
        type: "Checking",
        accountName: "Premium Checking",
        accountNumber: "**** **** **** 4521",
        balance: 12450.75,
        cardType: "Debit",
        isActive: true,
      },
      {
        id: 2,
        type: "Savings",
        accountName: "High Yield Savings",
        accountNumber: "**** **** **** 7832",
        balance: 25300.2,
        cardType: "Savings",
        isActive: true,
      },
      {
        id: 3,
        type: "Credit",
        accountName: "Platinum Credit Card",
        accountNumber: "**** **** **** 9156",
        balance: -1250.0,
        creditLimit: 5000.0,
        cardType: "Credit",
        isActive: true,
      },
    ],
    recentTransactions: [
      {
        id: 1,
        accountId: 1,
        type: "deposit",
        description: "Salary Deposit",
        amount: 3500.0,
        date: "2024-05-29",
        category: "Income",
        merchant: "ABC Company",
      },
      {
        id: 2,
        accountId: 1,
        type: "withdrawal",
        description: "ATM Withdrawal",
        amount: -200.0,
        date: "2024-05-28",
        category: "Cash",
        merchant: "Bank ATM",
      },
      {
        id: 3,
        accountId: 3,
        type: "payment",
        description: "Grocery Store",
        amount: -85.5,
        date: "2024-05-27",
        category: "Food",
        merchant: "SuperMart",
      },
      {
        id: 4,
        accountId: 2,
        type: "transfer",
        description: "Transfer to Savings",
        amount: 500.0,
        date: "2024-05-27",
        category: "Transfer",
        merchant: "Internal Transfer",
      },
      {
        id: 5,
        accountId: 1,
        type: "payment",
        description: "Electric Bill",
        amount: -120.0,
        date: "2024-05-26",
        category: "Utilities",
        merchant: "Power Company",
      },
      {
        id: 6,
        accountId: 3,
        type: "payment",
        description: "Online Shopping",
        amount: -320.75,
        date: "2024-05-25",
        category: "Shopping",
        merchant: "Amazon",
      },
      {
        id: 7,
        accountId: 1,
        type: "payment",
        description: "Gas Station",
        amount: -45.0,
        date: "2024-05-24",
        category: "Transportation",
        merchant: "Shell",
      },
      {
        id: 8,
        accountId: 2,
        type: "deposit",
        description: "Interest Payment",
        amount: 25.3,
        date: "2024-05-23",
        category: "Income",
        merchant: "Bank Interest",
      },
      {
        id: 9,
        accountId: 3,
        type: "payment",
        description: "Restaurant",
        amount: -67.25,
        date: "2024-05-22",
        category: "Food",
        merchant: "Olive Garden",
      },
      {
        id: 10,
        accountId: 1,
        type: "payment",
        description: "Gym Membership",
        amount: -29.99,
        date: "2024-05-21",
        category: "Health",
        merchant: "FitLife Gym",
      },
      {
        id: 11,
        accountId: 1,
        type: "deposit",
        description: "Freelance Work",
        amount: 750.0,
        date: "2024-05-20",
        category: "Income",
        merchant: "Client XYZ",
      },
      {
        id: 12,
        accountId: 3,
        type: "payment",
        description: "Movie Theater",
        amount: -24.5,
        date: "2024-05-19",
        category: "Entertainment",
        merchant: "AMC Theaters",
      },
    ],
    // Add investment portfolio data
    investmentPortfolio: {
      totalValue: 127850.45,
      totalGainLoss: 8934.67,
      totalGainLossPercentage: 7.51,
      riskLevel: "Moderate",
      riskScore: 6.2,
      dividendYield: 2.34,
      sectorDiversification: 8,
      maxConcentration: 18.5,

      composition: [
        { name: "Stocks", value: 76710.27, percentage: 60.0, color: "#8884d8" },
        { name: "Bonds", value: 25570.09, percentage: 20.0, color: "#82ca9d" },
        { name: "ETFs", value: 19177.57, percentage: 15.0, color: "#ffc658" },
        {
          name: "Mutual Funds",
          value: 6392.52,
          percentage: 5.0,
          color: "#ff7300",
        },
      ],

      holdings: [
        {
          id: 1,
          symbol: "AAPL",
          name: "Apple Inc.",
          assetType: "Stock",
          sector: "Technology",
          shares: 85,
          purchasePrice: 145.3,
          currentPrice: 178.25,
          purchaseDate: "2023-03-15",
          beta: 1.24,
          volatility: 0.28,
        },
        {
          id: 2,
          symbol: "MSFT",
          name: "Microsoft Corporation",
          assetType: "Stock",
          sector: "Technology",
          shares: 45,
          purchasePrice: 285.76,
          currentPrice: 338.11,
          purchaseDate: "2023-01-22",
          beta: 0.89,
          volatility: 0.24,
        },
        {
          id: 3,
          symbol: "SPY",
          name: "SPDR S&P 500 ETF Trust",
          assetType: "ETF",
          sector: "Diversified",
          shares: 42,
          purchasePrice: 412.5,
          currentPrice: 456.78,
          purchaseDate: "2023-02-10",
          beta: 1.0,
          volatility: 0.16,
        },
        {
          id: 4,
          symbol: "BND",
          name: "Vanguard Total Bond Market ETF",
          assetType: "ETF",
          sector: "Fixed Income",
          shares: 120,
          purchasePrice: 78.45,
          currentPrice: 75.23,
          purchaseDate: "2023-04-05",
          beta: -0.12,
          volatility: 0.08,
        },
        {
          id: 5,
          symbol: "GOOGL",
          name: "Alphabet Inc. Class A",
          assetType: "Stock",
          sector: "Technology",
          shares: 28,
          purchasePrice: 102.3,
          currentPrice: 139.67,
          purchaseDate: "2023-05-18",
          beta: 1.06,
          volatility: 0.31,
        },
        {
          id: 6,
          symbol: "JNJ",
          name: "Johnson & Johnson",
          assetType: "Stock",
          sector: "Healthcare",
          shares: 65,
          purchasePrice: 162.85,
          currentPrice: 158.42,
          purchaseDate: "2023-01-08",
          beta: 0.68,
          volatility: 0.15,
        },
        {
          id: 7,
          symbol: "VTIAX",
          name: "Vanguard Total International Stock Index Fund",
          assetType: "Mutual Fund",
          sector: "International",
          shares: 245,
          purchasePrice: 25.67,
          currentPrice: 26.11,
          purchaseDate: "2023-03-28",
          beta: 0.85,
          volatility: 0.22,
        },
        {
          id: 8,
          symbol: "PG",
          name: "Procter & Gamble Co.",
          assetType: "Stock",
          sector: "Consumer Goods",
          shares: 38,
          purchasePrice: 148.92,
          currentPrice: 156.73,
          purchaseDate: "2023-02-14",
          beta: 0.52,
          volatility: 0.18,
        },
      ],

      performanceHistory: [
        { month: "Jul", value: 118450 },
        { month: "Aug", value: 121200 },
        { month: "Sep", value: 119800 },
        { month: "Oct", value: 123600 },
        { month: "Nov", value: 125900 },
        { month: "Dec", value: 127850 },
      ],
    },

    // LOANS SECTION
    loans: [
      {
        id: 1,
        type: "Mortgage",
        lender: "Wells Fargo Bank",
        originalAmount: 450000,
        currentBalance: 387420.15,
        interestRate: 6.75,
        monthlyPayment: 2918.32,
        remainingMonths: 312,
        startDate: "2022-03-15",
        maturityDate: "2048-03-15",
        loanTerm: 360,
        paymentsMade: 48,
        principalPaid: 62579.85,
        interestPaid: 77499.36,
        nextPaymentDate: "2025-07-01",
        escrowBalance: 4250.8,
        propertyTaxes: 8400,
        homeInsurance: 2100,
        pmi: 285.5,
        loanToValue: 0.86,
        // ADD payment history for mortgage
        paymentHistory: [
          {
            date: "2025-05-01",
            amount: 2918.32,
            principal: 1245.67,
            interest: 1672.65,
          },
          {
            date: "2025-04-01",
            amount: 2918.32,
            principal: 1238.45,
            interest: 1679.87,
          },
          {
            date: "2025-03-01",
            amount: 2918.32,
            principal: 1231.22,
            interest: 1687.1,
          },
        ],
      },
      {
        id: 2,
        type: "Auto Loan",
        lender: "Toyota Financial Services",
        originalAmount: 35000,
        currentBalance: 18742.33,
        interestRate: 4.25,
        monthlyPayment: 648.5,
        remainingMonths: 31,
        startDate: "2022-08-10",
        maturityDate: "2027-08-10",
        loanTerm: 60,
        paymentsMade: 29,
        principalPaid: 16257.67,
        interestPaid: 2548.83,
        nextPaymentDate: "2025-07-10",
        vehicleValue: 22500,
        loanToValue: 0.83,
        gapInsurance: true,
        // ADD payment history for auto loan
        paymentHistory: [
          {
            date: "2025-05-10",
            amount: 648.5,
            principal: 520.3,
            interest: 128.2,
          },
          {
            date: "2025-04-10",
            amount: 648.5,
            principal: 518.45,
            interest: 130.05,
          },
          {
            date: "2025-03-10",
            amount: 648.5,
            principal: 516.6,
            interest: 131.9,
          },
        ],
      },
      {
        id: 3,
        type: "Student Loan",
        lender: "Federal Direct Loan",
        originalAmount: 65000,
        currentBalance: 52340.78,
        interestRate: 5.5,
        monthlyPayment: 425.75,
        remainingMonths: 156,
        startDate: "2018-09-01",
        maturityDate: "2031-09-01",
        loanTerm: 156,
        paymentsMade: 69,
        principalPaid: 12659.22,
        interestPaid: 16736.53,
        nextPaymentDate: "2025-07-01",
        repaymentPlan: "Standard",
        subsidized: false,
        incomeDriven: false,
        // ADD payment history for student loan
        paymentHistory: [
          {
            date: "2025-05-01",
            amount: 425.75,
            principal: 186.5,
            interest: 239.25,
          },
          {
            date: "2025-04-01",
            amount: 425.75,
            principal: 185.65,
            interest: 240.1,
          },
          {
            date: "2025-03-01",
            amount: 425.75,
            principal: 184.8,
            interest: 240.95,
          },
        ],
      },
      {
        id: 4,
        type: "Personal Loan",
        lender: "Marcus by Goldman Sachs",
        originalAmount: 15000,
        currentBalance: 8945.67,
        interestRate: 11.99,
        monthlyPayment: 467.89,
        remainingMonths: 21,
        startDate: "2023-06-15",
        maturityDate: "2026-06-15",
        loanTerm: 36,
        paymentsMade: 15,
        principalPaid: 6054.33,
        interestPaid: 963.02,
        nextPaymentDate: "2025-07-15",
        purpose: "Debt Consolidation",
        unsecured: true,
        // CORRECTED payment history for personal loan (not mortgage amounts!)
        paymentHistory: [
          {
            date: "2025-05-15",
            amount: 467.89,
            principal: 378.45,
            interest: 89.44,
          },
          {
            date: "2025-04-15",
            amount: 467.89,
            principal: 375.2,
            interest: 92.69,
          },
          {
            date: "2025-03-15",
            amount: 467.89,
            principal: 371.95,
            interest: 95.94,
          },
        ],
      },
    ],
    totalDebt: 467448.93,
    monthlyDebtPayments: 4460.46,
    debtToIncomeRatio: 0.28,
    averageInterestRate: 6.42,

    // CREDIT SCORE SECTION
    creditScore: {
      score: 742,
      range: "Good",
      lastUpdated: "2025-05-15",
      bureau: "Experian",

      factors: {
        paymentHistory: {
          score: 85,
          weight: 35,
          impact: "Excellent",
          details: {
            onTimePayments: 98.2,
            latePayments: 2,
            missedPayments: 0,
            accountsInGoodStanding: 14,
            totalAccounts: 16,
          },
        },
        creditUtilization: {
          score: 78,
          weight: 30,
          impact: "Good",
          details: {
            totalCreditLimit: 85000,
            totalBalance: 12750,
            utilizationRatio: 0.15,
            cardsAtZeroBalance: 4,
            highestUtilization: 0.35,
          },
        },
        creditHistory: {
          score: 88,
          weight: 15,
          impact: "Excellent",
          details: {
            averageAccountAge: 8.5,
            oldestAccount: 15.2,
            newestAccount: 0.8,
            closedAccounts: 3,
          },
        },
        creditMix: {
          score: 75,
          weight: 10,
          impact: "Good",
          details: {
            creditCards: 6,
            installmentLoans: 4,
            mortgages: 1,
            retailAccounts: 2,
            totalAccountTypes: 4,
          },
        },
        newCredit: {
          score: 82,
          weight: 10,
          impact: "Very Good",
          details: {
            hardInquiries: 2,
            newAccountsLast12Months: 1,
            newAccountsLast24Months: 2,
            lastInquiry: "2024-11-15",
          },
        },
      },

      recommendations: [
        "Keep credit utilization below 10% for optimal scoring",
        "Continue making all payments on time",
        "Avoid opening new credit accounts in the next 6 months",
        "Consider paying down the highest utilization cards first",
      ],

      monthlyTrend: [
        { month: "Jan", score: 738 },
        { month: "Feb", score: 740 },
        { month: "Mar", score: 741 },
        { month: "Apr", score: 739 },
        { month: "May", score: 742 },
        { month: "Jun", score: 742 },
      ],

      // ADD THE NEW DATA HERE ⬇️
      // NEW: Credit Score Trend Data
      scoreHistory: [
        { month: "Jan 2024", score: 742 },
        { month: "Feb 2024", score: 745 },
        { month: "Mar 2024", score: 748 },
        { month: "Apr 2024", score: 751 },
        { month: "May 2024", score: 755 },
        { month: "Jun 2024", score: 758 },
      ],

      // NEW: Credit Utilization Details
      utilizationRate: 23.4,
      totalCreditUsed: 5850,
      totalCreditLimit: 25000,

      // NEW: Visual Alerts
      alerts: [
        {
          type: "success",
          title: "Credit Score Improved",
          message: "Your credit score increased by 13 points this month!",
          date: "2024-06-01",
        },
        {
          type: "warning",
          title: "High Credit Utilization",
          message: "Consider paying down balances to improve your score.",
          date: "2024-05-28",
        },
        {
          type: "info",
          title: "New Credit Inquiry",
          message:
            "A soft inquiry was made by your bank for a pre-approval offer.",
          date: "2024-05-25",
        },
      ],
    },

    // INSURANCE SECTION
    insurance: {
      totalPremiums: 8945.6,

      policies: [
        {
          id: 1,
          type: "Auto Insurance",
          provider: "State Farm",
          policyNumber: "SF-789456123",
          premium: 1680.0,
          deductible: 1000,
          coverage: {
            liability: 300000,
            collision: 50000,
            comprehensive: 50000,
            uninsuredMotorist: 100000,
            medicalPayments: 10000,
          },
          vehicles: [
            {
              year: 2021,
              make: "Toyota",
              model: "Camry",
              vin: "4T1C11AK5MU123456",
              value: 22500,
              usage: "Commuting",
            },
          ],
          discounts: ["Multi-Policy", "Safe Driver", "Good Student"],
          discountAmount: 420.0,
          riskFactors: {
            drivingRecord: "Clean",
            creditScore: "Good",
            location: "Suburban",
            annualMileage: 12000,
          },
        },
        {
          id: 2,
          type: "Homeowners Insurance",
          provider: "Allstate",
          policyNumber: "AL-456789012",
          premium: 2850.0,
          deductible: 2500,
          coverage: {
            dwelling: 650000,
            personalProperty: 325000,
            liability: 500000,
            medicalPayments: 5000,
            lossOfUse: 130000,
          },
          property: {
            address: "123 Oak Street, Suburb, ST 12345",
            yearBuilt: 1995,
            squareFootage: 2800,
            constructionType: "Frame",
            roofType: "Asphalt Shingle",
            foundationType: "Slab",
          },
          discounts: ["Multi-Policy", "Security System", "Claims-Free"],
          discountAmount: 570.0,
          riskFactors: {
            floodZone: "X",
            hurricaneZone: "No",
            earthquakeRisk: "Low",
            crimeRate: "Low",
          },
        },
        {
          id: 3,
          type: "Life Insurance",
          provider: "Northwestern Mutual",
          policyNumber: "NM-987654321",
          premium: 2880.0,
          policyType: "Term Life",
          termLength: 20,
          faceValue: 750000,
          cashValue: 0,
          beneficiaries: [
            { name: "Jane Doe", relationship: "Spouse", percentage: 60 },
            { name: "John Doe Jr.", relationship: "Child", percentage: 40 },
          ],
          riskFactors: {
            age: 35,
            gender: "Male",
            smoker: false,
            healthClass: "Preferred Plus",
            occupation: "Software Engineer",
            hobbies: ["Running", "Reading"],
          },
        },
        {
          id: 4,
          type: "Health Insurance",
          provider: "Blue Cross Blue Shield",
          policyNumber: "BC-147258369",
          premium: 1535.6,
          planType: "PPO",
          deductible: 3000,
          outOfPocketMax: 8000,
          coverage: {
            inNetwork: 90,
            outOfNetwork: 70,
            prescription: 80,
            preventive: 100,
          },
          family: {
            employees: 1,
            spouses: 1,
            dependents: 2,
          },
          employerContribution: 75,
        },
      ],

      claimsHistory: [
        {
          date: "2024-03-15",
          type: "Auto",
          amount: 3200,
          status: "Settled",
          description: "Rear-end collision",
        },
        {
          date: "2023-08-22",
          type: "Health",
          amount: 850,
          status: "Paid",
          description: "Emergency room visit",
        },
      ],
    },

    // ENHANCED BANKING SECTION (replace your existing banking data)
    banking: {
      totalBalance: 47850.75,

      accounts: [
        {
          id: 1,
          type: "Checking",
          bank: "Chase Bank",
          accountNumber: "****1234",
          balance: 8450.25,
          interestRate: 0.01,
          minimumBalance: 1500,
          monthlyFee: 12.0,
          feeWaived: true,
          overdraftProtection: true,
          overdraftLimit: 1000,
          averageDailyBalance: 7850.3,
          transactionsThisMonth: 47,
        },
        {
          id: 2,
          type: "Savings",
          bank: "Chase Bank",
          accountNumber: "****5678",
          balance: 25400.5,
          interestRate: 4.25,
          minimumBalance: 300,
          monthlyFee: 0,
          compoundingFrequency: "Daily",
          annualPercentageYield: 4.33,
          interestEarnedYTD: 856.75,
          withdrawalsThisMonth: 2,
          withdrawalLimit: 6,
        },
        {
          id: 3,
          type: "Money Market",
          bank: "Marcus by Goldman Sachs",
          accountNumber: "****9012",
          balance: 14000.0,
          interestRate: 4.75,
          minimumBalance: 500,
          monthlyFee: 0,
          compoundingFrequency: "Daily",
          annualPercentageYield: 4.87,
          interestEarnedYTD: 1125.4,
          checkWritingPrivileges: true,
          checksWrittenThisMonth: 1,
        },
      ],

      recentTransactions: [
        {
          id: 1,
          date: "2025-06-01",
          description: "Direct Deposit - Salary",
          amount: 4250.0,
          type: "Credit",
          account: "Checking",
          category: "Income",
          balance: 8450.25,
        },
        {
          id: 2,
          date: "2025-05-31",
          description: "Mortgage Payment",
          amount: -2918.32,
          type: "Debit",
          account: "Checking",
          category: "Housing",
          balance: 4200.25,
        },
        {
          id: 3,
          date: "2025-05-30",
          description: "Grocery Store",
          amount: -156.78,
          type: "Debit",
          account: "Checking",
          category: "Food",
          balance: 7118.57,
        },
        {
          id: 4,
          date: "2025-05-29",
          description: "Gas Station",
          amount: -68.45,
          type: "Debit",
          account: "Checking",
          category: "Transportation",
          balance: 7275.35,
        },
        {
          id: 5,
          date: "2025-05-28",
          description: "Interest Payment",
          amount: 14.25,
          type: "Credit",
          account: "Savings",
          category: "Interest",
          balance: 25400.5,
        },
      ],

      monthlyAnalysis: {
        totalIncome: 4250.0,
        totalExpenses: 3847.65,
        netCashFlow: 402.35,
        expenseCategories: {
          housing: 2918.32,
          transportation: 425.8,
          food: 312.45,
          utilities: 191.08,
        },
      },
    },

    // ENHANCED BUDGET SECTION (replace your existing budget data)
    budget: {
      monthlyIncome: 15950.0,
      monthlyExpenses: 13247.85,
      netIncome: 2702.15,
      savingsRate: 0.169,

      incomeStreams: [
        {
          source: "Primary Job - Software Engineer",
          amount: 12500.0,
          type: "Salary",
          frequency: "Monthly",
          taxable: true,
          benefits: {
            health: 450.0,
            dental: 35.0,
            vision: 15.0,
            retirement401k: 1250.0,
          },
        },
        {
          source: "Freelance Consulting",
          amount: 2800.0,
          type: "1099",
          frequency: "Variable",
          taxable: true,
          estimatedTaxes: 420.0,
        },
        {
          source: "Investment Dividends",
          amount: 450.0,
          type: "Investment Income",
          frequency: "Quarterly Average",
          taxable: true,
          qualified: true,
        },
        {
          source: "Rental Property",
          amount: 200.0,
          type: "Passive Income",
          frequency: "Monthly",
          taxable: true,
          expenses: 1800.0,
        },
      ],

      categories: [
        {
          id: 1,
          name: "Housing",
          budgeted: 3500.0,
          spent: 3418.32,
          remaining: 81.68,
          percentage: 25.8,
          subcategories: {
            mortgage: 2918.32,
            propertyTax: 200.0,
            homeInsurance: 175.0,
            utilities: 125.0,
          },
          essential: true,
        },
        {
          id: 2,
          name: "Transportation",
          budgeted: 950.0,
          spent: 1024.75,
          remaining: -74.75,
          percentage: 7.7,
          subcategories: {
            carPayment: 648.5,
            gasoline: 180.25,
            maintenance: 125.0,
            insurance: 71.0,
          },
          essential: true,
        },
        {
          id: 3,
          name: "Food & Dining",
          budgeted: 800.0,
          spent: 756.45,
          remaining: 43.55,
          percentage: 5.7,
          subcategories: {
            groceries: 520.3,
            restaurants: 236.15,
          },
          essential: true,
        },
        {
          id: 4,
          name: "Insurance",
          budgeted: 745.0,
          spent: 745.47,
          remaining: -0.47,
          percentage: 5.6,
          subcategories: {
            health: 127.97,
            life: 240.0,
            disability: 85.5,
            umbrella: 45.0,
            auto: 140.0,
            home: 107.0,
          },
          essential: true,
        },
        {
          id: 5,
          name: "Debt Payments",
          budgeted: 1325.0,
          spent: 1325.89,
          remaining: -0.89,
          percentage: 10.0,
          subcategories: {
            studentLoan: 425.75,
            personalLoan: 467.89,
            creditCards: 431.25,
          },
          essential: true,
        },
        {
          id: 6,
          name: "Savings & Investments",
          budgeted: 2700.0,
          spent: 2700.0,
          remaining: 0.0,
          percentage: 16.9,
          subcategories: {
            emergencyFund: 500.0,
            retirement401k: 1250.0,
            rothIRA: 500.0,
            brokerage: 450.0,
          },
          essential: false,
        },
        {
          id: 7,
          name: "Entertainment",
          budgeted: 400.0,
          spent: 342.78,
          remaining: 57.22,
          percentage: 2.6,
          subcategories: {
            streaming: 45.97,
            movies: 85.5,
            hobbies: 125.31,
            miscellaneous: 86.0,
          },
          essential: false,
        },
        {
          id: 8,
          name: "Personal Care",
          budgeted: 250.0,
          spent: 198.45,
          remaining: 51.55,
          percentage: 1.5,
          subcategories: {
            healthcare: 125.0,
            grooming: 73.45,
          },
          essential: false,
        },
        {
          id: 9,
          name: "Shopping",
          budgeted: 500.0,
          spent: 456.89,
          remaining: 43.11,
          percentage: 3.4,
          subcategories: {
            clothing: 245.5,
            electronics: 125.39,
            household: 86.0,
          },
          essential: false,
        },
        {
          id: 10,
          name: "Miscellaneous",
          budgeted: 300.0,
          spent: 278.85,
          remaining: 21.15,
          percentage: 2.1,
          subcategories: {
            gifts: 125.0,
            donations: 100.0,
            other: 53.85,
          },
          essential: false,
        },
      ],

      budgetAnalysis: {
        totalBudgeted: 11470.0,
        totalSpent: 11247.85,
        variance: 222.15,
        overBudgetCategories: 2,
        underBudgetCategories: 8,
        essentialExpenses: 8269.88,
        discretionaryExpenses: 2977.97,
        fixedExpenses: 6842.18,
        variableExpenses: 4405.67,
      },

      monthlyTrend: [
        { month: "Jan", income: 15200, expenses: 12850, savings: 2350 },
        { month: "Feb", income: 15450, expenses: 13100, savings: 2350 },
        { month: "Mar", income: 15800, expenses: 13250, savings: 2550 },
        { month: "Apr", income: 15950, expenses: 13150, savings: 2800 },
        { month: "May", income: 15950, expenses: 13400, savings: 2550 },
        { month: "Jun", income: 15950, expenses: 13248, savings: 2702 },
      ],
    },

    // Extended transaction data for charts
    transactionHistory: [
      { date: "2024-05-15", income: 3500, spending: 450 },
      { date: "2024-05-16", income: 0, spending: 120 },
      { date: "2024-05-17", income: 750, spending: 200 },
      { date: "2024-05-18", income: 0, spending: 85 },
      { date: "2024-05-19", income: 25, spending: 320 },
      { date: "2024-05-20", income: 0, spending: 180 },
      { date: "2024-05-21", income: 0, spending: 95 },
      { date: "2024-05-22", income: 500, spending: 67 },
      { date: "2024-05-23", income: 0, spending: 45 },
      { date: "2024-05-24", income: 0, spending: 30 },
      { date: "2024-05-25", income: 0, spending: 150 },
      { date: "2024-05-26", income: 0, spending: 200 },
      { date: "2024-05-27", income: 0, spending: 85 },
      { date: "2024-05-28", income: 0, spending: 200 },
      { date: "2024-05-29", income: 3500, spending: 0 },
    ],
    // Monthly spending data for trends
    monthlySpending: [
      { month: "Jan 2024", spending: 2850, budget: 3000 },
      { month: "Feb 2024", spending: 3200, budget: 3000 },
      { month: "Mar 2024", spending: 2750, budget: 3000 },
      { month: "Apr 2024", spending: 3100, budget: 3000 },
      { month: "May 2024", spending: 2900, budget: 3000 },
      { month: "Jun 2024", spending: 1950, budget: 3000 },
    ],
    // ADD THIS TO YOUR currentUser OBJECT
    comparison: {
      spendingComparison: {
        currentPeriod: [
          {
            category: "Housing",
            current: 3418,
            previous: 3200,
            avgUsers: 2800,
          },
          {
            category: "Transport",
            current: 1025,
            previous: 850,
            avgUsers: 900,
          },
          { category: "Food", current: 756, previous: 680, avgUsers: 750 },
          { category: "Shopping", current: 457, previous: 320, avgUsers: 400 },
          {
            category: "Entertainment",
            current: 343,
            previous: 280,
            avgUsers: 350,
          },
        ],

        benchmarks: [
          {
            metric: "Monthly Spending",
            yourValue: 11248,
            benchmark: 9500,
            percentile: 75,
            icon: "💰",
            status: "above",
          },
          {
            metric: "Savings Rate",
            yourValue: 16.9,
            benchmark: 12.0,
            percentile: 85,
            icon: "💰",
            status: "above",
            suffix: "%",
          },
          {
            metric: "Debt-to-Income",
            yourValue: 28,
            benchmark: 35,
            percentile: 25,
            icon: "📊",
            status: "below",
            suffix: "%",
          },
          {
            metric: "Emergency Fund",
            yourValue: 6.2,
            benchmark: 3.0,
            percentile: 90,
            icon: "🛡️",
            status: "above",
            suffix: " months",
          },
        ],
      },

      recommendations: {
        savingOpportunities: [
          {
            title: "Reduce Transportation Spending",
            description: "You spent $74.75 over budget this month",
            potential: 900,
            difficulty: "Easy",
            icon: "🚗",
            action: "Consider carpooling or public transport",
          },
          {
            title: "Optimize Subscription Services",
            description: "Review recurring subscriptions",
            potential: 180,
            difficulty: "Easy",
            icon: "📱",
            action: "Cancel unused streaming services",
          },
          {
            title: "Energy Efficiency Improvements",
            description: "Your utility bills are 15% above average",
            potential: 450,
            difficulty: "Medium",
            icon: "⚡",
            action: "Switch to LED bulbs, adjust thermostat",
          },
        ],

        investmentOpportunities: [
          {
            title: "Increase 401(k) Contribution",
            description: "You're contributing 10%, consider 15%",
            potential: 2400,
            risk: "Low",
            icon: "🏦",
            action: "Increase by 2% to get full employer match",
          },
          {
            title: "Open High-Yield Savings",
            description: "Your savings earn only 0.01% interest",
            potential: 1200,
            risk: "None",
            icon: "💎",
            action: "Move to 4.5% APY account",
          },
          {
            title: "Diversify Portfolio",
            description: "Consider international exposure",
            potential: 3600,
            risk: "Medium",
            icon: "🌍",
            action: "Add 20% international index funds",
          },
        ],

        financialHealthTips: [
          {
            title: "Build Emergency Fund",
            description: "You have 6.2 months - excellent!",
            status: "excellent",
            icon: "🛡️",
            action: "Maintain current level",
          },
          {
            title: "Pay Down High-Interest Debt",
            description: "Personal loan at 11.99% APR",
            status: "priority",
            icon: "💳",
            action: "Pay extra $200/month to save $800 interest",
          },
          {
            title: "Review Insurance Coverage",
            description: "Last reviewed 2 years ago",
            status: "review",
            icon: "📋",
            action: "Shop for better rates annually",
          },
          {
            title: "Estate Planning",
            description: "Consider updating beneficiaries",
            status: "consider",
            icon: "📜",
            action: "Review will and beneficiary designations",
          },
        ],

        potentialImpact: {
          totalSavings: 1530,
          investmentGrowth: 7200,
          totalGain: 8730,
        },
      },
    },
  };

  // Transaction History States

  const [chartType, setChartType] = useState("timeline");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAccountType, setFilterAccountType] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterAmountMin, setFilterAmountMin] = useState("");
  const [filterAmountMax, setFilterAmountMax] = useState("");

  // Theme configurations for each card type
  const themes = {
    Checking: {
      primary: "#6366f1", // Indigo-600
      primaryLight: "#a5b4fc", // Indigo-300
      secondary: "#4f46e5", // Indigo-700
      accent: "#8b5cf6", // Violet-500
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      lightGradient: "linear-gradient(135deg, #a5b4fc 0%, #8b5cf6 100%)",
      shadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
      name: "Checking",
    },
    Savings: {
      primary: "#10b981", // Emerald-500
      primaryLight: "#6ee7b7", // Emerald-300
      secondary: "#059669", // Emerald-600
      accent: "#34d399", // Emerald-400
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      lightGradient: "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)",
      shadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
      name: "Savings",
    },
    Credit: {
      primary: "#8b5cf6", // Violet-500
      primaryLight: "#c4b5fd", // Violet-300
      secondary: "#7c3aed", // Violet-600
      accent: "#a78bfa", // Violet-400
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      lightGradient: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)",
      shadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
      name: "Credit",
    },
  };

  // Chart color constants
  const chartColors = {
    income: "#22c55e",
    spending: "#ef4444",
  };

  const [selectedAccount, setSelectedAccount] = useState(null);

  // Set selectedAccount to the first account when accounts are loaded
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  const currentTheme = themes[selectedAccount?.type];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return "🍽️";
      case "Transportation":
        return "🚗";
      case "Utilities":
        return "⚡";
      case "Shopping":
        return "🛍️";
      case "Entertainment":
        return "🎬";
      case "Health":
        return "💪";
      case "Income":
        return "💰";
      case "Transfer":
        return "🔄";
      case "Cash":
        return "💵";
      case "Education":
        return "📚";
      case "Insurance":
        return "🛡️";
      case "Subscriptions":
        return "📱";
      case "Travel":
        return "✈️";
      case "Gifts":
        return "🎁";
      case "Personal Care":
        return "💄";
      case "Home Maintenance":
        return "🔧";
      case "Others":
        return "📋";
      default:
        return "📊";
    }
  };

  const getAccountTypeById = (accountId) => {
    const account = accounts.find((acc) => acc._id === accountId);
    return account ? account.type : null;
  };

  const getAccountNameById = (accountId) => {
    const account = accounts.find((acc) => acc._id === accountId);
    return account ? account.accountName : "Unknown Account";
  };

  const getFilteredTransactions = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.merchant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    if (filterAccountType !== "all") {
      if (filterAccountType === "allTransactions") {
        // Show all transactions from all accounts
      } else {
         const accountsOfType = accounts
          .filter((acc) => acc.type === filterAccountType)
          .map((acc) => acc._id);
        filtered = filtered.filter((t) => accountsOfType.includes(t.accountId));
      }
    }

    if (filterDateFrom) {
      filtered = filtered.filter(
        (t) => new Date(t.date) >= new Date(filterDateFrom)
      );
    }

    if (filterDateTo) {
      filtered = filtered.filter(
        (t) => new Date(t.date) <= new Date(filterDateTo)
      );
    }

    if (filterAmountMin) {
      filtered = filtered.filter(
        (t) => Math.abs(t.amount) >= parseFloat(filterAmountMin)
      );
    }

    if (filterAmountMax) {
      filtered = filtered.filter(
        (t) => Math.abs(t.amount) <= parseFloat(filterAmountMax)
      );
    }

    return filtered;
  };

  const getCategoryBreakdown = () => {
    let filteredTransactions = transactions;

    if (
      filterAccountType !== "all" &&
      filterAccountType !== "allTransactions"
    ) {
      const accountsOfType = currentUser.accounts
        .filter((acc) => acc.type === filterAccountType)
        .map((acc) => acc.id);
      filteredTransactions = filteredTransactions.filter((t) =>
        accountsOfType.includes(t.accountId)
      );
    }

    const categories = {};
    filteredTransactions
      .filter((t) => t.amount < 0)
      .forEach((transaction) => {
        const category = transaction.category;
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += Math.abs(transaction.amount);
      });

    return Object.entries(categories)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getTimelineData = () => {
    const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
    return transactionHistory.slice(-days);
  };

  const getMaxValue = (data) => {
    const maxIncome = Math.max(...data.map((d) => d.income));
    const maxSpending = Math.max(...data.map((d) => d.spending));
    return Math.max(maxIncome, maxSpending);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterAccountType("all");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (isLoading || accountsLoading) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const balanceCard = balanceCardRef.current;
    const actions = actionsRef.current;
    const accounts = accountsRef.current;
    const dashboard = dashboardRef.current;

    // Initial state (hidden)
    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(20px)";
    }
    if (balanceCard) {
      balanceCard.style.opacity = "0";
      balanceCard.style.transform = "translateY(30px)";
    }
    if (actions) {
      actions.style.opacity = "0";
      actions.style.transform = "translateY(30px)";
    }
    if (accounts) {
      accounts.style.opacity = "0";
      accounts.style.transform = "translateY(30px)";
    }
    if (dashboard) {
      dashboard.style.opacity = "0";
      dashboard.style.transform = "translateY(30px)";
    }

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate heading
          setTimeout(() => {
            if (heading) {
              heading.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";
              heading.style.opacity = "1";
              heading.style.transform = "translateY(0)";
            }
          }, 200);

          setTimeout(() => {
            if (actions) {
              actions.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              actions.style.opacity = "1";
              actions.style.transform = "translateY(0)";
            }
          }, 500);

          // Animate balance card
          setTimeout(() => {
            if (balanceCard) {
              balanceCard.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              balanceCard.style.opacity = "1";
              balanceCard.style.transform = "translateY(0)";
            }
          }, 400);

          // Animate accounts
          setTimeout(() => {
            if (accounts) {
              accounts.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              accounts.style.opacity = "1";
              accounts.style.transform = "translateY(0)";
            }
          }, 600);

          // Animate dashboard
          setTimeout(() => {
            if (dashboard) {
              dashboard.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              dashboard.style.opacity = "1";
              dashboard.style.transform = "translateY(0)";
            }
          }, 800);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, [accountsLoading, isLoading]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return (
          <svg
            className="w-5 h-5 text-green-500 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        );
      case "withdrawal":
        return (
          <svg
            className="w-5 h-5 text-red-500 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 13l-5 5m0 0l-5-5m5 5V6"
            />
          </svg>
        );
      case "payment":
        return (
          <svg
            className="w-5 h-5 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      case "transfer":
        return (
          <svg
            className="w-5 h-5 text-purple-500 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        );
    }
  };

  const titleCasedString = (str) =>
    str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

  if (accountsLoading || transactionsLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-300 dark:bg-gray-700 rounded-2xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = [
    "all",
    "Income",
    "Food",
    "Transportation",
    "Utilities",
    "Shopping",
    "Entertainment",
    "Health",
    "Transfer",
    "Cash",
    "Others",
  ];

  const accountTypeOptions = [
    { value: "allTransactions", label: "All Transactions" },
    ...accounts.map((a) => ({
      value: a.type,
      label: `${a.type} Account`,
    })),
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="mt-12 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white">
              Transaction{" "}
              <span className="text-[#6160DC] dark:text-[#8B7EFF]">
                History
              </span>
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${currentTheme?.primary}`,
                  color: "var(--text-primary)",
                }}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>

              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${currentTheme?.primary}`,
                  color: "var(--text-primary)",
                }}
              >
                <option value="timeline">Timeline Chart</option>
                <option value="category">Category Breakdown</option>
              </select>
            </div>
          </div>

          <div
            className="p-6 rounded-lg transition-all duration-500 mb-8 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
            style={{
              paddingBottom: "55px",
            }}
          >
            {chartType === "timeline" ? (
              <>
                <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                  Income vs Spending Timeline
                </h3>
                <div className="relative h-64">
                  {/* Add an overflow container for horizontal scrolling */}
                  <div className="w-full overflow-x-auto pb-2">
                    <div
                      className="flex items-end justify-between h-full"
                      style={{
                        minWidth:
                          timeRange === "7days"
                            ? "100%"
                            : timeRange === "30days"
                            ? "200%"
                            : "400%",
                      }}
                    >
                      {getTimelineData().map((data, index) => {
                        const maxValue = getMaxValue(getTimelineData());
                        const incomeHeight = (data.income / maxValue) * 100;
                        const spendingHeight = (data.spending / maxValue) * 100;

                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center space-y-1"
                          >
                            <div className="flex items-end space-x-1 h-48">
                              <div
                                className="w-4 rounded-t transition-all duration-1000 hover:opacity-80"
                                style={{
                                  height: `${incomeHeight}%`,
                                  background: chartColors.income,
                                  minHeight: data.income > 0 ? "4px" : "0",
                                }}
                                title={`Income: ${formatCurrency(data.income)}`}
                              ></div>
                              <div
                                className="w-4 rounded-t transition-all duration-1000 hover:opacity-80"
                                style={{
                                  height: `${spendingHeight}%`,
                                  background: chartColors.spending,
                                  minHeight: data.spending > 0 ? "4px" : "0",
                                }}
                                title={`Spending: ${formatCurrency(
                                  data.spending
                                )}`}
                              ></div>
                            </div>
                            <div className="text-xs text-center text-gray-600 dark:text-gray-300">
                              {new Date(data.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ background: chartColors.income }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Income
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ background: chartColors.spending }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Spending
                      </span>
                    </div>
                  </div>

                  {/* Optional: Add scroll indicators for better UX */}
                  {(timeRange === "30days" || timeRange === "90days") && (
                    <div className="text-xs text-center text-gray-500 mt-2">
                      ← Scroll horizontally to view all data →
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                  Spending by Category
                </h3>
                <div className="space-y-4">
                  {displayData.map((item, index) => {
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {getCategoryIcon(item.category)}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800 dark:text-white">
                              {formatCurrency(item.amount)}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-600">
                          <div
                            className="h-3 rounded-full transition-all duration-1000"
                            style={{
                              width: `${item.percentage}%`,
                              background: `hsl(${index * 45}, 70%, 60%)`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {displayData.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📊</div>
                      <div className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                        No spending data found
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        No spending transactions match the current filter
                        criteria
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Transaction Details and Filter Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 rounded-lg transition-all duration-500 flex flex-col bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 h-[652px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Transaction Details
                  {filterAccountType !== "all" && (
                    <span className="text-sm font-normal ml-2 text-gray-600 dark:text-gray-300">
                      {filterAccountType === "allTransactions"
                        ? "(All Accounts)"
                        : `(${filterAccountType} Accounts)`}
                    </span>
                  )}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {getFilteredTransactions().length} of{" "}
                  {transactions.length} transactions
                </div>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1">
                {getFilteredTransactions().length > 0 ? (
                  getFilteredTransactions().map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-102 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                          style={{ background: `${currentTheme?.primary}20` }}
                        >
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {transaction.merchant} •{" "}
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div
                              className="text-xs px-2 py-1 rounded-full inline-block"
                              style={{
                                background: `${currentTheme?.primary}20`,
                                color: currentTheme?.primary,
                              }}
                            >
                              {transaction.category}
                            </div>
                            <div
                              className="text-xs px-2 py-1 rounded-full inline-block"
                              style={{
                                background: `${
                                  themes[
                                    getAccountTypeById(transaction.accountId)
                                  ]?.primary || currentTheme?.primary
                                }20`,
                                color:
                                  themes[
                                    getAccountTypeById(transaction.accountId)
                                  ]?.primary || currentTheme?.primary,
                              }}
                            >
                              {getAccountNameById(transaction?.accountId)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-bold text-lg"
                          style={{
                            color:
                              transaction.amount < 0
                                ? chartColors.spending
                                : chartColors.income,
                          }}
                        >
                          {transaction.amount < 0 ? "-" : "+"}
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          {getTransactionIcon(transaction.type)}{" "}
                          {titleCasedString(transaction.type)}
                        </div>
                        <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                          {getAccountTypeById(transaction.accountId)} Account
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <div className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                      No transactions found
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Try adjusting your search criteria or filters
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="p-6 rounded-lg transition-all duration-500 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Search & Filter
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Search Transactions
                  </label>
                  <input
                    type="text"
                    placeholder="Search by description or merchant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Account Type
                  </label>
                  <select
                    value={filterAccountType}
                    onChange={(e) => setFilterAccountType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  >
                    {accountTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    {filterAccountType === "all" &&
                      `Showing transactions from: ${selectedAccount?.accountName}`}
                    {filterAccountType === "allTransactions" &&
                      "Showing transactions from all accounts"}
                    {filterAccountType !== "all" &&
                      filterAccountType !== "allTransactions" &&
                      `Showing transactions from all ${filterAccountType} accounts`}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                    <input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Amount Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min amount"
                      value={filterAmountMin}
                      onChange={(e) => setFilterAmountMin(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Max amount"
                      value={filterAmountMax}
                      onChange={(e) => setFilterAmountMax(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 bg-white dark:bg-gray-700 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-500 dark:text-indigo-400"
                >
                  Clear All Filters
                </button>

                <div className="p-3 rounded-lg text-center bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
                  <div
                    className="text-sm font-medium"
                    style={{ color: currentTheme?.primary }}
                  >
                    {getFilteredTransactions().length} transactions found
                  </div>
                  {filterAccountType !== "all" && (
                    <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                      {filterAccountType === "allTransactions"
                        ? "From all accounts"
                        : `From ${filterAccountType} accounts`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TransactionHistory;

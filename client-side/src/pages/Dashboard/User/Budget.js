import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const UserDashboard = () => {
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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts`, {
                    params: { uId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
                    params: { uId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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

    console.log(transactions);





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




    // Spending analysis states
    const [spendingAnalysisView, setSpendingAnalysisView] = useState("trends");

    // Budget Management States
    const [budgets, setBudgets] = useState([
        {
            id: 1,
            category: "Food",
            budgeted: 600,
            actual: 520,
            color: "#ff6b6b",
            isActive: true,
            description: "Monthly food and dining expenses",
        },
        {
            id: 2,
            category: "Transportation",
            budgeted: 300,
            actual: 280,
            color: "#4ecdc4",
            isActive: true,
            description: "Gas, public transport, and car maintenance",
        },
        {
            id: 3,
            category: "Utilities",
            budgeted: 250,
            actual: 320,
            color: "#45b7d1",
            isActive: true,
            description: "Electricity, water, internet bills",
        },
        {
            id: 4,
            category: "Shopping",
            budgeted: 400,
            actual: 650,
            color: "#96ceb4",
            isActive: true,
            description: "Clothing, electronics, and general shopping",
        },
        {
            id: 5,
            category: "Entertainment",
            budgeted: 200,
            actual: 150,
            color: "#feca57",
            isActive: true,
            description: "Movies, games, and leisure activities",
        },
        {
            id: 6,
            category: "Health",
            budgeted: 150,
            actual: 120,
            color: "#ff9ff3",
            isActive: true,
            description: "Medical expenses and gym membership",
        },
        {
            id: 7,
            category: "Cash",
            budgeted: 100,
            actual: 200,
            color: "#54a0ff",
            isActive: true,
            description: "ATM withdrawals and cash expenses",
        },
    ]);

    // Budget Management Modal States
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);
    const [budgetForm, setBudgetForm] = useState({
        category: "",
        budgeted: "",
        color: "#4ecdc4",
        description: "",
        customCategory: "",
    });

    // Monthly Budget States
    const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(3000);
    const [showMonthlyBudgetModal, setShowMonthlyBudgetModal] = useState(false);
    const [tempMonthlyBudget, setTempMonthlyBudget] =
        useState(monthlyBudgetLimit);

    // Available categories for budgeting (now includes "Others")
    const availableCategories = [
        "Food",
        "Transportation",
        "Utilities",
        "Shopping",
        "Entertainment",
        "Health",
        "Cash",
        "Education",
        "Insurance",
        "Subscriptions",
        "Travel",
        "Gifts",
        "Personal Care",
        "Home Maintenance",
        "Others",
    ];

    // Predefined colors for new budgets
    const availableColors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
        "#5f27cd",
        "#00d2d3",
        "#ff9f43",
        "#10ac84",
        "#ee5a24",
        "#0abde3",
        "#feca57",
    ];

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

    console.log("sfsfb",selectedAccount)

    const currentTheme = themes[selectedAccount?.type];

    // Budget Management Functions
    const handleAddBudget = () => {
        setEditingBudget(null);
        setBudgetForm({
            category: "",
            budgeted: "",
            color:
                availableColors[Math.floor(Math.random() * availableColors.length)],
            description: "",
            customCategory: "",
        });
        setShowBudgetModal(true);
    };

    const handleEditBudget = (budget) => {
        setEditingBudget(budget);
        setBudgetForm({
            category: budget.category,
            budgeted: budget.budgeted.toString(),
            color: budget.color,
            description: budget.description || "",
            customCategory:
                budget.category === "Others" ? budget.customCategory || "" : "",
        });
        setShowBudgetModal(true);
    };

    const handleSaveBudget = () => {
        let finalCategory = budgetForm.category;

        // Handle "Others" category with custom name
        if (budgetForm.category === "Others") {
            if (!budgetForm.customCategory.trim()) {
                alert('Please enter a custom category name for "Others"');
                return;
            }
            finalCategory = budgetForm.customCategory.trim();
        }

        if (!budgetForm.category || !budgetForm.budgeted) {
            alert("Please fill in all required fields");
            return;
        }

        const budgetAmount = parseFloat(budgetForm.budgeted);
        if (isNaN(budgetAmount) || budgetAmount <= 0) {
            alert("Please enter a valid budget amount");
            return;
        }

        // Check if category already exists (when adding new)
        if (!editingBudget && budgets.some((b) => b.category === finalCategory)) {
            alert("Budget for this category already exists");
            return;
        }

        if (editingBudget) {
            // Update existing budget
            setBudgets(
                budgets.map((budget) =>
                    budget.id === editingBudget.id
                        ? {
                            ...budget,
                            category: finalCategory,
                            budgeted: budgetAmount,
                            color: budgetForm.color,
                            description: budgetForm.description,
                            customCategory:
                                budgetForm.category === "Others"
                                    ? budgetForm.customCategory
                                    : undefined,
                        }
                        : budget
                )
            );
        } else {
            // Add new budget
            const newBudget = {
                id: Date.now(),
                category: finalCategory,
                budgeted: budgetAmount,
                actual: calculateActualSpending(finalCategory),
                color: budgetForm.color,
                isActive: true,
                description: budgetForm.description,
                customCategory:
                    budgetForm.category === "Others"
                        ? budgetForm.customCategory
                        : undefined,
            };
            setBudgets([...budgets, newBudget]);
        }

        setShowBudgetModal(false);
        setBudgetForm({
            category: "",
            budgeted: "",
            color: "#4ecdc4",
            description: "",
            customCategory: "",
        });
        setEditingBudget(null);
    };

    const handleDeleteBudget = (budgetId) => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            setBudgets(budgets.filter((budget) => budget.id !== budgetId));
        }
    };

    const handleToggleBudget = (budgetId) => {
        setBudgets(
            budgets.map((budget) =>
                budget.id === budgetId
                    ? { ...budget, isActive: !budget.isActive }
                    : budget
            )
        );
    };

    const calculateActualSpending = (category) => {
        return transactions
            .filter((t) => t.category === category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    };

    const handleSaveMonthlyBudget = () => {
        if (tempMonthlyBudget <= 0) {
            alert("Please enter a valid monthly budget amount");
            return;
        }
        setMonthlyBudgetLimit(tempMonthlyBudget);
        setShowMonthlyBudgetModal(false);
    };

    const getTotalBudgeted = () => {
        return budgets
            .filter((b) => b.isActive)
            .reduce((sum, budget) => sum + budget.budgeted, 0);
    };

    const getTotalActualSpending = () => {
        return budgets
            .filter((b) => b.isActive)
            .reduce((sum, budget) => sum + budget.actual, 0);
    };

    // Update actual spending for budgets based on current transactions


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

    const getCategoryBreakdown = () => {
        let filteredTransactions = transactions;
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

    // Updated functions for spending analysis with dynamic budget data
    const getMonthlySpendingTrends = () => {
        return currentUser.monthlySpending.map((month) => ({
            ...month,
            budget: monthlyBudgetLimit, // Use user-set monthly budget
        }));
    };

    const getCategoryWiseSpending = () => {
        const categoryData = getCategoryBreakdown();
        const totalSpending = categoryData.reduce(
            (sum, cat) => sum + cat.amount,
            0
        );

        return categoryData.map((item, index) => ({
            ...item,
            percentage: totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0,
            color: `hsl(${index * 45}, 70%, 60%)`,
        }));
    };

    const getBudgetVsActual = () => {
        return budgets
            .filter((budget) => budget.isActive)
            .map((budget) => ({
                ...budget,
                variance: budget.actual - budget.budgeted,
                variancePercentage:
                    budget.budgeted > 0
                        ? ((budget.actual - budget.budgeted) / budget.budgeted) * 100
                        : 0,
            }));
    };

    return (
        <section>
            <div
                className="max-w-7xl mx-auto"
            >

                {/* Budget Management Modal */}
                {showBudgetModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
                            style={{
                                background: "var(--surface)",
                                border: `2px solid ${currentTheme?.primary}`,
                                borderRadius: "var(--radius-lg)",
                                boxShadow: currentTheme?.shadow,
                            }}
                        >
                            <h3
                                className="text-xl font-bold mb-4"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {editingBudget ? "Edit Budget" : "Add New Budget"}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Category *
                                    </label>
                                    <select
                                        value={budgetForm.category}
                                        onChange={(e) =>
                                            setBudgetForm({
                                                ...budgetForm,
                                                category: e.target.value,
                                                customCategory: "",
                                            })
                                        }
                                        className="w-full px-3 py-2 rounded-lg border"
                                        style={{
                                            background: "var(--background)",
                                            border: `1px solid ${currentTheme?.primary}40`,
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {availableCategories
                                            .filter(
                                                (cat) =>
                                                    editingBudget?.category === cat ||
                                                    !budgets.some((b) => b.category === cat)
                                            )
                                            .map((category) => (
                                                <option key={category} value={category}>
                                                    {getCategoryIcon(category)} {category}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Custom Category Name for "Others" */}
                                {budgetForm.category === "Others" && (
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            Custom Category Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter custom category name (e.g., Pet Expenses, Hobbies)"
                                            value={budgetForm.customCategory}
                                            onChange={(e) =>
                                                setBudgetForm({
                                                    ...budgetForm,
                                                    customCategory: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 rounded-lg border"
                                            style={{
                                                background: "var(--background)",
                                                border: `1px solid ${currentTheme?.primary}40`,
                                                color: "var(--text-primary)",
                                            }}
                                        />
                                        <div
                                            className="text-xs mt-1"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            This will be the display name for your custom category
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Monthly Budget Amount *
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter budget amount"
                                        value={budgetForm.budgeted}
                                        onChange={(e) =>
                                            setBudgetForm({ ...budgetForm, budgeted: e.target.value })
                                        }
                                        className="w-full px-3 py-2 rounded-lg border"
                                        style={{
                                            background: "var(--background)",
                                            border: `1px solid ${currentTheme?.primary}40`,
                                            color: "var(--text-primary)",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Add a description for this budget category..."
                                        value={budgetForm.description}
                                        onChange={(e) =>
                                            setBudgetForm({
                                                ...budgetForm,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg border resize-none"
                                        style={{
                                            background: "var(--background)",
                                            border: `1px solid ${currentTheme?.primary}40`,
                                            color: "var(--text-primary)",
                                        }}
                                    />
                                    <div
                                        className="text-xs mt-1"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Describe what expenses this budget will cover
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Color Theme
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableColors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setBudgetForm({ ...budgetForm, color })}
                                                className={`w-8 h-8 rounded-full border-2 ${budgetForm.color === color
                                                    ? "ring-2 ring-offset-2"
                                                    : ""
                                                    }`}
                                                style={{
                                                    background: color,
                                                    borderColor:
                                                        budgetForm.color === color
                                                            ? currentTheme?.primary
                                                            : "transparent",
                                                    ringColor: currentTheme?.primary,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowBudgetModal(false)}
                                    className="px-4 py-2 rounded-lg font-medium"
                                    style={{
                                        background: "var(--background)",
                                        border: `1px solid ${currentTheme?.primary}40`,
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveBudget}
                                    className="px-4 py-2 rounded-lg font-medium text-white"
                                    style={{
                                        background: currentTheme?.gradient,
                                        boxShadow: currentTheme?.shadow,
                                    }}
                                >
                                    {editingBudget ? "Update Budget" : "Create Budget"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Monthly Budget Modal */}
                {showMonthlyBudgetModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
                            style={{
                                background: "var(--surface)",
                                border: `2px solid ${currentTheme?.primary}`,
                                borderRadius: "var(--radius-lg)",
                                boxShadow: currentTheme?.shadow,
                            }}
                        >
                            <h3
                                className="text-xl font-bold mb-4"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Set Monthly Budget Limit
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Monthly Budget Limit
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter monthly budget limit"
                                        value={tempMonthlyBudget}
                                        onChange={(e) =>
                                            setTempMonthlyBudget(parseFloat(e.target.value) || 0)
                                        }
                                        className="w-full px-3 py-2 rounded-lg border"
                                        style={{
                                            background: "var(--background)",
                                            border: `1px solid ${currentTheme?.primary}40`,
                                            color: "var(--text-primary)",
                                        }}
                                    />
                                    <div
                                        className="text-xs mt-1"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        This will be used as your overall monthly spending target
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowMonthlyBudgetModal(false)}
                                    className="px-4 py-2 rounded-lg font-medium"
                                    style={{
                                        background: "var(--background)",
                                        border: `1px solid ${currentTheme?.primary}40`,
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveMonthlyBudget}
                                    className="px-4 py-2 rounded-lg font-medium text-white"
                                    style={{
                                        background: currentTheme?.gradient,
                                        boxShadow: currentTheme?.shadow,
                                    }}
                                >
                                    Save Budget
                                </button>
                            </div>
                        </div>
                    </div>
                )}







                {/* BUDGET MANAGEMENT SECTION */}
                <div className="mt-12 p-5">
                    <div className="flex items-center justify-between mb-6">
                        <h2
                            className="text-2xl font-bold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Budget Management & Spending Analysis
                        </h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowMonthlyBudgetModal(true)}
                                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
                                style={{
                                    background: "var(--background)",
                                    border: `2px solid ${currentTheme?.primary}`,
                                    color: currentTheme?.primary,
                                }}
                            >
                                📊 Set Monthly Budget
                            </button>
                            <button
                                onClick={handleAddBudget}
                                className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                                style={{
                                    background: currentTheme?.gradient,
                                    boxShadow: currentTheme?.shadow,
                                }}
                            >
                                ➕ Add Budget Category
                            </button>
                        </div>
                    </div>

                    {/* Budget Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div
                            className="p-4 rounded-lg text-center"
                            style={{
                                background: `${chartColors.income}20`,
                                border: `1px solid ${chartColors.income}40`,
                            }}
                        >
                            <div
                                className="text-2xl font-bold"
                                style={{ color: chartColors.income }}
                            >
                                {formatCurrency(getTotalBudgeted())}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Total Budgeted
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg text-center"
                            style={{
                                background: `${chartColors.spending}20`,
                                border: `1px solid ${chartColors.spending}40`,
                            }}
                        >
                            <div
                                className="text-2xl font-bold"
                                style={{ color: chartColors.spending }}
                            >
                                {formatCurrency(getTotalActualSpending())}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Total Spent
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg text-center"
                            style={{
                                background: `${currentTheme?.primary}20`,
                                border: `1px solid ${currentTheme?.primary}40`,
                            }}
                        >
                            <div
                                className="text-2xl font-bold"
                                style={{ color: currentTheme?.primary }}
                            >
                                {formatCurrency(
                                    Math.abs(getTotalBudgeted() - getTotalActualSpending())
                                )}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {getTotalBudgeted() > getTotalActualSpending()
                                    ? "Remaining"
                                    : "Over Budget"}
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg text-center"
                            style={{
                                background: `${currentTheme?.primary}20`,
                                border: `1px solid ${currentTheme?.primary}40`,
                            }}
                        >
                            <div
                                className="text-2xl font-bold"
                                style={{ color: currentTheme?.primary }}
                            >
                                {formatCurrency(monthlyBudgetLimit)}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Monthly Limit
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={spendingAnalysisView}
                            onChange={(e) => setSpendingAnalysisView(e.target.value)}
                            className="px-4 py-2 my-2 rounded-lg text-sm font-medium transition-all duration-300"
                            style={{
                                background: "var(--surface)",
                                border: `1px solid ${currentTheme?.primary}`,
                                color: "var(--text-primary)",
                                marginLeft: "auto", // This pushes it to the right
                            }}
                        >
                            <option value="trends">Monthly Spending Trends</option>
                            <option value="categories">Category-wise Spending</option>
                            <option value="budget">Budget vs Actual</option>
                        </select>
                    </div>

                    {/* Spending Analysis Charts */}
                    <div
                        className="p-6 rounded-lg transition-all duration-500"
                        style={{
                            background: "var(--surface)",
                            border: `1px solid ${currentTheme?.primary}`,
                            borderRadius: "var(--radius-lg)",
                            boxShadow: "var(--shadow-md)",
                            paddingBottom: "60px",
                        }}
                    >
                        {spendingAnalysisView === "trends" && (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h3
                                        className="text-lg font-semibold"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        Monthly Spending Trends
                                    </h3>
                                    <div
                                        className="text-sm"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        Monthly Budget: {formatCurrency(monthlyBudgetLimit)}
                                    </div>
                                </div>
                                <div className="relative h-80">
                                    <div className="flex items-end justify-between h-full space-x-4">
                                        {getMonthlySpendingTrends().map((data, index) => {
                                            const maxValue = Math.max(
                                                ...getMonthlySpendingTrends().map((d) =>
                                                    Math.max(d.spending, d.budget)
                                                )
                                            );
                                            const spendingHeight = (data.spending / maxValue) * 100;
                                            const budgetHeight = (data.budget / maxValue) * 100;
                                            const isOverBudget = data.spending > data.budget;

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex-1 flex flex-col items-center space-y-2"
                                                >
                                                    <div className="flex items-end space-x-2 h-64 relative">
                                                        {/* Budget Line (background) */}
                                                        <div
                                                            className="w-8 rounded-t transition-all duration-1000 opacity-40"
                                                            style={{
                                                                height: `${budgetHeight}%`,
                                                                background: currentTheme?.primary,
                                                                minHeight: "4px",
                                                            }}
                                                            title={`Budget: ${formatCurrency(data.budget)}`}
                                                        ></div>
                                                        {/* Actual Spending Bar */}
                                                        <div
                                                            className="w-8 rounded-t transition-all duration-1000 hover:opacity-80 absolute left-0"
                                                            style={{
                                                                height: `${spendingHeight}%`,
                                                                background: isOverBudget
                                                                    ? chartColors.spending
                                                                    : chartColors.income,
                                                                minHeight: "4px",
                                                            }}
                                                            title={`Spending: ${formatCurrency(
                                                                data.spending
                                                            )}`}
                                                        ></div>
                                                        {/* Over budget indicator */}
                                                        {isOverBudget && (
                                                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">!</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="text-xs text-center"
                                                        style={{ color: "var(--text-secondary)" }}
                                                    >
                                                        {data.month}
                                                    </div>
                                                    <div className="text-xs text-center space-y-1">
                                                        <div
                                                            style={{
                                                                color: isOverBudget
                                                                    ? chartColors.spending
                                                                    : chartColors.income,
                                                            }}
                                                        >
                                                            {formatCurrency(data.spending)}
                                                        </div>
                                                        <div style={{ color: "var(--text-secondary)" }}>
                                                            vs {formatCurrency(data.budget)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Legend */}
                                    <div className="flex items-center justify-center space-x-6 mt-6">
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-4 h-4 rounded opacity-40"
                                                style={{ background: currentTheme?.primary }}
                                            ></div>
                                            <span
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Budget
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-4 h-4 rounded"
                                                style={{ background: chartColors.income }}
                                            ></div>
                                            <span
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Under Budget
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-4 h-4 rounded"
                                                style={{ background: chartColors.spending }}
                                            ></div>
                                            <span
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Over Budget
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {spendingAnalysisView === "categories" && (
                            <>
                                <h3
                                    className="text-lg font-semibold mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Category-wise Spending Distribution
                                </h3>
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Pie Chart Representation */}
                                    <div className="flex items-center justify-center">
                                        <div className="relative w-64 h-64">
                                            {/* Circular Progress Rings */}
                                            <svg
                                                className="w-64 h-64 transform -rotate-90"
                                                viewBox="0 0 100 100"
                                            >
                                                {getCategoryWiseSpending().map((item, index) => {
                                                    const radius = 35 - index * 3;
                                                    const circumference = 2 * Math.PI * radius;
                                                    const strokeDasharray = `${(item.percentage / 100) * circumference
                                                        } ${circumference}`;
                                                    const rotation = getCategoryWiseSpending()
                                                        .slice(0, index)
                                                        .reduce(
                                                            (sum, prev) =>
                                                                sum + (prev.percentage / 100) * 360,
                                                            0
                                                        );

                                                    return (
                                                        <circle
                                                            key={index}
                                                            cx="50"
                                                            cy="50"
                                                            r={radius}
                                                            fill="none"
                                                            stroke={item.color}
                                                            strokeWidth="3"
                                                            strokeDasharray={strokeDasharray}
                                                            strokeLinecap="round"
                                                            style={{
                                                                transformOrigin: "50% 50%",
                                                                transform: `rotate(${rotation}deg)`,
                                                            }}
                                                            className="transition-all duration-1000"
                                                        />
                                                    );
                                                })}
                                            </svg>

                                            {/* Center Total */}
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <div
                                                    className="text-lg font-bold"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    Total
                                                </div>
                                                <div
                                                    className="text-xl font-bold"
                                                    style={{ color: currentTheme?.primary }}
                                                >
                                                    {formatCurrency(
                                                        getCategoryWiseSpending().reduce(
                                                            (sum, cat) => sum + cat.amount,
                                                            0
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Breakdown */}
                                    <div className="space-y-4">
                                        {getCategoryWiseSpending().map((item, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{ background: item.color }}
                                                        ></div>
                                                        <span className="text-lg">
                                                            {getCategoryIcon(item.category)}
                                                        </span>
                                                        <span
                                                            className="font-medium"
                                                            style={{ color: "var(--text-primary)" }}
                                                        >
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className="font-bold"
                                                            style={{ color: "var(--text-primary)" }}
                                                        >
                                                            {formatCurrency(item.amount)}
                                                        </div>
                                                        <div
                                                            className="text-xs"
                                                            style={{ color: "var(--text-secondary)" }}
                                                        >
                                                            {item.percentage.toFixed(1)}%
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-full h-2 rounded-full"
                                                    style={{ background: "var(--surface-variant)" }}
                                                >
                                                    <div
                                                        className="h-2 rounded-full transition-all duration-1000"
                                                        style={{
                                                            width: `${item.percentage}%`,
                                                            background: item.color,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {spendingAnalysisView === "budget" && (
                            <>
                                <h3
                                    className="text-lg font-semibold mb-6"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Budget Categories
                                </h3>

                                {budgets.length > 0 ? (
                                    <div
                                        className="space-y-4 "
                                        style={{ maxHeight: "60vh", overflowY: "auto" }}
                                    >
                                        {budgets.map((budget) => {
                                            const isOverBudget = budget.actual > budget.budgeted;
                                            const percentage =
                                                budget.budgeted > 0
                                                    ? (budget.actual / budget.budgeted) * 100
                                                    : 0;

                                            return (
                                                <div
                                                    key={budget.id}
                                                    className={`p-4 rounded-lg transition-all duration-300 ${budget.isActive ? "" : "opacity-50"
                                                        }`}
                                                    style={{
                                                        background: "var(--background)",
                                                        border: `1px solid ${budget.isActive
                                                            ? budget.color
                                                            : "var(--surface-variant)"
                                                            }40`,
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-xl">
                                                                {getCategoryIcon(budget.category)}
                                                            </span>
                                                            <div>
                                                                <div
                                                                    className="font-semibold"
                                                                    style={{ color: "var(--text-primary)" }}
                                                                >
                                                                    {budget.category}
                                                                </div>
                                                                {budget.description && (
                                                                    <div
                                                                        className="text-xs mt-1"
                                                                        style={{ color: "var(--text-secondary)" }}
                                                                    >
                                                                        {budget.description}
                                                                    </div>
                                                                )}
                                                                <div
                                                                    className="text-sm"
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    {isOverBudget
                                                                        ? "Over Budget"
                                                                        : "Under Budget"}{" "}
                                                                    by{" "}
                                                                    {formatCurrency(
                                                                        Math.abs(budget.actual - budget.budgeted)
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => handleToggleBudget(budget.id)}
                                                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300`}
                                                                style={{
                                                                    background: budget.isActive
                                                                        ? `${budget.color}20`
                                                                        : "var(--surface-variant)",
                                                                    color: budget.isActive
                                                                        ? budget.color
                                                                        : "var(--text-secondary)",
                                                                    border: `1px solid ${budget.isActive
                                                                        ? budget.color
                                                                        : "var(--surface-variant)"
                                                                        }40`,
                                                                }}
                                                            >
                                                                {budget.isActive ? "Active" : "Inactive"}
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditBudget(budget)}
                                                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                                                                style={{
                                                                    background: `${currentTheme?.primary}20`,
                                                                    color: currentTheme?.primary,
                                                                    border: `1px solid ${currentTheme?.primary}40`,
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteBudget(budget.id)}
                                                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                                                                style={{
                                                                    background: `${chartColors.spending}20`,
                                                                    color: chartColors.spending,
                                                                    border: `1px solid ${chartColors.spending}40`,
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Budget Progress Bars */}
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="flex justify-between text-sm mb-1">
                                                                <span
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    Budgeted
                                                                </span>
                                                                <span style={{ color: "var(--text-primary)" }}>
                                                                    {formatCurrency(budget.budgeted)}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="w-full h-3 rounded-full"
                                                                style={{ background: "var(--surface-variant)" }}
                                                            >
                                                                <div
                                                                    className="h-3 rounded-full transition-all duration-1000"
                                                                    style={{
                                                                        width: "100%",
                                                                        background: budget.color,
                                                                        opacity: 0.3,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between text-sm mb-1">
                                                                <span
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    Actual Spending
                                                                </span>
                                                                <span style={{ color: "var(--text-primary)" }}>
                                                                    {formatCurrency(budget.actual)}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="w-full h-3 rounded-full"
                                                                style={{ background: "var(--surface-variant)" }}
                                                            >
                                                                <div
                                                                    className="h-3 rounded-full transition-all duration-1000"
                                                                    style={{
                                                                        width: `${Math.min(percentage, 100)}%`,
                                                                        background: isOverBudget
                                                                            ? chartColors.spending
                                                                            : budget.color,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Budget Status */}
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{
                                                                    background: isOverBudget
                                                                        ? chartColors.spending
                                                                        : chartColors.income,
                                                                }}
                                                            ></div>
                                                            <span
                                                                className="text-sm"
                                                                style={{ color: "var(--text-secondary)" }}
                                                            >
                                                                {percentage.toFixed(1)}% of budget used
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="text-sm font-medium"
                                                            style={{
                                                                color: isOverBudget
                                                                    ? chartColors.spending
                                                                    : chartColors.income,
                                                            }}
                                                        >
                                                            {isOverBudget
                                                                ? `${(percentage - 100).toFixed(
                                                                    1
                                                                )}% over budget`
                                                                : `${(100 - percentage).toFixed(1)}% remaining`}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">💰</div>
                                        <div
                                            className="text-lg font-medium mb-2"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            No Budget Categories Set
                                        </div>
                                        <div
                                            className="text-sm mb-4"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            Start managing your finances by creating budget categories
                                        </div>
                                        <button
                                            onClick={handleAddBudget}
                                            className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                                            style={{
                                                background: currentTheme?.gradient,
                                                boxShadow: currentTheme?.shadow,
                                            }}
                                        >
                                            Create Your First Budget
                                        </button>
                                    </div>
                                )}

                                {/* Budget Summary */}
                                {getBudgetVsActual().length > 0 && (
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div
                                            className="p-4 rounded-lg text-center"
                                            style={{
                                                background: `${chartColors.income}20`,
                                                border: `1px solid ${chartColors.income}40`,
                                            }}
                                        >
                                            <div
                                                className="text-2xl font-bold"
                                                style={{ color: chartColors.income }}
                                            >
                                                {
                                                    getBudgetVsActual().filter((b) => b.variance <= 0)
                                                        .length
                                                }
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Categories Under Budget
                                            </div>
                                        </div>

                                        <div
                                            className="p-4 rounded-lg text-center"
                                            style={{
                                                background: `${chartColors.spending}20`,
                                                border: `1px solid ${chartColors.spending}40`,
                                            }}
                                        >
                                            <div
                                                className="text-2xl font-bold"
                                                style={{ color: chartColors.spending }}
                                            >
                                                {
                                                    getBudgetVsActual().filter((b) => b.variance > 0)
                                                        .length
                                                }
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Categories Over Budget
                                            </div>
                                        </div>

                                        <div
                                            className="p-4 rounded-lg text-center"
                                            style={{
                                                background: `${currentTheme?.primary}20`,
                                                border: `1px solid ${currentTheme?.primary}40`,
                                            }}
                                        >
                                            <div
                                                className="text-2xl font-bold"
                                                style={{ color: currentTheme?.primary }}
                                            >
                                                {formatCurrency(
                                                    getBudgetVsActual().reduce(
                                                        (sum, b) => sum + Math.abs(b.variance),
                                                        0
                                                    )
                                                )}
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Total Variance
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>




                            {/* Budget Alert */}
                            <div className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-400">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <span className="text-white">📊</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800">Budget Exceeded</h4>
                                        <p className="text-sm text-gray-600">
                                            You've exceeded your Transportation budget by $74.75
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">May 30, 2025</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-yellow-600">
                                            107.9%
                                        </span>
                                        <p className="text-xs text-gray-500">of Budget Used</p>
                                    </div>
                                </div>
                            </div>

 
            </div>
        </section>
    );
};
export default UserDashboard;

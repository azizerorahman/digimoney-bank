import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";

const TransactionHistory = () => {
  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  // Filter states
  const [timeRange, setTimeRange] = useState("7days");
  const [chartType, setChartType] = useState("timeline");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAccountType, setFilterAccountType] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterAmountMin, setFilterAmountMin] = useState("");
  const [filterAmountMax, setFilterAmountMax] = useState("");

  // Fetch all data in a single useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      if (!uId) return;
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem("accessToken");
        
        // Fetch accounts
        const accountsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/accounts`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (accountsRes.data && accountsRes.data.success) {
          setAccounts(accountsRes.data.accounts);
          // Set selected account to the first account
          if (accountsRes.data.accounts.length > 0) {
            setSelectedAccount(accountsRes.data.accounts[0]);
          }
        } else {
          toast.error("Failed to fetch accounts");
        }
        
        // Fetch transactions
        const transactionsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/transactions`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (transactionsRes.data && transactionsRes.data.success) {
          setTransactions(transactionsRes.data.transactions);
        } else {
          toast.error("Failed to fetch transactions");
        }
        
        // Fetch transaction history
        const historyRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/transaction-history`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (historyRes.data && historyRes.data.success) {
          const transformedData = historyRes.data.transactions.map((transaction) => ({
            date: transaction.date,
            income: transaction.credit || 0,
            spending: Math.abs(transaction.debit) || 0,
          }));
          setTransactionHistory(transformedData);
        } else {
          toast.error("Failed to fetch transaction history");
        }
        
        // Fetch spending by category
        const spendingRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/spending-by-category`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (spendingRes.data && spendingRes.data.success) {
          setSpendingData(spendingRes.data.data.categories);
        } else {
          toast.error(spendingRes.data?.message || "Failed to fetch spending by category");
        }
      } catch (error) {
        toast.error("Failed to load data");
        if (error.response) {
          console.error("API error:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [uId]);

  // Transform spending data based on selected time range
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
      .filter((item) => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  };

  // Theme configurations for each card type
  const themes = {
    Checking: {
      primary: "#6366f1",
      primaryLight: "#a5b4fc",
      secondary: "#4f46e5",
      accent: "#8b5cf6",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      lightGradient: "linear-gradient(135deg, #a5b4fc 0%, #8b5cf6 100%)",
      shadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
      name: "Checking",
    },
    Savings: {
      primary: "#10b981",
      primaryLight: "#6ee7b7",
      secondary: "#059669",
      accent: "#34d399",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      lightGradient: "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)",
      shadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
      name: "Savings",
    },
    Credit: {
      primary: "#8b5cf6",
      primaryLight: "#c4b5fd",
      secondary: "#7c3aed",
      accent: "#a78bfa",
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

  const currentTheme = themes[selectedAccount?.type];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food": return "🍽️";
      case "Transportation": return "🚗";
      case "Utilities": return "⚡";
      case "Shopping": return "🛍️";
      case "Entertainment": return "🎬";
      case "Health": return "💪";
      case "Income": return "💰";
      case "Transfer": return "🔄";
      case "Cash": return "💵";
      case "Education": return "📚";
      case "Insurance": return "🛡️";
      case "Subscriptions": return "📱";
      case "Travel": return "✈️";
      case "Gifts": return "🎁";
      case "Personal Care": return "💄";
      case "Home Maintenance": return "🔧";
      case "Others": return "📋";
      default: return "📊";
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

  if (isLoading) {
    return <LoadingSpinner overlay />;
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


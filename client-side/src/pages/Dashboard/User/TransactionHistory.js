import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const TransactionHistory = () => {
  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getTimeShiftedDate = (originalDate, referenceDate) => {
    if (!referenceDate) return originalDate;

    const today = new Date();
    const reference = new Date(referenceDate);
    const original = new Date(originalDate);

    // Calculate the difference between today and reference date
    const timeDifference = today.getTime() - reference.getTime();

    // Add this difference to the original date
    const shiftedDate = new Date(original.getTime() + timeDifference);

    return shiftedDate;
  };

  // Fetch all data in a single useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const token = localStorage.getItem("accessToken");
        let referenceDate = null;

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
          referenceDate = transactionsRes.data.referenceDate;

          // Transform transaction dates to appear current
          const transformedTransactions = transactionsRes.data.transactions.map(
            (transaction) => ({
              ...transaction,
              date: getTimeShiftedDate(
                transaction.date,
                referenceDate
              ).toISOString(),
              originalDate: transaction.date, // Keep original for reference
            })
          );

          setTransactions(transformedTransactions);
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
          const transformedData = historyRes.data.transactions.map(
            (transaction) => ({
              date: getTimeShiftedDate(
                transaction.date,
                referenceDate
              ).toISOString(),
              income: transaction.credit || 0,
              spending: Math.abs(transaction.debit) || 0,
              originalDate: transaction.date,
            })
          );
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
          toast.error(
            spendingRes.data?.message || "Failed to fetch spending by category"
          );
        }
      } catch (error) {
        toast.error("Failed to load data");
        if (error.response) {
          console.error("API error:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setLoading(false);
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

    // Sort by date in descending order (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getTimelineData = () => {
    const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;

    return transactionHistory.slice(0, days).reverse();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Transaction History
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Track and analyze your financial activities
            </p>
          </div>
        </AnimatedSection>

        {/* Chart Controls */}
        <AnimatedSection delay={150}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
            <div className="flex flex-wrap items-center justify-between w-full">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-indigo-400 text-gray-800 dark:text-white shadow-lg hover:shadow-xl"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>

              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-indigo-400 text-gray-800 dark:text-white shadow-lg hover:shadow-xl"
              >
                <option value="timeline">Timeline Chart</option>
                <option value="category">Category Breakdown</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* Chart Section */}
        <AnimatedSection delay={200}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10 pb-[100px] transition-all duration-500 hover:shadow-3xl mb-8 sm:mb-10 lg:mb-12">
            {chartType === "timeline" ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    Income vs Spending Timeline
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
                    {timeRange === "7days"
                      ? "Last 7 Days"
                      : timeRange === "30days"
                      ? "Last 30 Days"
                      : "Last 90 Days"}
                  </div>
                </div>
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
                  {/* Add an overflow container for horizontal scrolling */}
                  <div className="w-full overflow-x-auto pb-2">
                    <div
                      className="flex items-end justify-between h-full space-x-2 sm:space-x-3 md:space-x-4"
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
                            className="flex-1 flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 flex-shrink-0"
                            style={{ minWidth: "60px" }}
                          >
                            <div className="flex items-end space-x-1 h-48 sm:h-56 md:h-64 lg:h-72 relative">
                              <div
                                className="w-4 sm:w-5 md:w-6 rounded-t transition-all duration-1000 hover:opacity-80"
                                style={{
                                  height: `${incomeHeight}%`,
                                  background: chartColors.income,
                                  minHeight: data.income > 0 ? "4px" : "0",
                                }}
                                title={`Income: ${formatCurrency(data.income)}`}
                              ></div>
                              <div
                                className="w-4 sm:w-5 md:w-6 rounded-t transition-all duration-1000 hover:opacity-80"
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
                            <div className="text-xs text-center text-gray-600 dark:text-gray-300 font-medium">
                              {new Date(data.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-center space-y-1">
                              <div
                                className="font-semibold"
                                style={{
                                  color: chartColors.income,
                                }}
                              >
                                {formatCurrency(data.income)}
                              </div>
                              <div
                                className="font-semibold"
                                style={{
                                  color: chartColors.spending,
                                }}
                              >
                                {formatCurrency(data.spending)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional: Add scroll indicators for better UX */}
                  {(timeRange === "30days" || timeRange === "90days") && (
                    <div className="text-[10px] absolute left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-400">
                      ← Scroll horizontally to view all data →
                    </div>
                  )}

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                        style={{ background: chartColors.income }}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                        Income
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                        style={{ background: chartColors.spending }}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                        Spending
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    Spending by Category
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
                    {timeRange === "7days"
                      ? "Last 7 Days"
                      : timeRange === "30days"
                      ? "Last 30 Days"
                      : "Last 90 Days"}
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  {displayData.map((item, index) => {
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-xl">
                              {getCategoryIcon(item.category)}
                            </span>
                            <span className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm sm:text-base text-gray-800 dark:text-white">
                              {formatCurrency(item.amount)}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {item.percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-2 sm:h-3 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
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
                    <div className="text-center py-8 sm:py-12">
                      <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 animate-bounce">
                        📊
                      </div>
                      <div className="text-lg sm:text-xl font-medium mb-2 sm:mb-4 text-gray-800 dark:text-white">
                        No spending data found
                      </div>
                      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        No spending transactions match the current filter
                        criteria
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Transaction Details and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Transaction Details */}
          <AnimatedSection delay={250} className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl h-full">
              <div className="flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  {" "}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    {" "}
                    Transaction Details{" "}
                    {filterAccountType !== "all" && (
                      <span className="text-sm font-normal ml-2 text-gray-600 dark:text-gray-300">
                        {" "}
                        {filterAccountType === "allTransactions"
                          ? "(All Accounts)"
                          : `(${filterAccountType} Accounts)`}{" "}
                      </span>
                    )}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
                    {" "}
                    Showing {getFilteredTransactions().length} of{" "}
                    {transactions.length} transactions{" "}
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 max-h-[600px] pr-1">
                  {getFilteredTransactions().length > 0 ? (
                    getFilteredTransactions().map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 sm:p-4 mx-1 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-sm bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                            style={{ background: `${currentTheme?.primary}20` }}
                          >
                            {getCategoryIcon(transaction.category)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm sm:text-base text-gray-800 dark:text-white truncate">
                              {transaction.description}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {transaction.merchant} •{" "}
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <div
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  background: `${currentTheme?.primary}20`,
                                  color: currentTheme?.primary,
                                }}
                              >
                                {transaction.category}
                              </div>
                              <div
                                className="text-xs px-2 py-0.5 rounded-full"
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
                        <div className="text-right flex-shrink-0 ml-3">
                          <div
                            className="font-bold text-base sm:text-lg"
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
                          <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center justify-end space-x-1">
                            {getTransactionIcon(transaction.type)}{" "}
                            <span>{titleCasedString(transaction.type)}</span>
                          </div>
                          <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            {getAccountTypeById(transaction.accountId)} Account
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 animate-bounce">
                        🔍
                      </div>
                      <div className="text-lg sm:text-xl font-medium mb-2 sm:mb-4 text-gray-800 dark:text-white">
                        No transactions found
                      </div>
                      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto px-4">
                        Try adjusting your search criteria or filters
                      </div>
                      <button
                        onClick={clearFilters}
                        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl"
                        style={{
                          background: currentTheme?.gradient,
                          boxShadow: currentTheme?.shadow,
                          color: "white",
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Search and Filter Section */}
          <AnimatedSection delay={300}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Search & Filter
              </h3>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Search Transactions
                  </label>
                  <input
                    type="text"
                    placeholder="Search by description or merchant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Account Type
                  </label>
                  <select
                    value={filterAccountType}
                    onChange={(e) => setFilterAccountType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="all">Select Account Type</option>
                    {accountTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
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
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        From
                      </label>
                      <input
                        type="date"
                        value={filterDateFrom}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        value={filterDateTo}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    Amount Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Min ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Min amount"
                        value={filterAmountMin}
                        onChange={(e) => setFilterAmountMin(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Max ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Max amount"
                        value={filterAmountMax}
                        onChange={(e) => setFilterAmountMax(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl bg-white dark:bg-gray-700 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-500 dark:text-indigo-400"
                >
                  Clear All Filters
                </button>

                <div className="p-4 rounded-xl text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700">
                  <div
                    className="text-sm sm:text-base font-medium"
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
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;

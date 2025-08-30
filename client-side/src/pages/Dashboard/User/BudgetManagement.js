import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";

const BudgetManagement = () => {
  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tempBudgetInput, setTempBudgetInput] = useState("");
  const openMonthlyBudgetModal = () => {
    setTempBudgetInput(
      monthlyBudgetLimit > 0 ? monthlyBudgetLimit.toString() : ""
    );
    setShowMonthlyBudgetModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      setLoading(true);
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
              date: transaction.date,
              income: transaction.credit || 0,
              spending: Math.abs(transaction.debit) || 0,
            })
          );
          setTransactionHistory(transformedData);
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
        }

        // Fetch budget data
        const budgetRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/budgets`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (budgetRes.data && budgetRes.data.success) {
          const budgetData = budgetRes.data.data || {};
          setBudgets({
            budgets: budgetData.budgets || [],
            ...budgetData,
          });

          if (budgetData.monthlyBudgetLimit) {
            setMonthlyBudgetLimit(budgetData.monthlyBudgetLimit);
          }
        }
      } catch (error) {
        toast.error("Failed to load data");
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uId]);

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Budget State Management
  const [budgets, setBudgets] = useState({ budgets: [] });
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(0);

  // Spending analysis states
  const [spendingAnalysisView, setSpendingAnalysisView] = useState("trends");

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
  const [showMonthlyBudgetModal, setShowMonthlyBudgetModal] = useState(false);

  // Available categories for budgeting
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
    "#ff6b6b", // Coral red
    "#4ecdc4", // Turquoise
    "#45b7d1", // Sky blue
    "#96ceb4", // Mint green
    "#feca57", // Mustard yellow
    "#ff9ff3", // Pink
    "#54a0ff", // Bright blue
    "#5f27cd", // Purple
    "#00d2d3", // Cyan
    "#ff9f43", // Orange
    "#10ac84", // Green
    "#ee5a24", // Red-orange
    "#0abde3", // Light blue
    "#a29bfe", // Lavender (replacing the duplicate #feca57)
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

  const currentTheme = themes[selectedAccount?.type];

  // Memoized calculations
  const getMonthlySpendingTrends = useMemo(() => {
    if (!transactionHistory || !Array.isArray(transactionHistory)) {
      return [];
    }

    const monthlyTotals = {};
    transactionHistory.forEach((item) => {
      if (!item || !item.date) return;

      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = {
          month: monthYear,
          totalSpending: 0,
          budget: monthlyBudgetLimit || 0,
        };
      }

      monthlyTotals[monthYear].totalSpending += item.spending || 0;
    });

    // Convert to array and sort by month
    return Object.values(monthlyTotals).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [transactionHistory, monthlyBudgetLimit]);

  const getBudgetVsActual = useMemo(() => {
    if (!budgets || !budgets.budgets || !Array.isArray(budgets.budgets)) {
      return [];
    }
    return budgets.budgets
      .filter((budget) => budget.isActive)
      .map((budget) => ({
        ...budget,
        variance: budget.actual - budget.budgeted,
        variancePercentage:
          budget.budgeted > 0
            ? ((budget.actual - budget.budgeted) / budget.budgeted) * 100
            : 0,
      }));
  }, [budgets]);

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

  const handleSaveBudget = async () => {
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
    if (
      !editingBudget &&
      budgets?.budgets?.some((b) => b.category === finalCategory)
    ) {
      alert("Budget for this category already exists");
      return;
    }

    // Prepare budget data for API
    const budgetData = {
      uId,
      category: finalCategory,
      budgeted: budgetAmount,
      color: budgetForm.color,
      description: budgetForm.description,
      customCategory:
        budgetForm.category === "Others"
          ? budgetForm.customCategory
          : undefined,
      isActive: true,
    };

    try {
      const token = localStorage.getItem("accessToken");
      let response;

      if (editingBudget) {
        // Update existing budget via API
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/budgets/${editingBudget._id}`,
          budgetData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          // Update local state after successful API call
          setBudgets({
            ...budgets,
            budgets: budgets.budgets.map((budget) =>
              budget._id === editingBudget._id
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
            ),
          });
          toast.success("Budget updated successfully");
        } else {
          throw new Error(response.data?.message || "Failed to update budget");
        }
      } else {
        // Create new budget via API
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/budgets`,
          budgetData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          // Use the returned budget from API (which should include the ID)
          const newBudget = response.data.budget || {
            id: Date.now(),
            ...budgetData,
            actual: calculateActualSpending(finalCategory),
          };

          // Update local state with the new budget from API
          setBudgets({
            ...budgets,
            budgets: [...(budgets.budgets || []), newBudget],
          });
          toast.success("Budget created successfully");
        } else {
          throw new Error(response.data?.message || "Failed to create budget");
        }
      }

      // Close modal and reset form after successful API call
      setShowBudgetModal(false);
      setBudgetForm({
        category: "",
        budgeted: "",
        color: "#4ecdc4",
        description: "",
        customCategory: "",
      });
      setEditingBudget(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
      console.error("Budget save error:", error);
    }
  };

  const handleDeleteBudget = async (budgetId) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/budgets/${budgetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { uId },
          }
        );

        if (response.data && response.data.success) {
          // Update local state after successful API call
          setBudgets({
            ...budgets,
            budgets: budgets.budgets.filter(
              (budget) => budget._id !== budgetId
            ),
          });
          toast.success("Budget deleted successfully");
        } else {
          throw new Error(response.data?.message || "Failed to delete budget");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete budget";
        toast.error(errorMessage);
        console.error("Budget delete error:", error);
      }
    }
  };

  const handleToggleBudget = async (budgetId) => {
    try {
      // Find the current budget to toggle
      const currentBudget = budgets.budgets.find(
        (budget) => budget._id === budgetId
      );
      if (!currentBudget) return;

      const newActiveState = !currentBudget.isActive;

      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/budgets/${budgetId}/toggle`,
        {
          uId,
          isActive: newActiveState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        // Update local state after successful API call
        setBudgets({
          ...budgets,
          budgets: budgets.budgets.map((budget) =>
            budget._id === budgetId
              ? { ...budget, isActive: newActiveState }
              : budget
          ),
        });
        toast.success(
          `Budget ${newActiveState ? "activated" : "deactivated"} successfully`
        );
      } else {
        throw new Error(
          response.data?.message || "Failed to update budget status"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update budget status";
      toast.error(errorMessage);
      console.error("Budget toggle error:", error);
    }
  };

  const calculateActualSpending = (category) => {
    return transactions
      .filter((t) => t.category === category && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const handleSaveMonthlyBudget = async () => {
    const budgetValue =
      tempBudgetInput === "" ? 0 : parseFloat(tempBudgetInput);

    if (isNaN(budgetValue) || budgetValue < 0) {
      alert("Please enter a valid monthly budget amount");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/budgets/monthly-limit`,
        {
          uId,
          monthlyBudgetLimit: budgetValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        setMonthlyBudgetLimit(budgetValue);
        setShowMonthlyBudgetModal(false);
        toast.success("Monthly budget limit updated successfully");
      } else {
        throw new Error(
          response.data?.message || "Failed to update monthly budget limit"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update monthly budget limit";
      toast.error(errorMessage);
      console.error("Monthly budget limit error:", error);
    }
  };

  const getTotalBudgeted = () => {
    if (!budgets || !budgets.budgets || !Array.isArray(budgets.budgets)) {
      return 0;
    }
    return budgets.budgets
      .filter((b) => b.isActive)
      .reduce((sum, budget) => sum + (budget.budgeted || 0), 0);
  };

  const getTotalActualSpending = () => {
    if (!budgets || !budgets.budgets || !Array.isArray(budgets.budgets)) {
      return 0;
    }
    return budgets.budgets
      .filter((b) => b.isActive)
      .reduce((sum, budget) => sum + (budget.actual || 0), 0);
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

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
        {/* Budget Management Modal */}
        <Modal
          isOpen={showBudgetModal}
          onClose={() => setShowBudgetModal(false)}
          title={editingBudget ? "Edit Budget" : "Add New Budget"}
          size="md"
          footer={
            <div className="flex justify-end space-x-3">
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
          }
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
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
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              >
                <option value="">Select Category</option>
                {availableCategories
                  .filter(
                    (cat) =>
                      editingBudget?.category === cat ||
                      !budgets.budgets.some((b) => b.category === cat)
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
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
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
                  className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                />
                <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                  This will be the display name for your custom category
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Monthly Budget Amount *
              </label>
              <input
                type="number"
                placeholder="Enter budget amount"
                value={budgetForm.budgeted}
                onChange={(e) =>
                  setBudgetForm({ ...budgetForm, budgeted: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
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
                className="w-full px-3 py-2 rounded-lg border resize-none bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              />
              <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                *Describe what expenses this budget will cover
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Color Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBudgetForm({ ...budgetForm, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      budgetForm.color === color ? "ring-2 ring-offset-2" : ""
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
        </Modal>

        {/* Monthly Budget Modal */}
        <Modal
          isOpen={showMonthlyBudgetModal}
          onClose={() => setShowMonthlyBudgetModal(false)}
          title="Set Monthly Budget Limit"
          size="md"
          footer={
            <div className="flex justify-end space-x-3">
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
          }
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Monthly Budget Limit
              </label>
              <input
                type="number"
                placeholder="Enter monthly budget limit"
                value={tempBudgetInput}
                onChange={(e) => setTempBudgetInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
              />
              <div className="text-xs mt-1 text-gray-600 dark:text-gray-300 ">
                *This will be used as your overall monthly spending target
              </div>
            </div>
          </div>
        </Modal>

        {/* BUDGET MANAGEMENT SECTION */}
        <div className="">
          {/* Header Section */}
          <AnimatedSection delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Budget Management
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={openMonthlyBudgetModal}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 bg-white dark:bg-gray-700 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-500 dark:text-indigo-400 shadow-lg hover:shadow-xl"
                >
                  Set Monthly Budget
                </button>
                <button
                  onClick={handleAddBudget}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base text-white transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{
                    background: currentTheme?.gradient,
                    boxShadow: currentTheme?.shadow,
                  }}
                >
                  Add Budget Category
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Budget Overview Cards */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              {/* Total Budgeted Card */}
              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: chartColors.income }}
                >
                  {formatCurrency(getTotalBudgeted())}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                  Total Budgeted
                </div>
              </div>

              {/* Total Spent Card */}
              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: chartColors.spending }}
                >
                  {formatCurrency(getTotalActualSpending())}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300 font-medium">
                  Total Spent
                </div>
              </div>

              {/* Remaining/Over Budget Card */}
              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30">
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: currentTheme?.primary }}
                >
                  {formatCurrency(
                    Math.abs(getTotalBudgeted() - getTotalActualSpending())
                  )}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-indigo-700 dark:text-indigo-300 font-medium">
                  {getTotalBudgeted() > getTotalActualSpending()
                    ? "Remaining"
                    : "Over Budget"}
                </div>
              </div>

              {/* Monthly Limit Card */}
              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: currentTheme?.primary }}
                >
                  {formatCurrency(monthlyBudgetLimit)}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-purple-700 dark:text-purple-300 font-medium">
                  Monthly Limit
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Analysis Controls */}
          <AnimatedSection delay={150}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                Spending Analysis
              </h3>
              <select
                value={spendingAnalysisView}
                onChange={(e) => setSpendingAnalysisView(e.target.value)}
                className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-indigo-400 text-gray-800 dark:text-white shadow-lg hover:shadow-xl min-w-0 w-full sm:w-auto"
              >
                <option value="trends">Monthly Spending Trends</option>
                <option value="budget">Budget vs Actual</option>
              </select>
            </div>
          </AnimatedSection>

          {/* Spending Analysis Charts */}
          <AnimatedSection delay={200}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10 pb-[100px] transition-all duration-500 hover:shadow-3xl">
              {spendingAnalysisView === "trends" && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
                      Monthly Budget: {formatCurrency(monthlyBudgetLimit)}
                    </div>
                  </div>
                  <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
                    <div className="flex items-end justify-between h-full space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto">
                      {getMonthlySpendingTrends.map((data, index) => {
                        const maxValue = Math.max(
                          ...getMonthlySpendingTrends.map((d) =>
                            Math.max(d.totalSpending, d.budget)
                          )
                        );
                        const spendingHeight =
                          (data.totalSpending / maxValue) * 100;
                        const budgetHeight = (data.budget / maxValue) * 100;
                        const isOverBudget = data.totalSpending > data.budget;

                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 flex-shrink-0"
                            style={{ minWidth: "60px" }}
                          >
                            <div className="flex items-end space-x-1 h-48 sm:h-56 md:h-64 lg:h-72 relative">
                              {/* Budget Line (background) */}
                              <div
                                className="w-6 sm:w-7 md:w-8 rounded-t transition-all duration-1000 opacity-40 hover:opacity-60"
                                style={{
                                  height: `${budgetHeight}%`,
                                  background: currentTheme?.primary,
                                  minHeight: "4px",
                                }}
                                title={`Budget: ${formatCurrency(data.budget)}`}
                              ></div>
                              {/* Actual Spending Bar */}
                              <div
                                className="w-6 sm:w-7 md:w-8 rounded-t transition-all duration-1000 hover:opacity-80 absolute left-0 cursor-pointer"
                                style={{
                                  height: `${spendingHeight}%`,
                                  background: isOverBudget
                                    ? chartColors.spending
                                    : chartColors.income,
                                  minHeight: "4px",
                                }}
                                title={`Spending: ${formatCurrency(
                                  data.totalSpending
                                )}`}
                              ></div>
                              {/* Over budget indicator */}
                              {isOverBudget && (
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 animate-pulse">
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xs">
                                      !
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-center text-gray-600 dark:text-gray-300 font-medium truncate w-full">
                              {data.month}
                            </div>
                            <div className="text-xs text-center space-y-1">
                              <div
                                className="font-semibold"
                                style={{
                                  color: isOverBudget
                                    ? chartColors.spending
                                    : chartColors.income,
                                }}
                              >
                                {formatCurrency(data.totalSpending)}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">
                                vs {formatCurrency(data.budget)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded opacity-40"
                          style={{ background: currentTheme?.primary }}
                        ></div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          Budget
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                          style={{ background: chartColors.income }}
                        ></div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          Under Budget
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                          style={{ background: chartColors.spending }}
                        ></div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          Over Budget
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {spendingAnalysisView === "budget" && (
                <AnimatedSection delay={50}>
                  {budgets.budgets.length > 0 ? (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      {budgets.budgets.map((budget) => {
                        const isOverBudget = budget.actual > budget.budgeted;
                        const percentage =
                          budget.budgeted > 0
                            ? (budget.actual / budget.budgeted) * 100
                            : 0;

                        return (
                          <div
                            key={budget._id}
                            className={`group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border hover:scale-[1.02] hover:shadow-lg ${
                              budget.isActive
                                ? "border-gray-300 dark:border-gray-600 shadow-md"
                                : "border-gray-200 dark:border-gray-700 opacity-60"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                <span className="text-xl sm:text-2xl flex-shrink-0">
                                  {getCategoryIcon(budget.category)}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white truncate">
                                    {budget.category}
                                  </div>
                                  {budget.description && (
                                    <div className="text-xs sm:text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
                                      {budget.description}
                                    </div>
                                  )}
                                  <div className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 dark:text-gray-300">
                                    {isOverBudget
                                      ? "Over Budget"
                                      : "Under Budget"}{" "}
                                    by{" "}
                                    <span className="font-medium">
                                      {formatCurrency(
                                        Math.abs(
                                          budget.actual - budget.budgeted
                                        )
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-start sm:justify-end">
                                <button
                                  onClick={() => handleToggleBudget(budget._id)}
                                  className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                                    budget.isActive
                                      ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700"
                                      : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700"
                                  }`}
                                >
                                  {budget.isActive ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                  onClick={() => handleEditBudget(budget)}
                                  className="px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 flex-shrink-0"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteBudget(budget._id)}
                                  className="px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 flex-shrink-0"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            {/* Budget Progress Bars */}
                            <div className="space-y-4 sm:space-y-5">
                              <div>
                                <div className="flex justify-between text-xs sm:text-sm mb-2 text-gray-600 dark:text-gray-300">
                                  <span className="font-medium">Budgeted</span>
                                  <span className="text-gray-800 dark:text-white font-semibold">
                                    {formatCurrency(budget.budgeted)}
                                  </span>
                                </div>
                                <div className="w-full h-3 sm:h-4 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: "100%",
                                      background: budget.color,
                                      opacity: 0.4,
                                    }}
                                  ></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs sm:text-sm mb-2">
                                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                                    Actual Spending
                                  </span>
                                  <span className="text-gray-800 dark:text-white font-semibold">
                                    {formatCurrency(budget.actual)}
                                  </span>
                                </div>
                                <div className="w-full h-3 sm:h-4 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
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
                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div
                                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                                  style={{
                                    background: isOverBudget
                                      ? chartColors.spending
                                      : chartColors.income,
                                  }}
                                ></div>
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                  {percentage.toFixed(1)}% of budget used
                                </span>
                              </div>

                              <div
                                className="text-xs sm:text-sm font-semibold text-right sm:text-left"
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
                                  : `${(100 - percentage).toFixed(
                                      1
                                    )}% remaining`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 animate-bounce">
                        💰
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-4 text-gray-800 dark:text-white">
                        No Budget Categories Set
                      </div>
                      <div className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-600 dark:text-gray-300 max-w-md mx-auto px-4">
                        Start managing your finances by creating budget
                        categories
                      </div>
                      <button
                        onClick={handleAddBudget}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base md:text-lg text-white transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl"
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
                  {getBudgetVsActual.length > 0 && (
                    <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                      <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
                        <div
                          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                          style={{ color: chartColors.income }}
                        >
                          {
                            getBudgetVsActual.filter((b) => b.variance <= 0)
                              .length
                          }
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                          Categories Under Budget
                        </div>
                      </div>

                      <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
                        <div
                          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                          style={{ color: chartColors.spending }}
                        >
                          {
                            getBudgetVsActual.filter((b) => b.variance > 0)
                              .length
                          }
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300 font-medium">
                          Categories Over Budget
                        </div>
                      </div>

                      <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 sm:col-span-2 lg:col-span-1">
                        <div
                          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                          style={{ color: currentTheme?.primary }}
                        >
                          {formatCurrency(
                            getBudgetVsActual.reduce(
                              (sum, b) => sum + Math.abs(b.variance),
                              0
                            )
                          )}
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-indigo-700 dark:text-indigo-300 font-medium">
                          Total Variance
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatedSection>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Budget Alerts */}
        <AnimatedSection delay={250}>
          {getBudgetVsActual.filter((budget) => budget.variance > 0).length >
          0 ? (
            <div className="mt-6 sm:mt-8 lg:mt-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                Budget Alerts
              </h3>
              <div className="space-y-3 sm:space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
                {getBudgetVsActual
                  .filter((budget) => budget.variance > 0)
                  .map((budget) => (
                    <div
                      key={budget._id}
                      className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-l-4 bg-gradient-to-r from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-base sm:text-lg">
                            {getCategoryIcon(budget.category)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white">
                            Budget Exceeded
                          </h4>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                            You've exceeded your {budget.category} budget by{" "}
                            <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                              {formatCurrency(budget.variance)}
                            </span>
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 self-start sm:self-center">
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400 block">
                            {budget.variancePercentage > 0
                              ? `${(100 + budget.variancePercentage).toFixed(
                                  1
                                )}%`
                              : "100%"}
                          </span>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            of Budget Used
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 lg:mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <span className="text-white text-lg sm:text-xl">✓</span>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white">
                    All Budgets On Track
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                    Great job! You're staying within all your budget categories.
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BudgetManagement;

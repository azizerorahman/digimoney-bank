import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BudgetManagement = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const balanceCardRef = useRef(null);
  const actionsRef = useRef(null);
  const accountsRef = useRef(null);
  const dashboardRef = useRef(null);

  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);

  const [tempBudgetInput, setTempBudgetInput] = useState("");
  const openMonthlyBudgetModal = () => {
    setTempBudgetInput(
      monthlyBudgetLimit > 0 ? monthlyBudgetLimit.toString() : ""
    );
    setShowMonthlyBudgetModal(true);
  };

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

  console.log(transactions);

  // Budget State Management
  const [budgets, setBudgets] = useState({ budgets: [] });
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetError, setBudgetError] = useState(null);
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(0);

  // Fetch budget data from API
  useEffect(() => {
    const fetchBudget = async () => {
      if (!uId) return;
      setBudgetLoading(true);
      setBudgetError(null);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/budgets`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data && res.data.success) {
          // Fix this part to ensure consistent structure
          const budgetData = res.data.data || {};
          setBudgets({
            budgets: budgetData.budgets || [],
            ...budgetData,
          });

          // Update monthly budget limit if available
          if (budgetData.monthlyBudgetLimit) {
            setMonthlyBudgetLimit(budgetData.monthlyBudgetLimit);
          }
        } else {
          setBudgetError("Failed to fetch budget data");
          toast.error("Failed to fetch budget data");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch budget data";
        setBudgetError(errorMessage);
        toast.error(errorMessage);
        console.error("Budget fetch error:", error);
      } finally {
        setBudgetLoading(false);
      }
    };

    fetchBudget();
  }, [uId]);

  console.log("Budget Data:", budgets);

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

  console.log("sfsfb", selectedAccount);

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
          `${process.env.REACT_APP_API_URL}/budgets/${editingBudget.id}`,
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
            budgets: budgets.budgets.filter((budget) => budget.id !== budgetId),
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
        (budget) => budget.id === budgetId
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
            budget.id === budgetId
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
    const monthlyTotals = {};
    transactionHistory.forEach((item) => {
      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = {
          month: monthYear,
          totalSpending: 0,
          budget: monthlyBudgetLimit,
        };
      }

      monthlyTotals[monthYear].totalSpending += item.spending;
    });

    // Convert to array and sort by month
    return Object.values(monthlyTotals).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  };

  const getBudgetVsActual = () => {
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
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        {/* Budget Management Modal */}
        {showBudgetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-xl border-2 border-indigo-500 dark:border-indigo-400">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {editingBudget ? "Edit Budget" : "Add New Budget"}
              </h3>

              <div className="space-y-4">
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
                    Describe what expenses this budget will cover
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
                          budgetForm.color === color
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
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] shadow-xl border-2 border-indigo-500 dark:border-indigo-400">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Set Monthly Budget Limit
              </h3>

              <div className="space-y-4">
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white">
              Budget Management{" "}
              <span className="text-[#6160DC] dark:text-[#8B7EFF]">
                & Spending Analysis
              </span>
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={openMonthlyBudgetModal}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 bg-white dark:bg-gray-700 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-500 dark:text-indigo-400"
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
            <div className="p-4 rounded-lg text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <div
                className="text-2xl font-bold"
                style={{ color: chartColors.income }}
              >
                {formatCurrency(getTotalBudgeted())}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Budgeted
              </div>
            </div>

            <div className="p-4 rounded-lg text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
              <div
                className="text-2xl font-bold"
                style={{ color: chartColors.spending }}
              >
                {formatCurrency(getTotalActualSpending())}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Spent
              </div>
            </div>

            <div className="p-4 rounded-lg text-center bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
              <div
                className="text-2xl font-bold"
                style={{ color: currentTheme?.primary }}
              >
                {formatCurrency(
                  Math.abs(getTotalBudgeted() - getTotalActualSpending())
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getTotalBudgeted() > getTotalActualSpending()
                  ? "Remaining"
                  : "Over Budget"}
              </div>
            </div>

            <div className="p-4 rounded-lg text-center bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
              <div
                className="text-2xl font-bold"
                style={{ color: currentTheme?.primary }}
              >
                {formatCurrency(monthlyBudgetLimit)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Monthly Limit
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={spendingAnalysisView}
              onChange={(e) => setSpendingAnalysisView(e.target.value)}
              className="px-4 py-2 my-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white dark:bg-gray-800 border border-indigo-500 dark:border-indigo-400 text-gray-800 dark:text-white ml-auto"
            >
              <option value="trends">Monthly Spending Trends</option>
              <option value="budget">Budget vs Actual</option>
            </select>
          </div>

          {/* Spending Analysis Charts */}
          <div className="p-6 rounded-lg transition-all duration-500 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 pb-[60px]">
            {spendingAnalysisView === "trends" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Monthly Spending Trends
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Monthly Budget: {formatCurrency(monthlyBudgetLimit)}
                  </div>
                </div>
                <div className="relative h-80">
                  <div className="flex items-end justify-between h-full space-x-4">
                    {getMonthlySpendingTrends().map((data, index) => {
                      const maxValue = Math.max(
                        ...getMonthlySpendingTrends().map((d) =>
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
                                data.totalSpending
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
                          <div className="text-xs text-center text-gray-600 dark:text-gray-300">
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
                              {formatCurrency(data.totalSpending)}
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
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Budget
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ background: chartColors.income }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Under Budget
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ background: chartColors.spending }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Over Budget
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {spendingAnalysisView === "budget" && (
              <>
                <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                  Budget Categories
                </h3>

                {budgets.budgets.length > 0 ? (
                  <div
                    className="space-y-4 "
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                  >
                    {budgets.budgets.map((budget) => {
                      const isOverBudget = budget.actual > budget.budgeted;
                      const percentage =
                        budget.budgeted > 0
                          ? (budget.actual / budget.budgeted) * 100
                          : 0;

                      return (
                        <div
                          key={budget.id}
                          className={`p-4 rounded-lg transition-all duration-300 bg-gray-50 dark:bg-gray-700 border ${
                            budget.isActive
                              ? "border-gray-300 dark:border-gray-600"
                              : "border-gray-200 dark:border-gray-700"
                          } ${budget.isActive ? "" : "opacity-50"}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">
                                {getCategoryIcon(budget.category)}
                              </span>
                              <div>
                                <div className="font-semibold text-gray-800 dark:text-white">
                                  {budget.category}
                                </div>
                                {budget.description && (
                                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                                    {budget.description}
                                  </div>
                                )}
                                <div className="text-sm text-gray-600 dark:text-gray-300">
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
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                                  budget.isActive
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700"
                                    : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
                                }`}
                              >
                                {budget.isActive ? "Active" : "Inactive"}
                              </button>
                              <button
                                onClick={() => handleEditBudget(budget)}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBudget(budget.id)}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {/* Budget Progress Bars */}
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Budgeted
                                </span>
                                <span className="text-gray-800 dark:text-white">
                                  {formatCurrency(budget.budgeted)}
                                </span>
                              </div>
                              <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-600">
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
                                <span className="text-gray-600 dark:text-gray-300">
                                  Actual Spending
                                </span>
                                <span className="text-gray-800 dark:text-white">
                                  {formatCurrency(budget.actual)}
                                </span>
                              </div>
                              <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-600">
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
                              <span className="text-sm text-gray-600 dark:text-gray-300">
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
                    <div className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                      No Budget Categories Set
                    </div>
                    <div className="text-sm mb-4 text-gray-600 dark:text-gray-300">
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
                    <div className="p-4 rounded-lg text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: chartColors.income }}
                      >
                        {
                          getBudgetVsActual().filter((b) => b.variance <= 0)
                            .length
                        }
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
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
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Categories Over Budget
                      </div>
                    </div>

                    <div className="p-4 rounded-lg text-center bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
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
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total Variance
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Budget Alerts */}
        {getBudgetVsActual().filter((budget) => budget.variance > 0).length >
        0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Budget Alerts
            </h3>
            <div className="space-y-4">
              {getBudgetVsActual()
                .filter((budget) => budget.variance > 0)
                .map((budget) => (
                  <div
                    key={budget.id}
                    className="p-4 rounded-lg border-l-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white">
                          {getCategoryIcon(budget.category)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          Budget Exceeded
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          You've exceeded your {budget.category} budget by{" "}
                          {formatCurrency(budget.variance)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          {budget.variancePercentage > 0
                            ? `${(100 + budget.variancePercentage).toFixed(1)}%`
                            : "100%"}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          of Budget Used
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">
                  All Budgets On Track
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Great job! You're staying within all your budget categories.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default BudgetManagement;

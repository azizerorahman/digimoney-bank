import MoneyTransferForm from "./MoneyTransferForm";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const UserDashboard = ({ userInfo }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const balanceCardRef = useRef(null);
  const actionsRef = useRef(null);
  const accountsRef = useRef(null);
  const dashboardRef = useRef(null);

  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [transactionsLoaded, setTransactionsLoaded] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!uId) {
        setDashboardLoading(false);
        setAccountsLoaded(true);
        return;
      }

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
        if (res.data && res.data.success) {
          setAccounts(res.data.accounts);
        } else {
          toast.error("Failed to fetch accounts");
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        toast.error("Failed to fetch accounts");
      } finally {
        setAccountsLoaded(true);
      }
    };
    fetchAccounts();
  }, [uId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!uId) {
        setTransactionsLoaded(true);
        return;
      }

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
        console.error("Failed to fetch transactions:", error);
        toast.error("Failed to fetch transactions");
      } finally {
        setTransactionsLoaded(true);
      }
    };
    fetchTransactions();
  }, [uId]);

  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    if (accountsLoaded && transactionsLoaded && dashboardLoading) {
      const timer = setTimeout(() => {
        setDashboardLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [accountsLoaded, transactionsLoaded, dashboardLoading]);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (dashboardLoading) {
        setDashboardLoading(false);
        setAccountsLoaded(true);
        setTransactionsLoaded(true);
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [dashboardLoading]);

  useEffect(() => {
    if (dashboardLoading) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const balanceCard = balanceCardRef.current;
    const actions = actionsRef.current;
    const accounts = accountsRef.current;
    const dashboard = dashboardRef.current;

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

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

          setTimeout(() => {
            if (balanceCard) {
              balanceCard.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              balanceCard.style.opacity = "1";
              balanceCard.style.transform = "translateY(0)";
            }
          }, 400);

          setTimeout(() => {
            if (accounts) {
              accounts.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              accounts.style.opacity = "1";
              accounts.style.transform = "translateY(0)";
            }
          }, 600);

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
  }, [dashboardLoading]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const formatAccountNumber = (accountNumber) => {
    if (!accountNumber) return "•••• •••• •••• ••••";
    return accountNumber;
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

  const getAccountIcon = (type) => {
    switch (type) {
      case "Checking":
        return (
          <svg
            className="w-6 h-6"
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
      case "Savings":
        return (
          <svg
            className="w-6 h-6"
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
      case "Credit":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTotalBalance = () => {
    return accounts
      .filter((account) => account.type !== "Credit")
      .reduce((sum, account) => sum + account.balance, 0);
  };

  const getAccountTransactions = (accountId) => {
    return transactions
      .filter((transaction) => {
        // Handle both old format (transaction.accountId) and new format (transaction.accountId)
        // Also filter by user to ensure we're only showing current user's transactions
        return (
          (transaction.accountId === accountId ||
            transaction.account?._id === accountId ||
            transaction.accountId === accountId) &&
          transaction.userId === uId
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by newest first
      .slice(0, 4);
  };

  const actions = [
    {
      name: "Transfer Money",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      color:
        "from-[#6160DC] to-[#514fbd] dark:from-[#8B7EFF] dark:to-[#6160DC]",
      onClick: () => setShowTransferForm(true),
    },
    {
      name: "Pay Bills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color:
        "from-[#FF6B6B] to-[#E63946] dark:from-[#FF8A8A] dark:to-[#FF6B6B]",
    },
    {
      name: "Deposit Check",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color:
        "from-[#36D399] to-[#2A9D8F] dark:from-[#4AE3AA] dark:to-[#36D399]",
    },
    {
      name: "Find ATM",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color:
        "from-[#FFAA5A] to-[#FF8C38] dark:from-[#FFBB7C] dark:to-[#FFAA5A]",
    },
  ];

  if (dashboardLoading) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden min-h-screen">
        <div className="container mx-auto max-w-7xl py-20">
          <LoadingSpinner
            size="xl"
            color="primary"
            text="Preparing your dashboard..."
            fullscreen
          />
        </div>
      </section>
    );
  }

  if (!userInfo) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden min-h-screen">
        <div className="container mx-auto max-w-7xl py-20 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Loading user information...
          </h2>
        </div>
      </section>
    );
  }

  const handleTransferComplete = async (transferDetails) => {
    setShowTransferForm(false);

    // Show success message
    toast.success("Transfer completed successfully!");

    // Refresh accounts and transactions immediately
    try {
      const token = localStorage.getItem("accessToken");

      // Refresh accounts
      const accountsRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/accounts`,
        {
          params: { uId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (accountsRes.data && accountsRes.data.success) {
        setAccounts(accountsRes.data.accounts);
      }

      // Refresh transactions
      const transactionsRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          params: { uId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (transactionsRes.data && transactionsRes.data.success) {
        setTransactions(transactionsRes.data.transactions);
      }
    } catch (error) {
      console.error("Failed to refresh data:", error);
      toast.error("Data refresh failed. Please reload the page.");
    }
  };

  return (
    <section>
      <div>
        <section
          ref={sectionRef}
          className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
        >
          <div className="container mx-auto p-12">
            {/* Welcome Header */}
            <AnimatedSection animation="slideDown" delay={200}>
              <div ref={headingRef} className="mb-6 md:mb-8 lg:mb-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
                  Welcome back,{" "}
                  <span className="text-[#6160DC] dark:text-[#8B7EFF]">
                    {userInfo?.name || "User"}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  Here's your financial overview for today
                </p>
              </div>
            </AnimatedSection>

            {/* Balance Card and Quick Actions Section - Side by Side on Desktop */}
            <div className="mb-6 md:mb-8 lg:mb-10 grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Balance Card - Left Side on Desktop */}
              <AnimatedSection animation="slideLeft" delay={400}>
                <div ref={balanceCardRef}>
                  <div className="h-full">
                    <div className="bg-gradient-to-br from-[#6160DC] to-[#514fbd] dark:from-[#514fbd] dark:to-[#3f3d9a] text-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="p-4 md:p-6 lg:p-8 relative h-full flex flex-col">
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                          <div className="flex items-center">
                            <div className="w-6 md:w-8 h-4 md:h-6 bg-yellow-400 rounded-sm mr-2 md:mr-3"></div>
                            <div className="w-5 md:w-6 h-5 md:h-6">
                              <div className="w-full h-3 md:h-4 border-t-2 border-l-2 border-r-2 border-white/70 rounded-t-full"></div>
                            </div>
                          </div>

                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-6 h-6 md:w-8 md:h-8 text-white"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"></path>
                              <path d="M12 6v2m0 8v2"></path>
                            </svg>
                          </div>
                        </div>

                        {/* Balance Display */}
                        <div className="mb-4 md:mb-6">
                          <p className="text-xs md:text-sm text-white/90 mb-1 md:mb-2">
                            Total Balance
                          </p>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold flex items-center">
                            <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl mr-1 md:mr-2">
                              $
                            </span>
                            {getTotalBalance().toLocaleString()}
                          </h2>
                          <p className="text-white/80 mt-1 md:mt-2 text-sm md:text-base">
                            Across {accounts.length} accounts
                          </p>
                        </div>

                        {/* Card Number */}
                        <div className="text-center mb-4 md:mb-6 flex-grow">
                          <p className="font-mono tracking-wider text-sm md:text-base lg:text-lg">
                            {formatAccountNumber(
                              selectedAccount?.accountNumber
                            )}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-end mt-auto">
                          <div>
                            <p className="text-xs font-medium mb-1 text-white/80">
                              Card Holder
                            </p>
                            <p className="text-sm md:text-base font-bold truncate max-w-[120px] md:max-w-[150px]">
                              {userInfo?.name || "User"}
                            </p>
                          </div>
                          <div className="flex items-end">
                            <div className="mr-3 md:mr-4">
                              <p className="text-xs font-medium mb-1 text-white/80">
                                Valid Thru
                              </p>
                              <p className="text-sm md:text-base font-bold">
                                {selectedAccount?.validThru}
                              </p>
                            </div>

                            <div className="flex">
                              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500"></div>
                              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-500 -ml-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Quick Actions - Right Side on Desktop */}
              <AnimatedSection animation="slideRight" delay={600}>
                <div ref={actionsRef} className="h-full flex flex-col">
                  <div className="grid grid-cols-2 gap-4 md:gap-6 flex-grow">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`group p-4 md:p-6 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center h-full`}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          {action.icon}
                        </div>
                        <div className="text-sm md:text-base font-medium text-center">
                          {action.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Account Cards */}
            <AnimatedSection animation="slideUp" delay={800}>
              <div ref={accountsRef} className="mb-6 md:mb-8 lg:mb-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white">
                  Your{" "}
                  <span className="text-[#6160DC] dark:text-[#8B7EFF]">
                    Accounts
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`group p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 relative overflow-hidden cursor-pointer ${
                        selectedAccount?.id === account.id
                          ? "ring-2 ring-[#6160DC] dark:ring-[#8B7EFF]"
                          : ""
                      }`}
                      onClick={() => setSelectedAccount(account)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6160DC]/5 to-[#514fbd]/5 dark:from-[#8B7EFF]/10 dark:to-[#6160DC]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6160DC]/10 dark:bg-[#8B7EFF]/20 flex items-center justify-center text-[#6160DC] dark:text-[#8B7EFF] group-hover:scale-110 transition-transform duration-300">
                              {getAccountIcon(account.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">
                                {account.type}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                                {account.cardType}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              account.isActive ? "bg-green-400" : "bg-red-400"
                            }`}
                          />
                        </div>

                        <h4 className="text-base md:text-lg font-bold mb-2 text-gray-800 dark:text-white">
                          {account.accountName}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 md:mb-4">
                          {account.accountNumber}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                              {account.type === "Credit"
                                ? "Balance"
                                : "Available"}
                            </p>
                            <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                              {account.balance < 0 ? "-" : ""}
                              {formatCurrency(account.balance)}
                            </p>
                            {account.type === "Credit" && (
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                                Limit: {formatCurrency(account.creditLimit)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Dashboard Content */}
            <AnimatedSection animation="fadeIn" delay={1000}>
              <div
                ref={dashboardRef}
                className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
              >
                {/* Account Summary */}
                <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white">
                    Account Summary
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {accounts.map((account) => (
                      <div
                        key={account.id}
                        className={`flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedAccount?.id === account.id
                            ? "bg-[#6160DC]/10 dark:bg-[#8B7EFF]/20 ring-2 ring-[#6160DC] dark:ring-[#8B7EFF]"
                            : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedAccount(account)}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm ${
                              account.type === "Checking"
                                ? "bg-blue-500"
                                : account.type === "Savings"
                                ? "bg-green-500"
                                : "bg-purple-500"
                            }`}
                          >
                            {account.type === "Checking"
                              ? "💳"
                              : account.type === "Savings"
                              ? "🏦"
                              : "💰"}
                          </div>
                          <div>
                            <div className="font-medium text-xs md:text-sm text-gray-800 dark:text-white">
                              {account.accountName}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {account.accountNumber}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-bold text-xs md:text-sm ${
                            account.balance < 0
                              ? "text-red-500"
                              : "text-gray-800 dark:text-white"
                          }`}
                        >
                          {account.balance < 0 ? "-" : ""}
                          {formatCurrency(account.balance)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="lg:col-span-2 p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                      Recent Transactions
                    </h3>
                    <div className="text-xs md:text-sm text-[#6160DC] dark:text-[#8B7EFF] font-medium">
                      {selectedAccount?.accountName}
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {getAccountTransactions(selectedAccount?._id).map(
                      (transaction) => (
                        <div
                          key={transaction._id}
                          className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3 md:space-x-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <div className="font-medium text-xs md:text-sm text-gray-800 dark:text-white">
                                {transaction.description}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}{" "}
                                • {transaction.category}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`font-bold text-xs md:text-sm ${
                              transaction.amount < 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {transaction.amount < 0 ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-4 md:mt-6">
                    <Link
                      to="/transactions"
                      className="w-full inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-[#6160DC] hover:bg-[#514fbd] dark:bg-[#8B7EFF] dark:hover:bg-[#6160DC] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg text-sm md:text-base"
                    >
                      View All Transactions
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
        {showTransferForm && (
          <MoneyTransferForm
            onClose={() => setShowTransferForm(false)}
            onTransferComplete={handleTransferComplete}
            userAccounts={accounts}
          />
        )}
      </div>
    </section>
  );
};
export default UserDashboard;

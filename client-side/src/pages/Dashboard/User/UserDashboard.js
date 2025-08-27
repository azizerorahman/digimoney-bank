import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const UserDashboard = ({ userInfo }) => {
  const navigate = useNavigate();

  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");

        const [accountsRes, transactionsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/accounts`, {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (accountsRes.data && accountsRes.data.success) {
          setAccounts(accountsRes.data.accounts);
        } else {
          toast.error("Failed to fetch accounts");
        }

        if (transactionsRes.data && transactionsRes.data.success) {
          setTransactions(transactionsRes.data.transactions);
        } else {
          toast.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uId]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

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
        return (
          (transaction.accountId === accountId ||
            transaction.account?._id === accountId) &&
          transaction.userId === uId
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
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
      onClick: () => navigate("/dashboard/user/money-transfer"),
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <section className="">
          <div className="">
            <AnimatedSection delay={100}>
              <div className="mb-6 md:mb-8 lg:mb-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-[#6160DC] via-[#8B7EFF] to-[#6160DC] dark:from-[#8B7EFF] dark:via-[#A78BFA] dark:to-[#8B7EFF] bg-clip-text text-transparent">
                    {userInfo?.name || "User"}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  Here's your financial overview for today
                </p>
              </div>
            </AnimatedSection>

            <div className="mb-6 md:mb-8 lg:mb-10 grid lg:grid-cols-2 gap-6 md:gap-8">
              <AnimatedSection delay={200}>
                <div>
                  <div className="h-full">
                    <div className="group bg-gradient-to-br from-[#6160DC] to-[#514fbd] dark:from-[#514fbd] dark:to-[#3f3d9a] text-white shadow-2xl rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#6160DC]/30 dark:hover:shadow-[#8B7EFF]/30 transition-all duration-500 hover:scale-[1.02] h-full">
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
                          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold flex items-center group-hover:scale-105 transition-transform duration-300">
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

              <AnimatedSection delay={300}>
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-2 gap-4 md:gap-6 flex-grow">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`group p-4 md:p-6 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col items-center justify-center h-full`}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
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

            <AnimatedSection delay={400}>
              <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {/* Account Summary */}
                <div className="p-4 md:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                    Account Summary
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {accounts.map((account) => (
                      <div
                        key={account.id}
                        className={`flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-500 group ${
                          selectedAccount?._id === account._id
                            ? "bg-gradient-to-br from-[#6160DC]/10 to-[#8B7EFF]/5 dark:from-[#8B7EFF]/20 dark:to-[#6160DC]/10 ring-2 ring-[#6160DC] dark:ring-[#8B7EFF] shadow-lg hover:shadow-xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20"
                            : "bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-600 dark:hover:to-gray-700 hover:shadow-lg"
                        }`}
                        onClick={() => setSelectedAccount(account)}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm group-hover:scale-110 transition-transform duration-300 ${
                              account.type === "Checking"
                                ? "bg-blue-400"
                                : account.type === "Savings"
                                ? "bg-green-400"
                                : "bg-purple-400"
                            }`}
                          >
                            {getAccountIcon(account.type)}
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
                <div className="lg:col-span-2 group p-4 md:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/30">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
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
                          className="group flex items-center justify-between p-3 md:p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-500 hover:shadow-lg hover:scale-[1.01]"
                        >
                          <div className="flex items-center space-x-3 md:space-x-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
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
                      className="w-full inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-br from-[#6160DC] to-[#514fbd] hover:from-[#514fbd] hover:to-[#3f3d9a] dark:from-[#8B7EFF] dark:to-[#6160DC] dark:hover:from-[#6160DC] dark:hover:to-[#514fbd] text-white font-medium rounded-xl transition-all duration-500 hover:shadow-xl hover:shadow-[#6160DC]/30 dark:hover:shadow-[#8B7EFF]/30 hover:scale-105 text-sm md:text-base"
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
      </div>
    </section>
  );
};
export default UserDashboard;

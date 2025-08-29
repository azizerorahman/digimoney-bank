import { useState, useEffect } from "react";
import {
  ArrowRight,
  User,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  X,
  Search,
  Building,
  Smartphone,
  Globe,
  Shield,
  Info,
  ArrowUpDown,
  Send,
  Plus,
  Minus,
  Eye,
  EyeOff,
  CreditCard,
  Wallet,
  Repeat,
  Clock,
  FileText,
  Tag,
  MessageCircle,
  Bell,
  Mail,
  Save,
} from "lucide-react";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import { toast } from "react-toastify";
import axios from "axios";

const MoneyTransfer = () => {
  const uId = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [recentRecipients, setRecentRecipients] = useState([]);
  const [transferSuccess, setTransferSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("new-transfer");

  // Fetch user accounts and recent transfers on component mount
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
        console.log("Fetching accounts for user:", uId);
        const accountsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/accounts`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (accountsRes.data && accountsRes.data.success) {
          console.log(
            "Fetched accounts from backend:",
            accountsRes.data.accounts
          );
          setAccounts(accountsRes.data.accounts);
        } else {
          console.log("No accounts found or API error");
        }

        // Fetch recent transfers
        console.log("Fetching recent transfers for user:", uId);
        const transfersRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/transactions`,
          {
            params: { uId, limit: 10 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (transfersRes.data && transfersRes.data.success) {
          const transfers = transfersRes.data.transactions
            .filter((transaction) => transaction.type === "transfer")
            .map((transaction) => ({
              _id: transaction._id,
              type:
                transaction.transactionType === "debit"
                  ? "outgoing"
                  : "incoming",
              recipientName: transaction.recipientName || "Unknown",
              senderName: transaction.senderName || "Unknown",
              toAccount: transaction.recipientAccount || transaction.toAccount,
              fromAccount: transaction.fromAccount || transaction.accountId,
              amount: Math.abs(transaction.amount),
              currency: transaction.currency || "USD",
              date: transaction.date,
              status: transaction.status || "completed",
              method: transaction.transferMethod || "immediate",
              purpose: transaction.purpose || "Personal Transfer",
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, most recent first

          console.log("Fetched transfers from backend:", transfers);
          setRecentTransfers(transfers);
        } else {
          console.log("No transfers found or API error");
          setRecentTransfers([]);
        }

        // Fetch recent recipients
        console.log("Fetching recent recipients for user:", uId);
        const recipientsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/recipients`,
          {
            params: { uId, limit: 10 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (recipientsRes.data && recipientsRes.data.success) {
          const recipients = recipientsRes.data.recipients
            .slice(0, 10)
            .map((recipient) => ({
              _id: recipient.id || recipient._id,
              name: recipient.name,
              accountNumber: recipient.accountNumber,
              bank: recipient.bank || "DigiMoney Bank",
              accountType: recipient.type || "Checking",
              email: recipient.email,
            }));
          console.log("Fetched recipients from backend:", recipients);
          setRecentRecipients(recipients);
        } else {
          console.log("No recipients found or API error");
          setRecentRecipients([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uId, transferSuccess]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Format currency for display
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
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
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Money Transfer
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Transfer funds securely to your accounts and recipients
            </p>
          </div>
        </AnimatedSection>

        {/* Success Message (if transfer was just completed) */}
        {transferSuccess && (
          <AnimatedSection delay={150}>
            <div className="mb-8 sm:mb-10 lg:mb-12 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300 mb-1">
                    Transfer Successful!
                  </h3>
                  <p className="text-green-700 dark:text-green-400 mb-2">
                    You have successfully transferred{" "}
                    <span className="font-semibold">
                      {formatCurrency(
                        parseFloat(transferSuccess.amount),
                        transferSuccess.currency
                      )}
                    </span>{" "}
                    to {transferSuccess.recipientName}.
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-500">
                    Transaction ID: {transferSuccess.transactionId} •{" "}
                    {new Date().toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setTransferSuccess(null)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10">
          {/* Transfer Tabs */}
          <AnimatedSection delay={200}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-3xl">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab("new-transfer")}
                  className={`pb-3 px-4 text-sm sm:text-base font-medium transition-colors ${
                    activeTab === "new-transfer"
                      ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  New Transfer
                </button>
                <button
                  onClick={() => setActiveTab("transfer")}
                  className={`pb-3 px-4 text-sm sm:text-base font-medium transition-colors ${
                    activeTab === "transfer"
                      ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Recent Transfers
                </button>
                <button
                  onClick={() => setActiveTab("recipients")}
                  className={`pb-3 px-4 text-sm sm:text-base font-medium transition-colors ${
                    activeTab === "recipients"
                      ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Saved Recipients
                </button>
              </div>

              {/* New Transfer Tab */}
              {activeTab === "new-transfer" && (
                <MoneyTransferForm
                  userAccounts={accounts}
                  onTransferComplete={(transferData) => {
                    setTransferSuccess(transferData);
                    setActiveTab("transfer");
                    toast.success("Transfer completed successfully!");
                  }}
                />
              )}

              {/* Recent Transfers Tab */}
              {activeTab === "transfer" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Recent Transfers
                    </h2>
                    <button
                      onClick={() => setActiveTab("new-transfer")}
                      className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      New
                    </button>
                  </div>

                  {recentTransfers.length > 0 ? (
                    <div className="space-y-4">
                      {recentTransfers.map((transfer) => (
                        <div
                          key={transfer._id}
                          className="group p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  transfer.type === "outgoing"
                                    ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                                    : "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                }`}
                              >
                                {transfer.type === "outgoing" ? (
                                  <ArrowRight className="h-5 w-5" />
                                ) : (
                                  <ArrowRight className="h-5 w-5 transform rotate-180" />
                                )}
                              </div>
                              <div className="ml-3">
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                  {transfer.type === "outgoing"
                                    ? `To: ${transfer.recipientName}`
                                    : `From: ${transfer.senderName}`}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {transfer.type === "outgoing"
                                    ? transfer.toAccount
                                    : transfer.fromAccount}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:items-end">
                              <span
                                className={`font-semibold ${
                                  transfer.type === "outgoing"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {transfer.type === "outgoing" ? "-" : "+"}
                                {formatCurrency(
                                  transfer.amount,
                                  transfer.currency
                                )}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(transfer.date)} •{" "}
                                {formatTime(transfer.date)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                  transfer.status
                                )}`}
                              >
                                {transfer.status}
                              </span>
                              {transfer.method && (
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                  {transfer.method}
                                </span>
                              )}
                              {transfer.purpose && (
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                  {transfer.purpose}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => setActiveTab("new-transfer")}
                              className="text-xs px-2 py-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center"
                            >
                              <Repeat className="h-3 w-3 mr-1" />
                              Repeat
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Send className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No Recent Transfers
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        You haven't made any transfers yet. Start by creating a
                        new transfer.
                      </p>
                      <button
                        onClick={() => setActiveTab("new-transfer")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Make Your First Transfer
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Saved Recipients Tab */}
              {activeTab === "recipients" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Saved Recipients
                    </h2>
                    <button
                      onClick={() => setActiveTab("new-transfer")}
                      className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add
                    </button>
                  </div>

                  {recentRecipients.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recentRecipients.map((recipient) => (
                        <div
                          key={recipient._id}
                          className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                                {recipient.name}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {recipient.accountNumber} • {recipient.bank}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                  {recipient.accountType}
                                </span>
                                {recipient.email && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 truncate max-w-[120px]">
                                    {recipient.email}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab("new-transfer")}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors flex-shrink-0"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <User className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No Saved Recipients
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        You haven't saved any recipients yet. Add recipients
                        when making transfers.
                      </p>
                      <button
                        onClick={() => setActiveTab("new-transfer")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Your First Recipient
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Account Summary Sidebar */}
          <AnimatedSection delay={300}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-3xl">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                Your Accounts
              </h2>

              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account._id}
                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            account.type === "Checking"
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                              : account.type === "Savings"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                              : "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                          }`}
                        >
                          {account.type === "Checking" ? (
                            <CreditCard className="h-5 w-5" />
                          ) : account.type === "Savings" ? (
                            <Wallet className="h-5 w-5" />
                          ) : (
                            <ArrowUpDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {account.accountName}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {account.accountNumber}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          account.type === "Checking"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : account.type === "Savings"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        }`}
                      >
                        {account.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Available Balance
                        </p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                          {formatCurrency(account.balance)}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("new-transfer")}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("new-transfer")}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                New Transfer
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Quick Transfer Tips */}
        <AnimatedSection delay={400}>
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Quick Transfer Tips
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Secure Transfers
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  All transfers are encrypted and protected with multi-factor
                  authentication.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">
                  Quick Processing
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Intra-bank transfers process instantly. Inter-bank transfers
                  take 1-3 business days.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center mb-3">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                  Scheduled Transfers
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Schedule transfers for future dates and set up recurring
                  payments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-800/50 flex items-center justify-center mb-3">
                  <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                  Transfer Notifications
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Get real-time notifications for all your transfers via SMS or
                  email.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Transfer FAQ */}
        <AnimatedSection delay={500}>
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                  What information do I need for a transfer?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You'll need the recipient's full name, account number, and
                  bank name (for inter-bank transfers).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Are there any transfer limits?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Yes, daily transfer limits apply. Standard accounts can
                  transfer up to $10,000 per day.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <Tag className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                  What are the transfer fees?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Intra-bank transfers are free for amounts under $1,000.
                  Inter-bank transfers have a fee of 1% (minimum $5).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <MessageCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                  How do I track my transfer?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All transfers can be tracked in your Recent Transfers section.
                  You'll also receive notifications about status changes.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Transfer Form Modal */}
        {/* Removed - now using inline form in tabs */}
      </div>
    </div>
  );
};

// Money Transfer Form Component (Inline)
const MoneyTransferForm = ({ onTransferComplete, userAccounts = [] }) => {
  const [transferType, setTransferType] = useState("intra");
  const [step, setStep] = useState(1);
  const [showAccountSearch, setShowAccountSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allRecipients, setAllRecipients] = useState([]);
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [transferData, setTransferData] = useState({
    fromAccount: "",
    toAccount: "",
    recipientName: "",
    recipientBank: "",
    recipientBankCode: "",
    amount: "",
    currency: "USD",
    transferMethod: "immediate",
    scheduledDate: "",
    scheduledTime: "",
    purpose: "",
    description: "",
    reference: "",
    pin: "",
    saveRecipient: false,
    notifyRecipient: true,
    smsNotification: true,
    emailNotification: true,
  });

  useEffect(() => {
    if (userAccounts && userAccounts.length > 0) {
      setTransferData((prev) => ({
        ...prev,
        fromAccount: userAccounts[0]._id,
      }));
    }
  }, [userAccounts]);

  const bankList = [
    { code: "BANK001", name: "First National Bank", swift: "FNBKUS33" },
    { code: "BANK002", name: "City Commercial Bank", swift: "CCBKUS44" },
    { code: "BANK003", name: "Metro Trust Bank", swift: "MTBKUS55" },
    { code: "BANK004", name: "Regional Savings Bank", swift: "RSBKUS66" },
  ];

  // Load all recipients when component mounts - but don't display them initially
  useEffect(() => {
    const loadAllRecipients = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const currentUserId = localStorage.getItem("userId");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/recipients`,
          {
            params: { currentUserId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setAllRecipients(response.data.recipients);
        }
      } catch (error) {
        console.error("Failed to load recipients:", error);
        // Don't show error toast on component mount, just log it
        console.log("Recipients will be loaded when searching");
      }
    };

    loadAllRecipients();
  }, []);

  const transferPurposes = [
    "Personal Transfer",
    "Business Payment",
    "Bill Payment",
    "Loan Payment",
    "Investment",
    "Gift",
    "Education",
    "Medical",
    "Emergency",
    "Other",
  ];

  const searchAccounts = async (query) => {
    console.log("Searching for:", query);
    if (query.length < 3) return [];

    try {
      const token = localStorage.getItem("accessToken");
      const currentUserId = localStorage.getItem("userId");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/recipients`,
        {
          params: { query, currentUserId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        console.log("Search results:", response.data.recipients);
        return response.data.recipients;
      }
      return [];
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search recipients");
      return [];
    }
  };

  const handleInputChange = (field, value) => {
    setTransferData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleAccountSearch = async (query) => {
    console.log("handleAccountSearch called with:", query);
    setSearchQuery(query);
    if (query.length >= 3) {
      const results = await searchAccounts(query);
      setSearchResults(results);
      console.log("Setting search results:", results);
    } else {
      setSearchResults([]);
      console.log("Query too short, clearing results");
    }
  };

  const selectRecipient = (recipient) => {
    setTransferData((prev) => ({
      ...prev,
      toAccount: recipient.accountNumber,
      recipientName: recipient.name,
      recipientBank: recipient.bank,
    }));
    setShowAccountSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const fillDemoRecipient = () => {
    const firstRecipient = allRecipients[0];
    if (firstRecipient) {
      setTransferData((prev) => ({
        ...prev,
        toAccount: firstRecipient.accountNumber,
        recipientName: firstRecipient.name,
        recipientBank: firstRecipient.bank,
      }));
    } else {
      toast.info("No recipients available. Please search for a recipient.");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!transferData.fromAccount)
      newErrors.fromAccount = "Please select source account";
    if (!transferData.toAccount)
      newErrors.toAccount = "Please enter recipient account";
    if (!transferData.recipientName)
      newErrors.recipientName = "Please enter recipient name";
    if (!transferData.amount || parseFloat(transferData.amount) <= 0) {
      newErrors.amount = "Please enter valid amount";
    }
    if (transferType === "inter" && !transferData.recipientBank) {
      newErrors.recipientBank = "Please select recipient bank";
    }
    if (transferData.transferMethod === "scheduled") {
      if (!transferData.scheduledDate)
        newErrors.scheduledDate = "Please select date";
      if (!transferData.scheduledTime)
        newErrors.scheduledTime = "Please select time";
    }
    if (!transferData.purpose)
      newErrors.purpose = "Please select transfer purpose";

    const selectedAccount = userAccounts.find(
      (acc) => acc._id === transferData.fromAccount
    );
    if (
      selectedAccount &&
      parseFloat(transferData.amount) > selectedAccount.balance
    ) {
      newErrors.amount = "Amount exceeds available balance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (validateForm()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!transferData.pin) {
        setErrors({ pin: "Please enter your PIN" });
        return;
      }

      if (transferData.pin !== "0000") {
        setErrors({ pin: "Invalid PIN. Use 0000 for demo testing" });
        return;
      }

      setIsProcessing(true);

      try {
        const token = localStorage.getItem("accessToken");
        const uId = localStorage.getItem("userId");

        const transferPayload = {
          fromAccountId: transferData.fromAccount,
          toAccount: transferData.toAccount,
          recipientName: transferData.recipientName,
          amount: parseFloat(transferData.amount),
          currency: transferData.currency,
          transferMethod: transferData.transferMethod,
          purpose: transferData.purpose,
          description: transferData.description,
          reference: transferData.reference,
          uId: uId,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/transfer`,
          transferPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setTimeout(() => {
            setIsProcessing(false);
            onTransferComplete &&
              onTransferComplete({
                ...transferData,
                transactionId:
                  response.data.transactionId || `TXN${Date.now()}`,
                status: "completed",
                timestamp: new Date().toISOString(),
              });
            // Reset form
            setStep(1);
            setTransferData({
              fromAccount: userAccounts[0]?._id || "",
              toAccount: "",
              recipientName: "",
              recipientBank: "",
              recipientBankCode: "",
              amount: "",
              currency: "USD",
              transferMethod: "immediate",
              scheduledDate: "",
              scheduledTime: "",
              purpose: "",
              description: "",
              reference: "",
              pin: "",
              saveRecipient: false,
              notifyRecipient: true,
              smsNotification: true,
              emailNotification: true,
            });
            setErrors({});
          }, 2000);
        } else {
          setIsProcessing(false);
          toast.error(response.data.message || "Transfer failed");
        }
      } catch (error) {
        setIsProcessing(false);
        console.error("Transfer error:", error);
        toast.error("Transfer failed. Please try again.");
      }
    }
  };

  const calculateFees = () => {
    const amount = parseFloat(transferData.amount) || 0;
    let fee = 0;

    if (transferType === "intra") {
      fee = amount > 1000 ? 2.5 : 0;
    } else {
      fee = Math.max(5, amount * 0.01);
    }

    return fee;
  };

  const fee = calculateFees();
  const totalAmount = (parseFloat(transferData.amount) || 0) + fee;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
          New Money Transfer
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {step === 1
            ? "Enter transfer details"
            : step === 2
            ? "Review and confirm"
            : "Processing transfer"}
        </p>

        <div className="flex items-center mt-6 space-x-4">
          <div
            className={`flex items-center ${
              step >= 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Details</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div
            className={`flex items-center ${
              step >= 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Review</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div
            className={`flex items-center ${
              step >= 3 ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              }`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium">Confirm</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Transfer Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTransferType("intra")}
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-md ${
                    transferType === "intra"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ArrowUpDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Intra-Bank Transfer
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Transfer within same bank
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTransferType("inter")}
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-md ${
                    transferType === "inter"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Inter-Bank Transfer
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Transfer to other banks
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Account *
                </label>
                <select
                  value={transferData.fromAccount}
                  onChange={(e) =>
                    handleInputChange("fromAccount", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                    errors.fromAccount
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select source account</option>
                  {userAccounts.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.accountName} - {account.accountNumber} ($
                      {account.balance.toLocaleString()})
                    </option>
                  ))}
                </select>
                {errors.fromAccount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fromAccount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Account *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={transferData.toAccount}
                    onChange={(e) =>
                      handleInputChange("toAccount", e.target.value)
                    }
                    placeholder="Enter account number"
                    className={`w-full px-3 py-2 pr-20 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                      errors.toAccount
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <button
                      type="button"
                      onClick={fillDemoRecipient}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                      title="Fill first available recipient for testing"
                    >
                      Quick Fill
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAccountSearch(true)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {errors.toAccount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.toAccount}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={transferData.recipientName}
                  onChange={(e) =>
                    handleInputChange("recipientName", e.target.value)
                  }
                  placeholder="Enter recipient full name"
                  className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                    errors.recipientName
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.recipientName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.recipientName}
                  </p>
                )}
              </div>

              {transferType === "inter" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recipient Bank *
                  </label>
                  <select
                    value={transferData.recipientBank}
                    onChange={(e) => {
                      const selectedBank = bankList.find(
                        (bank) => bank.name === e.target.value
                      );
                      handleInputChange("recipientBank", e.target.value);
                      handleInputChange(
                        "recipientBankCode",
                        selectedBank?.code || ""
                      );
                    }}
                    className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                      errors.recipientBank
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <option value="">Select recipient bank</option>
                    {bankList.map((bank) => (
                      <option key={bank.code} value={bank.name}>
                        {bank.name} ({bank.swift})
                      </option>
                    ))}
                  </select>
                  {errors.recipientBank && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.recipientBank}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={transferData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    placeholder="0.00"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                      errors.amount
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={transferData.currency}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Transfer Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("transferMethod", "immediate")
                  }
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-md ${
                    transferData.transferMethod === "immediate"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Immediate Transfer
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Process transfer now
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("transferMethod", "scheduled")
                  }
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-md ${
                    transferData.transferMethod === "scheduled"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Scheduled Transfer
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Schedule for later
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {transferData.transferMethod === "scheduled" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    value={transferData.scheduledDate}
                    onChange={(e) =>
                      handleInputChange("scheduledDate", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                      errors.scheduledDate
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.scheduledDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.scheduledDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Time *
                  </label>
                  <input
                    type="time"
                    value={transferData.scheduledTime}
                    onChange={(e) =>
                      handleInputChange("scheduledTime", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                      errors.scheduledTime
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.scheduledTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.scheduledTime}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transfer Purpose *
                </label>
                <select
                  value={transferData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                    errors.purpose
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select purpose</option>
                  {transferPurposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
                {errors.purpose && (
                  <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reference (Optional)
                </label>
                <input
                  type="text"
                  value={transferData.reference}
                  onChange={(e) =>
                    handleInputChange("reference", e.target.value)
                  }
                  placeholder="Enter reference number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={transferData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter transfer description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              />
            </div>

            <div className="space-y-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                Additional Options
              </h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveRecipient"
                  checked={transferData.saveRecipient}
                  onChange={(e) =>
                    handleInputChange("saveRecipient", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="saveRecipient"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Save className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                  Save recipient for future transfers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyRecipient"
                  checked={transferData.notifyRecipient}
                  onChange={(e) =>
                    handleInputChange("notifyRecipient", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="notifyRecipient"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Bell className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                  Notify recipient about transfer
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotification"
                  checked={transferData.smsNotification}
                  onChange={(e) =>
                    handleInputChange("smsNotification", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="smsNotification"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Smartphone className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                  Send SMS confirmation
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotification"
                  checked={transferData.emailNotification}
                  onChange={(e) =>
                    handleInputChange("emailNotification", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="emailNotification"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Mail className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                  Send email confirmation
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Transfer Summary
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <Minus className="h-4 w-4 text-red-500 mr-2" />
                    From Account
                  </h4>
                  {(() => {
                    const fromAccount = userAccounts.find(
                      (acc) => acc._id === transferData.fromAccount
                    );
                    return fromAccount ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Account Name
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {fromAccount.accountName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Account Number
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {fromAccount.accountNumber}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Available Balance
                        </p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          ${fromAccount.balance.toLocaleString()}
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <Plus className="h-4 w-4 text-green-500 mr-2" />
                    To Account
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recipient Name
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {transferData.recipientName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Account Number
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {transferData.toAccount}
                    </p>
                    {transferType === "inter" && (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Bank
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {transferData.recipientBank}
                        </p>
                      </>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Transfer Type
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transferType === "intra"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {transferType === "intra" ? "Intra-Bank" : "Inter-Bank"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                  Amount Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Transfer Amount
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ${parseFloat(transferData.amount || 0).toLocaleString()}{" "}
                      {transferData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Transfer Fee
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ${fee.toFixed(2)} {transferData.currency}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Total Amount
                      </span>
                      <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                        ${totalAmount.toFixed(2)} {transferData.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                  Transfer Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Transfer Method
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white capitalize">
                      {transferData.transferMethod}
                      {transferData.transferMethod === "scheduled" &&
                        transferData.scheduledDate && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            on{" "}
                            {new Date(
                              transferData.scheduledDate
                            ).toLocaleDateString()}{" "}
                            at {transferData.scheduledTime}
                          </span>
                        )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Purpose
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {transferData.purpose}
                    </p>
                  </div>
                  {transferData.reference && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reference
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {transferData.reference}
                      </p>
                    </div>
                  )}
                  {transferData.description && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Description
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {transferData.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                  Notification Settings
                </h4>
                <div className="space-y-2">
                  {transferData.notifyRecipient && (
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Recipient will be notified
                    </div>
                  )}
                  {transferData.smsNotification && (
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <Smartphone className="h-4 w-4 mr-2" />
                      SMS confirmation enabled
                    </div>
                  )}
                  {transferData.emailNotification && (
                    <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                      <Globe className="h-4 w-4 mr-2" />
                      Email confirmation enabled
                    </div>
                  )}
                  {transferData.saveRecipient && (
                    <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                      <User className="h-4 w-4 mr-2" />
                      Recipient will be saved for future transfers
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-300">
                      Important Notice
                    </h5>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 mt-2 space-y-1">
                      <li>
                        • Please verify all details carefully before confirming
                        the transfer
                      </li>
                      <li>
                        •{" "}
                        {transferType === "intra"
                          ? "Intra-bank transfers are usually processed immediately"
                          : "Inter-bank transfers may take 1-3 business days"}
                      </li>
                      <li>
                        • Transfer fees are non-refundable once the transaction
                        is processed
                      </li>
                      <li>
                        • You will receive a confirmation once the transfer is
                        completed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {!isProcessing ? (
              <>
                <div className="text-center">
                  <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Secure Transfer Confirmation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please enter your PIN to authorize this transfer
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${totalAmount.toFixed(2)} {transferData.currency}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      to {transferData.recipientName}
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter your PIN *
                    </label>
                    <div className="relative">
                      <input
                        type={showPin ? "text" : "password"}
                        value={transferData.pin}
                        onChange={(e) =>
                          handleInputChange("pin", e.target.value)
                        }
                        placeholder="Enter 4-digit PIN"
                        maxLength="4"
                        className={`w-full px-3 py-3 text-center text-lg border rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors ${
                          errors.pin
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPin ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.pin && (
                      <p className="text-red-500 text-xs mt-1 text-center">
                        {errors.pin}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-blue-800 dark:text-blue-300">
                          Demo Testing Information
                        </h5>
                        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                          For demo purposes, use PIN <strong>0000</strong> to
                          complete the transfer. Your PIN is encrypted and
                          secure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <LoadingSpinner />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                  Processing Transfer...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we process your transfer securely
                </p>
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Do not close this window or navigate away during processing
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!isProcessing && (
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg flex items-center"
              >
                {step === 1 && (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
                {step === 2 && (
                  <>
                    Confirm Transfer
                    <Shield className="h-4 w-4 ml-2" />
                  </>
                )}
                {step === 3 && (
                  <>
                    Authorize Transfer
                    <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {showAccountSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60 animate-in fade-in duration-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-200/50 dark:border-gray-700/50 animate-in scale-in-95 duration-300">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Search Recipients
                </h3>
                <button
                  onClick={() => setShowAccountSearch(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleAccountSearch(e.target.value)}
                  placeholder="Type at least 3 characters to search (name, account, email)"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  autoFocus
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchQuery.length === 0 ? (
                  // Show instructions when no search query
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <div>Search for Recipients</div>
                    <div className="text-sm mt-1">
                      Enter at least 3 characters to search by name, account
                      number, or email
                    </div>
                  </div>
                ) : searchQuery.length < 3 ? (
                  // Search query too short
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <div>Keep typing...</div>
                    <div className="text-sm mt-1">
                      Enter {3 - searchQuery.length} more character
                      {3 - searchQuery.length !== 1 ? "s" : ""} to search
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  // Show search results
                  <>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 px-2">
                      Found {searchResults.length} recipient
                      {searchResults.length !== 1 ? "s" : ""}:
                    </div>
                    {searchResults.map((result) => (
                      <button
                        key={result.accountId}
                        onClick={() => selectRecipient(result)}
                        className="w-full p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {result.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {result.accountNumber} • {result.bank}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {result.email} • {result.type} Account
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  // No results found for search query
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <div>No recipients found</div>
                    <div className="text-sm mt-1">
                      Try searching by name, account number, or email
                    </div>
                    <div className="text-xs mt-2 text-gray-400">
                      Search term: "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyTransfer;

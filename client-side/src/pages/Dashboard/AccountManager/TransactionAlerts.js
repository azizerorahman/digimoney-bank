import { AlertTriangle, Clock, Activity } from "lucide-react";
import AnimatedSection from "../../../components/AnimatedSection";

const TransactionAlerts = () => {
  const transactionAlerts = [
    {
      id: "1",
      type: "Large Deposit",
      amount: 50000,
      customer: "TechCorp Inc",
      time: "2 hours ago",
      status: "flagged",
      description: "Unusual large deposit requiring verification",
    },
    {
      id: "2",
      type: "Multiple Withdrawals",
      amount: 15000,
      customer: "John Smith",
      time: "4 hours ago",
      status: "reviewing",
      description: "Multiple withdrawals within short timeframe",
    },
    {
      id: "3",
      type: "Foreign Transaction",
      amount: 8500,
      customer: "Sarah Johnson",
      time: "6 hours ago",
      status: "approved",
      description: "International wire transfer to UK",
    },
    {
      id: "4",
      type: "Suspicious Activity",
      amount: 2000,
      customer: "David Lee",
      time: "8 hours ago",
      status: "flagged",
      description: "Transaction from high-risk country",
    },
    {
      id: "5",
      type: "High-Risk Merchant",
      amount: 1200,
      customer: "Anna Kim",
      time: "10 hours ago",
      status: "reviewing",
      description: "Purchase from flagged merchant category",
    },
    {
      id: "6",
      type: "Unusual Location",
      amount: 3000,
      customer: "Chris Green",
      time: "12 hours ago",
      status: "approved",
      description: "Transaction from new geographic location",
    },
  ];

  const recentTransactions = [
    {
      id: "6840ee401b***",
      customer: "Emily Davis",
      type: "Wire Transfer",
      amount: 25000,
      status: "completed",
      time: "1 hour ago",
    },
    {
      id: "8713as021w***",
      customer: "TechCorp Inc",
      type: "ACH Payment",
      amount: 12500,
      status: "pending",
      time: "3 hours ago",
    },
    {
      id: "7440we101a***",
      customer: "Michael Brown",
      type: "Check Deposit",
      amount: 3200,
      status: "completed",
      time: "5 hours ago",
    },
    {
      id: "3240ee103f***",
      customer: "TechCorp Inc",
      type: "Wire Transfer",
      amount: 50000,
      status: "completed",
      time: "6 hours ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "flagged":
        return "text-red-600 bg-red-100";
      case "reviewing":
        return "text-yellow-600 bg-yellow-100";
      case "approved":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={0}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Transaction Alerts
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Monitor and manage transaction alerts for enhanced security and
              compliance
            </p>
          </div>
        </AnimatedSection>

        {/* Alerts Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <AnimatedSection delay={100}>
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-900/10 dark:via-gray-800 dark:to-red-900/10 p-6 sm:p-8 shadow-lg border border-red-200/20 dark:border-red-800/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base font-medium text-red-600 dark:text-red-400 mb-2">
                    Flagged Alerts
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 dark:text-red-300">
                    {
                      transactionAlerts.filter(
                        (alert) => alert.status === "flagged"
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-yellow-900/10 dark:via-gray-800 dark:to-yellow-900/10 p-6 sm:p-8 shadow-lg border border-yellow-200/20 dark:border-yellow-800/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base font-medium text-yellow-600 dark:text-yellow-400 mb-2">
                    Under Review
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-700 dark:text-yellow-300">
                    {
                      transactionAlerts.filter(
                        (alert) => alert.status === "reviewing"
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-900/10 dark:via-gray-800 dark:to-blue-900/10 p-6 sm:p-8 shadow-lg border border-blue-200/20 dark:border-blue-800/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 mb-2">
                    Recent Transactions
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 dark:text-blue-300">
                    {recentTransactions.length}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Transaction Alerts Section */}
        <AnimatedSection delay={400}>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Active Transaction Alerts
            </h2>
            <div className="grid gap-4 sm:gap-6">
              {transactionAlerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status.charAt(0).toUpperCase() +
                            alert.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {alert.time}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {alert.type}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Customer:{" "}
                        <span className="font-medium">{alert.customer}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Amount:{" "}
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(alert.amount)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {alert.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Review
                      </button>
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Recent Transactions Table */}
        <AnimatedSection delay={500}>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Recent Transactions
            </h2>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {transaction.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {transaction.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {transaction.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TransactionAlerts;

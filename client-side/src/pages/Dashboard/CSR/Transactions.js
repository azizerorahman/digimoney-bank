import AnimatedSection from "../../../components/AnimatedSection";

const today = new Date();

export const csrDashboardData = {
  recentTransactions: [
    {
      id: "TXN-2025010801",
      date: today.toISOString().split('T')[0],
      time: "14:23",
      type: "Debit Card Purchase",
      merchant: "Grocery Store Plus",
      amount: -87.45,
      account: "****3847",
      status: "Posted",
      category: "Groceries",
    },
    {
      id: "TXN-2025010802",
      date: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:15",
      type: "Direct Deposit",
      merchant: "ABC Company Payroll",
      amount: 2847.33,
      account: "****3847",
      status: "Posted",
      category: "Income",
    },
    {
      id: "TXN-2025010803",
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "16:45",
      type: "Online Transfer",
      merchant: "Transfer to Savings",
      amount: -500.0,
      account: "****3847",
      status: "Posted",
      category: "Transfer",
    },
    {
      id: "TXN-2025010804",
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "12:30",
      type: "ATM Withdrawal",
      merchant: "First National ATM #4521",
      amount: -80.0,
      account: "****3847",
      status: "Posted",
      category: "Cash",
    },
    {
      id: "TXN-2025010805",
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "19:22",
      type: "Credit Card Payment",
      merchant: "Online Payment",
      amount: -200.0,
      account: "****3847",
      status: "Posted",
      category: "Payment",
    },
    {
      id: "TXN-2025010806",
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:15",
      type: "Mobile Deposit",
      merchant: "Mobile Check Deposit",
      amount: 1250.00,
      account: "****3847",
      status: "Posted",
      category: "Deposit",
    },
    {
      id: "TXN-2025010807",
      date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "15:33",
      type: "Debit Card Purchase",
      merchant: "Gas Station Express",
      amount: -45.67,
      account: "****3847",
      status: "Posted",
      category: "Gas",
    },
    {
      id: "TXN-2025010808",
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "11:20",
      type: "ACH Transfer",
      merchant: "Utility Company",
      amount: -125.50,
      account: "****3847",
      status: "Posted",
      category: "Utilities",
    },
    {
      id: "TXN-2024123109",
      date: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "08:45",
      type: "Debit Card Purchase",
      merchant: "Coffee Shop Downtown",
      amount: -12.85,
      account: "****3847",
      status: "Pending",
      category: "Food & Dining",
    },
    {
      id: "TXN-2024123010",
      date: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "17:30",
      type: "Wire Transfer",
      merchant: "Investment Account",
      amount: -1000.00,
      account: "****3847",
      status: "Posted",
      category: "Investment",
    }
  ],
};

const Transactions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Recent Transactions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              View and manage customer transaction history
            </p>
          </div>
        </AnimatedSection>

        {/* Transactions Section */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                Transaction History
              </h3>
              <button className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30">
                View All Transactions
              </button>
            </div>

            <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl sm:rounded-2xl border border-gray-200/30 dark:border-gray-700/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 dark:bg-gray-800/30 divide-y divide-gray-200/30 dark:divide-gray-700/30">
                    {csrDashboardData.recentTransactions.map(
                      (transaction, index) => (
                        <tr
                          key={transaction.id}
                          className="group hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300"
                        >
                          <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                            <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                              {transaction.date}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {transaction.time}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5">
                            <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                              {transaction.type}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {transaction.merchant}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                            <span className="text-sm sm:text-base font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                              {transaction.account}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                            <div
                              className={`text-sm sm:text-base font-bold ${
                                transaction.amount > 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}$
                              {Math.abs(transaction.amount).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                transaction.status === "Posted"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-700"
                                  : transaction.status === "Pending"
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
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
export default Transactions;

import {
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  AlertTriangle,
  CreditCard,
  ArrowUp,
  Shield,
  UserPlus,
  Activity,
  BarChart3,
  Lock,
  Server,
} from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const SuperAdminDashboard = () => {
  // Fetch SuperAdmin data using custom hooks
  const {
    data: systemOverviewData,
    loading: systemOverviewLoading,
    error: systemOverviewError,
  } = useSuperAdminData("systemOverview");

  const {
    data: userManagementData,
    loading: userManagementLoading,
    error: userManagementError,
  } = useSuperAdminData("userManagement");

  const {
    data: userListData,
    loading: userListLoading,
    error: userListError,
  } = useSuperAdminData("userList");

  const {
    data: complianceData,
    loading: complianceLoading,
    error: complianceError,
  } = useSuperAdminData("complianceAndSecurity");

  const {
    data: financialData,
    loading: financialLoading,
    error: financialError,
  } = useSuperAdminData("financialReporting");

  const {
    data: systemConfigData,
    loading: systemConfigLoading,
    error: systemConfigError,
  } = useSuperAdminData("systemConfiguration");

  const {
    data: auditLogsData,
    loading: auditLogsLoading,
    error: auditLogsError,
  } = useSuperAdminData("auditLogs");

  // Loading and error states
  const isLoading =
    systemOverviewLoading ||
    userManagementLoading ||
    userListLoading ||
    complianceLoading ||
    financialLoading ||
    systemConfigLoading ||
    auditLogsLoading;

  const hasError =
    systemOverviewError ||
    userManagementError ||
    userListError ||
    complianceError ||
    financialError ||
    systemConfigError ||
    auditLogsError;

  // Process data with proper fallbacks - matching actual DB structure
  const processedData = {
    systemOverview: systemOverviewData || {},
    userManagement: userManagementData || {},
    userList: userListData?.users || [],
    complianceAndSecurity: complianceData || {},
    financialReporting: financialData || {},
    systemConfiguration: systemConfigData || {},
    auditLogs: auditLogsData?.logs || [],
  };

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
            Error Loading Dashboard Data
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">
            {systemOverviewError ||
              userManagementError ||
              userListError ||
              complianceError ||
              financialError ||
              systemConfigError ||
              auditLogsError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              SuperAdmin Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Comprehensive system oversight and management
            </p>
          </div>
        </AnimatedSection>

        {/* Bank-wide Metrics */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Deposits Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                    Total Deposits
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      processedData?.systemOverview?.bankWideMetrics
                        ?.totalDeposits || 0
                    )}
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 ml-1">
                    +5.2% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Total Loans Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                    Total Loans
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      processedData?.systemOverview?.bankWideMetrics
                        ?.totalLoans || 0
                    )}
                  </p>
                </div>
                <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 ml-1">
                    +3.8% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Active Accounts Card */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium mb-1">
                    Active Accounts
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData?.systemOverview?.bankWideMetrics
                        ?.activeAccounts || 0
                    )}
                  </p>
                </div>
                <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 ml-1">
                    +2.1% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Net Profit Card */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium mb-1">
                    Net Profit
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      processedData?.systemOverview?.bankWideMetrics
                        ?.netProfit || 0
                    )}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 ml-1">
                    +8.5% from last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* System Health and Performance Metrics */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* System Health Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Server className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-600 dark:text-blue-400" />
                System Health
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {/* Server Uptime */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Server Uptime
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            processedData?.systemOverview?.systemHealth
                              ?.serverUptime || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData?.systemOverview?.systemHealth
                        ?.serverUptime || 0}
                      %
                    </span>
                  </div>
                </div>

                {/* CPU Usage */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    CPU Usage
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          (processedData?.systemOverview?.systemHealth
                            ?.cpuUsage || 0) > 80
                            ? "bg-red-600 dark:bg-red-400"
                            : (processedData?.systemOverview?.systemHealth
                                ?.cpuUsage || 0) > 60
                            ? "bg-yellow-600 dark:bg-yellow-400"
                            : "bg-green-600 dark:bg-green-400"
                        }`}
                        style={{
                          width: `${
                            processedData?.systemOverview?.systemHealth
                              ?.cpuUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData?.systemOverview?.systemHealth?.cpuUsage ||
                        0}
                      %
                    </span>
                  </div>
                </div>

                {/* Memory Usage */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Memory Usage
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          (processedData?.systemOverview?.systemHealth
                            ?.memoryUsage || 0) > 80
                            ? "bg-red-600 dark:bg-red-400"
                            : (processedData?.systemOverview?.systemHealth
                                ?.memoryUsage || 0) > 60
                            ? "bg-yellow-600 dark:bg-yellow-400"
                            : "bg-green-600 dark:bg-green-400"
                        }`}
                        style={{
                          width: `${
                            processedData?.systemOverview?.systemHealth
                              ?.memoryUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData?.systemOverview?.systemHealth
                        ?.memoryUsage || 0}
                      %
                    </span>
                  </div>
                </div>

                {/* Disk Usage */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Disk Usage
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            processedData?.systemOverview?.systemHealth
                              ?.diskUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData?.systemOverview?.systemHealth?.diskUsage ||
                        0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600 dark:text-purple-400" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {processedData?.systemOverview?.systemHealth
                      ?.avgResponseTime || 0}
                    ms
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Avg Response Time
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                    {processedData?.systemOverview?.systemHealth?.errorRate ||
                      0}
                    %
                  </p>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                    Error Rate
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatNumber(
                      processedData?.systemOverview?.systemHealth
                        ?.transactionThroughput || 0
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Transactions/min
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {processedData?.systemOverview?.systemHealth
                      ?.networkLatency || 0}
                    ms
                  </p>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                    Network Latency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Recent Activity Summary */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              Recent Activity Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {/* Total Logins */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(
                    processedData?.systemOverview?.recentActivity
                      ?.totalLogins || 0
                  )}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Total Logins Today
                </p>
              </div>

              {/* Failed Logins */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {processedData?.systemOverview?.recentActivity
                    ?.failedLogins || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Failed Logins
                </p>
              </div>

              {/* New Accounts */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {processedData?.systemOverview?.recentActivity?.newAccounts ||
                    0}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  New Accounts
                </p>
              </div>

              {/* Security Alerts */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {processedData?.systemOverview?.recentActivity
                    ?.suspiciousActivities || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Security Alerts
                </p>
              </div>

              {/* System Changes */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {processedData?.systemOverview?.recentActivity
                    ?.systemChanges || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  System Changes
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Security & Compliance Overview */}
        <AnimatedSection delay={500}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Security Overview */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-600 dark:text-red-400" />
                Security Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Failed Login Attempts
                  </span>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    {processedData?.complianceAndSecurity?.securityMetrics
                      ?.failedLoginAttempts || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Blocked IPs
                  </span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {processedData?.complianceAndSecurity?.securityMetrics
                      ?.blockedIPs || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Suspicious Transactions
                  </span>
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                    {processedData?.complianceAndSecurity?.securityMetrics
                      ?.suspiciousTransactions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Patches Applied
                  </span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {processedData?.complianceAndSecurity?.securityMetrics
                      ?.patchesApplied || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Compliance Overview */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600 dark:text-green-400" />
                Compliance Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    KYC Compliance
                  </span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {processedData?.complianceAndSecurity?.complianceStatus
                      ?.kycCompliance || 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    AML Compliance
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {processedData?.complianceAndSecurity?.complianceStatus
                      ?.amlCompliance || 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Regulatory Reports
                  </span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {processedData?.complianceAndSecurity?.complianceStatus
                      ?.regulatoryReports || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Compliance Score
                  </span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {processedData?.complianceAndSecurity?.complianceStatus
                      ?.complianceScore || 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

import { useState } from "react";
import {
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  AlertTriangle,
  XCircle,
  CreditCard,
  Edit,
  ArrowUp,
  Shield,
  UserCheck,
  UserX,
  Key,
  UserPlus,
  Save,
  Activity,
  BarChart3,
  Lock,
  Server,
} from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const SuperAdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  // Process data with proper fallbacks
  const processedData = {
    systemOverview: systemOverviewData?.bankWideMetrics
      ? systemOverviewData
      : {
          bankWideMetrics: {
            totalDeposits: 2450000000,
            totalLoans: 1850000000,
            activeAccounts: 125000,
            totalRevenue: 45000000,
            netProfit: 12500000,
            totalUsers: 15420,
            activeUsers: 12850,
            systemUptime: 99.97,
          },
          systemHealth: {
            serverUptime: 99.97,
            avgResponseTime: 145,
            errorRate: 0.02,
            transactionThroughput: 2450,
            cpuUsage: 68,
            memoryUsage: 72,
            diskUsage: 45,
            networkLatency: 23,
          },
          recentActivity: {
            totalLogins: 8420,
            failedLogins: 127,
            newAccounts: 45,
            suspiciousActivities: 8,
            systemChanges: 12,
          },
        },
    userManagement: userManagementData?.userStats
      ? userManagementData
      : {
          userStats: {
            totalEmployees: 1250,
            activeEmployees: 1180,
            customers: 124500,
            activeCustomers: 118200,
            adminUsers: 25,
            suspendedUsers: 85,
          },
        },
    userList: userListData?.users || [],
    complianceAndSecurity: complianceData?.fraudDetection
      ? complianceData
      : {
          fraudDetection: {
            totalAlerts: 156,
            highRiskAlerts: 23,
            mediumRiskAlerts: 87,
            lowRiskAlerts: 46,
            resolvedToday: 34,
            pendingInvestigation: 89,
          },
          securityMetrics: {
            failedLoginAttempts: 127,
            blockedIPs: 45,
            suspiciousTransactions: 23,
            securityIncidents: 2,
            vulnerabilitiesFound: 8,
            patchesApplied: 15,
          },
          complianceStatus: {
            kycCompliance: 98.5,
            amlCompliance: 99.2,
            regulatoryReports: 12,
            auditFindings: 3,
            complianceScore: 96.8,
          },
          recentSecurityEvents: [],
        },
    financialReporting: financialData?.profitLoss
      ? financialData
      : {
          profitLoss: {
            totalRevenue: 45000000,
            totalExpenses: 32500000,
            netIncome: 12500000,
            operatingIncome: 15200000,
            interestIncome: 28000000,
            feeIncome: 17000000,
            operatingExpenses: 25000000,
            provisionForLosses: 7500000,
          },
          riskManagement: {
            creditRisk: {
              totalExposure: 1850000000,
              nonPerformingLoans: 92500000,
              nplRatio: 5.0,
              provisioning: 55500000,
              riskWeightedAssets: 2100000000,
            },
            marketRisk: {
              var95: 2500000,
              interestRateRisk: 1200000,
              currencyRisk: 800000,
              equityRisk: 500000,
            },
            operationalRisk: {
              riskEvents: 12,
              totalLosses: 450000,
              avgLossPerEvent: 37500,
              riskCapital: 25000000,
            },
          },
          capitalAdequacy: {
            tier1Capital: 185000000,
            tier2Capital: 95000000,
            totalCapital: 280000000,
            riskWeightedAssets: 2100000000,
            capitalRatio: 13.33,
            tier1Ratio: 8.81,
            leverageRatio: 6.2,
          },
          performanceMetrics: {
            roa: 1.25,
            roe: 15.8,
            nim: 3.2,
            costToIncomeRatio: 65.5,
            efficiencyRatio: 58.2,
          },
        },
    systemConfiguration: systemConfigData?.systemParameters
      ? systemConfigData
      : {
          systemParameters: {
            interestRates: {
              savingsRate: 2.5,
              checkingRate: 0.1,
              loanBaseRate: 5.25,
              mortgageRate: 4.75,
              creditCardRate: 18.99,
            },
            fees: {
              wireTransferFee: 25,
              overdraftFee: 35,
              monthlyMaintenanceFee: 12,
              atmFee: 3,
              foreignTransactionFee: 2.5,
            },
            limits: {
              dailyWithdrawalLimit: 1000,
              dailyTransferLimit: 10000,
              monthlyTransferLimit: 50000,
              checkDepositLimit: 25000,
            },
            securitySettings: {
              passwordExpiry: 90,
              maxLoginAttempts: 3,
              sessionTimeout: 30,
              twoFactorRequired: true,
              ipWhitelistEnabled: false,
            },
          },
          backupStatus: {
            lastFullBackup: "2024-06-05 02:00",
            lastIncrementalBackup: "2024-06-05 14:00",
            backupSize: "2.5 TB",
            backupStatus: "Successful",
            retentionPeriod: "7 years",
            offSiteBackup: "Enabled",
          },
          systemMaintenance: {
            nextScheduledMaintenance: "2024-06-08 02:00",
            lastMaintenance: "2024-06-01 02:00",
            maintenanceWindow: "02:00 - 06:00",
            estimatedDowntime: "4 hours",
            affectedServices: ["Online Banking", "Mobile App", "ATM Network"],
          },
        },
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Suspended":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400";
      case "Account Manager":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      case "Loan Officer":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Compliance Officer":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400";
      case "Customer":
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
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
                      processedData.systemOverview?.bankWideMetrics
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
                            processedData.systemOverview?.systemHealth
                              ?.serverUptime || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData.systemOverview?.systemHealth
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
                          (processedData.systemOverview?.systemHealth
                            ?.cpuUsage || 0) > 80
                            ? "bg-red-600 dark:bg-red-400"
                            : (processedData.systemOverview?.systemHealth
                                ?.cpuUsage || 0) > 60
                            ? "bg-yellow-600 dark:bg-yellow-400"
                            : "bg-green-600 dark:bg-green-400"
                        }`}
                        style={{
                          width: `${
                            processedData.systemOverview?.systemHealth
                              ?.cpuUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData.systemOverview?.systemHealth?.cpuUsage ||
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
                          (processedData.systemOverview?.systemHealth
                            ?.memoryUsage || 0) > 80
                            ? "bg-red-600 dark:bg-red-400"
                            : (processedData.systemOverview?.systemHealth
                                ?.memoryUsage || 0) > 60
                            ? "bg-yellow-600 dark:bg-yellow-400"
                            : "bg-green-600 dark:bg-green-400"
                        }`}
                        style={{
                          width: `${
                            processedData.systemOverview?.systemHealth
                              ?.memoryUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData.systemOverview?.systemHealth
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
                            processedData.systemOverview?.systemHealth
                              ?.diskUsage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {processedData.systemOverview?.systemHealth?.diskUsage ||
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
                    {processedData.systemOverview?.systemHealth
                      ?.avgResponseTime || 0}
                    ms
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Avg Response Time
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                    {processedData.systemOverview?.systemHealth?.errorRate || 0}
                    %
                  </p>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                    Error Rate
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatNumber(
                      processedData.systemOverview?.systemHealth
                        ?.transactionThroughput || 0
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Transactions/min
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {processedData.systemOverview?.systemHealth
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
                    processedData.systemOverview?.recentActivity?.totalLogins ||
                      0
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
                  {processedData.systemOverview?.recentActivity?.failedLogins ||
                    0}
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
                  {processedData.systemOverview?.recentActivity?.newAccounts ||
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
                  {processedData.systemOverview?.recentActivity
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
                  {processedData.systemOverview?.recentActivity
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
                    {processedData.complianceAndSecurity?.securityMetrics
                      ?.failedLoginAttempts || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Blocked IPs
                  </span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {processedData.complianceAndSecurity?.securityMetrics
                      ?.blockedIPs || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Suspicious Transactions
                  </span>
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                    {processedData.complianceAndSecurity?.securityMetrics
                      ?.suspiciousTransactions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Patches Applied
                  </span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {processedData.complianceAndSecurity?.securityMetrics
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
                    {processedData.complianceAndSecurity?.complianceStatus
                      ?.kycCompliance || 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    AML Compliance
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {processedData.complianceAndSecurity?.complianceStatus
                      ?.amlCompliance || 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Regulatory Reports
                  </span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {processedData.complianceAndSecurity?.complianceStatus
                      ?.regulatoryReports || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Compliance Score
                  </span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {processedData.complianceAndSecurity?.complianceStatus
                      ?.complianceScore || 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Modals would go here - keeping the existing modal code from the original component */}
      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  User Details
                </h3>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">
                    Basic Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Name:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        User ID:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Role:
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded ${getRoleColor(
                          selectedUser.role
                        )}`}
                      >
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Department:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded ${getStatusColor(
                          selectedUser.status
                        )}`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">
                    Activity Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.createdDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last Login:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.lastLogin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Login Count:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {formatNumber(selectedUser.loginCount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last Activity:
                      </span>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {selectedUser.lastActivity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-black dark:text-white mb-3">
                  Permissions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUser.permissions?.map((permission, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                    >
                      {permission
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => handleEditUser(selectedUser)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit User
                </button>
                <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600">
                  <Key className="h-4 w-4 inline mr-1" />
                  Reset Password
                </button>
                {selectedUser.status === "Active" ? (
                  <button className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 dark:hover:bg-red-600">
                    <UserX className="h-4 w-4 inline mr-1" />
                    Suspend User
                  </button>
                ) : (
                  <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600">
                    <UserCheck className="h-4 w-4 inline mr-1" />
                    Activate User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Edit User
                </h3>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingUser.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={editingUser.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Role
                  </label>
                  <select
                    defaultValue={editingUser.role}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option>Account Manager</option>
                    <option>Loan Officer</option>
                    <option>Compliance Officer</option>
                    <option>IT Administrator</option>
                    <option>Super Admin</option>
                    <option>Customer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Department
                  </label>
                  <select
                    defaultValue={editingUser.department}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option>Private Banking</option>
                    <option>Commercial Lending</option>
                    <option>Risk & Compliance</option>
                    <option>Information Technology</option>
                    <option>N/A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Status
                  </label>
                  <select
                    defaultValue={editingUser.status}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditUserModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <Save className="h-4 w-4 inline mr-1" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;

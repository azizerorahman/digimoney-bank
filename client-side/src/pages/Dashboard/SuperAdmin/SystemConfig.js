import { useState, useEffect } from "react";
import {
  Search,
  User,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Edit,
  Download,
  ArrowRight,
  Shield,
  Activity,
  ArrowLeft,
  Server,
  UserCheck,
  UserX,
  RefreshCw,
  Key,
  Gauge,
  Power,
  UserPlus,
  Save,
} from "lucide-react";

const SystemConfig = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isQuickActionsCollapsed, setIsQuickActionsCollapsed] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Mock data for Super Admin Dashboard
  const superAdminData = {
    systemOverview: {
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

    userManagement: {
      userStats: {
        totalEmployees: 1250,
        activeEmployees: 1180,
        customers: 124500,
        activeCustomers: 118200,
        adminUsers: 25,
        suspendedUsers: 85,
      },
      userList: [
        {
          id: "EMP-001",
          name: "Alexandra Chen",
          email: "a.chen@bank.com",
          role: "Account Manager",
          department: "Private Banking",
          status: "Active",
          lastLogin: "2024-06-05 09:15",
          loginCount: 1250,
          permissions: [
            "read_customer_data",
            "create_accounts",
            "schedule_meetings",
          ],
          createdDate: "2019-03-15",
          lastActivity: "2024-06-05 14:30",
        },
        {
          id: "EMP-002",
          name: "Michael Rodriguez",
          email: "m.rodriguez@bank.com",
          role: "Loan Officer",
          department: "Commercial Lending",
          status: "Active",
          lastLogin: "2024-06-05 08:45",
          loginCount: 980,
          permissions: ["read_loan_data", "approve_loans", "risk_assessment"],
          createdDate: "2020-07-22",
          lastActivity: "2024-06-05 13:20",
        },
        {
          id: "EMP-003",
          name: "Sarah Johnson",
          email: "s.johnson@bank.com",
          role: "Compliance Officer",
          department: "Risk & Compliance",
          status: "Active",
          lastLogin: "2024-06-05 07:30",
          loginCount: 1450,
          permissions: [
            "full_audit_access",
            "compliance_reports",
            "user_management",
          ],
          createdDate: "2018-11-08",
          lastActivity: "2024-06-05 15:45",
        },
        {
          id: "CUST-001",
          name: "Robert Martinez",
          email: "r.martinez@email.com",
          role: "Customer",
          department: "N/A",
          status: "Active",
          lastLogin: "2024-06-04 19:20",
          loginCount: 245,
          permissions: ["view_own_accounts", "transfer_funds", "pay_bills"],
          createdDate: "2021-05-12",
          lastActivity: "2024-06-04 19:35",
        },
        {
          id: "EMP-004",
          name: "David Kim",
          email: "d.kim@bank.com",
          role: "IT Administrator",
          department: "Information Technology",
          status: "Suspended",
          lastLogin: "2024-06-01 16:45",
          loginCount: 2100,
          permissions: ["system_admin", "user_management", "security_config"],
          createdDate: "2017-02-28",
          lastActivity: "2024-06-01 17:30",
        },
      ],
      roleDefinitions: [
        {
          role: "Super Admin",
          userCount: 3,
          permissions: [
            "full_system_access",
            "user_management",
            "system_config",
            "audit_logs",
          ],
          description: "Complete system access and control",
        },
        {
          role: "Account Manager",
          userCount: 45,
          permissions: [
            "customer_management",
            "account_operations",
            "reporting",
          ],
          description: "Customer relationship and account management",
        },
        {
          role: "Loan Officer",
          userCount: 32,
          permissions: [
            "loan_processing",
            "credit_analysis",
            "approval_workflows",
          ],
          description: "Loan origination and management",
        },
        {
          role: "Compliance Officer",
          userCount: 12,
          permissions: [
            "compliance_monitoring",
            "audit_access",
            "regulatory_reporting",
          ],
          description: "Regulatory compliance and risk monitoring",
        },
        {
          role: "Customer",
          userCount: 124500,
          permissions: [
            "account_access",
            "transaction_history",
            "bill_payment",
          ],
          description: "Standard customer banking access",
        },
      ],
    },

    complianceAndSecurity: {
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
      recentSecurityEvents: [
        {
          id: "SEC-001",
          type: "Failed Login Attempt",
          severity: "Medium",
          description: "Multiple failed login attempts from IP 192.168.1.100",
          timestamp: "2024-06-05 14:30",
          status: "Investigating",
          affectedUser: "EMP-004",
        },
        {
          id: "SEC-002",
          type: "Suspicious Transaction",
          severity: "High",
          description: "Large wire transfer outside normal pattern",
          timestamp: "2024-06-05 13:45",
          status: "Under Review",
          affectedUser: "CUST-789",
        },
        {
          id: "SEC-003",
          type: "Permission Change",
          severity: "Low",
          description: "User role updated for employee",
          timestamp: "2024-06-05 12:15",
          status: "Completed",
          affectedUser: "EMP-025",
        },
      ],
    },

    financialReporting: {
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

    systemConfiguration: {
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

    auditLogs: [
      {
        id: "AUDIT-001",
        timestamp: "2024-06-05 14:45",
        user: "admin@bank.com",
        action: "User Role Updated",
        details:
          "Changed role from Loan Officer to Senior Loan Officer for user EMP-025",
        ipAddress: "192.168.1.50",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success",
      },
      {
        id: "AUDIT-002",
        timestamp: "2024-06-05 14:30",
        user: "s.johnson@bank.com",
        action: "Compliance Report Generated",
        details: "Generated monthly AML compliance report",
        ipAddress: "192.168.1.75",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success",
      },
      {
        id: "AUDIT-003",
        timestamp: "2024-06-05 13:15",
        user: "system",
        action: "System Configuration Changed",
        details: "Updated daily withdrawal limit from $800 to $1000",
        ipAddress: "127.0.0.1",
        userAgent: "System Process",
        status: "Success",
      },
      {
        id: "AUDIT-004",
        timestamp: "2024-06-05 12:45",
        user: "d.kim@bank.com",
        action: "Failed Login Attempt",
        details: "Multiple failed login attempts - account temporarily locked",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Failed",
      },
    ],
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
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

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = superAdminData.userManagement.userList.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.id.toLowerCase().includes(query.toLowerCase()) ||
          user.role.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setShowSearchResults(false);
    setSearchQuery("");
    setShowUserDetails(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 100) + 12800,
        transactionThroughput: Math.floor(Math.random() * 500) + 2200,
        systemLoad: Math.floor(Math.random() * 20) + 60,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="py-6">
      <div className="space-y-6">
          {/* System Parameters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Interest Rates
                </h3>
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Savings Rate
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.savingsRate
                    }
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Checking Rate
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.checkingRate
                    }
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Loan Base Rate
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.loanBaseRate
                    }
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mortgage Rate
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.mortgageRate
                    }
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Credit Card Rate
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.creditCardRate
                    }
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Fee Structure
                </h3>
                <button
                  onClick={() => setShowFeeModal(true)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Wire Transfer Fee
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {
                      superAdminData.systemConfiguration.systemParameters.fees
                        .wireTransferFee
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Overdraft Fee
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {
                      superAdminData.systemConfiguration.systemParameters.fees
                        .overdraftFee
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Maintenance
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {
                      superAdminData.systemConfiguration.systemParameters.fees
                        .monthlyMaintenanceFee
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ATM Fee
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {
                      superAdminData.systemConfiguration.systemParameters.fees
                        .atmFee
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Foreign Transaction
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters.fees
                        .foreignTransactionFee
                    }
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Limits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Transaction Limits
                </h3>
                <button
                  onClick={() => setShowLimitsModal(true)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Daily Withdrawal Limit
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {formatNumber(
                      superAdminData.systemConfiguration.systemParameters.limits
                        .dailyWithdrawalLimit
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Daily Transfer Limit
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {formatNumber(
                      superAdminData.systemConfiguration.systemParameters.limits
                        .dailyTransferLimit
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Transfer Limit
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {formatNumber(
                      superAdminData.systemConfiguration.systemParameters.limits
                        .monthlyTransferLimit
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Check Deposit Limit
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    $
                    {formatNumber(
                      superAdminData.systemConfiguration.systemParameters.limits
                        .checkDepositLimit
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Security Settings
                </h3>
                <button
                  onClick={() => setShowSecurityModal(true)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Password Expiry
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.passwordExpiry
                    }{" "}
                    days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Max Login Attempts
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.maxLoginAttempts
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Session Timeout
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.sessionTimeout
                    }{" "}
                    minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Two-Factor Auth
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.twoFactorRequired
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {superAdminData.systemConfiguration.systemParameters
                      .securitySettings.twoFactorRequired
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Backup and System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Backup Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">
                        Last Full Backup
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {
                          superAdminData.systemConfiguration.backupStatus
                            .lastFullBackup
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {
                      superAdminData.systemConfiguration.backupStatus
                        .backupStatus
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">
                        Last Incremental
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {
                          superAdminData.systemConfiguration.backupStatus
                            .lastIncrementalBackup
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {superAdminData.systemConfiguration.backupStatus.backupSize}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Retention Period
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {
                        superAdminData.systemConfiguration.backupStatus
                          .retentionPeriod
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Off-site Backup
                    </p>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      {
                        superAdminData.systemConfiguration.backupStatus
                          .offSiteBackup
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                System Maintenance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-orange-800 dark:text-orange-300">
                        Next Maintenance
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        {
                          superAdminData.systemConfiguration.systemMaintenance
                            .nextScheduledMaintenance
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    {
                      superAdminData.systemConfiguration.systemMaintenance
                        .estimatedDowntime
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-300">
                        Last Maintenance
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {
                          superAdminData.systemConfiguration.systemMaintenance
                            .lastMaintenance
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Completed
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Affected Services:
                  </p>
                  <div className="space-y-1">
                    {superAdminData.systemConfiguration.systemMaintenance.affectedServices.map(
                      (service, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-black dark:text-white"
                        >
                          • {service}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {selectedUser.permissions.map((permission, idx) => (
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
                  onClick={() => handleEditUser(User)}
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

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Add New User
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700">
                    <option>Select Role</option>
                    <option>Account Manager</option>
                    <option>Loan Officer</option>
                    <option>Compliance Officer</option>
                    <option>IT Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700">
                    <option>Select Department</option>
                    <option>Private Banking</option>
                    <option>Commercial Lending</option>
                    <option>Risk & Compliance</option>
                    <option>Information Technology</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Edit Interest Rates
                </h3>
                <button
                  onClick={() => setShowConfigModal(false)}
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
                    Savings Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.savingsRate
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Checking Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.checkingRate
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Loan Base Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.loanBaseRate
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Mortgage Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.mortgageRate
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Credit Card Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .interestRates.creditCardRate
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
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

      {/* Fee Structure Modal */}
      {showFeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Edit Fee Structure
                </h3>
                <button
                  onClick={() => setShowFeeModal(false)}
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
                    Wire Transfer Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.fees
                        .wireTransferFee
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Overdraft Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.fees
                        .overdraftFee
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Monthly Maintenance Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.fees
                        .monthlyMaintenanceFee
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    ATM Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.fees
                        .atmFee
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Foreign Transaction Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.fees
                        .foreignTransactionFee
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowFeeModal(false)}
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

      {/* Transaction Limits Modal */}
      {showLimitsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Edit Transaction Limits
                </h3>
                <button
                  onClick={() => setShowLimitsModal(false)}
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
                    Daily Withdrawal Limit ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.limits
                        .dailyWithdrawalLimit
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Daily Transfer Limit ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.limits
                        .dailyTransferLimit
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Monthly Transfer Limit ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.limits
                        .monthlyTransferLimit
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Check Deposit Limit ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters.limits
                        .checkDepositLimit
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowLimitsModal(false)}
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

      {/* Security Settings Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Edit Security Settings
                </h3>
                <button
                  onClick={() => setShowSecurityModal(false)}
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
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.passwordExpiry
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.maxLoginAttempts
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.sessionTimeout
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Two-Factor Authentication
                  </label>
                  <select
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.twoFactorRequired
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option value={true}>Enabled</option>
                    <option value={false}>Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    IP Whitelist
                  </label>
                  <select
                    defaultValue={
                      superAdminData.systemConfiguration.systemParameters
                        .securitySettings.ipWhitelistEnabled
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option value={true}>Enabled</option>
                    <option value={false}>Disabled</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowSecurityModal(false)}
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
      {/* Footer */}
      <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span>© 2024 Bank Management System - Super Admin Dashboard</span>
          </div>
          <div className="flex space-x-4">
            <span>Version 2.1.0</span>
            <span>•</span>
            <span>Last Updated: June 5, 2024</span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;

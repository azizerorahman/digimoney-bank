import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import {
  Search,  Users,
  FileText, AlertTriangle,
   XCircle,  BarChart3, 
   Download,
   ArrowRight, Shield,
  Activity, ArrowLeft, Server,  UserX, RefreshCw,
  Key,
  Gauge, Power,
  UserPlus, Save
} from 'lucide-react';

const SuperAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isQuickActionsCollapsed, setIsQuickActionsCollapsed] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});

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
        systemUptime: 99.97
      },
      systemHealth: {
        serverUptime: 99.97,
        avgResponseTime: 145,
        errorRate: 0.02,
        transactionThroughput: 2450,
        cpuUsage: 68,
        memoryUsage: 72,
        diskUsage: 45,
        networkLatency: 23
      },
      recentActivity: {
        totalLogins: 8420,
        failedLogins: 127,
        newAccounts: 45,
        suspiciousActivities: 8,
        systemChanges: 12
      }
    },

    userManagement: {
      userStats: {
        totalEmployees: 1250,
        activeEmployees: 1180,
        customers: 124500,
        activeCustomers: 118200,
        adminUsers: 25,
        suspendedUsers: 85
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
          permissions: ["read_customer_data", "create_accounts", "schedule_meetings"],
          createdDate: "2019-03-15",
          lastActivity: "2024-06-05 14:30"
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
          lastActivity: "2024-06-05 13:20"
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
          permissions: ["full_audit_access", "compliance_reports", "user_management"],
          createdDate: "2018-11-08",
          lastActivity: "2024-06-05 15:45"
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
          lastActivity: "2024-06-04 19:35"
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
          lastActivity: "2024-06-01 17:30"
        }
      ],
      roleDefinitions: [
        {
          role: "Super Admin",
          userCount: 3,
          permissions: ["full_system_access", "user_management", "system_config", "audit_logs"],
          description: "Complete system access and control"
        },
        {
          role: "Account Manager",
          userCount: 45,
          permissions: ["customer_management", "account_operations", "reporting"],
          description: "Customer relationship and account management"
        },
        {
          role: "Loan Officer",
          userCount: 32,
          permissions: ["loan_processing", "credit_analysis", "approval_workflows"],
          description: "Loan origination and management"
        },
        {
          role: "Compliance Officer",
          userCount: 12,
          permissions: ["compliance_monitoring", "audit_access", "regulatory_reporting"],
          description: "Regulatory compliance and risk monitoring"
        },
        {
          role: "Customer",
          userCount: 124500,
          permissions: ["account_access", "transaction_history", "bill_payment"],
          description: "Standard customer banking access"
        }
      ]
    },

    complianceAndSecurity: {
      fraudDetection: {
        totalAlerts: 156,
        highRiskAlerts: 23,
        mediumRiskAlerts: 87,
        lowRiskAlerts: 46,
        resolvedToday: 34,
        pendingInvestigation: 89
      },
      securityMetrics: {
        failedLoginAttempts: 127,
        blockedIPs: 45,
        suspiciousTransactions: 23,
        securityIncidents: 2,
        vulnerabilitiesFound: 8,
        patchesApplied: 15
      },
      complianceStatus: {
        kycCompliance: 98.5,
        amlCompliance: 99.2,
        regulatoryReports: 12,
        auditFindings: 3,
        complianceScore: 96.8
      },
      recentSecurityEvents: [
        {
          id: "SEC-001",
          type: "Failed Login Attempt",
          severity: "Medium",
          description: "Multiple failed login attempts from IP 192.168.1.100",
          timestamp: "2024-06-05 14:30",
          status: "Investigating",
          affectedUser: "EMP-004"
        },
        {
          id: "SEC-002",
          type: "Suspicious Transaction",
          severity: "High",
          description: "Large wire transfer outside normal pattern",
          timestamp: "2024-06-05 13:45",
          status: "Under Review",
          affectedUser: "CUST-789"
        },
        {
          id: "SEC-003",
          type: "Permission Change",
          severity: "Low",
          description: "User role updated for employee",
          timestamp: "2024-06-05 12:15",
          status: "Completed",
          affectedUser: "EMP-025"
        }
      ]
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
        provisionForLosses: 7500000
      },
      riskManagement: {
        creditRisk: {
          totalExposure: 1850000000,
          nonPerformingLoans: 92500000,
          nplRatio: 5.0,
          provisioning: 55500000,
          riskWeightedAssets: 2100000000
        },
        marketRisk: {
          var95: 2500000,
          interestRateRisk: 1200000,
          currencyRisk: 800000,
          equityRisk: 500000
        },
        operationalRisk: {
          riskEvents: 12,
          totalLosses: 450000,
          avgLossPerEvent: 37500,
          riskCapital: 25000000
        }
      },
      capitalAdequacy: {
        tier1Capital: 185000000,
        tier2Capital: 95000000,
        totalCapital: 280000000,
        riskWeightedAssets: 2100000000,
        capitalRatio: 13.33,
        tier1Ratio: 8.81,
        leverageRatio: 6.2
      },
      performanceMetrics: {
        roa: 1.25,
        roe: 15.8,
        nim: 3.2,
        costToIncomeRatio: 65.5,
        efficiencyRatio: 58.2
      }
    },

    systemConfiguration: {
      systemParameters: {
        interestRates: {
          savingsRate: 2.5,
          checkingRate: 0.1,
          loanBaseRate: 5.25,
          mortgageRate: 4.75,
          creditCardRate: 18.99
        },
        fees: {
          wireTransferFee: 25,
          overdraftFee: 35,
          monthlyMaintenanceFee: 12,
          atmFee: 3,
          foreignTransactionFee: 2.5
        },
        limits: {
          dailyWithdrawalLimit: 1000,
          dailyTransferLimit: 10000,
          monthlyTransferLimit: 50000,
          checkDepositLimit: 25000
        },
        securitySettings: {
          passwordExpiry: 90,
          maxLoginAttempts: 3,
          sessionTimeout: 30,
          twoFactorRequired: true,
          ipWhitelistEnabled: false
        }
      },
      backupStatus: {
        lastFullBackup: "2024-06-05 02:00",
        lastIncrementalBackup: "2024-06-05 14:00",
        backupSize: "2.5 TB",
        backupStatus: "Successful",
        retentionPeriod: "7 years",
        offSiteBackup: "Enabled"
      },
      systemMaintenance: {
        nextScheduledMaintenance: "2024-06-08 02:00",
        lastMaintenance: "2024-06-01 02:00",
        maintenanceWindow: "02:00 - 06:00",
        estimatedDowntime: "4 hours",
        affectedServices: ["Online Banking", "Mobile App", "ATM Network"]
      }
    },

    auditLogs: [
      {
        id: "AUDIT-001",
        timestamp: "2024-06-05 14:45",
        user: "admin@bank.com",
        action: "User Role Updated",
        details: "Changed role from Loan Officer to Senior Loan Officer for user EMP-025",
        ipAddress: "192.168.1.50",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success"
      },
      {
        id: "AUDIT-002",
        timestamp: "2024-06-05 14:30",
        user: "s.johnson@bank.com",
        action: "Compliance Report Generated",
        details: "Generated monthly AML compliance report",
        ipAddress: "192.168.1.75",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Success"
      },
      {
        id: "AUDIT-003",
        timestamp: "2024-06-05 13:15",
        user: "system",
        action: "System Configuration Changed",
        details: "Updated daily withdrawal limit from $800 to $1000",
        ipAddress: "127.0.0.1",
        userAgent: "System Process",
        status: "Success"
      },
      {
        id: "AUDIT-004",
        timestamp: "2024-06-05 12:45",
        user: "d.kim@bank.com",
        action: "Failed Login Attempt",
        details: "Multiple failed login attempts - account temporarily locked",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "Failed"
      }
    ]
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };


  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'Low': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400';
      case 'Account Manager': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'Loan Officer': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'Compliance Officer': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400';
      case 'Customer': return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = superAdminData.userManagement.userList.filter(user =>
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
    setSearchQuery('');
    setShowUserDetails(true);
  };

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 100) + 12800,
        transactionThroughput: Math.floor(Math.random() * 500) + 2200,
        systemLoad: Math.floor(Math.random() * 20) + 60
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-12">
      <div className="mb-6 md:mb-8 lg:mb-10">
        <div className="super-admin-dashboard">

          {/* Header */}
          <div className="bg-white bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 dark:text-white">Super Admin {" "}
          <span className="text-[#6160DC] dark:text-[#8B7EFF]">
            Dashboard
          </span>
          </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    System-wide monitoring and administration
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users, logs, configurations..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />

                  {/* Search Results Dropdown */}
                  {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map(user => (
                          <div
                            key={user.id}
                            onClick={() => selectUser(user)}
                            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-black dark:text-white">{user.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 dark:text-gray-400">No users found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* System Status Bar */}
              <div className="grid grid-cols-6 gap-6 mt-6">
                <div className="p-4 md:p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">System Uptime</p>
                      <p className="text-xl font-bold text-green-700 dark:text-green-300">
                        {superAdminData.systemOverview.systemHealth.serverUptime}%
                      </p>
                    </div>
                    <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="p-4 md:p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Active Users</p>
                      <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                        {formatNumber(realTimeData.activeUsers || superAdminData.systemOverview.bankWideMetrics.activeUsers)}
                      </p>
                    </div>
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="p-4 md:p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Transactions/min</p>
                      <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                        {formatNumber(realTimeData.transactionThroughput || superAdminData.systemOverview.systemHealth.transactionThroughput)}
                      </p>
                    </div>
                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                <div className="p-4 md:p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Security Alerts</p>
                      <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
                        {superAdminData.complianceAndSecurity.fraudDetection.highRiskAlerts}
                      </p>
                    </div>
                    <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>

                <div className="p-4 md:p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 dark:text-red-400">Failed Logins</p>
                      <p className="text-xl font-bold text-red-700 dark:text-red-300">
                        {superAdminData.systemOverview.recentActivity.failedLogins}
                      </p>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>

                <div className="p-4 md:p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">System Load</p>
                      <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                        {realTimeData.systemLoad || superAdminData.systemOverview.systemHealth.cpuUsage}%
                      </p>
                    </div>
                    <Gauge className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              </div>

          </div>
                {/* Quick Actions Sidebar */}
      <div className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 ${isQuickActionsCollapsed ? 'translate-x-full' : 'translate-x-0'
        }`} style={{ width: '320px' }}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-black dark:text-white">Quick Actions</h3>
            <button
              onClick={() => setIsQuickActionsCollapsed(!isQuickActionsCollapsed)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isQuickActionsCollapsed ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="h-full p-4 space-y-4 overflow-y-auto">
          {/* System Controls */}
          <div className="space-y-3">
            <h4 className="font-medium text-black dark:text-white text-sm">System Controls</h4>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
              <Power className="h-4 w-4" />
              <span className="text-sm">System Restart</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Force Backup</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Maintenance Mode</span>
            </button>
          </div>

          {/* User Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-black dark:text-white text-sm">User Actions</h4>
            <button
              onClick={() => setShowUserModal(true)}
              className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm">Add New User</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
              <UserX className="h-4 w-4" />
              <span className="text-sm">Bulk Suspend</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
              <Key className="h-4 w-4" />
              <span className="text-sm">Password Reset</span>
            </button>
          </div>

          {/* Reports */}
          <div className="space-y-3">
            <h4 className="font-medium text-black dark:text-white text-sm">Reports</h4>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <Download className="h-4 w-4" />
              <span className="text-sm">Export Audit Log</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <FileText className="h-4 w-4" />
              <span className="text-sm">System Report</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Performance Report</span>
            </button>
          </div>

          {/* Recent Alerts */}
          <div className="space-y-2">
            <h4 className="font-medium text-black dark:text-white text-sm">Recent Alerts</h4>
              {superAdminData.complianceAndSecurity.recentSecurityEvents.slice(0, 3).map(event => (
                <div key={event.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {event.timestamp.split(' ')[1]}
                    </span>
                  </div>
                  <p className="text-xs text-black dark:text-white mt-1 truncate">{event.type}</p>
                </div>
              ))}

          </div>
        </div>
      </div>

      {/* Collapse/Expand Button for Quick Actions */}
      {isQuickActionsCollapsed && (
        <button
          onClick={() => setIsQuickActionsCollapsed(false)}
          className="fixed right-4 top-20 transform -translate-y-1/2 bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-l-lg shadow-lg z-30 hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {/* System Alerts Toast */}
      {systemAlerts.length > 0 && (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          {systemAlerts.map((alert, idx) => (
            <div key={idx} className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{alert.title}</p>
                  <p className="text-xs text-red-600 dark:text-red-400">{alert.message}</p>
                </div>
                <button
                  onClick={() => setSystemAlerts(systemAlerts.filter((_, i) => i !== idx))}
                  className="ml-2 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

          {/* This is crucial - it renders the child route components */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdmin;

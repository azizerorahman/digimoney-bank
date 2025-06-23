import { Outlet} from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Phone,
  Target,
  Smile,
} from "lucide-react";

export const csrDashboardData = {
  // Current CSR session info
  csrInfo: {
    name: "Sarah Johnson",
    id: "CSR-2847",
    department: "Customer Service",
    shift: "Morning (8:00 AM - 4:00 PM)",
    status: "Available",
    currentCalls: 2,
    todayStats: {
      callsHandled: 23,
      avgCallTime: "4:32",
      resolutionRate: 87,
      customerSatisfaction: 4.6,
    },
  },

  // Active customer (currently being helped)
  activeCustomer: {
    basicInfo: {
      name: "Michael Rodriguez",
      customerId: "CUST-789456",
      accountNumber: "****-****-****-3847", // Masked for security
      memberSince: "2019-03-15",
      preferredName: "Mike",
      contactMethod: "Phone",
      language: "English",
    },
    contactInfo: {
      phone: "(555) 234-5678",
      email: "m.rodriguez@email.com",
      address: {
        street: "1234 Oak Street",
        city: "Springfield",
        state: "IL",
        zip: "62701",
      },
      emergencyContact: {
        name: "Maria Rodriguez",
        relationship: "Spouse",
        phone: "(555) 234-5679",
      },
    },
    accountSummary: {
      accounts: [
        {
          type: "Checking",
          accountNumber: "****3847",
          balance: 2847.32,
          status: "Active",
          lastActivity: "2024-06-02",
        },
        {
          type: "Savings",
          accountNumber: "****7291",
          balance: 15420.88,
          status: "Active",
          lastActivity: "2024-05-28",
        },
        {
          type: "Credit Card",
          accountNumber: "****9156",
          balance: -1247.65,
          creditLimit: 5000,
          status: "Active",
          paymentDue: "2024-06-15",
        },
      ],
      totalRelationship: 17020.55,
      creditScore: "Good (720-750)", // Range for privacy
      riskLevel: "Low",
    },
    alerts: [
      {
        type: "info",
        message: "Customer called 3 times this month",
        priority: "Medium",
        date: "2024-06-03",
      },
      {
        type: "warning",
        message: "Credit card payment due in 12 days",
        priority: "Low",
        date: "2024-06-03",
      },
      {
        type: "overdraft",
        message: "Account overdraft: -$150.00 (Fee: $35.00)",
        priority: "High",
        date: "2024-06-03",
        amount: -150,
        fee: 35,
      },
      {
        type: "hold",
        message: "Temporary hold: $500.00 - Check verification pending",
        priority: "Medium",
        date: "2024-06-03",
        amount: 500,
        reason: "Check verification",
      },
      {
        type: "suspicious",
        message: "Suspicious activity: ATM withdrawal $800 - unusual location",
        priority: "High",
        date: "2024-06-03",
        transaction: "ATM withdrawal $800 - unusual location",
      },
    ],
  },

  // Recent transactions (last 10)
  recentTransactions: [
    {
      id: "TXN-2024060301",
      date: "2024-06-02",
      time: "14:23",
      type: "Debit Card Purchase",
      merchant: "Grocery Store Plus",
      amount: -87.45,
      account: "****3847",
      status: "Posted",
      category: "Groceries",
    },
    {
      id: "TXN-2024060201",
      date: "2024-06-01",
      time: "09:15",
      type: "Direct Deposit",
      merchant: "ABC Company Payroll",
      amount: 2847.33,
      account: "****3847",
      status: "Posted",
      category: "Income",
    },
    {
      id: "TXN-2024053101",
      date: "2024-05-31",
      time: "16:45",
      type: "Online Transfer",
      merchant: "Transfer to Savings",
      amount: -500.0,
      account: "****3847",
      status: "Posted",
      category: "Transfer",
    },
    {
      id: "TXN-2024053001",
      date: "2024-05-30",
      time: "12:30",
      type: "ATM Withdrawal",
      merchant: "First National ATM #4521",
      amount: -80.0,
      account: "****3847",
      status: "Posted",
      category: "Cash",
    },
    {
      id: "TXN-2024052901",
      date: "2024-05-29",
      time: "19:22",
      type: "Credit Card Payment",
      merchant: "Online Payment",
      amount: -200.0,
      account: "****3847",
      status: "Posted",
      category: "Payment",
    },
  ],

  // Current service requests/tickets
  activeTickets: [
    {
      ticketId: "REQ-2024-5847",
      customerId: "CUST-789456",
      customerName: "Michael Rodriguez",
      issue: "Request to increase credit limit",
      priority: "Medium",
      status: "In Progress",
      createdDate: "2024-06-03",
      createdTime: "10:30 AM",
      slaDeadline: "2024-06-04 10:30 AM",
      timeRemaining: "23h 36m",
      category: "Credit Services",
      description:
        "Customer requesting credit limit increase from $5,000 to $8,000. Employment verification needed.",
      assignedTo: "Sarah Johnson",
      escalationRequired: true,
      escalateTo: "Credit Department",
      updates: [
        {
          timestamp: "2024-06-03 10:35 AM",
          action: "Ticket Created",
          note: "Initial request logged",
        },
      ],
    },
  ],

  // My ticket queue
  myTicketQueue: [
    {
      ticketId: "REQ-2024-5847",
      customerId: "CUST-789456",
      customerName: "Michael Rodriguez",
      issue: "Credit limit increase request",
      priority: "Medium",
      status: "In Progress",
      slaDeadline: "2024-06-04 10:30 AM",
      timeRemaining: "23h 36m",
      category: "Credit Services",
    },
    {
      ticketId: "REQ-2024-5846",
      customerId: "CUST-445789",
      customerName: "Jennifer Chen",
      issue: "Dispute unauthorized charge",
      priority: "High",
      status: "New",
      slaDeadline: "2024-06-03 16:00 PM",
      timeRemaining: "5h 6m",
      category: "Fraud/Disputes",
    },
    {
      ticketId: "REQ-2024-5845",
      customerId: "CUST-223456",
      customerName: "Robert Thompson",
      issue: "Update contact information",
      priority: "Low",
      status: "Pending Approval",
      slaDeadline: "2024-06-05 12:00 PM",
      timeRemaining: "2d 1h 6m",
      category: "Account Updates",
    },
    {
      ticketId: "REQ-2024-5844",
      customerId: "CUST-667890",
      customerName: "Lisa Martinez",
      issue: "Account locked - password reset",
      priority: "High",
      status: "New",
      slaDeadline: "2024-06-03 14:00 PM",
      timeRemaining: "3h 6m",
      category: "Account Access",
    },
  ],

  // Quick actions available to CSR
  quickActions: [
    {
      id: "update-contact",
      title: "Update Contact Info",
      description: "Change phone, email, or address",
      icon: "contact",
      permission: "direct",
      category: "Account Updates",
    },
    {
      id: "account-preferences",
      title: "Account Preferences",
      description: "Update notifications, statements",
      icon: "settings",
      permission: "direct",
      category: "Account Updates",
    },
    {
      id: "temporary-hold",
      title: "Temporary Account Hold",
      description: "Place temporary hold on account",
      icon: "lock",
      permission: "direct",
      category: "Security",
    },
    {
      id: "process-payment",
      title: "Process Payment",
      description: "Process loan or credit card payment",
      icon: "payment",
      permission: "direct",
      category: "Transactions",
    },
    {
      id: "transfer-funds",
      title: "Transfer Funds",
      description: "Transfer between customer accounts",
      icon: "transfer",
      permission: "direct",
      category: "Transactions",
    },
    {
      id: "credit-limit",
      title: "Credit Limit Change",
      description: "Request credit limit adjustment",
      icon: "credit",
      permission: "approval",
      category: "Credit Services",
    },
    {
      id: "account-closure",
      title: "Account Closure",
      description: "Initiate account closure process",
      icon: "close",
      permission: "approval",
      category: "Account Management",
    },
    {
      id: "fraud-report",
      title: "Report Fraud",
      description: "Report suspicious activity",
      icon: "alert",
      permission: "escalation",
      category: "Security",
    },
  ],

  // Escalation departments
  escalationDepartments: [
    {
      id: "credit",
      name: "Credit Department",
      phone: "ext. 2500",
      email: "credit@bank.com",
      availableHours: "8:00 AM - 6:00 PM",
      avgResponseTime: "2 hours",
      specialties: ["Credit limits", "Loan applications", "Credit disputes"],
    },
    {
      id: "fraud",
      name: "Fraud Prevention",
      phone: "ext. 911",
      email: "fraud@bank.com",
      availableHours: "24/7",
      avgResponseTime: "15 minutes",
      specialties: ["Suspicious activity", "Identity theft", "Card disputes"],
    },
    {
      id: "loans",
      name: "Loan Department",
      phone: "ext. 2600",
      email: "loans@bank.com",
      availableHours: "9:00 AM - 5:00 PM",
      avgResponseTime: "4 hours",
      specialties: ["Mortgage", "Personal loans", "Business loans"],
    },
    {
      id: "technical",
      name: "Technical Support",
      phone: "ext. 3000",
      email: "techsupport@bank.com",
      availableHours: "7:00 AM - 11:00 PM",
      avgResponseTime: "30 minutes",
      specialties: ["Online banking", "Mobile app", "System issues"],
    },
  ],

  // FAQ and scripts for common issues
  supportResources: {
    commonIssues: [
      {
        category: "Account Access",
        issues: [
          {
            title: "Forgot Password",
            script:
              "I can help you reset your password. For security, I'll need to verify your identity with your date of birth and the last 4 digits of your SSN.",
            steps: [
              "Verify customer identity",
              "Generate temporary password",
              "Email reset link to registered email",
              "Advise customer to change password on first login",
            ],
          },
          {
            title: "Account Locked",
            script:
              "I see your account has been temporarily locked for security. Let me verify your identity and unlock it for you.",
            steps: [
              "Verify customer identity",
              "Check reason for lock",
              "Remove security hold if appropriate",
              "Advise customer on security best practices",
            ],
          },
        ],
      },
      {
        category: "Transactions",
        issues: [
          {
            title: "Disputed Charge",
            script:
              "I understand you're questioning a charge on your account. Let me pull up your recent transactions and we can review this together.",
            steps: [
              "Locate the disputed transaction",
              "Gather details about the dispute",
              "Determine if merchant contact is needed",
              "Initiate formal dispute if necessary",
              "Provide dispute timeline to customer",
            ],
          },
          {
            title: "Missing Deposit",
            script:
              "Let me check your account for any pending deposits. Sometimes deposits can take 1-2 business days to appear.",
            steps: [
              "Check for pending deposits",
              "Verify deposit method and timing",
              "Check with originating bank if needed",
              "Provide expected posting timeline",
            ],
          },
        ],
      },
    ],
    quickResponses: [
      {
        trigger: "hours",
        response:
          "Our customer service is available Monday-Friday 8:00 AM to 8:00 PM, and Saturday 9:00 AM to 5:00 PM.",
      },
      {
        trigger: "routing",
        response:
          "Your routing number is 123456789. You can also find this on your checks or in online banking.",
      },
      {
        trigger: "fees",
        response:
          "Let me pull up your fee schedule. I can also email you a complete list of current fees and charges.",
      },
    ],
  },

  // Performance metrics for the CSR
  performanceMetrics: {
    today: {
      callsHandled: 23,
      avgCallTime: "4:32",
      resolutionRate: 87,
      customerSatisfaction: 4.6,
      ticketsResolved: 8,
      escalationRate: 12,
    },
    thisWeek: {
      callsHandled: 127,
      avgCallTime: "4:45",
      resolutionRate: 89,
      customerSatisfaction: 4.5,
      ticketsResolved: 45,
      escalationRate: 15,
    },
    thisMonth: {
      callsHandled: 534,
      avgCallTime: "4:38",
      resolutionRate: 91,
      customerSatisfaction: 4.7,
      ticketsResolved: 198,
      escalationRate: 13,
    },
  },
};

// Customer search results (when CSR searches for customers)
export const customerSearchResults = [
  {
    customerId: "CUST-789456",
    name: "Michael Rodriguez",
    accountNumber: "****3847",
    phone: "(555) 234-5678",
    status: "Active",
    lastContact: "2024-06-01",
    riskLevel: "Low",
  },
  {
    customerId: "CUST-445789",
    name: "Jennifer Chen",
    accountNumber: "****7291",
    phone: "(555) 345-6789",
    status: "Active",
    lastContact: "2024-05-28",
    riskLevel: "Low",
  },
  {
    customerId: "CUST-223456",
    name: "Robert Thompson",
    accountNumber: "****9156",
    phone: "(555) 456-7890",
    status: "Active",
    lastContact: "2024-05-25",
    riskLevel: "Medium",
  },
];

const CSR = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(
    csrDashboardData.activeCustomer
  );
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = customerSearchResults.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.phone.includes(query) ||
          customer.accountNumber.includes(query)
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectCustomer = () => {
    setSelectedCustomer(csrDashboardData.activeCustomer);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // NEW HANDLER FUNCTIONS FOR ADDED FEATURES








  return (
    <div className="container mx-auto p-12">
      <div className="csr-dashboard">
        <div className="mb-6 md:mb-8 lg:mb-10">
          {/* Dashboard header */}
          <div className="bg-white bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
                      CSR{" "}
                      <span className="text-[#6160DC] dark:text-[#8B7EFF]">
                        Dashboard
                      </span>
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Welcome back, {csrDashboardData.csrInfo.name} -{" "}
                      {csrDashboardData.csrInfo.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar - MOVED TO CORRECT POSITION */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search customers by name, phone..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white w-80"
                  />
                  {/* Search Results Dropdown */}
                  {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map((customer) => (
                          <div
                            key={customer.customerId}
                            onClick={() => selectCustomer(customer)}
                            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer "
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-black dark:text-white">
                                  {customer.name}
                                </div>
                                <div className="text-sm text-black dark:text-white">
                                  {customer.phone} • Account:{" "}
                                  {customer.accountNumber}
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    customer.riskLevel === "Low"
                                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                                      : customer.riskLevel === "Medium"
                                      ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                                      : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
                                  }`}
                                >
                                  {customer.riskLevel} Risk
                                </div>
                                <div className="text-xs text-black dark:text-white mt-1">
                                  Last contact: {customer.lastContact}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 dark:text-gray-400">
                          No customers found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pt-5">
            <div className="p-4 md:p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Calls Today
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {csrDashboardData.csrInfo.todayStats.callsHandled}
                  </p>
                </div>
                <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Resolution
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {csrDashboardData.csrInfo.todayStats.resolutionRate}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Satisfaction
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {csrDashboardData.csrInfo.todayStats.customerSatisfaction}
                  </p>
                </div>
                <Smile className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          {/* This is crucial - it renders the child route components */}
        </div>
        
        <Outlet />
                <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 mt-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Performance Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["today", "thisWeek", "thisMonth"].map((period) => (
                      <div
                        key={period}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-black dark:text-white mb-3 capitalize">
                          {period === "thisWeek"
                            ? "This Week"
                            : period === "thisMonth"
                            ? "This Month"
                            : "Today"}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Calls Handled:
                            </span>
                            <span className="font-medium text-black dark:text-white">
                              {csrDashboardData.performanceMetrics[period].callsHandled}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Avg Call Time:
                            </span>
                            <span className="font-medium text-black dark:text-white">
                              {csrDashboardData.performanceMetrics[period].avgCallTime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Resolution Rate:
                            </span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {
                                csrDashboardData.performanceMetrics[period]
                                  .resolutionRate
                              }
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Satisfaction:
                            </span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {
                                csrDashboardData.performanceMetrics[period]
                                  .customerSatisfaction
                              }
                              /5.0
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Tickets Resolved:
                            </span>
                            <span className="font-medium text-black dark:text-white">
                              {
                                csrDashboardData.performanceMetrics[period]
                                  .ticketsResolved
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white">
                              Escalation Rate:
                            </span>
                            <span className="font-medium text-orange-600 dark:text-orange-400">
                              {
                                csrDashboardData.performanceMetrics[period]
                                  .escalationRate
                              }
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      </div>
    </div>
  );
};

export default CSR;


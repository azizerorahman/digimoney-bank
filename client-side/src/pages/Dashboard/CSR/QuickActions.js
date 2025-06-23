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
      customerSatisfaction: 4.6
    }
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
      language: "English"
    },
    contactInfo: {
      phone: "(555) 234-5678",
      email: "m.rodriguez@email.com",
      address: {
        street: "1234 Oak Street",
        city: "Springfield",
        state: "IL",
        zip: "62701"
      },
      emergencyContact: {
        name: "Maria Rodriguez",
        relationship: "Spouse",
        phone: "(555) 234-5679"
      }
    },
    accountSummary: {
      accounts: [
        {
          type: "Checking",
          accountNumber: "****3847",
          balance: 2847.32,
          status: "Active",
          lastActivity: "2024-06-02"
        },
        {
          type: "Savings",
          accountNumber: "****7291",
          balance: 15420.88,
          status: "Active",
          lastActivity: "2024-05-28"
        },
        {
          type: "Credit Card",
          accountNumber: "****9156",
          balance: -1247.65,
          creditLimit: 5000,
          status: "Active",
          paymentDue: "2024-06-15"
        }
      ],
      totalRelationship: 17020.55,
      creditScore: "Good (720-750)", // Range for privacy
      riskLevel: "Low"
    },
    alerts: [
      {
        type: "info",
        message: "Customer called 3 times this month",
        priority: "Medium",
        date: "2024-06-03"
      },
      {
        type: "warning", 
        message: "Credit card payment due in 12 days",
        priority: "Low",
        date: "2024-06-03"
      },
      {
        type: "overdraft",
        message: "Account overdraft: -$150.00 (Fee: $35.00)",
        priority: "High", 
        date: "2024-06-03",
        amount: -150,
        fee: 35
      },
      {
        type: "hold",
        message: "Temporary hold: $500.00 - Check verification pending",
        priority: "Medium",
        date: "2024-06-03",
        amount: 500,
        reason: "Check verification"
      },
      {
        type: "suspicious",
        message: "Suspicious activity: ATM withdrawal $800 - unusual location",
        priority: "High",
        date: "2024-06-03",
        transaction: "ATM withdrawal $800 - unusual location"
      }
    ]
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
      category: "Groceries"
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
      category: "Income"
    },
    {
      id: "TXN-2024053101",
      date: "2024-05-31",
      time: "16:45",
      type: "Online Transfer",
      merchant: "Transfer to Savings",
      amount: -500.00,
      account: "****3847",
      status: "Posted",
      category: "Transfer"
    },
    {
      id: "TXN-2024053001",
      date: "2024-05-30",
      time: "12:30",
      type: "ATM Withdrawal",
      merchant: "First National ATM #4521",
      amount: -80.00,
      account: "****3847",
      status: "Posted",
      category: "Cash"
    },
    {
      id: "TXN-2024052901",
      date: "2024-05-29",
      time: "19:22",
      type: "Credit Card Payment",
      merchant: "Online Payment",
      amount: -200.00,
      account: "****3847",
      status: "Posted",
      category: "Payment"
    }
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
      description: "Customer requesting credit limit increase from $5,000 to $8,000. Employment verification needed.",
      assignedTo: "Sarah Johnson",
      escalationRequired: true,
      escalateTo: "Credit Department",
      updates: [
        {
          timestamp: "2024-06-03 10:35 AM",
          action: "Ticket Created",
          note: "Initial request logged"
        }
      ]
    }
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
      category: "Credit Services"
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
      category: "Fraud/Disputes"
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
      category: "Account Updates"
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
      category: "Account Access"
    }
  ],

  // Quick actions available to CSR
  quickActions: [
    {
      id: "update-contact",
      title: "Update Contact Info",
      description: "Change phone, email, or address",
      icon: "contact",
      permission: "direct",
      category: "Account Updates"
    },
    {
      id: "account-preferences",
      title: "Account Preferences",
      description: "Update notifications, statements",
      icon: "settings",
      permission: "direct",
      category: "Account Updates"
    },
    {
      id: "temporary-hold",
      title: "Temporary Account Hold",
      description: "Place temporary hold on account",
      icon: "lock",
      permission: "direct",
      category: "Security"
    },
    {
      id: "process-payment",
      title: "Process Payment",
      description: "Process loan or credit card payment",
      icon: "payment",
      permission: "direct",
      category: "Transactions"
    },
    {
      id: "transfer-funds",
      title: "Transfer Funds",
      description: "Transfer between customer accounts",
      icon: "transfer",
      permission: "direct",
      category: "Transactions"
    },
    {
      id: "credit-limit",
      title: "Credit Limit Change",
      description: "Request credit limit adjustment",
      icon: "credit",
      permission: "approval",
      category: "Credit Services"
    },
    {
      id: "account-closure",
      title: "Account Closure",
      description: "Initiate account closure process",
      icon: "close",
      permission: "approval",
      category: "Account Management"
    },
    {
      id: "fraud-report",
      title: "Report Fraud",
      description: "Report suspicious activity",
      icon: "alert",
      permission: "escalation",
      category: "Security"
    }
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
      specialties: ["Credit limits", "Loan applications", "Credit disputes"]
    },
    {
      id: "fraud",
      name: "Fraud Prevention",
      phone: "ext. 911",
      email: "fraud@bank.com",
      availableHours: "24/7",
      avgResponseTime: "15 minutes",
      specialties: ["Suspicious activity", "Identity theft", "Card disputes"]
    },
    {
      id: "loans",
      name: "Loan Department",
      phone: "ext. 2600",
      email: "loans@bank.com",
      availableHours: "9:00 AM - 5:00 PM",
      avgResponseTime: "4 hours",
      specialties: ["Mortgage", "Personal loans", "Business loans"]
    },
    {
      id: "technical",
      name: "Technical Support",
      phone: "ext. 3000",
      email: "techsupport@bank.com",
      availableHours: "7:00 AM - 11:00 PM",
      avgResponseTime: "30 minutes",
      specialties: ["Online banking", "Mobile app", "System issues"]
    }
  ],

  // FAQ and scripts for common issues
  supportResources: {
    commonIssues: [
      {
        category: "Account Access",
        issues: [
          {
            title: "Forgot Password",
            script: "I can help you reset your password. For security, I'll need to verify your identity with your date of birth and the last 4 digits of your SSN.",
            steps: [
              "Verify customer identity",
              "Generate temporary password",
              "Email reset link to registered email",
              "Advise customer to change password on first login"
            ]
          },
          {
            title: "Account Locked",
            script: "I see your account has been temporarily locked for security. Let me verify your identity and unlock it for you.",
            steps: [
              "Verify customer identity",
              "Check reason for lock",
              "Remove security hold if appropriate",
              "Advise customer on security best practices"
            ]
          }
        ]
      },
      {
        category: "Transactions",
        issues: [
          {
            title: "Disputed Charge",
            script: "I understand you're questioning a charge on your account. Let me pull up your recent transactions and we can review this together.",
            steps: [
              "Locate the disputed transaction",
              "Gather details about the dispute",
              "Determine if merchant contact is needed",
              "Initiate formal dispute if necessary",
              "Provide dispute timeline to customer"
            ]
          },
          {
            title: "Missing Deposit",
            script: "Let me check your account for any pending deposits. Sometimes deposits can take 1-2 business days to appear.",
            steps: [
              "Check for pending deposits",
              "Verify deposit method and timing",
              "Check with originating bank if needed",
              "Provide expected posting timeline"
            ]
          }
        ]
      }
    ],
    quickResponses: [
      {
        trigger: "hours",
        response: "Our customer service is available Monday-Friday 8:00 AM to 8:00 PM, and Saturday 9:00 AM to 5:00 PM."
      },
      {
        trigger: "routing",
        response: "Your routing number is 123456789. You can also find this on your checks or in online banking."
      },
      {
        trigger: "fees",
        response: "Let me pull up your fee schedule. I can also email you a complete list of current fees and charges."
      }
    ]
  },

  // Performance metrics for the CSR
  performanceMetrics: {
    today: {
      callsHandled: 23,
      avgCallTime: "4:32",
      resolutionRate: 87,
      customerSatisfaction: 4.6,
      ticketsResolved: 8,
      escalationRate: 12
    },
    thisWeek: {
      callsHandled: 127,
      avgCallTime: "4:45",
      resolutionRate: 89,
      customerSatisfaction: 4.5,
      ticketsResolved: 45,
      escalationRate: 15
    },
    thisMonth: {
      callsHandled: 534,
      avgCallTime: "4:38",
      resolutionRate: 91,
      customerSatisfaction: 4.7,
      ticketsResolved: 198,
      escalationRate: 13
    }
  }
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
    riskLevel: "Low"
  },
  {
    customerId: "CUST-445789",
    name: "Jennifer Chen",
    accountNumber: "****7291",
    phone: "(555) 345-6789",
    status: "Active",
    lastContact: "2024-05-28",
    riskLevel: "Low"
  },
  {
    customerId: "CUST-223456",
    name: "Robert Thompson",
    accountNumber: "****9156",
    phone: "(555) 456-7890",
    status: "Active",
    lastContact: "2024-05-25",
    riskLevel: "Medium"
  }
];

const QuickActions = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Tab Content */}
            {/* Quick Actions Tab */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {csrDashboardData.quickActions.map((action) => (
                    <div key={action.id} className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-black dark:text-white mb-1">{action.title}</h4>
                          <p className="text-sm text-black dark:text-white">{action.description}</p>
                        </div>
                        <div className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                          action.permission === 'direct' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                          action.permission === 'approval' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                          'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                        }`}>
                          {action.permission === 'direct' ? 'Direct' :
                           action.permission === 'approval' ? 'Approval' : 'Escalation'}
                        </div>
                      </div>
                      <div className="text-xs text-black dark:text-white mb-3">
                        Category: {action.category}
                      </div>
                      <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600">
                        {action.permission === 'direct' ? 'Execute' :
                         action.permission === 'approval' ? 'Request Approval' : 'Escalate'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Escalation Departments */}
                <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Escalation Departments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {csrDashboardData.escalationDepartments.map((dept) => (
                      <div key={dept.id} className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-black dark:text-white">{dept.name}</h4>
                          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                            Avg: {dept.avgResponseTime}
                          </div>
                        </div>
                        <div className="text-sm text-black dark:text-white space-y-1">
                          <div>📞 {dept.phone}</div>
                          <div>📧 {dept.email}</div>
                          <div>🕐 {dept.availableHours}</div>
                        </div>
                        <div className="mt-3">
                          <div className="text-xs text-black dark:text-white mb-1">Specialties:</div>
                          <div className="flex flex-wrap gap-1">
                            {dept.specialties.map((specialty, index) => (
                              <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="mt-3 w-full bg-orange-600 dark:bg-orange-700 text-white py-1 px-3 rounded text-sm hover:bg-orange-700 dark:hover:bg-orange-600">
                          Contact Department
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Resources */}
                <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Support Resources</h3>
                  
                  {/* Common Issues */}
                  <div className="space-y-4">
                    {csrDashboardData.supportResources.commonIssues.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                        <h4 className="font-medium text-black dark:text-white mb-3">{category.category}</h4>
                        <div className="space-y-3">
                          {category.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="border-l-4 border-blue-400 dark:border-blue-500 pl-4">
                              <div className="font-medium text-sm text-black dark:text-white mb-1">{issue.title}</div>
                              <div className="text-sm text-black dark:text-white mb-2 italic">"{issue.script}"</div>
                              <div className="text-xs text-black dark:text-white">
                                <div className="font-medium mb-1">Steps:</div>
                                <ol className="list-decimal list-inside space-y-1">
                                  {issue.steps.map((step, stepIndex) => (
                                    <li key={stepIndex} className="text-black dark:text-white">{step}</li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Responses */}
                  <div className="mt-6 bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-black dark:text-white mb-3">Quick Responses</h4>
                    <div className="space-y-2">
                      {csrDashboardData.supportResources.quickResponses.map((response, index) => (
                        <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded">
                          <div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">#{response.trigger}</span>
                            <span className="text-sm text-black dark:text-white ml-2">{response.response}</span>
                          </div>
                          <button className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800/30">
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
};
export default QuickActions;
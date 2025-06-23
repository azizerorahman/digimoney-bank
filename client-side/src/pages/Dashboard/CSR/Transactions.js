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

const Transactions = () => {

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
          {/* Tab Content */}
            {/* Transactions Tab */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    View All Transactions
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                            Account
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {csrDashboardData.recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-black dark:text-white">{transaction.date}</div>
                              <div className="text-sm text-black dark:text-white">{transaction.time}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-black dark:text-white">{transaction.type}</div>
                              <div className="text-sm text-black dark:text-white">{transaction.merchant}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                              {transaction.account}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${
                                transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                transaction.status === 'Posted' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                                transaction.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                                'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

    </div>
  );
};
export default Transactions;
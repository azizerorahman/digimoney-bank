import { useState } from 'react';
import { 
  Search, Clock, 
  XCircle, ArrowUp
  } from 'lucide-react';

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

const ServiceRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(csrDashboardData.activeCustomer);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // NEW STATE VARIABLES FOR ADDED FEATURES
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = customerSearchResults.filter(customer => 
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
    setSearchQuery('');
  };

  // NEW HANDLER FUNCTIONS FOR ADDED FEATURES
  const handleCustomerUpdate = (updatedData) => {
    // Update customer information
    setSelectedCustomer(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phone: updatedData.phone || prev.contactInfo.phone,
        email: updatedData.email || prev.contactInfo.email,
        address: {
          ...prev.contactInfo.address,
          street: updatedData.street || prev.contactInfo.address.street,
          city: updatedData.city || prev.contactInfo.address.city,
          state: updatedData.state || prev.contactInfo.address.state,
          zip: updatedData.zip || prev.contactInfo.address.zip
        }
      }
    }));
    setShowUpdateModal(false);
  };

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      ticketId: `REQ-2024-${Date.now()}`,
      customerId: selectedCustomer.basicInfo.customerId,
      customerName: selectedCustomer.basicInfo.name,
      issue: ticketData.issue,
      priority: ticketData.priority,
      status: 'New',
      createdDate: new Date().toISOString().split('T')[0],
      createdTime: new Date().toLocaleTimeString(),
      slaDeadline: ticketData.slaDeadline,
      timeRemaining: '24h 0m',
      category: ticketData.category,
      description: ticketData.description,
      assignedTo: csrDashboardData.csrInfo.name,
      escalationRequired: false,
      updates: [{
        timestamp: new Date().toLocaleString(),
        action: 'Ticket Created',
        note: 'Initial request logged'
      }]
    };
    
    // Add to active tickets and queue
    csrDashboardData.activeTickets.push(newTicket);
    csrDashboardData.myTicketQueue.unshift(newTicket);
    setShowCreateTicket(false);
  };

  const handleTicketUpdate = (ticketId, updates) => {
    // Update ticket in both activeTickets and myTicketQueue
    const updateTicket = (tickets) => 
      tickets.map(ticket => 
        ticket.ticketId === ticketId 
          ? { ...ticket, ...updates, 
              updates: [...ticket.updates, {
                timestamp: new Date().toLocaleString(),
                action: 'Status Updated',
                note: updates.note || 'Ticket updated'
              }]
            }
          : ticket
      );
    
    csrDashboardData.activeTickets = updateTicket(csrDashboardData.activeTickets);
    csrDashboardData.myTicketQueue = updateTicket(csrDashboardData.myTicketQueue);
  };

  const handleAddNote = (ticketId, note) => {
    handleTicketUpdate(ticketId, {
      updates: [...(selectedTicket?.updates || []), {
        timestamp: new Date().toLocaleString(),
        action: 'Note Added',
        note: note
      }]
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-black dark:text-white bg-gray-50 dark:bg-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'In Progress': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Pending Approval': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Resolved': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'Closed': return 'text-black dark:text-white bg-gray-50 dark:bg-gray-800';
      default: return 'text-black dark:text-white bg-gray-50 dark:bg-gray-800';
    }
  };

  // NEW MODAL COMPONENTS
  const CustomerUpdateModal = ({ isOpen, onClose, customer, onUpdate }) => {
    const [formData, setFormData] = useState({
      phone: customer?.contactInfo?.phone || '',
      email: customer?.contactInfo?.email || '',
      street: customer?.contactInfo?.address?.street || '',
      city: customer?.contactInfo?.address?.city || '',
      state: customer?.contactInfo?.address?.state || '',
      zip: customer?.contactInfo?.address?.zip || ''
    });

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Update Customer Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">ZIP Code</label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({...formData, zip: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onUpdate(formData)}
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Update Information
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      issue: '',
      category: 'Account Updates',
      priority: 'Medium',
      description: '',
      slaDeadline: ''
    });

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Create Service Request</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Issue Title</label>
              <input
                type="text"
                value={formData.issue}
                onChange={(e) => setFormData({...formData, issue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Brief description of the issue"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="Account Updates">Account Updates</option>
                  <option value="Credit Services">Credit Services</option>
                  <option value="Fraud/Disputes">Fraud/Disputes</option>
                  <option value="Account Access">Account Access</option>
                  <option value="Transactions">Transactions</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Detailed description of the request"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">SLA Deadline</label>
              <input
                type="datetime-local"
                value={formData.slaDeadline}
                onChange={(e) => setFormData({...formData, slaDeadline: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onSubmit(formData)}
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Create Request
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TicketDetailsModal = ({ isOpen, onClose, ticket, onUpdate, onAddNote }) => {
    const [note, setNote] = useState('');
    const [status, setStatus] = useState(ticket?.status || 'New');

    if (!isOpen || !ticket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Ticket Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-black dark:text-white">Ticket ID:</span>
                <div className="font-medium text-black dark:text-white">{ticket.ticketId}</div>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">Customer:</span>
                <div className="font-medium text-black dark:text-white">{ticket.customerName}</div>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">Priority:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">Status:</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="ml-2 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-black dark:text-white">Issue:</span>
              <div className="font-medium text-black dark:text-white">{ticket.issue}</div>
            </div>
            
            <div>
              <span className="text-sm text-black dark:text-white">Description:</span>
              <div className="text-black dark:text-white mt-1">{ticket.description}</div>
            </div>
            
            {/* Ticket History */}
            <div>
              <span className="text-sm font-medium text-black dark:text-white">Ticket History:</span>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {ticket.updates?.map((update, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-black dark:text-white">{update.action}</span>
                      <span className="text-xs text-black dark:text-white">{update.timestamp}</span>
                    </div>
                    <div className="text-sm text-black dark:text-white mt-1">{update.note}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Add Note */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">Add Note:</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Add internal note or customer communication..."
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                onUpdate(ticket.ticketId, { status, note });
                if (note) onAddNote(ticket.ticketId, note);
                onClose();
              }}
              className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Update Ticket
            </button>
            <button
              onClick={() => {
                if (note) {
                  onAddNote(ticket.ticketId, note);
                  setNote('');
                }
              }}
              className="bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
            >
              Add Note
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black dark:text-white">CSR Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-black dark:text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{csrDashboardData.csrInfo.status}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-medium text-black dark:text-white">
                  {csrDashboardData.csrInfo.name}
                </div>
                <div className="text-xs text-black dark:text-white">
                  {csrDashboardData.csrInfo.id} • {csrDashboardData.csrInfo.shift}
                </div>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    {csrDashboardData.csrInfo.todayStats.callsHandled}
                  </div>
                  <div className="text-black dark:text-white">Calls Today</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {csrDashboardData.csrInfo.todayStats.resolutionRate}%
                  </div>
                  <div className="text-black dark:text-white">Resolution</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600 dark:text-purple-400">
                    {csrDashboardData.csrInfo.todayStats.customerSatisfaction}
                  </div>
                  <div className="text-black dark:text-white">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search customers by name, phone, or account number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black dark:text-white bg-white dark:bg-gray-700"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-10">
                {searchResults.length > 0 ? (
                  searchResults.map((customer) => (
                    <div
                      key={customer.customerId}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                      onClick={() => selectCustomer(customer)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-black dark:text-white">{customer.name}</div>
                          <div className="text-sm text-black dark:text-white">
                            {customer.phone} • Account: {customer.accountNumber}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            customer.riskLevel === 'Low' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                            customer.riskLevel === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                            'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                          }`}>
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
                  <div className="p-3 text-black dark:text-white text-center">No customers found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          {/* Tab Content */}
          <div className="p-6">
            {/* Service Requests Tab */}
              <div className="space-y-6">
                {/* Active Ticket for Current Customer */}
                {csrDashboardData.activeTickets.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-black dark:text-white">Active Request - Current Customer</h3>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-black dark:text-white">
                          SLA: {csrDashboardData.activeTickets[0].timeRemaining} remaining
                        </span>
                      </div>
                    </div>
                    
                    {csrDashboardData.activeTickets.map((ticket) => (
                      <div key={ticket.ticketId} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium text-black dark:text-white">{ticket.issue}</div>
                            <div className="text-sm text-black dark:text-white">Ticket #{ticket.ticketId}</div>
                          </div>
                          <div className="flex space-x-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority} Priority
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-black dark:text-white mb-3">{ticket.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-black dark:text-white">Created:</span> <span className="text-black dark:text-white">{ticket.createdDate} at {ticket.createdTime}</span>
                          </div>
                          <div>
                            <span className="text-black dark:text-white">Category:</span> <span className="text-black dark:text-white">{ticket.category}</span>
                          </div>
                        </div>
                        
                        {ticket.escalationRequired && (
                          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <ArrowUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                              <span className="text-sm font-medium text-black dark:text-white">
                                Escalation Required: {ticket.escalateTo}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 flex space-x-3">
                          <button 
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketDetails(true);
                            }}
                            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                          >
                            Update Request
                          </button>
                          <button className="bg-orange-600 dark:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 dark:hover:bg-orange-600">
                            Escalate Now
                          </button>
                          <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600">
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* My Ticket Queue */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white">My Ticket Queue</h3>
                    <div className="text-sm text-black dark:text-white">
                      {csrDashboardData.myTicketQueue.length} tickets assigned
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {csrDashboardData.myTicketQueue.map((ticket) => (
                      <div key={ticket.ticketId} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="font-medium text-black dark:text-white">{ticket.issue}</div>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                              </span>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                              </span>
                            </div>
                            <div className="text-sm text-black dark:text-white mb-2">
                              <span className="font-medium">{ticket.customerName}</span> • {ticket.customerId}
                            </div>
                            <div className="text-sm text-black dark:text-white">
                              Category: {ticket.category}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              ticket.timeRemaining.includes('h') && !ticket.timeRemaining.includes('d') ? 'text-orange-600 dark:text-orange-400' :
                              ticket.timeRemaining.includes('m') && !ticket.timeRemaining.includes('h') ? 'text-red-600 dark:text-red-400' :
                              'text-green-600 dark:text-green-400'
                            }`}>
                              {ticket.timeRemaining}
                            </div>
                            <div className="text-xs text-black dark:text-white">remaining</div>
                            <button 
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setShowTicketDetails(true);
                              }}
                              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                            >
                              Open Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['today', 'thisWeek', 'thisMonth'].map((period) => (
              <div key={period} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-black dark:text-white mb-3 capitalize">
                  {period === 'thisWeek' ? 'This Week' : period === 'thisMonth' ? 'This Month' : 'Today'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Calls Handled:</span>
                    <span className="font-medium text-black dark:text-white">{csrDashboardData.performanceMetrics[period].callsHandled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Avg Call Time:</span>
                    <span className="font-medium text-black dark:text-white">{csrDashboardData.performanceMetrics[period].avgCallTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Resolution Rate:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{csrDashboardData.performanceMetrics[period].resolutionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Satisfaction:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{csrDashboardData.performanceMetrics[period].customerSatisfaction}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Tickets Resolved:</span>
                    <span className="font-medium text-black dark:text-white">{csrDashboardData.performanceMetrics[period].ticketsResolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black dark:text-white">Escalation Rate:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">{csrDashboardData.performanceMetrics[period].escalationRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW MODALS */}
      <CustomerUpdateModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        customer={selectedCustomer}
        onUpdate={handleCustomerUpdate}
      />

      <CreateTicketModal
        isOpen={showCreateTicket}
        onClose={() => setShowCreateTicket(false)}
        customer={selectedCustomer}
        onSubmit={handleCreateTicket}
      />

      <TicketDetailsModal
        isOpen={showTicketDetails}
        onClose={() => setShowTicketDetails(false)}
        ticket={selectedTicket}
        onUpdate={handleTicketUpdate}
        onAddNote={handleAddNote}
      />
    </div>
  );
};
export default ServiceRequests;
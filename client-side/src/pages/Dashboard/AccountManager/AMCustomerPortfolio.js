import { useState } from "react";
import {
  Search,
  User,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  FileText,
  XCircle,
  Target,
  MessageSquare,
  Plus,
  ArrowRight,
  MapPin,
  Zap,
  ArrowUpDown,
} from "lucide-react";

const AMCustomerPortfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isQuickActionsCollapsed, setIsQuickActionsCollapsed] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  const [newCustomerData, setNewCustomerData] = useState({
    // Basic Information
    name: "",
    type: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Business Information (if applicable)
    businessName: "",
    industry: "",
    taxId: "",

    // Financial Information
    estimatedNetWorth: "",
    annualIncome: "",
    riskProfile: "",
    investmentGoals: "",

    // Contact Preferences
    preferredContact: "",
    relationshipManager: "",
  });

  // Mock data for Account Manager Dashboard
  const accountManagerData = {
    managerInfo: {
      name: "Alexandra Chen",
      id: "AM-2024-AC",
      title: "Senior Account Manager",
      department: "Private Banking",
      territory: "West Coast Enterprise",
      status: "Available",
      todayStats: {
        scheduledMeetings: 4,
        portfolioValue: "$12.8M",
        newLeads: 3,
        revenueGenerated: "$45K",
      },
      performance: {
        thisMonth: {
          portfolioGrowth: 8.5,
          customerSatisfaction: 4.8,
          revenueTarget: 78,
          newAccounts: 6,
        },
        thisQuarter: {
          portfolioGrowth: 15.2,
          customerSatisfaction: 4.7,
          revenueTarget: 85,
          newAccounts: 18,
        },
      },
    },

    customerPortfolio: [
      {
        customerId: "CUST-ENT-001",
        name: "TechCorp Industries",
        type: "Corporate",
        relationship: "Primary",
        since: "2019-03-15",
        riskProfile: "Conservative",
        totalValue: 2850000,
        monthlyRevenue: 8500,
        accounts: [
          {
            type: "Business Checking",
            balance: 485000,
            accountNumber: "****7891",
            status: "Active",
          },
          {
            type: "Investment Portfolio",
            balance: 1850000,
            accountNumber: "****2345",
            status: "Active",
            performance: 12.5,
          },
          {
            type: "Commercial Loan",
            balance: -515000,
            accountNumber: "****6789",
            status: "Current",
            rate: 4.25,
          },
        ],
        contacts: [
          {
            name: "James Wilson",
            title: "CFO",
            phone: "(555) 234-5678",
            email: "j.wilson@techcorp.com",
            primary: true,
          },
          {
            name: "Sarah Davis",
            title: "Treasurer",
            phone: "(555) 234-5679",
            email: "s.davis@techcorp.com",
            primary: false,
          },
        ],
        lastInteraction: {
          date: "2024-06-02",
          type: "Video Call",
          subject: "Q2 Investment Review",
          outcome: "Positive",
        },
        alerts: [
          {
            type: "opportunity",
            message: "Eligible for premium investment products",
            priority: "Medium",
          },
        ],
        investmentAllocation: {
          stocks: 45,
          bonds: 30,
          realEstate: 15,
          alternatives: 10,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Wire transfer received - $250,000",
            date: "2024-06-03",
            time: "14:23",
          },
          {
            type: "Communication",
            description: "Portfolio review email sent",
            date: "2024-06-02",
            time: "09:15",
          },
          {
            type: "Meeting",
            description: "Quarterly review meeting scheduled",
            date: "2024-06-01",
            time: "10:00",
          },
        ],
      },
      {
        customerId: "CUST-HNW-002",
        name: "Robert & Maria Martinez",
        type: "High Net Worth",
        relationship: "Joint",
        since: "2020-11-08",
        riskProfile: "Moderate",
        totalValue: 1650000,
        monthlyRevenue: 4200,
        accounts: [
          {
            type: "Private Banking",
            balance: 325000,
            accountNumber: "****4567",
            status: "Active",
          },
          {
            type: "Investment Portfolio",
            balance: 1125000,
            accountNumber: "****8901",
            status: "Active",
            performance: 9.8,
          },
          {
            type: "Mortgage",
            balance: -200000,
            accountNumber: "****2345",
            status: "Current",
            rate: 3.75,
          },
        ],
        contacts: [
          {
            name: "Robert Martinez",
            title: "Primary Account Holder",
            phone: "(555) 345-6789",
            email: "r.martinez@email.com",
            primary: true,
          },
          {
            name: "Maria Martinez",
            title: "Joint Account Holder",
            phone: "(555) 345-6790",
            email: "m.martinez@email.com",
            primary: true,
          },
        ],
        lastInteraction: {
          date: "2024-05-28",
          type: "In-Person Meeting",
          subject: "Estate Planning Discussion",
          outcome: "Follow-up Required",
        },
        alerts: [
          {
            type: "action",
            message: "Estate planning documents pending review",
            priority: "High",
          },
        ],
        investmentAllocation: {
          stocks: 55,
          bonds: 25,
          realEstate: 12,
          alternatives: 8,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Municipal bond purchase - $85,000",
            date: "2024-06-03",
            time: "11:45",
          },
          {
            type: "Communication",
            description: "Estate planning consultation call",
            date: "2024-05-28",
            time: "15:30",
          },
          {
            type: "Meeting",
            description: "Estate planning meeting completed",
            date: "2024-05-28",
            time: "14:00",
          },
        ],
      },
      {
        customerId: "CUST-SMB-003",
        name: "Green Valley Restaurant Group",
        type: "Small Business",
        relationship: "Primary",
        since: "2021-07-22",
        riskProfile: "Moderate Aggressive",
        totalValue: 890000,
        monthlyRevenue: 2800,
        accounts: [
          {
            type: "Business Checking",
            balance: 125000,
            accountNumber: "****5678",
            status: "Active",
          },
          {
            type: "Business Savings",
            balance: 285000,
            accountNumber: "****9012",
            status: "Active",
          },
          {
            type: "Equipment Loan",
            balance: -480000,
            accountNumber: "****3456",
            status: "Current",
            rate: 5.5,
          },
        ],
        contacts: [
          {
            name: "Michael Green",
            title: "Owner/CEO",
            phone: "(555) 456-7890",
            email: "m.green@greenvalley.com",
            primary: true,
          },
        ],
        lastInteraction: {
          date: "2024-06-01",
          type: "Phone Call",
          subject: "Expansion Financing Options",
          outcome: "Proposal Sent",
        },
        alerts: [
          {
            type: "opportunity",
            message: "Expansion loan pre-approved",
            priority: "High",
          },
        ],
        investmentAllocation: {
          stocks: 35,
          bonds: 40,
          realEstate: 20,
          alternatives: 5,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Equipment financing disbursement - $45,000",
            date: "2024-06-02",
            time: "16:30",
          },
          {
            type: "Communication",
            description: "Expansion financing discussion",
            date: "2024-06-01",
            time: "14:00",
          },
          {
            type: "Meeting",
            description: "Business expansion planning session",
            date: "2024-05-30",
            time: "11:30",
          },
        ],
      },
    ],

    investmentPerformance: {
      portfolioSummary: {
        totalAUM: 12800000,
        ytdReturn: 8.7,
        monthlyReturn: 1.2,
        weeklyReturn: 0.3,
        benchmark: 7.2,
      },
      assetAllocation: {
        stocks: 48,
        bonds: 28,
        realEstate: 15,
        alternatives: 9,
      },
      topPerformers: [
        { name: "Tech Growth Fund", return: 15.8, allocation: 12 },
        { name: "Real Estate REIT", return: 11.2, allocation: 8 },
        { name: "International Equity", return: 9.5, allocation: 15 },
      ],
      riskMetrics: {
        portfolioRisk: "Moderate",
        sharpeRatio: 1.45,
        maxDrawdown: -8.2,
        volatility: 12.8,
      },
    },

    recentTransactions: [
      {
        id: "TXN-2024060301",
        customerId: "CUST-ENT-001",
        customerName: "TechCorp Industries",
        type: "Wire Transfer",
        amount: 250000,
        date: "2024-06-03",
        time: "14:23",
        status: "Completed",
        description: "Quarterly dividend payment",
        flagged: false,
      },
      {
        id: "TXN-2024060302",
        customerId: "CUST-HNW-002",
        customerName: "Robert & Maria Martinez",
        type: "Investment Purchase",
        amount: -85000,
        date: "2024-06-03",
        time: "11:45",
        status: "Completed",
        description: "Municipal bond purchase",
        flagged: false,
      },
      {
        id: "TXN-2024060303",
        customerId: "CUST-SMB-003",
        customerName: "Green Valley Restaurant Group",
        type: "ACH Transfer",
        amount: 45000,
        date: "2024-06-02",
        time: "16:30",
        status: "Processing",
        description: "Equipment financing disbursement",
        flagged: true,
        flagReason: "Large transaction - verification required",
      },
    ],

    upcomingMeetings: [
      {
        id: "MEET-001",
        customerId: "CUST-ENT-001",
        customerName: "TechCorp Industries",
        type: "Quarterly Review",
        date: "2024-06-05",
        time: "10:00 AM",
        duration: "90 minutes",
        location: "Conference Room A",
        attendees: ["James Wilson", "Sarah Davis"],
        agenda: [
          "Portfolio Performance",
          "Tax Strategy",
          "New Investment Opportunities",
        ],
        status: "Confirmed",
      },
      {
        id: "MEET-002",
        customerId: "CUST-HNW-002",
        customerName: "Robert & Maria Martinez",
        type: "Estate Planning",
        date: "2024-06-06",
        time: "2:00 PM",
        duration: "60 minutes",
        location: "Client Office",
        attendees: ["Robert Martinez", "Maria Martinez", "Estate Attorney"],
        agenda: ["Trust Structure", "Tax Implications", "Beneficiary Updates"],
        status: "Confirmed",
      },
      {
        id: "MEET-003",
        customerId: "CUST-SMB-003",
        customerName: "Green Valley Restaurant Group",
        type: "Expansion Planning",
        date: "2024-06-07",
        time: "11:30 AM",
        duration: "45 minutes",
        location: "Video Conference",
        attendees: ["Michael Green"],
        agenda: ["Loan Terms", "Cash Flow Projections", "Timeline"],
        status: "Pending Confirmation",
      },
    ],

    communicationHistory: [
      {
        id: "COMM-001",
        customerId: "CUST-ENT-001",
        type: "Email",
        direction: "Outbound",
        subject: "Q2 Portfolio Performance Report",
        date: "2024-06-03",
        time: "09:15 AM",
        status: "Sent",
        priority: "Normal",
      },
      {
        id: "COMM-002",
        customerId: "CUST-HNW-002",
        type: "Phone",
        direction: "Inbound",
        subject: "Estate Planning Questions",
        date: "2024-06-02",
        time: "3:30 PM",
        duration: "25 minutes",
        status: "Completed",
        priority: "High",
      },
      {
        id: "COMM-003",
        customerId: "CUST-SMB-003",
        type: "Video Call",
        direction: "Outbound",
        subject: "Loan Application Follow-up",
        date: "2024-06-01",
        time: "2:00 PM",
        duration: "30 minutes",
        status: "Completed",
        priority: "Normal",
      },
    ],

    revenueMetrics: {
      thisMonth: {
        totalRevenue: 125000,
        target: 160000,
        growth: 8.5,
        breakdown: {
          fees: 75000,
          commissions: 35000,
          interest: 15000,
        },
      },
      byCustomer: [
        { name: "TechCorp Industries", revenue: 45000, percentage: 36 },
        { name: "Robert & Maria Martinez", revenue: 28000, percentage: 22.4 },
        {
          name: "Green Valley Restaurant Group",
          revenue: 18000,
          percentage: 14.4,
        },
        { name: "Others", revenue: 34000, percentage: 27.2 },
      ],
    },

    alerts: [
      {
        id: "ALERT-001",
        type: "opportunity",
        customerId: "CUST-ENT-001",
        customer: "TechCorp Industries",
        message: "Client eligible for private equity investment opportunity",
        priority: "High",
        date: "2024-06-03",
        actionRequired: true,
      },
      {
        id: "ALERT-002",
        type: "compliance",
        customerId: "CUST-HNW-002",
        customer: "Robert & Maria Martinez",
        message: "Annual compliance review due within 30 days",
        priority: "Medium",
        date: "2024-06-02",
        actionRequired: true,
      },
      {
        id: "ALERT-003",
        type: "transaction",
        customerId: "CUST-SMB-003",
        customer: "Green Valley Restaurant Group",
        message: "Unusual transaction pattern detected - review recommended",
        priority: "Medium",
        date: "2024-06-01",
        actionRequired: false,
      },
    ],
  };

  // Helper functions
  const getCustomerTypeColor = (type) => {
    switch (type) {
      case "Corporate":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      case "High Net Worth":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400";
      case "Small Business":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Conservative":
        return "text-green-600 dark:text-green-400";
      case "Moderate":
        return "text-yellow-600 dark:text-yellow-400";
      case "Moderate Aggressive":
        return "text-orange-600 dark:text-orange-400";
      case "Aggressive":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Add this function to handle report generation
  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  // Add this function to handle new customer creation
  const handleNewCustomer = () => {
    setShowNewCustomerModal(true);
  };

  const handleNewCustomerChange = (field, value) => {
    setNewCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewCustomerSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ["name", "type", "email", "phone"];
    const missingFields = requiredFields.filter(
      (field) => !newCustomerData[field]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Generate new customer ID
    const newCustomerId = `CUST-${newCustomerData.type
      .toUpperCase()
      .slice(0, 3)}-${String(Math.floor(Math.random() * 1000)).padStart(
      3,
      "0"
    )}`;

    // Create new customer object
    const newCustomer = {
      customerId: newCustomerId,
      name: newCustomerData.name,
      type: newCustomerData.type,
      email: newCustomerData.email,
      phone: newCustomerData.phone,
      relationship: "Primary",
      since: new Date().toISOString().split("T")[0],
      riskProfile: newCustomerData.riskProfile || "Moderate",
      totalValue: 0,
      monthlyRevenue: 0,
      accounts: [],
      alerts: [],
    };

    // In a real app, this would be an API call
    console.log("New Customer Created:", newCustomer);
    alert(
      `Customer ${newCustomerId} created successfully for ${newCustomer.name}`
    );

    // Reset form and close modal
    setNewCustomerData({
      name: "",
      type: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      businessName: "",
      industry: "",
      taxId: "",
      estimatedNetWorth: "",
      annualIncome: "",
      riskProfile: "",
      investmentGoals: "",
      preferredContact: "",
      relationshipManager: "",
    });
    setShowNewCustomerModal(false);
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = accountManagerData.customerPortfolio.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.customerId.toLowerCase().includes(query.toLowerCase()) ||
          customer.type.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowSearchResults(false);
    setSearchQuery("");
    setShowCustomerDetails(true);
  };

  // Modal Components
  const MeetingModal = ({ isOpen, onClose }) => {
    const [meetingData, setMeetingData] = useState({
      customerId: "",
      type: "",
      date: "",
      time: "",
      duration: "60",
      location: "",
      agenda: "",
      attendees: "",
    });

    const handleInputChange = (field, value) => {
      setMeetingData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Meeting scheduled:", meetingData);
      // Add your meeting creation logic here

      // Reset form
      setMeetingData({
        customerId: "",
        type: "",
        date: "",
        time: "",
        duration: "60",
        location: "",
        agenda: "",
        attendees: "",
      });

      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black dark:text-white">
              Schedule New Meeting
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Meeting Type
                </label>
                <select
                  value={meetingData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  required
                >
                  <option value="">Select Type...</option>
                  <option value="portfolio-review">Portfolio Review</option>
                  <option value="investment-planning">
                    Investment Planning
                  </option>
                  <option value="risk-assessment">Risk Assessment</option>
                  <option value="general-consultation">
                    General Consultation
                  </option>
                  <option value="quarterly-review">Quarterly Review</option>
                  <option value="estate-planning">Estate Planning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Customer
                </label>
                <select
                  value={meetingData.customerId}
                  onChange={(e) =>
                    handleInputChange("customerId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  required
                >
                  <option value="">Select Customer...</option>
                  {accountManagerData.customerPortfolio.map((customer) => (
                    <option
                      key={customer.customerId}
                      value={customer.customerId}
                    >
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={meetingData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={meetingData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Duration
              </label>
              <select
                value={meetingData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Location/Platform
              </label>
              <select
                value={meetingData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                required
              >
                <option value="">Select Location...</option>
                <option value="office-meeting-room">Office Meeting Room</option>
                <option value="client-location">Client Location</option>
                <option value="video-call-teams">Video Call - Teams</option>
                <option value="video-call-zoom">Video Call - Zoom</option>
                <option value="phone-call">Phone Call</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Agenda Items
              </label>
              <textarea
                rows="3"
                value={meetingData.agenda}
                onChange={(e) => handleInputChange("agenda", e.target.value)}
                placeholder="Enter meeting agenda items..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Additional Attendees
              </label>
              <input
                type="text"
                value={meetingData.attendees}
                onChange={(e) => handleInputChange("attendees", e.target.value)}
                placeholder="Enter email addresses separated by commas"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Schedule Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  //Report modal
  const ReportModal = ({ isOpen, onClose }) => {
    const [reportData, setReportData] = useState({
      reportType: "",
      dateRange: "1M",
      customers: [],
      includeTransactions: true,
      includePerformance: true,
    });

    const handleReportSubmit = (e) => {
      e.preventDefault();
      console.log("Generating report:", reportData);
      // Add your report generation logic here
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black dark:text-white">
              Generate Report
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Report Type
              </label>
              <select
                value={reportData.reportType}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    reportType: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                required
              >
                <option value="">Select Report Type...</option>
                <option value="portfolio-summary">Portfolio Summary</option>
                <option value="performance-report">Performance Report</option>
                <option value="transaction-report">Transaction Report</option>
                <option value="revenue-report">Revenue Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Date Range
              </label>
              <select
                value={reportData.dateRange}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    dateRange: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              >
                <option value="1W">Last Week</option>
                <option value="1M">Last Month</option>
                <option value="3M">Last 3 Months</option>
                <option value="1Y">Last Year</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Account Manager Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {accountManagerData.managerInfo.name} -{" "}
                {accountManagerData.managerInfo.title}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers, accounts, transactions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((customer) => (
                      <div
                        key={customer.customerId}
                        onClick={() => selectCustomer(customer)}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-black dark:text-white">
                              {customer.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {customer.customerId}
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getCustomerTypeColor(
                              customer.type
                            )}`}
                          >
                            {customer.type}
                          </span>
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

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Today's Meetings
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {
                      accountManagerData.managerInfo.todayStats
                        .scheduledMeetings
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Portfolio Value
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {accountManagerData.managerInfo.todayStats.portfolioValue}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    New Leads
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {accountManagerData.managerInfo.todayStats.newLeads}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Revenue Generated
                  </p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {accountManagerData.managerInfo.todayStats.revenueGenerated}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Customer Portfolio Tab */}
        <div className="space-y-6">
          {/* Portfolio Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {accountManagerData.customerPortfolio.map((customer) => (
              <div
                key={customer.customerId}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {customer.customerId}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getCustomerTypeColor(
                      customer.type
                    )}`}
                  >
                    {customer.type}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Value:
                    </span>
                    <span className="font-semibold text-black dark:text-white">
                      {formatCurrency(customer.totalValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly Revenue:
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(customer.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Risk Profile:
                    </span>
                    <span
                      className={`font-semibold ${getRiskColor(
                        customer.riskProfile
                      )}`}
                    >
                      {customer.riskProfile}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Accounts:
                    </span>
                    <span className="font-semibold text-black dark:text-white">
                      {customer.accounts.length}
                    </span>
                  </div>
                </div>

                {/* Account Summary */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-black dark:text-white mb-2">
                    Accounts
                  </h4>
                  <div className="space-y-2">
                    {customer.accounts.slice(0, 2).map((account, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {account.type}
                        </span>
                        <span
                          className={`font-medium ${
                            account.balance < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-black dark:text-white"
                          }`}
                        >
                          {formatCurrency(Math.abs(account.balance))}
                        </span>
                      </div>
                    ))}
                    {customer.accounts.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{customer.accounts.length - 2} more accounts
                      </div>
                    )}
                  </div>
                </div>

                {/* Alerts */}
                {customer.alerts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {customer.alerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-xs ${getPriorityColor(
                          alert.priority
                        )}`}
                      >
                        {alert.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
                  <button
                    onClick={() => selectCustomer(customer)}
                    className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    View Details
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {selectedCustomer.name}
              </h2>
              <button
                onClick={() => setShowCustomerDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            {/* Customer Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-white mb-3">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Customer ID:
                      </span>
                      <p className="font-medium text-black dark:text-white">
                        {selectedCustomer.customerId}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Customer Since:
                      </span>
                      <p className="font-medium text-black dark:text-white">
                        {selectedCustomer.since}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Relationship Type:
                      </span>
                      <p className="font-medium text-black dark:text-white">
                        {selectedCustomer.relationship}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Risk Profile:
                      </span>
                      <p
                        className={`font-medium ${getRiskColor(
                          selectedCustomer.riskProfile
                        )}`}
                      >
                        {selectedCustomer.riskProfile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-white mb-3">
                    Portfolio Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Total Value:
                      </span>
                      <span className="font-semibold text-black dark:text-white">
                        {formatCurrency(selectedCustomer.totalValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Monthly Revenue:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(selectedCustomer.monthlyRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accounts Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-black dark:text-white mb-3">
                Account Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                        Account Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                        Account Number
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                        Balance
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedCustomer.accounts.map((account, idx) => (
                      <tr key={idx} className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-2 text-sm text-black dark:text-white">
                          {account.type}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                          {account.accountNumber}
                        </td>
                        <td
                          className={`px-4 py-2 text-sm font-medium ${
                            account.balance < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-black dark:text-white"
                          }`}
                        >
                          {account.balance < 0 ? "-" : ""}
                          {formatCurrency(Math.abs(account.balance))}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              account.status === "Active"
                                ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                                : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                            }`}
                          >
                            {account.status}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-2 text-sm font-medium ${
                            account.performance > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {account.performance > 0 ? "+" : ""}
                          {account.performance}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-6">
              <h3 className="font-semibold text-black dark:text-white mb-3">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {selectedCustomer.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "Transaction"
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : activity.type === "Communication"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-purple-100 dark:bg-purple-900/20"
                      }`}
                    >
                      {activity.type === "Transaction" && (
                        <ArrowUpDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                      {activity.type === "Communication" && (
                        <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                      {activity.type === "Meeting" && (
                        <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black dark:text-white">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.date} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
                <Phone className="h-4 w-4 inline mr-2" />
                Call Customer
              </button>
              <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600">
                <Mail className="h-4 w-4 inline mr-2" />
                Send Email
              </button>
              <button
                onClick={() => setShowMeetingModal(true)}
                className="bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600"
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Schedule Meeting
              </button>

              <button className="bg-gray-600 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600">
                <FileText className="h-4 w-4 inline mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel - Collapsible */}
      <div
        className={`fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isQuickActionsCollapsed ? "w-12 h-12" : "w-64"
        }`}
      >
        {isQuickActionsCollapsed ? (
          // Collapsed state - just the icon
          <button
            onClick={() => setIsQuickActionsCollapsed(false)}
            className="w-full h-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Zap className="h-6 w-6" />
          </button>
        ) : (
          // Expanded state - full panel
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-black dark:text-white">
                Quick Actions
              </h4>
              <button
                onClick={() => setIsQuickActionsCollapsed(true)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowMeetingModal(true)}
                className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Meeting</span>
              </button>
              <button
                onClick={handleGenerateReport}
                className="w-full flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Generate Report</span>
              </button>
              <button
                onClick={handleNewCustomer}
                className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Customer</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <MeetingModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  New Customer
                </h2>
                <button
                  onClick={() => setShowNewCustomerModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleNewCustomerSubmit} className="p-6 space-y-8">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={newCustomerData.name}
                      onChange={(e) =>
                        handleNewCustomerChange("name", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Customer Type *
                    </label>
                    <select
                      value={newCustomerData.type}
                      onChange={(e) =>
                        handleNewCustomerChange("type", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      required
                    >
                      <option value="">Select Type...</option>
                      <option value="High Net Worth">High Net Worth</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Small Business">Small Business</option>
                      <option value="Individual">Individual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newCustomerData.email}
                      onChange={(e) =>
                        handleNewCustomerChange("email", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={newCustomerData.phone}
                      onChange={(e) =>
                        handleNewCustomerChange("phone", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newCustomerData.address}
                      onChange={(e) =>
                        handleNewCustomerChange("address", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newCustomerData.city}
                      onChange={(e) =>
                        handleNewCustomerChange("city", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      State
                    </label>
                    <select
                      value={newCustomerData.state}
                      onChange={(e) =>
                        handleNewCustomerChange("state", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                      <option value="">Select State...</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      Estimated Net Worth
                    </label>
                    <input
                      type="number"
                      value={newCustomerData.estimatedNetWorth}
                      onChange={(e) =>
                        handleNewCustomerChange(
                          "estimatedNetWorth",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      Annual Income
                    </label>
                    <input
                      type="number"
                      value={newCustomerData.annualIncome}
                      onChange={(e) =>
                        handleNewCustomerChange("annualIncome", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      Risk Profile
                    </label>
                    <select
                      value={newCustomerData.riskProfile}
                      onChange={(e) =>
                        handleNewCustomerChange("riskProfile", e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                      <option value="">Select Risk Profile...</option>
                      <option value="Conservative">Conservative</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Moderate Aggressive">
                        Moderate Aggressive
                      </option>
                      <option value="Aggressive">Aggressive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-1">
                      Investment Goals
                    </label>
                    <input
                      type="text"
                      value={newCustomerData.investmentGoals}
                      onChange={(e) =>
                        handleNewCustomerChange(
                          "investmentGoals",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Retirement, Growth, Income"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowNewCustomerModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AMCustomerPortfolio;

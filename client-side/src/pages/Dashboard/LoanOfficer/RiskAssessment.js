import { useState } from 'react';
import { 
  Search, User, FileText, AlertTriangle, 
  CheckCircle, XCircle, Clock, DollarSign, 
  Upload, Download, Eye, 
  ArrowUp, ArrowDown, 
  CreditCard, Building, Home, Car, GraduationCap,
  Flag, MapPin,Briefcase,Users
} from 'lucide-react';

const RiskAssessment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  // Add these two new state variables after your existing useState declarations
const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
const [newApplicationData, setNewApplicationData] = useState({
  // Personal Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  ssn: '',
  maritalStatus: '',
  dependents: '',
  
  // Address Information
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  residenceType: '',
  monthsAtAddress: '',
  
  // Employment Information
  employmentStatus: '',
  employer: '',
  jobTitle: '',
  monthsEmployed: '',
  annualIncome: '',
  additionalIncome: '',
  
  // Loan Information
  loanType: '',
  loanAmount: '',
  loanPurpose: '',
  downPayment: '',
  
  // Financial Information
  monthlyRent: '',
  monthlyDebt: '',
  assets: '',
  bankName: '',
  accountType: '',
  
  // References
  reference1Name: '',
  reference1Phone: '',
  reference1Relationship: '',
  reference2Name: '',
  reference2Phone: '',
  reference2Relationship: ''
});

  // Mock data for Loan Officer Dashboard
  const loanOfficerData = {
    officerInfo: {
      name: "Sarah Martinez",
      id: "LO-2024-SM",
      title: "Senior Loan Officer",
      branch: "Downtown Branch",
      status: "Available",
      todayStats: {
        applicationsReviewed: 12,
        approvalRate: "78%",
        avgProcessingTime: "2.3 days",
        portfolioValue: "$2.4M"
      },
      certifications: ["NMLS Licensed", "FHA Approved", "VA Certified"],
      performance: {
        thisMonth: {
          applications: 45,
          approved: 35,
          rejected: 8,
          pending: 2,
          volume: "$1.8M"
        },
        thisQuarter: {
          applications: 128,
          approved: 98,
          rejected: 24,
          pending: 6,
          volume: "$5.2M"
        }
      }
    },

    loanApplications: [
      {
        id: "APP-2024-001",
        applicantName: "John Smith",
        applicantId: "CUST-789123",
        loanType: "Mortgage",
        amount: 350000,
        purpose: "Home Purchase",
        status: "In Review",
        priority: "High",
        submittedDate: "2024-06-01",
        lastUpdated: "2024-06-03",
        daysInProcess: 3,
        slaDeadline: "2024-06-08",
        creditScore: 742,
        creditTrend: "up",
        riskLevel: "Low",
        employment: {
          status: "Employed",
          income: 85000,
          employer: "Tech Solutions Inc",
          yearsEmployed: 3.5
        },
        financials: {
          downPayment: 70000,
          debtToIncome: 28,
          liquidAssets: 125000,
          monthlyExpenses: 3200
        },
        property: {
          address: "123 Oak Street, Springfield",
          value: 375000,
          type: "Single Family",
          yearBuilt: 2018
        },
        documents: [
          { name: "W-2 Forms", status: "Received", date: "2024-06-01", type: "income" },
          { name: "Pay Stubs", status: "Received", date: "2024-06-01", type: "income" },
          { name: "Bank Statements", status: "Received", date: "2024-06-02", type: "assets" },
          { name: "Property Appraisal", status: "Pending", date: null, type: "property" },
          { name: "Credit Report", status: "Received", date: "2024-06-01", type: "credit" }
        ],
        notes: [
          { date: "2024-06-03", author: "Sarah Martinez", note: "Credit score excellent. Reviewing employment verification." },
          { date: "2024-06-02", author: "System", note: "All income documents received and verified." }
        ],
        flags: [],
        nextAction: "Awaiting property appraisal"
      },
      {
        id: "APP-2024-002",
        applicantName: "Maria Garcia",
        applicantId: "CUST-456789",
        loanType: "Auto Loan",
        amount: 45000,
        purpose: "Vehicle Purchase",
        status: "Pending Approval",
        priority: "Medium",
        submittedDate: "2024-05-28",
        lastUpdated: "2024-06-03",
        daysInProcess: 7,
        slaDeadline: "2024-06-05",
        creditScore: 689,
        creditTrend: "stable",
        riskLevel: "Medium",
        employment: {
          status: "Employed",
          income: 62000,
          employer: "Healthcare Partners",
          yearsEmployed: 5.2
        },
        financials: {
          downPayment: 8000,
          debtToIncome: 35,
          liquidAssets: 15000,
          monthlyExpenses: 2100
        },
        vehicle: {
          make: "Toyota",
          model: "Camry Hybrid",
          year: 2024,
          vin: "1234567890ABCDEFG"
        },
        documents: [
          { name: "Employment Letter", status: "Received", date: "2024-05-28", type: "income" },
          { name: "Bank Statements", status: "Received", date: "2024-05-29", type: "assets" },
          { name: "Vehicle Invoice", status: "Received", date: "2024-05-30", type: "collateral" },
          { name: "Insurance Quote", status: "Received", date: "2024-06-01", type: "insurance" }
        ],
        notes: [
          { date: "2024-06-03", author: "Sarah Martinez", note: "Ready for final approval. All conditions met." },
          { date: "2024-06-01", author: "Sarah Martinez", note: "Insurance requirements verified." }
        ],
        flags: [],
        nextAction: "Final approval pending"
      },
      {
        id: "APP-2024-003",
        applicantName: "David Chen",
        applicantId: "CUST-321654",
        loanType: "Personal Loan",
        amount: 25000,
        purpose: "Debt Consolidation",
        status: "Flagged",
        priority: "High",
        submittedDate: "2024-05-25",
        lastUpdated: "2024-06-02",
        daysInProcess: 10,
        slaDeadline: "2024-06-04",
        creditScore: 598,
        creditTrend: "down",
        riskLevel: "High",
        employment: {
          status: "Self-Employed",
          income: 48000,
          employer: "Freelance Consulting",
          yearsEmployed: 2.0
        },
        financials: {
          downPayment: 0,
          debtToIncome: 52,
          liquidAssets: 3500,
          monthlyExpenses: 2800
        },
        documents: [
          { name: "Tax Returns", status: "Under Review", date: "2024-05-25", type: "income" },
          { name: "Bank Statements", status: "Received", date: "2024-05-26", type: "assets" },
          { name: "Debt Summary", status: "Received", date: "2024-05-27", type: "liabilities" }
        ],
        notes: [
          { date: "2024-06-02", author: "Sarah Martinez", note: "High DTI ratio. Requesting additional income verification." },
          { date: "2024-05-30", author: "Risk Team", note: "Flagged for manual review due to credit score decline." }
        ],
        flags: [
          { type: "Credit", message: "Credit score declined 45 points in last 6 months", severity: "high" },
          { type: "Income", message: "Self-employment income requires additional verification", severity: "medium" }
        ],
        nextAction: "Additional documentation required"
      }
    ],

    creditScoreData: {
      "APP-2024-001": {
        current: 742,
        history: [
          { date: "2024-01", score: 725 },
          { date: "2024-02", score: 728 },
          { date: "2024-03", score: 735 },
          { date: "2024-04", score: 738 },
          { date: "2024-05", score: 742 }
        ],
        factors: [
          { factor: "Payment History", impact: "Positive", score: 95 },
          { factor: "Credit Utilization", impact: "Positive", score: 12 },
          { factor: "Length of History", impact: "Positive", score: 8.5 },
          { factor: "New Credit", impact: "Neutral", score: 2 },
          { factor: "Credit Mix", impact: "Positive", score: 8 }
        ]
      }
    },

    riskAssessment: {
      highRiskApplications: [
        {
          id: "APP-2024-003",
          applicant: "David Chen",
          riskScore: 78,
          factors: ["High DTI", "Credit Decline", "Self-Employment"],
          recommendation: "Additional Review Required"
        },
        {
          id: "APP-2024-015",
          applicant: "Jennifer Wilson",
          riskScore: 72,
          factors: ["Multiple Recent Inquiries", "Job Change"],
          recommendation: "Enhanced Verification"
        }
      ],
      riskDistribution: {
        low: 65,
        medium: 25,
        high: 10
      },
      fraudAlerts: [
        {
          id: "FRAUD-001",
          applicant: "Robert Johnson",
          alert: "Identity verification mismatch",
          severity: "Critical",
          date: "2024-06-03"
        }
      ]
    },

    activeLoanPortfolio: [
      {
        loanId: "LOAN-2023-445",
        borrower: "Michael Brown",
        type: "Mortgage",
        originalAmount: 425000,
        currentBalance: 398500,
        monthlyPayment: 2850,
        interestRate: 4.25,
        termRemaining: "27 years",
        status: "Current",
        nextPaymentDue: "2024-06-15",
        lastPayment: "2024-05-15",
        paymentHistory: "On Time",
        riskRating: "Low"
      },
      {
        loanId: "LOAN-2024-112",
        borrower: "Lisa Anderson",
        type: "Auto Loan",
        originalAmount: 38000,
        currentBalance: 32500,
        monthlyPayment: 645,
        interestRate: 3.75,
        termRemaining: "4.2 years",
        status: "Current",
        nextPaymentDue: "2024-06-10",
        lastPayment: "2024-05-10",
        paymentHistory: "On Time",
        riskRating: "Low"
      },
      {
        loanId: "LOAN-2023-889",
        borrower: "James Wilson",
        type: "Personal Loan",
        originalAmount: 15000,
        currentBalance: 8200,
        monthlyPayment: 425,
        interestRate: 8.50,
        termRemaining: "1.6 years",
        status: "Late",
        nextPaymentDue: "2024-05-25",
        lastPayment: "2024-04-25",
        paymentHistory: "30 Days Late",
        riskRating: "Medium"
      }
    ],

    repaymentSchedules: {
      "LOAN-2023-445": [
        { date: "2024-06-15", principal: 1250, interest: 1600, total: 2850, status: "Upcoming" },
        { date: "2024-07-15", principal: 1255, interest: 1595, total: 2850, status: "Scheduled" },
        { date: "2024-08-15", principal: 1260, interest: 1590, total: 2850, status: "Scheduled" }
      ]
    },

    communicationLog: [
      {
        id: "COMM-001",
        applicantId: "APP-2024-001",
        type: "Email",
        direction: "Outbound",
        subject: "Additional Documentation Required",
        date: "2024-06-03",
        status: "Sent"
      },
      {
        id: "COMM-002",
        applicantId: "APP-2024-002",
        type: "Phone",
        direction: "Inbound",
        subject: "Loan Status Inquiry",
        date: "2024-06-02",
        duration: "8 minutes"
      }
    ]
  };

  // Helper functions
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'pending approval': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'in review': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'rejected': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'flagged': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400';
      case 'current': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'late': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'low': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white';
    }
  };

  const getLoanTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'mortgage': return <Home className="h-4 w-4" />;
      case 'auto loan': return <Car className="h-4 w-4" />;
      case 'personal loan': return <User className="h-4 w-4" />;
      case 'student loan': return <GraduationCap className="h-4 w-4" />;
      case 'business loan': return <Building className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Mock search results
      const results = loanOfficerData.loanApplications.filter(app => 
        app.applicantName.toLowerCase().includes(query.toLowerCase()) ||
        app.id.toLowerCase().includes(query.toLowerCase()) ||
        app.applicantId.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectApplication = (application) => {
    setSelectedApplication(application);
    setShowSearchResults(false);
    setSearchQuery('');
    setShowApplicationDetails(true);
  };

  const handleApproveApplication = (appId) => {
    console.log('Approving application:', appId);
    // Implementation for approval
  };

  const handleRejectApplication = (appId) => {
    console.log('Rejecting application:', appId);
    // Implementation for rejection
  };

  const handleRequestDocuments = (appId) => {
    console.log('Requesting additional documents for:', appId);
    // Implementation for document request
  };

  const handleNewApplication = () => {
    setShowNewApplicationModal(true);
  };
  
  // Add this function to handle form input changes
const handleNewApplicationChange = (field, value) => {
  setNewApplicationData(prev => ({
    ...prev,
    [field]: value
  }));
};

// Add this function to handle form submission
const handleNewApplicationSubmit = (e) => {
  e.preventDefault();
  
  // Basic validation
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'loanType', 'loanAmount'];
  const missingFields = requiredFields.filter(field => !newApplicationData[field]);
  
  if (missingFields.length > 0) {
    alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
    return;
  }
  
  // Generate new application ID
  const newAppId = `APP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  
  // Create new application object
  const newApplication = {
    id: newAppId,
    applicantName: `${newApplicationData.firstName} ${newApplicationData.lastName}`,
    email: newApplicationData.email,
    phone: newApplicationData.phone,
    loanType: newApplicationData.loanType,
    amount: parseInt(newApplicationData.loanAmount),
    status: 'in review',
    riskLevel: 'Medium', // This would be calculated based on the data
    creditScore: 'Pending',
    creditTrend: null,
    submissionDate: new Date().toISOString().split('T')[0],
    daysInProcess: 0,
    slaDeadline: 'Due in 7 days',
    documents: [],
    flags: [],
    notes: [{
      date: new Date().toLocaleString(),
      author: loanOfficerData.officerInfo.name,
      note: 'New application created via loan officer dashboard'
    }]
  };
  
  // Add to applications list (in a real app, this would be an API call)
  console.log('New Application Created:', newApplication);
  alert(`Application ${newAppId} created successfully for ${newApplication.applicantName}`);
  
  // Reset form and close modal
  setNewApplicationData({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', ssn: '', maritalStatus: '', dependents: '',
    streetAddress: '', city: '', state: '', zipCode: '', residenceType: '', monthsAtAddress: '',
    employmentStatus: '', employer: '', jobTitle: '', monthsEmployed: '', annualIncome: '', additionalIncome: '',
    loanType: '', loanAmount: '', loanPurpose: '', downPayment: '',
    monthlyRent: '', monthlyDebt: '', assets: '', bankName: '', accountType: '',
    reference1Name: '', reference1Phone: '', reference1Relationship: '', reference2Name: '', reference2Phone: '', reference2Relationship: ''
  });
  setShowNewApplicationModal(false);
};

const NewApplicationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black dark:text-white">New Loan Application</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleNewApplicationSubmit} className="p-6 space-y-8">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">First Name *</label>
                <input
                  type="text"
                  value={newApplicationData.firstName}
                  onChange={(e) => handleNewApplicationChange('firstName', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={newApplicationData.lastName}
                  onChange={(e) => handleNewApplicationChange('lastName', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">Email *</label>
                <input
                  type="email"
                  value={newApplicationData.email}
                  onChange={(e) => handleNewApplicationChange('email', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={newApplicationData.phone}
                  onChange={(e) => handleNewApplicationChange('phone', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newApplicationData.dateOfBirth}
                  onChange={(e) => handleNewApplicationChange('dateOfBirth', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Social Security Number</label>
                <input
                  type="text"
                  value={newApplicationData.ssn}
                  onChange={(e) => handleNewApplicationChange('ssn', e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Marital Status</label>
                <select
                  value={newApplicationData.maritalStatus}
                  onChange={(e) => handleNewApplicationChange('maritalStatus', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Number of Dependents</label>
                <input
                  type="number"
                  value={newApplicationData.dependents}
                  onChange={(e) => handleNewApplicationChange('dependents', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Street Address</label>
                <input
                  type="text"
                  value={newApplicationData.streetAddress}
                  onChange={(e) => handleNewApplicationChange('streetAddress', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">City</label>
                <input
                  type="text"
                  value={newApplicationData.city}
                  onChange={(e) => handleNewApplicationChange('city', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">State</label>
                <select
                  value={newApplicationData.state}
                  onChange={(e) => handleNewApplicationChange('state', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">Select State...</option>
                  <option value="AL">Alabama</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="WA">Washington</option>
                  <option value="OR">Oregon</option>
                  <option value="AZ">Arizona</option>
                  <option value="NV">Nevada</option>
                  <option value="CO">Colorado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={newApplicationData.zipCode}
                  onChange={(e) => handleNewApplicationChange('zipCode', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Residence Type</label>
                <select
                  value={newApplicationData.residenceType}
                  onChange={(e) => handleNewApplicationChange('residenceType', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Employment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Employment Status</label>
                <select
                  value={newApplicationData.employmentStatus}
                  onChange={(e) => handleNewApplicationChange('employmentStatus', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Employer</label>
                <input
                  type="text"
                  value={newApplicationData.employer}
                  onChange={(e) => handleNewApplicationChange('employer', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Job Title</label>
                <input
                  type="text"
                  value={newApplicationData.jobTitle}
                  onChange={(e) => handleNewApplicationChange('jobTitle', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Months Employed</label>
                <input
                  type="number"
                  value={newApplicationData.monthsEmployed}
                  onChange={(e) => handleNewApplicationChange('monthsEmployed', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Annual Income</label>
                <input
                  type="number"
                  value={newApplicationData.annualIncome}
                  onChange={(e) => handleNewApplicationChange('annualIncome', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Additional Income</label>
                <input
                  type="number"
                  value={newApplicationData.additionalIncome}
                  onChange={(e) => handleNewApplicationChange('additionalIncome', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Loan Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Loan Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">Loan Type *</label>
                <select
                  value={newApplicationData.loanType}
                  onChange={(e) => handleNewApplicationChange('loanType', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                >
                  <option value="">Select Loan Type...</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="auto">Auto Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">Loan Amount *</label>
                <input
                  type="number"
                  value={newApplicationData.loanAmount}
                  onChange={(e) => handleNewApplicationChange('loanAmount', e.target.value)}
                  min="1000"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Loan Purpose</label>
                <select
                  value={newApplicationData.loanPurpose}
                  onChange={(e) => handleNewApplicationChange('loanPurpose', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">Select Purpose...</option>
                  <option value="home-purchase">Home Purchase</option>
                  <option value="refinance">Refinance</option>
                  <option value="vehicle-purchase">Vehicle Purchase</option>
                  <option value="debt-consolidation">Debt Consolidation</option>
                  <option value="home-improvement">Home Improvement</option>
                  <option value="business-expansion">Business Expansion</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Down Payment</label>
                <input
                  type="number"
                  value={newApplicationData.downPayment}
                  onChange={(e) => handleNewApplicationChange('downPayment', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Financial Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Monthly Rent/Mortgage</label>
                <input
                  type="number"
                  value={newApplicationData.monthlyRent}
                  onChange={(e) => handleNewApplicationChange('monthlyRent', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Monthly Debt Payments</label>
                <input
                  type="number"
                  value={newApplicationData.monthlyDebt}
                  onChange={(e) => handleNewApplicationChange('monthlyDebt', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Total Assets</label>
                <input
                  type="number"
                  value={newApplicationData.assets}
                  onChange={(e) => handleNewApplicationChange('assets', e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">Primary Bank</label>
                <input
                  type="text"
                  value={newApplicationData.bankName}
                  onChange={(e) => handleNewApplicationChange('bankName', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* References Section */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-black dark:text-white mb-3">Reference 1</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newApplicationData.reference1Name}
                    onChange={(e) => handleNewApplicationChange('reference1Name', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newApplicationData.reference1Phone}
                    onChange={(e) => handleNewApplicationChange('reference1Phone', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={newApplicationData.reference1Relationship}
                    onChange={(e) => handleNewApplicationChange('reference1Relationship', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-black dark:text-white mb-3">Reference 2</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newApplicationData.reference2Name}
                    onChange={(e) => handleNewApplicationChange('reference2Name', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newApplicationData.reference2Phone}
                    onChange={(e) => handleNewApplicationChange('reference2Phone', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={newApplicationData.reference2Relationship}
                    onChange={(e) => handleNewApplicationChange('reference2Relationship', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Create Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  
  const handleBulkApprove = () => {
    console.log('Bulk approve selected applications...');
    // Implementation for bulk approval
    // You could select multiple applications and approve them at once
    alert('Bulk Approve feature - would approve selected applications');
  };
  
  const handleExportReport = () => {
    console.log('Exporting report...');
    // Implementation for report export
    // You could generate and download a report
    alert('Export Report feature - would generate and download report');
  };

  // Application Details Modal Component
  const ApplicationDetailsModal = ({ isOpen, onClose, application }) => {
    if (!isOpen || !application) return null;

    // Add this New Application Modal component before the return statement

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white">{application.applicantName}</h3>
              <p className="text-sm text-black dark:text-white">Application ID: {application.id}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-black dark:text-white mb-3">Loan Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-black dark:text-white">Loan Type:</span>
                    <div className="font-medium text-black dark:text-white flex items-center space-x-2">
                      {getLoanTypeIcon(application.loanType)}
                      <span>{application.loanType}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Amount:</span>
                    <div className="font-medium text-black dark:text-white">${application.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Purpose:</span>
                    <div className="font-medium text-black dark:text-white">{application.purpose}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Days in Process:</span>
                    <div className="font-medium text-black dark:text-white">{application.daysInProcess} days</div>
                  </div>
                </div>
              </div>

              {/* Credit & Risk Assessment */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-black dark:text-white mb-3">Credit & Risk Assessment</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{application.creditScore}</div>
                    <div className="text-sm text-black dark:text-white">Credit Score</div>
                    <div className="flex items-center justify-center mt-1">
                      {application.creditTrend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : application.creditTrend === 'down' ? (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getRiskColor(application.riskLevel)}`}>
                      {application.riskLevel}
                    </div>
                    <div className="text-sm text-black dark:text-white">Risk Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {application.financials.debtToIncome}%
                    </div>
                    <div className="text-sm text-black dark:text-white">Debt-to-Income</div>
                  </div>
                </div>
              </div>

              {/* Employment & Financials */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-black dark:text-white mb-3">Employment & Financial Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-black dark:text-white">Employment Status:</span>
                    <div className="font-medium text-black dark:text-white">{application.employment.status}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Annual Income:</span>
                    <div className="font-medium text-black dark:text-white">${application.employment.income.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Employer:</span>
                    <div className="font-medium text-black dark:text-white">{application.employment.employer}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Years Employed:</span>
                    <div className="font-medium text-black dark:text-white">{application.employment.yearsEmployed} years</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Liquid Assets:</span>
                    <div className="font-medium text-black dark:text-white">${application.financials.liquidAssets.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-black dark:text-white">Monthly Expenses:</span>
                    <div className="font-medium text-black dark:text-white">${application.financials.monthlyExpenses.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Property/Collateral Info */}
              {application.property && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-black dark:text-white mb-3">Property Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-black dark:text-white">Address:</span>
                      <div className="font-medium text-black dark:text-white">{application.property.address}</div>
                    </div>
                    <div>
                      <span className="text-black dark:text-white">Property Value:</span>
                      <div className="font-medium text-black dark:text-white">${application.property.value.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-black dark:text-white">Property Type:</span>
                      <div className="font-medium text-black dark:text-white">{application.property.type}</div>
                    </div>
                    <div>
                      <span className="text-black dark:text-white">Year Built:</span>
                      <div className="font-medium text-black dark:text-white">{application.property.yearBuilt}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Info */}
              {application.vehicle && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-black dark:text-white mb-3">Vehicle Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-black dark:text-white">Make & Model:</span>
                      <div className="font-medium text-black dark:text-white">{application.vehicle.make} {application.vehicle.model}</div>
                    </div>
                    <div>
                      <span className="text-black dark:text-white">Year:</span>
                      <div className="font-medium text-black dark:text-white">{application.vehicle.year}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-black dark:text-white">VIN:</span>
                      <div className="font-medium text-black dark:text-white">{application.vehicle.vin}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Status & Actions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-black dark:text-white mb-3">Status & Actions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black dark:text-white">Status:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black dark:text-white">Priority:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                      {application.priority}
                    </span>
                  </div>
                  <div className="text-sm text-black dark:text-white">
                    <span>SLA Deadline:</span>
                    <div className="font-medium">{application.slaDeadline}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => handleApproveApplication(application.id)}
                    className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600"
                  >
                    Approve Application
                  </button>
                  <button 
                    onClick={() => handleRejectApplication(application.id)}
                    className="w-full bg-red-600 dark:bg-red-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 dark:hover:bg-red-600"
                  >
                    Reject Application
                  </button>
                  <button 
                    onClick={() => handleRequestDocuments(application.id)}
                    className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Request Documents
                  </button>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-black dark:text-white mb-3">Documents</h4>
                <div className="space-y-2">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm text-black dark:text-white">{doc.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                                                    doc.status === 'Received' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                                                    doc.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                                                    'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                                                  }`}>
                                                    {doc.status}
                                                  </span>
                                                  {doc.status === 'Received' && (
                                                    <button 
                                                      onClick={() => {
                                                        setSelectedDocument(doc);
                                                        setShowDocumentViewer(true);
                                                      }}
                                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                                    >
                                                      <Eye className="h-4 w-4" />
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          <button className="mt-3 w-full bg-gray-600 dark:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center space-x-2">
                                            <Upload className="h-4 w-4" />
                                            <span>Upload Document</span>
                                          </button>
                                        </div>
                          
                                        {/* Flags & Alerts */}
                                        {application.flags && application.flags.length > 0 && (
                                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                            <h4 className="font-semibold text-red-800 dark:text-red-400 mb-3 flex items-center space-x-2">
                                              <Flag className="h-4 w-4" />
                                              <span>Flags & Alerts</span>
                                            </h4>
                                            <div className="space-y-2">
                                              {application.flags.map((flag, index) => (
                                                <div key={index} className="p-2 bg-white dark:bg-red-900/30 rounded border-l-4 border-red-400 dark:border-red-500">
                                                  <div className="font-medium text-sm text-red-800 dark:text-red-400">{flag.type}</div>
                                                  <div className="text-xs text-red-700 dark:text-red-300">{flag.message}</div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                          
                                        {/* Notes */}
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                          <h4 className="font-semibold text-black dark:text-white mb-3">Notes & Comments</h4>
                                          <div className="space-y-3 max-h-48 overflow-y-auto">
                                            {application.notes.map((note, index) => (
                                              <div key={index} className="p-3 bg-white dark:bg-gray-600 rounded border-l-4 border-blue-400 dark:border-blue-500">
                                                <div className="text-xs text-black dark:text-white mb-1">
                                                  {note.date} • {note.author}
                                                </div>
                                                <div className="text-sm text-black dark:text-white">{note.note}</div>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="mt-3">
                                            <textarea 
                                              placeholder="Add a note..."
                                              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                                              rows="2"
                                            />
                                            <button className="mt-2 w-full bg-blue-600 dark:bg-blue-700 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 dark:hover:bg-blue-600">
                                              Add Note
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            };
                          
                            // Document Viewer Modal
                            const DocumentViewerModal = ({ isOpen, onClose, document }) => {
                              if (!isOpen || !document) return null;
                          
                              return (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh]">
                                    <div className="flex justify-between items-center mb-4">
                                      <h3 className="text-lg font-bold text-black dark:text-white">{document.name}</h3>
                                      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <XCircle className="h-6 w-6" />
                                      </button>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                                      <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                      <p className="text-black dark:text-white">Document viewer would be implemented here</p>
                                      <p className="text-sm text-black dark:text-white mt-2">Type: {document.type} • Received: {document.date}</p>
                                      <div className="mt-4 space-x-2">
                                        <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
                                          <Download className="h-4 w-4 inline mr-2" />
                                          Download
                                        </button>
                                        <button className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600">
                                          Approve Document
                                        </button>
                                      </div>
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
                                        <div className="flex items-center space-x-3">
                                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                                            <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                          </div>
                                          <div>
                                            <h1 className="text-xl font-bold text-black dark:text-white">Loan Officer Dashboard</h1>
                                            <p className="text-sm text-black dark:text-white">{loanOfficerData.officerInfo.name} • {loanOfficerData.officerInfo.title}</p>
                                          </div>
                                        </div>
                                      </div>
                          
                                      {/* Search */}
                                      <div className="flex items-center space-x-4">
                                        <div className="relative">
                                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                                          <input
                                            type="text"
                                            placeholder="Search applications, customers..."
                                            value={searchQuery}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white w-80"
                                          />
                                          {showSearchResults && searchResults.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                              {searchResults.map((result) => (
                                                <div
                                                  key={result.id}
                                                  onClick={() => selectApplication(result)}
                                                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                                                >
                                                  <div className="font-medium text-black dark:text-white">{result.applicantName}</div>
                                                  <div className="text-sm text-black dark:text-white">{result.id} • {result.loanType} • ${result.amount.toLocaleString()}</div>
                                                  <div className="flex items-center space-x-2 mt-1">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(result.status)}`}>
                                                      {result.status}
                                                    </span>
                                                    <span className={`text-xs ${getRiskColor(result.riskLevel)}`}>
                                                      {result.riskLevel} Risk
                                                    </span>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                          
                                        <div className="flex items-center space-x-2">
                                          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                                            {loanOfficerData.officerInfo.status}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                                  {/* Officer Stats */}
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-black dark:text-white">Today's Reviews</p>
                                          <p className="text-2xl font-bold text-black dark:text-white">{loanOfficerData.officerInfo.todayStats.applicationsReviewed}</p>
                                        </div>
                                        <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                      </div>
                                    </div>
                          
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-black dark:text-white">Approval Rate</p>
                                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{loanOfficerData.officerInfo.todayStats.approvalRate}</p>
                                        </div>
                                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                      </div>
                                    </div>
                          
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-black dark:text-white">Avg Processing</p>
                                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{loanOfficerData.officerInfo.todayStats.avgProcessingTime}</p>
                                        </div>
                                        <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                      </div>
                                    </div>
                          
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-black dark:text-white">Portfolio Value</p>
                                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{loanOfficerData.officerInfo.todayStats.portfolioValue}</p>
                                        </div>
                                        <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                      </div>
                                    </div>
                                  </div>
                          
                                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
                                    <div className="p-6">
            {/* Risk Assessment Tab */}
              <div className="space-y-6">
                {/* Risk Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Risk Distribution</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black dark:text-white">Low Risk</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{width: '65%'}}></div>
                          </div>
                          <span className="text-sm font-medium text-black dark:text-white">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black dark:text-white">Medium Risk</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-600 dark:bg-yellow-400 h-2 rounded-full" style={{width: '25%'}}></div>
                          </div>
                          <span className="text-sm font-medium text-black dark:text-white">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black dark:text-white">High Risk</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-red-600 dark:bg-red-400 h-2 rounded-full" style={{width: '10%'}}></div>
                          </div>
                          <span className="text-sm font-medium text-black dark:text-white">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Fraud Alerts</h3>
                    <div className="space-y-3">
                      {loanOfficerData.riskAssessment.fraudAlerts.map((alert, index) => (
                        <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-medium text-red-800 dark:text-red-400">{alert.severity}</span>
                          </div>
                          <div className="text-sm text-red-700 dark:text-red-300 mt-1">{alert.applicant}</div>
                          <div className="text-xs text-red-600 dark:text-red-400">{alert.alert}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Risk Scoring Model</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black dark:text-white">Credit Score Weight</span>
                        <span className="text-sm font-medium text-black dark:text-white">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black dark:text-white">Debt-to-Income</span>
                        <span className="text-sm font-medium text-black dark:text-white">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black dark:text-white">Employment History</span>
                        <span className="text-sm font-medium text-black dark:text-white">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black dark:text-white">Liquid Assets</span>
                        <span className="text-sm font-medium text-black dark:text-white">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black dark:text-white">Other Factors</span>
                        <span className="text-sm font-medium text-black dark:text-white">5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High Risk Applications */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">High Risk Applications Requiring Review</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">Risk Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">Risk Factors</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">Recommendation</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {loanOfficerData.riskAssessment.highRiskApplications.map((app, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-black dark:text-white">{app.applicant}</div>
                              <div className="text-sm text-black dark:text-white">{app.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-red-600 dark:text-red-400">{app.riskScore}</div>
                                <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-red-600 dark:bg-red-400 h-2 rounded-full" style={{width: `${app.riskScore}%`}}></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {app.factors.map((factor, idx) => (
                                  <span key={idx} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
                                    {factor}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-black dark:text-white">{app.recommendation}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-3">
                                Review
                              </button>
                              <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                                Escalate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
<div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
  <h4 className="font-semibold text-black dark:text-white mb-3">Quick Actions</h4>
  <div className="space-y-2">
    <button 
      onClick={handleNewApplication}
      className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
    >
      <FileText className="h-4 w-4" />
      <span>New Application</span>
    </button>
    <button 
      onClick={handleBulkApprove}
      className="w-full flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
    >
      <CheckCircle className="h-4 w-4" />
      <span>Bulk Approve</span>
    </button>
    <button 
      onClick={handleExportReport}
      className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
    >
      <Download className="h-4 w-4" />
      <span>Export Report</span>
    </button>
  </div>
</div>
      </div>

      {/* Modals */}
      <ApplicationDetailsModal 
        isOpen={showApplicationDetails} 
        onClose={() => setShowApplicationDetails(false)} 
        application={selectedApplication} 
      />
      
      <DocumentViewerModal 
        isOpen={showDocumentViewer} 
        onClose={() => setShowDocumentViewer(false)} 
        document={selectedDocument} 
      />
      <NewApplicationModal 
  isOpen={showNewApplicationModal} 
  onClose={() => setShowNewApplicationModal(false)} 
/>

    </div>
  );
};

export default RiskAssessment;

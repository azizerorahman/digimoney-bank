import { useState } from "react";
import AnimatedSection from "../../../components/AnimatedSection";
import {
  Calendar,
  FileText,
  X,
  MessageSquare,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Eye,
} from "lucide-react";

const AMCustomerPortfolio = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const customerPortfolio = [
    {
      id: "CUST-ENT-001",
      name: "TechCorp Industries",
      type: "Corporate",
      totalValue: 2850000,
      monthlyRevenue: 8500,
      riskProfile: "Conservative",
      accounts: 3,
      status: "Active",
      lastContact: "2024-08-28",
      notes: "Eligible for premium investment products",
    },
    {
      id: "CUST-HNW-002",
      name: "Robert & Maria Martinez",
      type: "High Net Worth",
      totalValue: 1650000,
      monthlyRevenue: 4200,
      riskProfile: "Moderate",
      accounts: 3,
      status: "Active",
      lastContact: "2024-08-26",
      notes: "Estate planning documents pending review",
    },
    {
      id: "CUST-SMB-003",
      name: "Green Valley Restaurant Group",
      type: "Small Business",
      totalValue: 890000,
      monthlyRevenue: 2800,
      riskProfile: "Moderate Aggressive",
      accounts: 3,
      status: "Active",
      lastContact: "2024-08-25",
      notes: "Expansion loan pre-approved",
    },
    {
      id: "CUST-IND-004",
      name: "Jennifer Thompson",
      type: "Individual",
      totalValue: 425000,
      monthlyRevenue: 1200,
      riskProfile: "Conservative",
      accounts: 2,
      status: "Active",
      lastContact: "2024-08-27",
      notes: "Retirement planning consultation scheduled",
    },
    {
      id: "CUST-FAM-005",
      name: "The Wilson Family Trust",
      type: "Family Office",
      totalValue: 3200000,
      monthlyRevenue: 9800,
      riskProfile: "Moderate",
      accounts: 5,
      status: "VIP",
      lastContact: "2024-08-29",
      notes: "Multi-generational wealth planning",
    },
    {
      id: "CUST-COR-006",
      name: "MedTech Solutions Inc",
      type: "Corporate",
      totalValue: 1840000,
      monthlyRevenue: 5600,
      riskProfile: "Aggressive",
      accounts: 4,
      status: "Active",
      lastContact: "2024-08-24",
      notes: "IPO preparation in progress",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case "Corporate":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      case "High Net Worth":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
      case "Small Business":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "Individual":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
      case "Family Office":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "VIP":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "Active":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Customer Details Modal (following User modal patterns)
  const CustomerDetailsModal = () => {
    if (!selectedCustomer) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in duration-300 scale-in-95">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Customer Details
            </h3>
            <button
              onClick={() => setShowCustomerDetails(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Customer Header */}
            <div className="flex items-start justify-between p-4 bg-gradient-to-r from-[#6160DC]/10 to-[#8B7EFF]/10 rounded-xl">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCustomer.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCustomer.id}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getCustomerTypeColor(
                      selectedCustomer.type
                    )}`}
                  >
                    {selectedCustomer.type}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      selectedCustomer.status
                    )}`}
                  >
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Value
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedCustomer.totalValue)}
                </p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Monthly Revenue
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedCustomer.monthlyRevenue)}
                </p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Accounts
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCustomer.accounts}
                </p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Risk Profile
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCustomer.riskProfile}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Notes
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCustomer.notes}
              </p>
            </div>

            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Last Contact
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(selectedCustomer.lastContact).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="flex-1 bg-gradient-to-r from-[#6160DC] to-[#8B7EFF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-[#36D399] to-[#4AE3AA] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-[#FFAA5A] to-[#FFBB7C] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Customer Portfolio
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Manage and monitor your client relationships
            </p>
          </div>
        </AnimatedSection>

        {/* Customer Portfolio Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {customerPortfolio.map((customer, index) => (
              <AnimatedSection key={customer.id} delay={300 + index * 50}>
                <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
                  {/* Customer Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {customer.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {customer.id}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getCustomerTypeColor(
                            customer.type
                          )}`}
                        >
                          {customer.type}
                        </span>
                        {customer.status === "VIP" && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              customer.status
                            )}`}
                          >
                            {customer.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Value:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(customer.totalValue)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly Revenue:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(customer.monthlyRevenue)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Risk Profile:
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {customer.riskProfile}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Accounts:
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {customer.accounts}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                      {customer.notes}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(customer)}
                    className="w-full bg-gradient-to-r from-[#6160DC] to-[#8B7EFF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:scale-105"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Customer Details Modal */}
        {showCustomerDetails && <CustomerDetailsModal />}
      </div>
    </div>
  );
};

export default AMCustomerPortfolio;

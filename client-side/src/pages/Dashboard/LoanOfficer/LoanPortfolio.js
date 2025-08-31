import { useState, useMemo } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import useLoanOfficerData from "../../../hooks/useLoanOfficerData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Eye,
  Building,
  Home,
  Car,
  GraduationCap,
  PieChart,
  Target,
  Search,
} from "lucide-react";

const LoanPortfolio = () => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading: userLoading } = useUserInfo(uId);
  const {
    data: loanOfficerData,
    loading,
    error,
  } = useLoanOfficerData(userInfo);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  // Memoized active loans data - Fixed to use correct property name
  const activeLoans = useMemo(() => {
    if (!loanOfficerData?.activeLoanPortfolio) return [];

    return loanOfficerData.activeLoanPortfolio.filter((loan) => {
      const matchesFilter =
        selectedFilter === "all" ||
        loan.status?.toLowerCase() === selectedFilter.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        loan.borrowerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.borrowerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.loanType?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [loanOfficerData?.activeLoanPortfolio, selectedFilter, searchQuery]);

  // Memoized portfolio statistics - Fixed field mappings
  const portfolioStats = useMemo(() => {
    if (!loanOfficerData?.activeLoanPortfolio) return {};

    const loans = loanOfficerData.activeLoanPortfolio;
    console.log("Calculating stats for loans:", loanOfficerData);
    const total = loans.length;
    const totalValue = loans.reduce(
      (sum, loan) => sum + (loan.originalAmount || 0),
      0
    );
    const totalOutstanding = loans.reduce(
      (sum, loan) => sum + (loan.currentBalance || 0),
      0
    );
    const performing = loans.filter(
      (l) => l.status?.toLowerCase() === "current"
    ).length;
    const delinquent = loans.filter(
      (l) =>
        l.status?.toLowerCase() === "late" ||
        l.status?.toLowerCase() === "past due"
    ).length;
    const defaulted = loans.filter(
      (l) => l.status?.toLowerCase() === "default"
    ).length;

    return {
      total,
      totalValue,
      totalOutstanding,
      performing,
      delinquent,
      defaulted,
      performingRate: total ? ((performing / total) * 100).toFixed(1) : 0,
      averageLoanSize: total ? (totalValue / total).toFixed(0) : 0,
      monthlyPayments: loans.reduce(
        (sum, loan) => sum + (loan.monthlyPayment || 0),
        0
      ),
    };
  }, [loanOfficerData?.activeLoanPortfolio]);

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <AnimatedSection>
          <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-md mx-auto">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Try Again
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  // Check if user has loan officer role
  if (!userInfo?.role?.includes("loan-officer")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <AnimatedSection>
          <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-md mx-auto">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need loan officer privileges to access this portfolio.
            </p>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const getLoanTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "mortgage":
      case "home loan":
        return <Home className="h-5 w-5" />;
      case "auto loan":
      case "auto":
      case "car loan":
        return <Car className="h-5 w-5" />;
      case "business loan":
      case "business":
        return <Building className="h-5 w-5" />;
      case "personal loan":
      case "personal":
        return <DollarSign className="h-5 w-5" />;
      case "student loan":
      case "education":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "current":
        return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      case "late":
      case "delinquent":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "past due":
      case "past_due":
        return "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-700";
      case "default":
        return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "high":
        return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewLoanDetails = (loan) => {
    setSelectedLoan(loan);
    setShowLoanDetails(true);
  };

  const closeLoanDetails = () => {
    setSelectedLoan(null);
    setShowLoanDetails(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Loan Portfolio
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Monitor and manage your active loan portfolio performance
            </p>
          </div>
        </AnimatedSection>

        {/* Portfolio Statistics Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Loans Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-blue-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Total Loans
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {portfolioStats.total || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Active portfolio
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Portfolio Value Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-green-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Portfolio Value
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(portfolioStats.totalValue)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Total principal
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            {/* Outstanding Balance Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-orange-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Outstanding Balance
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {formatCurrency(portfolioStats.totalOutstanding)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Current balance
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>

            {/* Performance Rate Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Performance Rate
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {portfolioStats.performingRate}%
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Current loans
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Performance Overview */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                Loan Status Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current
                  </span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {portfolioStats.performing || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Delinquent
                  </span>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {portfolioStats.delinquent || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Default
                  </span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {portfolioStats.defaulted || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                Portfolio Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Average Loan Size
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {formatCurrency(portfolioStats.averageLoanSize)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Active
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {portfolioStats.total || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Payments
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white px-3 py-1 bg-white dark:bg-gray-800 rounded-lg">
                    {formatCurrency(portfolioStats.monthlyPayments)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600">
                  📊 Generate Portfolio Report
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-600">
                  ⚠️ Review Delinquent Accounts
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600">
                  📈 Performance Analytics
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filters and Search */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Loans
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by borrower, ID, or loan type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Status
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="current">Current</option>
                  <option value="late">Late</option>
                  <option value="past due">Past Due</option>
                  <option value="default">Default</option>
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Active Loans List */}
        <AnimatedSection delay={500}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Active Loans ({activeLoans.length})
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {activeLoans.length} of {portfolioStats.total || 0} loans
                </div>
              </div>
            </div>

            {activeLoans.length === 0 ? (
              <div className="p-12 sm:p-16 text-center">
                <PieChart className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Active Loans Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                  {searchQuery || selectedFilter !== "all"
                    ? "No loans match your current search criteria. Try adjusting your filters."
                    : "Your loan portfolio is currently empty. New loans will appear here once approved."}
                </p>
                {(searchQuery || selectedFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("all");
                    }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeLoans.map((loan, index) => (
                  <div
                    key={loan._id || index}
                    className="group p-6 sm:p-8 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left Section - Borrower Info */}
                      <div className="flex items-start space-x-4 sm:space-x-6">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            {getLoanTypeIcon(loan.loanType)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {loan.borrowerName || "Unknown Borrower"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                              {loan.borrowerId || "N/A"}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500">
                              •
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                              {loan.loanType || "Unknown Type"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Loan Details */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="text-center bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(loan.originalAmount)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Original
                          </p>
                        </div>

                        <div className="text-center bg-orange-50 dark:bg-orange-900/20 p-3 sm:p-4 rounded-xl border border-orange-200 dark:border-orange-700">
                          <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                            {formatCurrency(loan.currentBalance)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Balance
                          </p>
                        </div>

                        <div className="text-center bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-xl border border-green-200 dark:border-green-700">
                          <p className="text-sm font-bold text-green-600 dark:text-green-400">
                            {loan.interestRate || "N/A"}%
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Rate
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(
                              loan.status
                            )} shadow-sm`}
                          >
                            {loan.status?.replace("_", " ").toUpperCase() ||
                              "UNKNOWN"}
                          </div>

                          {loan.riskRating && (
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getRiskColor(
                                loan.riskRating
                              )}`}
                            >
                              {loan.riskRating.toUpperCase()} RISK
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleViewLoanDetails(loan)}
                          className="p-3 sm:p-4 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                            Origination
                          </span>
                          <span className="block text-sm text-gray-900 dark:text-white font-bold">
                            {formatDate(loan.originationDate)}
                          </span>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                            Next Payment
                          </span>
                          <span className="block text-sm text-gray-900 dark:text-white font-bold">
                            {formatDate(loan.nextPaymentDue)}
                          </span>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                            Monthly Payment
                          </span>
                          <span className="block text-sm text-gray-900 dark:text-white font-bold">
                            {formatCurrency(loan.monthlyPayment)}
                          </span>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                            Term Remaining
                          </span>
                          <span className="block text-sm text-gray-900 dark:text-white font-bold">
                            {loan.termRemaining || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Loan Details Modal */}
        <Modal
          isOpen={showLoanDetails && selectedLoan}
          onClose={closeLoanDetails}
          title={`Loan Details - ${selectedLoan?.borrowerName || ""}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                  Borrower Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Name:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {selectedLoan?.borrowerName}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Status:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedLoan?.status?.toLowerCase() === "current"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                          : selectedLoan?.status?.toLowerCase() === "late" ||
                            selectedLoan?.status?.toLowerCase() === "past due"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                      }`}
                    >
                      {selectedLoan?.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  Financial Details
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Original Amount:
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(selectedLoan?.originalAmount)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Current Balance:
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(selectedLoan?.currentBalance)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Monthly Payment:
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(selectedLoan?.monthlyPayment)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                Key Dates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium block text-gray-700 dark:text-gray-300 mb-1">
                    Next Payment Due:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {formatDate(selectedLoan?.nextPaymentDue)}
                  </span>
                </div>
                <div>
                  <span className="font-medium block text-gray-700 dark:text-gray-300 mb-1">
                    Term Remaining:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {selectedLoan?.termRemaining || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {selectedLoan?.riskRating && (
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
                  Risk Assessment
                </h4>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold border ${getRiskColor(
                    selectedLoan.riskRating
                  )}`}
                >
                  {selectedLoan.riskRating.toUpperCase()} RISK
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LoanPortfolio;

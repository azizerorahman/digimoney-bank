import { useState, useMemo } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import useLoanOfficerData from "../../../hooks/useLoanOfficerData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import {
  User,
  FileText,
  CheckCircle,
  XCircle,
  DollarSign,
  Eye,
  ArrowUp,
  ArrowDown,
  Building,
  Home,
  Car,
  GraduationCap,
  Search,
  Plus,
  AlertTriangle,
} from "lucide-react";

const ApplicationPipeline = () => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading: userLoading } = useUserInfo(uId);
  const {
    data: loanOfficerData,
    loading,
    error,
    refetch,
  } = useLoanOfficerData(userInfo);

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLoanType, setFilterLoanType] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [newApplicationForm, setNewApplicationForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    loanType: "",
    amount: "",
    purpose: "",
    creditScore: "",
    annualIncome: "",
    employmentStatus: "",
    address: "",
  });

  // Filter and search applications using useMemo for performance
  const filteredApplications = useMemo(() => {
    if (!loanOfficerData?.loanApplications) return [];

    return loanOfficerData.loanApplications.filter((app) => {
      const statusMatch =
        filterStatus === "all" ||
        app.status?.toLowerCase() === filterStatus.toLowerCase();
      const typeMatch =
        filterLoanType === "all" ||
        app.loanType?.toLowerCase().includes(filterLoanType.toLowerCase());
      const searchMatch =
        !searchQuery ||
        app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.loanType?.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && typeMatch && searchMatch;
    });
  }, [
    loanOfficerData?.loanApplications,
    filterStatus,
    filterLoanType,
    searchQuery,
  ]);

  // Calculate statistics using useMemo
  const applicationStats = useMemo(() => {
    if (!loanOfficerData?.loanApplications) return {};

    const apps = loanOfficerData.loanApplications;
    return {
      total: apps.length,
      pending: apps.filter(
        (app) =>
          app.status?.toLowerCase() === "pending" ||
          app.status?.toLowerCase() === "pending approval"
      ).length,
      approved: apps.filter((app) => app.status?.toLowerCase() === "approved")
        .length,
      inReview: apps.filter((app) => app.status?.toLowerCase() === "in review")
        .length,
      rejected: apps.filter((app) => app.status?.toLowerCase() === "rejected")
        .length,
      flagged: apps.filter((app) => app.status?.toLowerCase() === "flagged")
        .length,
      totalAmount: apps.reduce((sum, app) => sum + (app.amount || 0), 0),
    };
  }, [loanOfficerData?.loanApplications]);

  // Loading state
  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if user has loan officer role
  if (!userInfo?.role?.includes("loan-officer")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You need loan officer privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Helper functions
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      case "pending":
      case "pending approval":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "in review":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      case "rejected":
        return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700";
      case "flagged":
        return "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-700";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "high":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getLoanTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "mortgage":
      case "home loan":
        return <Home className="h-5 w-5" />;
      case "auto":
      case "auto loan":
      case "car loan":
        return <Car className="h-5 w-5" />;
      case "personal":
      case "personal loan":
        return <User className="h-5 w-5" />;
      case "student":
      case "student loan":
        return <GraduationCap className="h-5 w-5" />;
      case "business":
      case "business loan":
        return <Building className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const getLoanTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "mortgage":
      case "home loan":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
      case "auto":
      case "auto loan":
      case "car loan":
        return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20";
      case "personal":
      case "personal loan":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      case "student":
      case "student loan":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
      case "business":
      case "business loan":
        return "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  // Action handlers
  const handleApproveApplication = async (app) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/loan-applications/${app._id}/status`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        `Application for ${app.applicantName} approved successfully!`
      );
      await refetch();
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve application");
    }
  };

  const handleRejectApplication = async (app) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/loan-applications/${app._id}/status`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.error(`Application for ${app.applicantName} rejected.`);
      await refetch();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject application");
    }
  };

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
  };

  const handleNewApplication = () => {
    setShowNewApplicationModal(true);
  };

  const handleSubmitNewApplication = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      // Create application data with current loan officer ID
      const applicationData = {
        applicantName: newApplicationForm.applicantName,
        applicantId: `CUST-${Date.now().toString().slice(-6)}`, // Generate unique ID
        loanType: newApplicationForm.loanType,
        amount: parseFloat(newApplicationForm.amount),
        purpose: newApplicationForm.purpose,
        status: "pending",
        priority: "Medium",
        submittedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        daysInProcess: 0,
        creditScore: parseInt(newApplicationForm.creditScore) || null,
        creditTrend: "stable",
        riskLevel: "Medium",
        employment: {
          status: "Employed",
          income: parseFloat(newApplicationForm.annualIncome) || 0,
          employer: "N/A",
          yearsEmployed: 0,
        },
        financials: {
          downPayment: 0,
          debtToIncome: 0,
          liquidAssets: 0,
          monthlyExpenses: 0,
        },
        documents: [],
        notes: [
          {
            date: new Date().toISOString(),
            author: userInfo?.firstName || "Loan Officer",
            note: "Application created by loan officer",
          },
        ],
        flags: [],
        nextAction: "Initial Review",
        loanOfficerId: userInfo?._id,
        email: newApplicationForm.email,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/loan-applications`,
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Application created successfully!");
      setShowNewApplicationModal(false);
      setNewApplicationForm({
        applicantName: "",
        email: "",
        phone: "",
        loanType: "",
        amount: "",
        purpose: "",
        creditScore: "",
        annualIncome: "",
      });
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to create application");
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
    // Handle both date strings and Date objects
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) return "N/A";

    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours < 1) return "Just now";
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Application Pipeline
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Manage and review loan applications efficiently
            </p>
          </div>
        </AnimatedSection>

        {/* Quick Stats Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Pending Applications */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {applicationStats.pending || 0}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-yellow-700 dark:text-yellow-300 font-medium">
                Pending Review
              </div>
            </div>

            {/* Approved Applications */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {applicationStats.approved || 0}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-700 dark:text-green-300 font-medium">
                Approved
              </div>
            </div>

            {/* In Review */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {applicationStats.inReview || 0}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-blue-700 dark:text-blue-300 font-medium">
                In Review
              </div>
            </div>

            {/* Total Applications */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {applicationStats.total || 0}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-purple-700 dark:text-purple-300 font-medium">
                Total Apps
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filters and Search */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-8 transition-all duration-500">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applications by name, ID, or loan type..."
                    className="w-full focus-visible:outline-none pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus-visible:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="flagged">Flagged</option>
                </select>

                <select
                  value={filterLoanType}
                  onChange={(e) => setFilterLoanType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus-visible:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="Mortgage">Mortgage</option>
                  <option value="auto">Auto Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="student">Student Loan</option>
                </select>

                <button
                  onClick={handleNewApplication}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">New Application</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Applications List */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="px-6 sm:px-8 lg:px-10 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Loan Applications ({filteredApplications.length})
              </h3>
            </div>

            {filteredApplications.length > 0 ? (
              <div className="space-y-4 p-6 sm:p-8 lg:p-10">
                {filteredApplications.map((application, index) => (
                  <div
                    key={application._id}
                    className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        {/* Left Section - Applicant Info */}
                        <div className="flex items-start space-x-5">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getLoanTypeColor(
                              application.loanType
                            )} group-hover:scale-110 transition-transform duration-300`}
                          >
                            {getLoanTypeIcon(application.loanType)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {application.applicantName || "Unknown Applicant"}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              ID:{" "}
                              {application.applicantId?.slice(-8) ||
                                application._id?.slice(-8) ||
                                "N/A"}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                              <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm ${getLoanTypeColor(
                                  application.loanType
                                )} hover:shadow-md transition-shadow duration-200`}
                              >
                                {application.loanType || "Unknown"}
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-xl">
                                {formatCurrency(application.amount)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Status and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {/* Credit Score */}
                          <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {application.creditScore || "N/A"}
                              </span>
                              {application.creditTrend === "up" ? (
                                <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                  <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                              ) : application.creditTrend === "down" ? (
                                <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                                  <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                                </div>
                              ) : null}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                              Credit Score
                            </p>
                          </div>

                          {/* Risk Level */}
                          <div className="flex flex-col items-center">
                            <span
                              className={`inline-flex px-4 py-2 text-sm font-bold rounded-xl shadow-sm ${getRiskColor(
                                application.riskLevel
                              )} hover:shadow-md transition-shadow duration-200`}
                            >
                              {application.riskLevel?.toUpperCase() ||
                                "UNKNOWN"}{" "}
                              RISK
                            </span>
                          </div>

                          {/* Status */}
                          <div className="flex flex-col items-center">
                            <span
                              className={`inline-flex px-4 py-2 text-sm font-bold rounded-xl border-2 shadow-sm ${getStatusColor(
                                application.status
                              )} hover:shadow-md transition-all duration-200`}
                            >
                              {application.status?.toUpperCase() || "UNKNOWN"}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                            <button
                              onClick={() => handleViewApplication(application)}
                              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 hover:scale-110"
                              title="View Details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>

                            {application.status !== "approved" && (
                              <button
                                onClick={() =>
                                  handleApproveApplication(application)
                                }
                                className="p-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl transition-all duration-200 hover:scale-110"
                                title="Approve"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            )}

                            {application.status !== "rejected" && (
                              <button
                                onClick={() =>
                                  handleRejectApplication(application)
                                }
                                className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 hover:scale-110"
                                title="Reject"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                              Applied
                            </span>
                            <span className="block text-sm text-gray-900 dark:text-white font-bold">
                              {formatDate(
                                application.submittedDate ||
                                  application.createdAt
                              )}
                            </span>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                              Income
                            </span>
                            <span className="block text-sm text-gray-900 dark:text-white font-bold">
                              {formatCurrency(
                                application.employment?.income ||
                                  application.annualIncome
                              )}
                            </span>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                              DTI Ratio
                            </span>
                            <span className="block text-sm text-gray-900 dark:text-white font-bold">
                              {application.financials?.debtToIncome ||
                                application.debtToIncomeRatio ||
                                "N/A"}
                              %
                            </span>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                              Purpose
                            </span>
                            <span className="block text-sm text-gray-900 dark:text-white font-bold truncate">
                              {application.purpose || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Applications Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ||
                  filterStatus !== "all" ||
                  filterLoanType !== "all"
                    ? "No applications match your current filters. Try adjusting your search criteria."
                    : "No loan applications have been submitted yet."}
                </p>
                {(searchQuery ||
                  filterStatus !== "all" ||
                  filterLoanType !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                      setFilterLoanType("all");
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* New Application Modal */}
      <Modal
        isOpen={showNewApplicationModal}
        onClose={() => setShowNewApplicationModal(false)}
        title="New Loan Application"
        size="lg"
      >
        <form onSubmit={handleSubmitNewApplication} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Applicant Name *
              </label>
              <input
                type="text"
                value={newApplicationForm.applicantName}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    applicantName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={newApplicationForm.email}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Type *
              </label>
              <select
                value={newApplicationForm.loanType}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    loanType: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Loan Type</option>
                <option value="Mortgage">Mortgage</option>
                <option value="auto">Auto Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="business">Business Loan</option>
                <option value="student">Student Loan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Amount *
              </label>
              <input
                type="number"
                value={newApplicationForm.amount}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1000"
                step="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Income *
              </label>
              <input
                type="number"
                value={newApplicationForm.annualIncome}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    annualIncome: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Credit Score
              </label>
              <input
                type="number"
                value={newApplicationForm.creditScore}
                onChange={(e) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    creditScore: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="300"
                max="850"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Purpose
            </label>
            <textarea
              value={newApplicationForm.purpose}
              onChange={(e) =>
                setNewApplicationForm((prev) => ({
                  ...prev,
                  purpose: e.target.value,
                }))
              }
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the purpose of this loan..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setShowNewApplicationModal(false)}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Application
            </button>
          </div>
        </form>
      </Modal>

      {/* Application Details Modal */}
      <Modal
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        title={`Application Details - ID: ${
          selectedApplication?.applicantId?.slice(-8) ||
          selectedApplication?._id?.slice(-8) ||
          "N/A"
        }`}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Applicant Information */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Applicant Information
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {selectedApplication?.applicantName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Credit Score
                  </label>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedApplication?.creditScore || "N/A"}
                    </p>
                    {selectedApplication?.creditTrend === "up" ? (
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    ) : selectedApplication?.creditTrend === "down" ? (
                      <ArrowDown className="h-5 w-5 text-red-500" />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Loan Information */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                Loan Information
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Loan Amount
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(selectedApplication?.amount)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Current Status
                  </label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                      selectedApplication?.status
                    )}`}
                  >
                    {selectedApplication?.status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Information */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Application Status
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Risk Level
                </label>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(
                    selectedApplication?.riskLevel
                  )}`}
                >
                  {selectedApplication?.riskLevel?.toUpperCase() || "UNKNOWN"}{" "}
                  RISK
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Submitted
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {formatDate(
                    selectedApplication?.submittedDate ||
                      selectedApplication?.createdAt
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {selectedApplication?.status !== "approved" && (
              <button
                onClick={() => {
                  handleApproveApplication(selectedApplication);
                  setSelectedApplication(null);
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="h-5 w-5" />
                Approve Application
              </button>
            )}

            {selectedApplication?.status !== "rejected" && (
              <button
                onClick={() => {
                  handleRejectApplication(selectedApplication);
                  setSelectedApplication(null);
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <XCircle className="h-5 w-5" />
                Reject Application
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationPipeline;

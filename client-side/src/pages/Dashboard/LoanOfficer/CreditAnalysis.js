import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import useUserInfo from "../../../hooks/useUserInfo";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import { toast } from "react-toastify";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Eye,
  Building,
  Home,
  Car,
  GraduationCap,
  Search,
  Shield,
  X,
  Download,
} from "lucide-react";

const CreditAnalysis = () => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading: userLoading } = useUserInfo(uId);

  // Local state for fetched data
  const [loanApplications, setLoanApplications] = useState([]);
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchCreditAnalysisData = async () => {
      if (!userInfo || !userInfo._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");

        // Use the new credit analysis endpoint for better performance
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/credit-analysis`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { officerId: userInfo._id },
          }
        );

        if (response.data) {
          // Set the processed data directly from the backend
          setLoanApplications(response.data.analyses || []);
          setRiskAssessments(response.data.riskAssessment || {});
        }
      } catch (err) {
        console.error("Error fetching credit analysis data:", err);
        setError(err.message);
        toast.error("Failed to fetch credit analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchCreditAnalysisData();
  }, [userInfo]);

  // Memoized credit analysis data - Now using processed data from backend
  const creditAnalyses = useMemo(() => {
    if (!loanApplications || loanApplications.length === 0) return [];

    return loanApplications.filter((analysis) => {
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "excellent" && analysis.creditScore >= 750) ||
        (selectedFilter === "good" &&
          analysis.creditScore >= 700 &&
          analysis.creditScore < 750) ||
        (selectedFilter === "fair" &&
          analysis.creditScore >= 650 &&
          analysis.creditScore < 700) ||
        (selectedFilter === "poor" && analysis.creditScore < 650) ||
        (selectedFilter === "high" && analysis.riskScore >= 70) ||
        (selectedFilter === "medium" &&
          analysis.riskScore >= 50 &&
          analysis.riskScore < 70) ||
        (selectedFilter === "low" && analysis.riskScore < 50);

      const matchesSearch =
        !searchQuery ||
        analysis.applicantName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        analysis.applicationId
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [loanApplications, selectedFilter, searchQuery]);

  // Memoized statistics
  const analysisStats = useMemo(() => {
    const total = loanApplications.length;
    const withCreditScores = loanApplications.filter((app) => app.creditScore);

    const excellent = withCreditScores.filter(
      (app) => app.creditScore >= 750
    ).length;
    const good = withCreditScores.filter(
      (app) => app.creditScore >= 700 && app.creditScore < 750
    ).length;
    const fair = withCreditScores.filter(
      (app) => app.creditScore >= 650 && app.creditScore < 700
    ).length;
    const poor = withCreditScores.filter((app) => app.creditScore < 650).length;

    const avgCreditScore =
      withCreditScores.length > 0
        ? Math.round(
            withCreditScores.reduce((sum, app) => sum + app.creditScore, 0) /
              withCreditScores.length
          )
        : 0;

    const approvalRate =
      total > 0 ? Math.round(((excellent + good) / total) * 100) : 0;

    const riskData = riskAssessments || {};
    const fraudAlerts = riskData.fraudAlerts?.length || 0;

    return {
      total,
      excellent,
      good,
      fair,
      poor,
      avgCreditScore,
      approvalRate,
      fraudAlerts,
      riskDistribution: riskData.riskDistribution || {
        low: 0,
        medium: 0,
        high: 0,
      },
    };
  }, [loanApplications, riskAssessments]);

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <AnimatedSection>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Credit Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{error}</p>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowDetailsModal(true);
  };

  // Handle export functionality
  const handleExport = () => {
    try {
      const exportData = creditAnalyses.map((analysis) => ({
        applicationId: analysis.applicationId,
        applicantName: analysis.applicantName,
        loanType: analysis.loanType,
        requestedAmount: analysis.requestedAmount,
        creditScore: analysis.creditScore,
        riskScore: analysis.riskScore,
        creditRating: analysis.creditRating,
        debtToIncomeRatio: analysis.debtToIncomeRatio,
        annualIncome: analysis.annualIncome,
        employmentLength: analysis.employmentLength,
        analysisDate: analysis.analysisDate,
        status: analysis.status,
      }));

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `credit-analysis-${
        new Date().toISOString().split("T")[0]
      }.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      toast.success("Credit analysis data exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const getLoanTypeIcon = (type) => {
    switch (type) {
      case "mortgage":
        return <Home className="h-4 w-4" />;
      case "auto":
        return <Car className="h-4 w-4" />;
      case "business":
        return <Building className="h-4 w-4" />;
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCreditRatingColor = (rating) => {
    switch (rating) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "fair":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCreditScoreColor = (score) => {
    if (score >= 750) return "text-green-600";
    if (score >= 700) return "text-blue-600";
    if (score >= 650) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Details Modal */}
        {showDetailsModal && selectedAnalysis && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-in fade-in duration-300 scale-in-95">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Credit Analysis Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Applicant Info */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    Applicant Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Name:
                      </span>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        {selectedAnalysis.applicantName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Application ID:
                      </span>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        {selectedAnalysis.applicationId}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Loan Type:
                      </span>
                      <p className="font-medium text-blue-900 dark:text-blue-100 capitalize">
                        {selectedAnalysis.loanType}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Requested Amount:
                      </span>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        ${selectedAnalysis.requestedAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credit Score Info */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                    Credit Assessment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${getCreditScoreColor(
                          selectedAnalysis.creditScore
                        )} mb-1`}
                      >
                        {selectedAnalysis.creditScore}
                      </div>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        Credit Score
                      </span>
                    </div>
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCreditRatingColor(
                          selectedAnalysis.creditRating
                        )}`}
                      >
                        {selectedAnalysis.creditRating?.toUpperCase()}
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Credit Rating
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {selectedAnalysis.riskScore}%
                      </div>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        Risk Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                    Financial Profile
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-purple-700 dark:text-purple-300">
                        Annual Income:
                      </span>
                      <p className="font-medium text-purple-900 dark:text-purple-100">
                        ${selectedAnalysis.annualIncome?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-purple-700 dark:text-purple-300">
                        Debt-to-Income Ratio:
                      </span>
                      <p className="font-medium text-purple-900 dark:text-purple-100">
                        {selectedAnalysis.debtToIncomeRatio}%
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-purple-700 dark:text-purple-300">
                        Employment Length:
                      </span>
                      <p className="font-medium text-purple-900 dark:text-purple-100">
                        {selectedAnalysis.employmentLength} years
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-purple-700 dark:text-purple-300">
                        Analysis Date:
                      </span>
                      <p className="font-medium text-purple-900 dark:text-purple-100">
                        {selectedAnalysis.analysisDate
                          ? new Date(
                              selectedAnalysis.analysisDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Factors */}
                {selectedAnalysis.keyFactors &&
                  selectedAnalysis.keyFactors.length > 0 && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                        Risk Factors
                      </h4>
                      <div className="space-y-2">
                        {selectedAnalysis.keyFactors.map((factor, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 rounded-lg p-3"
                          >
                            <div>
                              <span className="font-medium text-yellow-900 dark:text-yellow-100">
                                {factor.name}
                              </span>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                {factor.value}
                              </p>
                            </div>
                            <span
                              className={`text-lg font-bold ${
                                factor.impact === "positive"
                                  ? "text-green-600"
                                  : factor.impact === "negative"
                                  ? "text-red-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {factor.impact === "positive"
                                ? "↑"
                                : factor.impact === "negative"
                                ? "↓"
                                : "→"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <AnimatedSection delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Credit Analysis
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
                Comprehensive credit evaluations and risk assessments
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Credit Analysis Statistics Cards */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Total Applications Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {analysisStats.total}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                Total Applications
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Credit analyzed
              </div>
            </div>

            {/* Average Credit Score Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 ${getCreditScoreColor(
                  analysisStats.avgCreditScore
                )}`}
              >
                {analysisStats.avgCreditScore}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-purple-700 dark:text-purple-300 font-medium">
                Avg Credit Score
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                Portfolio average
              </div>
            </div>

            {/* Approval Rate Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {analysisStats.approvalRate}%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                Approval Rate
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                Excellent + Good
              </div>
            </div>

            {/* High Risk Applications Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {analysisStats.poor}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300 font-medium">
                High Risk
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                Poor rating
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Credit Rating Distribution & Controls */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Credit Rating Distribution */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Credit Rating Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Excellent (750+)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {analysisStats.excellent}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Good (700-749)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {analysisStats.good}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Fair (650-699)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    {analysisStats.fair}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Poor (Below 650)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {analysisStats.poor}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Risk Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Total Analyzed
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {analysisStats.total}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Average Score
                  </span>
                  <span
                    className={`text-sm font-semibold ${getCreditScoreColor(
                      analysisStats.avgCreditScore
                    )}`}
                  >
                    {analysisStats.avgCreditScore}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Fraud Alerts
                  </span>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {analysisStats.fraudAlerts}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Approval Rate
                  </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {analysisStats.approvalRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Credit Report</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Review High Risk Cases</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Credit Trend Analysis</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security Review</span>
                </button>
                <button
                  onClick={handleExport}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Analysis Data</span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Search and Filter Controls */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Credit Analysis
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by applicant name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Rating
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                >
                  <option value="all">All Ratings</option>
                  <option value="excellent">Excellent (750+)</option>
                  <option value="good">Good (700-749)</option>
                  <option value="fair">Fair (650-699)</option>
                  <option value="poor">Poor (&lt;650)</option>
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Credit Analysis Results ({creditAnalyses.length})
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {creditAnalyses.length} of {analysisStats.total || 0} analyses
                </div>
              </div>
            </div>

            {creditAnalyses.length === 0 ? (
              <div className="p-12 sm:p-16 text-center">
                <Shield className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Credit Analysis Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                  {searchQuery || selectedFilter !== "all"
                    ? "No analyses match your current search criteria. Try adjusting your filters."
                    : "No credit analyses have been completed yet. New analyses will appear here once processed."}
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
              <div className="space-y-4 p-6 sm:p-8">
                {creditAnalyses.map((analysis, index) => (
                  <div
                    key={analysis._id || index}
                    className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                              {getLoanTypeIcon(analysis.loanType)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                                {analysis.applicantName || "Unknown Applicant"}
                              </h4>
                              <div
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCreditRatingColor(
                                  analysis.creditRating
                                )}`}
                              >
                                {analysis.creditRating?.toUpperCase() ||
                                  "UNRATED"}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-medium">
                                ID: {analysis.applicationId || "N/A"}
                              </span>
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md capitalize font-medium">
                                {analysis.loanType || "Unknown Type"}
                              </span>
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-md font-medium">
                                $
                                {(
                                  analysis.requestedAmount || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4">
                          <div className="flex items-center gap-6">
                            {/* Credit Score */}
                            <div className="text-center">
                              <div
                                className={`text-2xl sm:text-3xl font-bold ${getCreditScoreColor(
                                  analysis.creditScore
                                )} mb-1`}
                              >
                                {analysis.creditScore || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                Credit Score
                              </div>
                            </div>

                            {/* Risk Score */}
                            <div className="text-center">
                              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                                {analysis.riskScore || 0}%
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                Risk Score
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleViewDetails(analysis)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Credit Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {analysis.debtToIncomeRatio || "N/A"}%
                          </div>
                          <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                            DTI Ratio
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${(analysis.annualIncome || 0).toLocaleString()}
                          </div>
                          <div className="text-xs text-green-700 dark:text-green-300 font-medium">
                            Annual Income
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {analysis.employmentLength || "N/A"}
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                            Years Employed
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-700/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            {analysis.creditTrend === "up"
                              ? "↗"
                              : analysis.creditTrend === "down"
                              ? "↘"
                              : "→"}
                          </div>
                          <div className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                            Credit Trend
                          </div>
                        </div>
                      </div>

                      {/* Risk Factors */}
                      {analysis.keyFactors &&
                        analysis.keyFactors.length > 0 && (
                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-lg p-3">
                            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Risk Factors:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {analysis.keyFactors
                                .slice(0, 3)
                                .map((factor, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between bg-white/80 dark:bg-gray-700/80 rounded-md p-2"
                                  >
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                      {factor.name}
                                    </span>
                                    <span
                                      className={`text-sm font-bold ${
                                        factor.impact === "positive"
                                          ? "text-green-600 dark:text-green-400"
                                          : factor.impact === "negative"
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-gray-600 dark:text-gray-400"
                                      }`}
                                    >
                                      {factor.impact === "positive"
                                        ? "↑"
                                        : factor.impact === "negative"
                                        ? "↓"
                                        : "→"}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Footer */}
                      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">Status:</span>
                          <span className="capitalize">
                            {analysis.status || "In Review"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Analyzed:</span>
                          <span>
                            {analysis.analysisDate
                              ? new Date(
                                  analysis.analysisDate
                                ).toLocaleDateString()
                              : "N/A"}
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

        {/* Details Modal */}
        {showDetailsModal && selectedAnalysis && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800/50 dark:to-blue-700/50 rounded-xl flex items-center justify-center">
                    {getLoanTypeIcon(selectedAnalysis.loanType)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedAnalysis.applicantName || "Unknown Applicant"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Credit Analysis Details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Application Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Application Overview
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Application ID:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedAnalysis.applicationId || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Loan Type:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedAnalysis.loanType || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Requested Amount:
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          $
                          {(
                            selectedAnalysis.requestedAmount || 0
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Status:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedAnalysis.status || "In Review"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Credit Scores
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${getCreditScoreColor(
                            selectedAnalysis.creditScore
                          )} mb-2`}
                        >
                          {selectedAnalysis.creditScore || "N/A"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Credit Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                          {selectedAnalysis.riskScore || 0}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Risk Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCreditRatingColor(
                            selectedAnalysis.creditRating
                          )}`}
                        >
                          {selectedAnalysis.creditRating?.toUpperCase() ||
                            "UNRATED"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Metrics */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Financial Metrics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {selectedAnalysis.debtToIncomeRatio || "N/A"}%
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                        Debt-to-Income Ratio
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        ${(selectedAnalysis.annualIncome || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                        Annual Income
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {selectedAnalysis.employmentLength || "N/A"}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                        Years Employed
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-700/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        {selectedAnalysis.creditTrend === "up"
                          ? "↗ Improving"
                          : selectedAnalysis.creditTrend === "down"
                          ? "↘ Declining"
                          : "→ Stable"}
                      </div>
                      <div className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
                        Credit Trend
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Factors */}
                {selectedAnalysis.keyFactors &&
                  selectedAnalysis.keyFactors.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Risk Assessment Factors
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedAnalysis.keyFactors.map((factor, idx) => (
                          <div
                            key={idx}
                            className="bg-white/80 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {factor.name}
                              </h4>
                              <span
                                className={`text-lg font-bold ${
                                  factor.impact === "positive"
                                    ? "text-green-600 dark:text-green-400"
                                    : factor.impact === "negative"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {factor.impact === "positive"
                                  ? "↑"
                                  : factor.impact === "negative"
                                  ? "↓"
                                  : "→"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {factor.value}
                            </p>
                            <div
                              className={`text-xs mt-2 px-2 py-1 rounded-md inline-block ${
                                factor.impact === "positive"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                  : factor.impact === "negative"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {factor.impact} impact
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Analysis Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Analysis Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Analysis Date
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedAnalysis.analysisDate
                          ? new Date(
                              selectedAnalysis.analysisDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Analyst Notes
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedAnalysis.notes ||
                          "No additional notes provided for this analysis."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditAnalysis;

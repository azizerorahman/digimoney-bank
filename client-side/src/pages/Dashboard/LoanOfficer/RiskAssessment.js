import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import useUserInfo from "../../../hooks/useUserInfo";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import { toast } from "react-toastify";
import {
  FileText,
  AlertTriangle,
  Eye,
  BarChart3,
  Shield,
  Search,
  X,
  RefreshCw,
  Download,
} from "lucide-react";

const RiskAssessment = () => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading: userLoading } = useUserInfo(uId);

  // Local state for fetched data
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [riskData, setRiskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchRiskAssessmentData = async () => {
      if (!userInfo || !userInfo._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");

        // Fetch risk assessments
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/risk-assessments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          // Process the risk assessment data
          const assessmentData = response.data[0] || {};
          setRiskData(assessmentData);

          // Create risk assessments from the data structure
          const assessments = [];

          // Add high risk applications
          if (assessmentData.highRiskApplications) {
            assessmentData.highRiskApplications.forEach((app) => {
              assessments.push({
                _id: app.id,
                applicantName: app.applicant,
                applicationId: app.id,
                riskScore: app.riskScore,
                riskLevel:
                  app.riskScore >= 70
                    ? "high"
                    : app.riskScore >= 50
                    ? "medium"
                    : "low",
                factors: app.factors || [],
                recommendation: app.recommendation,
                status: "pending",
                assessmentDate: assessmentData.assessmentDate,
                type: "application",
              });
            });
          }

          // Add fraud alerts as high-risk assessments
          if (assessmentData.fraudAlerts) {
            assessmentData.fraudAlerts.forEach((alert) => {
              assessments.push({
                _id: alert.id,
                applicantName: alert.applicant,
                applicationId: alert.id,
                riskScore: 95, // Fraud alerts are always high risk
                riskLevel: "high",
                factors: ["Identity Mismatch", "Fraud Alert"],
                recommendation: "Immediate Investigation Required",
                status: alert.status?.toLowerCase() || "pending",
                assessmentDate: alert.date,
                alertType: alert.alert,
                severity: alert.severity,
                type: "fraud",
              });
            });
          }

          setRiskAssessments(assessments);
        }
      } catch (err) {
        console.error("Error fetching risk assessment data:", err);
        setError(err.message);
        toast.error("Failed to fetch risk assessment data");
      } finally {
        setLoading(false);
      }
    };

    fetchRiskAssessmentData();
  }, [userInfo]);

  // Memoized filtered risk assessments
  const filteredAssessments = useMemo(() => {
    if (!riskAssessments || riskAssessments.length === 0) return [];

    return riskAssessments.filter((assessment) => {
      const matchesFilter =
        selectedFilter === "all" || assessment.status === selectedFilter;
      const matchesRisk =
        selectedRiskLevel === "all" ||
        assessment.riskLevel === selectedRiskLevel;
      const matchesSearch =
        !searchQuery ||
        assessment.applicantName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        assessment.applicationId
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesRisk && matchesSearch;
    });
  }, [riskAssessments, selectedFilter, selectedRiskLevel, searchQuery]);

  // Memoized statistics
  const riskStats = useMemo(() => {
    const total = riskAssessments.length;
    const highRisk = riskAssessments.filter(
      (a) => a.riskLevel === "high"
    ).length;
    const mediumRisk = riskAssessments.filter(
      (a) => a.riskLevel === "medium"
    ).length;
    const lowRisk = riskAssessments.filter((a) => a.riskLevel === "low").length;
    const pending = riskAssessments.filter(
      (a) => a.status === "pending"
    ).length;
    const fraudAlerts = riskAssessments.filter(
      (a) => a.type === "fraud"
    ).length;

    const avgRiskScore =
      total > 0
        ? Math.round(
            riskAssessments.reduce((sum, a) => sum + a.riskScore, 0) / total
          )
        : 0;

    return {
      total,
      highRisk,
      mediumRisk,
      lowRisk,
      pending,
      fraudAlerts,
      highRiskPercentage: total ? ((highRisk / total) * 100).toFixed(1) : 0,
      avgRiskScore,
      distribution: riskData.riskDistribution || { low: 0, medium: 0, high: 0 },
    };
  }, [riskAssessments, riskData]);

  const handleRefreshData = async () => {
    if (!userInfo || !userInfo._id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/risk-assessments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        const assessmentData = response.data[0] || {};
        setRiskData(assessmentData);

        // Process assessments (same logic as initial fetch)
        const assessments = [];

        if (assessmentData.highRiskApplications) {
          assessmentData.highRiskApplications.forEach((app) => {
            assessments.push({
              _id: app.id,
              applicantName: app.applicant,
              applicationId: app.id,
              riskScore: app.riskScore,
              riskLevel:
                app.riskScore >= 70
                  ? "high"
                  : app.riskScore >= 50
                  ? "medium"
                  : "low",
              factors: app.factors || [],
              recommendation: app.recommendation,
              status: "pending",
              assessmentDate: assessmentData.assessmentDate,
              type: "application",
            });
          });
        }

        if (assessmentData.fraudAlerts) {
          assessmentData.fraudAlerts.forEach((alert) => {
            assessments.push({
              _id: alert.id,
              applicantName: alert.applicant,
              applicationId: alert.id,
              riskScore: 95,
              riskLevel: "high",
              factors: ["Identity Mismatch", "Fraud Alert"],
              recommendation: "Immediate Investigation Required",
              status: alert.status?.toLowerCase() || "pending",
              assessmentDate: alert.date,
              alertType: alert.alert,
              severity: alert.severity,
              type: "fraud",
            });
          });
        }

        setRiskAssessments(assessments);
        toast.success("Data refreshed successfully");
      }
    } catch (err) {
      console.error("Error refreshing data:", err);
      toast.error("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      const exportData = filteredAssessments.map((assessment) => ({
        applicationId: assessment.applicationId,
        applicantName: assessment.applicantName,
        riskScore: assessment.riskScore,
        riskLevel: assessment.riskLevel,
        factors: assessment.factors,
        recommendation: assessment.recommendation,
        status: assessment.status,
        assessmentDate: assessment.assessmentDate,
        type: assessment.type,
      }));

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `risk-assessments-${
        new Date().toISOString().split("T")[0]
      }.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      toast.success("Risk assessment data exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const handleViewDetails = (assessment) => {
    setSelectedAssessment(assessment);
    setShowDetailsModal(true);
  };

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
              Error Loading Risk Assessments
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{error}</p>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const getRiskLevelColor = (level) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700/50 dark:text-red-400";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-400";
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/30 dark:border-gray-700/50 dark:text-gray-400";
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return "text-red-600 dark:text-red-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  const getAssessmentIcon = (type) => {
    switch (type) {
      case "fraud":
        return <Shield className="h-4 w-4" />;
      case "application":
        return <FileText className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-orange-800 dark:from-white dark:via-red-200 dark:to-orange-200 bg-clip-text text-transparent">
                Risk Assessment
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
                Comprehensive risk analysis and fraud detection
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={handleRefreshData}
                disabled={loading}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 bg-white dark:bg-gray-700 border-2 border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh Data
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Risk Statistics Cards */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Total Assessments Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {riskStats.total}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                Total Assessments
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Risk analyzed
              </div>
            </div>

            {/* High Risk Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {riskStats.highRisk}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300 font-medium">
                High Risk
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                {riskStats.highRiskPercentage}% of total
              </div>
            </div>

            {/* Average Risk Score Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
              <div
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 ${getRiskScoreColor(
                  riskStats.avgRiskScore
                )}`}
              >
                {riskStats.avgRiskScore}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-orange-700 dark:text-orange-300 font-medium">
                Avg Risk Score
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                Risk rating
              </div>
            </div>

            {/* Fraud Alerts Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {riskStats.fraudAlerts}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-purple-700 dark:text-purple-300 font-medium">
                Fraud Alerts
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                Active alerts
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Risk Distribution & Controls */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Risk Distribution */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Risk Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      High Risk
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {riskStats.distribution.high || riskStats.highRisk}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Medium Risk
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    {riskStats.distribution.medium || riskStats.mediumRisk}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Low Risk
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {riskStats.distribution.low || riskStats.lowRisk}%
                  </span>
                </div>
              </div>
            </div>

            {/* Assessment Metrics */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Assessment Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Total Analyzed
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {riskStats.total}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Pending Review
                  </span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    {riskStats.pending}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Avg Risk Score
                  </span>
                  <span
                    className={`text-sm font-semibold ${getRiskScoreColor(
                      riskStats.avgRiskScore
                    )}`}
                  >
                    {riskStats.avgRiskScore}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Fraud Alerts
                  </span>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {riskStats.fraudAlerts}
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
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Review High Risk Cases</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Fraud Investigation</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Risk Report</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Risk Trend Analysis</span>
                </button>
                <button
                  onClick={handleExport}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Assessment Data</span>
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
                  Search Risk Assessments
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by applicant name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-40">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="under investigation">
                      Under Investigation
                    </option>
                  </select>
                </div>

                <div className="sm:w-40">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  >
                    <option value="all">All Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Risk Assessment Results */}
        <AnimatedSection delay={250}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Risk Assessment Results ({filteredAssessments.length})
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredAssessments.length} of {riskStats.total || 0}{" "}
                  assessments
                </div>
              </div>
            </div>

            {filteredAssessments.length === 0 ? (
              <div className="p-12 sm:p-16 text-center">
                <Shield className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Risk Assessments Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                  {searchQuery ||
                  selectedFilter !== "all" ||
                  selectedRiskLevel !== "all"
                    ? "No assessments match your current search criteria. Try adjusting your filters."
                    : "No risk assessments have been completed yet. New assessments will appear here once processed."}
                </p>
                {(searchQuery ||
                  selectedFilter !== "all" ||
                  selectedRiskLevel !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("all");
                      setSelectedRiskLevel("all");
                    }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4 p-6 sm:p-8">
                {filteredAssessments.map((assessment, index) => (
                  <div
                    key={assessment._id || index}
                    className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:border-red-300/60 dark:hover:border-red-600/60 transition-all duration-500 hover:shadow-xl hover:shadow-red-100/50 dark:hover:shadow-red-900/30 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/30 dark:to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                              {getAssessmentIcon(assessment.type)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                                {assessment.applicantName ||
                                  "Unknown Applicant"}
                              </h4>
                              <div
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(
                                  assessment.riskLevel
                                )}`}
                              >
                                {assessment.riskLevel.toUpperCase()}
                              </div>
                              {assessment.type === "fraud" && (
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-red-600 text-white border-red-600">
                                  FRAUD ALERT
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-medium">
                                ID: {assessment.applicationId || "N/A"}
                              </span>
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-md capitalize font-medium">
                                Score: {assessment.riskScore}
                              </span>
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md capitalize font-medium">
                                {assessment.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4">
                          <div className="flex items-center gap-6">
                            {/* Risk Score */}
                            <div className="text-center">
                              <div
                                className={`text-2xl sm:text-3xl font-bold ${getRiskScoreColor(
                                  assessment.riskScore
                                )} mb-1`}
                              >
                                {assessment.riskScore}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                Risk Score
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleViewDetails(assessment)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Risk Factors */}
                      {assessment.factors && assessment.factors.length > 0 && (
                        <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Risk Factors:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {assessment.factors
                              .slice(0, 3)
                              .map((factor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-white/80 dark:bg-gray-700/80 rounded-md p-2"
                                >
                                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                    {factor}
                                  </span>
                                  <span className="text-sm font-bold text-red-600 dark:text-red-400">
                                    ⚠
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendation */}
                      {assessment.recommendation && (
                        <div className="bg-yellow-50/80 dark:bg-yellow-900/20 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                            Recommendation:
                          </h5>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {assessment.recommendation}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">Type:</span>
                          <span className="capitalize">
                            {assessment.type === "fraud"
                              ? "Fraud Alert"
                              : "Risk Assessment"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Assessed:</span>
                          <span>
                            {assessment.assessmentDate
                              ? new Date(
                                  assessment.assessmentDate
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
        {showDetailsModal && selectedAssessment && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800/50 dark:to-red-700/50 rounded-xl flex items-center justify-center">
                    {getAssessmentIcon(selectedAssessment.type)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedAssessment.applicantName || "Unknown Applicant"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Risk Assessment Details
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
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Application ID:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedAssessment.applicationId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Assessment Type:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedAssessment.type === "fraud"
                            ? "Fraud Alert"
                            : "Risk Assessment"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Status:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedAssessment.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Assessment Date:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedAssessment.assessmentDate
                            ? new Date(
                                selectedAssessment.assessmentDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Risk Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${getRiskScoreColor(
                            selectedAssessment.riskScore
                          )} mb-2`}
                        >
                          {selectedAssessment.riskScore}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Risk Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(
                            selectedAssessment.riskLevel
                          )}`}
                        >
                          {selectedAssessment.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      {selectedAssessment.type === "fraud" && (
                        <div className="text-center">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white border-red-600">
                            FRAUD ALERT
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                {selectedAssessment.factors &&
                  selectedAssessment.factors.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Risk Factors
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedAssessment.factors.map((factor, idx) => (
                          <div
                            key={idx}
                            className="bg-white/80 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {factor}
                              </h4>
                              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                ⚠
                              </span>
                            </div>
                            <div className="text-xs mt-2 px-2 py-1 rounded-md inline-block bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                              High Impact
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Recommendation */}
                {selectedAssessment.recommendation && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recommendation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedAssessment.recommendation}
                    </p>
                    {selectedAssessment.type === "fraud" &&
                      selectedAssessment.alertType && (
                        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                            Fraud Alert Details:
                          </h4>
                          <p className="text-red-700 dark:text-red-300 text-sm">
                            {selectedAssessment.alertType}
                          </p>
                          {selectedAssessment.severity && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                Severity: {selectedAssessment.severity}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAssessment;

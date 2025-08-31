import { useState } from "react";
import {
  AlertTriangle,
  Shield,
  Eye,
  Flag,
  Lock,
  UserCheck,
  Save,
  Clock,
} from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";

const SecurityAndCompliance = () => {
  const [selectedSecurityEvent, setSelectedSecurityEvent] = useState(null);
  const [showSecurityEventModal, setShowSecurityEventModal] = useState(false);

  // Fetch SuperAdmin data using custom hooks
  const {
    data: superAdminData,
    loading: configLoading,
    error: configError,
  } = useSuperAdminData("complianceAndSecurity");

  // Process data with proper fallbacks and validation
  const securityData = Array.isArray(superAdminData)
    ? superAdminData.find(
        (item) => item.dataType === "complianceAndSecurity"
      ) || superAdminData[0]
    : superAdminData || {};

  const fraudDetection = securityData?.fraudDetection || {};
  const securityMetrics = securityData?.securityMetrics || {};
  const complianceStatus = securityData?.complianceStatus || {};
  const recentSecurityEvents = securityData?.recentSecurityEvents || [];

  // Generate current dates for security events
  const now = new Date();
  const hours2Ago = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const hours5Ago = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const hours8Ago = new Date(now.getTime() - 8 * 60 * 60 * 1000);

  // Update security events with current timestamps
  const updatedSecurityEvents = recentSecurityEvents.map((event, index) => {
    const timestamps = [
      now.toLocaleString(),
      hours2Ago.toLocaleString(),
      hours5Ago.toLocaleString(),
      hours8Ago.toLocaleString(),
    ];
    return {
      ...event,
      timestamp: timestamps[index] || event.timestamp,
    };
  });

  const formatNumber = (number) => {
    if (number === null || number === undefined || isNaN(number)) return "0";
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getSeverityColor = (severity) => {
    if (!severity)
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "low":
        return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const getStatusColor = (status) => {
    if (!status)
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      case "under review":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "investigating":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return (
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        );
      case "medium":
        return (
          <Flag className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        );
      case "low":
        return (
          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      default:
        return <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  // Data validation helper
  const hasValidData = (obj) => obj && Object.keys(obj).length > 0;

  // Use all security events without filtering
  const filteredSecurityEvents = updatedSecurityEvents;

  // Remove useEffect for real-time data simulation since we have real data
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Simulate real-time updates
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // Loading state
  if (configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (configError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
              <h3 className="text-red-800 dark:text-red-200 font-medium text-lg mb-2">
                Error Loading Security & Compliance Data
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">
                {configError}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Security & Compliance
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Monitor security events, compliance status, and fraud detection
            </p>
          </div>
        </AnimatedSection>
        {/* Security Overview Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Fraud Alerts Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Flag className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Fraud Alerts
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(fraudDetection?.totalAlerts || 0)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {fraudDetection?.highRiskAlerts || 0} high risk
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Security Incidents Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Security Incidents
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(securityMetrics?.securityIncidents || 0)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                      {securityMetrics?.failedLoginAttempts || 0} failed logins
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* KYC Compliance Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      KYC Compliance
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {complianceStatus?.kycCompliance || 0}%
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Excellent status
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* AML Compliance Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      AML Compliance
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {complianceStatus?.amlCompliance || 0}%
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {complianceStatus?.complianceScore || 0} score
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Security Events */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="p-6 sm:p-8">
              {hasValidData(filteredSecurityEvents) ? (
                <div className="space-y-4 sm:space-y-6">
                  {filteredSecurityEvents.map((event, index) => (
                    <AnimatedSection
                      key={event.id || index}
                      delay={100 * (index + 1)}
                    >
                      <div
                        className="group p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        onClick={() => {
                          setSelectedSecurityEvent(event);
                          setShowSecurityEventModal(true);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center space-x-2">
                                {getSeverityIcon(event.severity)}
                                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                  {event.type}
                                </span>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                                  event.severity
                                )}`}
                              >
                                {event.severity}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                  event.status
                                )}`}
                              >
                                {event.status}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <UserCheck className="h-4 w-4" />
                                <span>User: {event.affectedUser}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>Time: {event.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Security Events
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {filteredSecurityEvents.length === 0 &&
                    recentSecurityEvents.length > 0
                      ? `No events match the selected severity filter`
                      : `No security events to display`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Security Event Details Modal */}
        <Modal
          isOpen={showSecurityEventModal && selectedSecurityEvent}
          onClose={() => setShowSecurityEventModal(false)}
          title="Security Event Details"
          size="md"
        >
          <div className="space-y-6">
            {/* Essential Event Information */}
            <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                {selectedSecurityEvent?.type}
              </h4>

              {/* Severity and Status */}
              <div className="flex gap-3 mb-4">
                <span
                  className={`px-3 py-2 rounded-lg text-sm font-medium border ${getSeverityColor(
                    selectedSecurityEvent?.severity
                  )}`}
                >
                  {selectedSecurityEvent?.severity} Risk
                </span>
                <span
                  className={`px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                    selectedSecurityEvent?.status
                  )}`}
                >
                  {selectedSecurityEvent?.status}
                </span>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-900 dark:text-white bg-white dark:bg-gray-600 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-500 leading-relaxed">
                  {selectedSecurityEvent?.description}
                </p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    User:
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {selectedSecurityEvent?.affectedUser}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Time:
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {selectedSecurityEvent?.timestamp}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSecurityEventModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-200 hover:scale-105"
              >
                Close
              </button>
              <button
                type="button"
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
              >
                <Save className="h-4 w-4" />
                Take Action
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SecurityAndCompliance;

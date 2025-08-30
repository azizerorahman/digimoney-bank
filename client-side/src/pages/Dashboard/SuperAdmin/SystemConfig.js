import { useState } from "react";
import {
  Settings,
  Server,
  Shield,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  RefreshCcw,
} from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState("rates");

  // Fetch SystemConfiguration data using custom hooks
  const {
    data: systemConfigData,
    loading: configLoading,
    error: configError,
    fetchData: fetchSystemConfig,
  } = useSuperAdminData("systemConfiguration");

  // Debug logging
  console.log("SystemConfig Debug:", {
    systemConfigData,
    configLoading,
    configError,
  });

  // Process data with proper fallbacks and validation
  const systemConfig = Array.isArray(systemConfigData)
    ? systemConfigData.find(
        (item) => item.dataType === "systemConfiguration"
      ) || systemConfigData[0]
    : systemConfigData || {};

  const systemParameters = systemConfig?.systemParameters || {};

  // Generate current dates for backup and maintenance data
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Updated backup status with current dates
  const backupStatus = {
    lastFullBackup: yesterday.toISOString().slice(0, 16).replace("T", " "),
    lastIncrementalBackup: now.toISOString().slice(0, 16).replace("T", " "),
    backupSize: "2.5 TB",
    backupStatus: "Successful",
    retentionPeriod: "7 years",
    offSiteBackup: "Enabled",
  };

  // Updated maintenance data with current dates
  const systemMaintenance = {
    nextScheduledMaintenance: nextWeek
      .toISOString()
      .slice(0, 16)
      .replace("T", " "),
    lastMaintenance: lastWeek.toISOString().slice(0, 16).replace("T", " "),
    maintenanceWindow: "02:00 - 06:00",
    estimatedDowntime: "4 hours",
    affectedServices: ["Online Banking", "Mobile App", "ATM Network"],
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (rate) => {
    if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
    return `${rate}%`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "text-gray-500";
    const statusLower = status.toString().toLowerCase();
    if (
      statusLower.includes("success") ||
      statusLower.includes("enabled") ||
      statusLower.includes("active")
    ) {
      return "text-green-600 dark:text-green-400";
    }
    if (statusLower.includes("warning") || statusLower.includes("pending")) {
      return "text-yellow-600 dark:text-yellow-400";
    }
    if (
      statusLower.includes("error") ||
      statusLower.includes("failed") ||
      statusLower.includes("disabled")
    ) {
      return "text-red-600 dark:text-red-400";
    }
    return "text-blue-600 dark:text-blue-400";
  };

  // Data validation helpers
  const hasValidData = (obj) => obj && Object.keys(obj).length > 0;

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
              <h3 className="text-red-800 dark:text-red-200 font-medium text-lg mb-2">
                Error Loading System Configuration
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">
                {configError}
              </p>
              <button
                onClick={fetchSystemConfig}
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
              System Configuration
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Configure system parameters, limits, and security settings
            </p>
          </div>
        </AnimatedSection>

        {/* Tab Navigation */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="border-b border-gray-200/50 dark:border-gray-700/50">
              <nav
                className="flex space-x-1 sm:space-x-4 px-6 sm:px-8"
                aria-label="Tabs"
              >
                {[
                  {
                    id: "rates",
                    name: "Interest Rates",
                    icon: DollarSign,
                    count: Object.keys(systemParameters?.interestRates || {})
                      .length,
                  },
                  {
                    id: "limits",
                    name: "Transaction Limits",
                    icon: Shield,
                    count: Object.keys(systemParameters?.limits || {}).length,
                  },
                  {
                    id: "security",
                    name: "Security Settings",
                    icon: Settings,
                    count: Object.keys(systemParameters?.securitySettings || {})
                      .length,
                  },
                  {
                    id: "backup",
                    name: "System Status",
                    icon: Server,
                    count:
                      Object.keys(backupStatus).length +
                      Object.keys(systemMaintenance).length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                    {tab.count > 0 && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activeTab === tab.id
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      > 
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === "rates" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                          Interest Rates & Fees
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Current banking rates and fee structure
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {Object.keys(systemParameters?.interestRates || {})
                        .length +
                        Object.keys(systemParameters?.fees || {}).length}{" "}
                      items
                    </div>
                  </div>

                  {/* Interest Rates Grid */}
                  {hasValidData(systemParameters?.interestRates) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                      {Object.entries(systemParameters.interestRates).map(
                        ([key, value], index) => {
                          const colors = [
                            "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-green-200 dark:border-green-700/50 text-green-600 dark:text-green-400",
                            "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400",
                            "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-200 dark:border-purple-700/50 text-purple-600 dark:text-purple-400",
                            "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-200 dark:border-orange-700/50 text-orange-600 dark:text-orange-400",
                            "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400",
                          ];
                          const colorClass = colors[index % colors.length];
                          const textColorClass = colorClass
                            .split(" ")
                            .find((c) => c.startsWith("text-"));
                          const gradientClass = colorClass
                            .split(" ")
                            .slice(0, 4)
                            .join(" ");
                          const borderClass = colorClass
                            .split(" ")
                            .slice(4, 6)
                            .join(" ");

                          return (
                            <div
                              key={key}
                              className={`group bg-gradient-to-br ${gradientClass} border ${borderClass} rounded-xl p-4 sm:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl`}
                            >
                              <div
                                className={`text-2xl sm:text-3xl font-bold ${textColorClass} mb-2 group-hover:scale-110 transition-transform duration-300`}
                              >
                                {formatPercentage(value)}
                              </div>
                              <div
                                className={`text-sm font-medium ${textColorClass
                                  .replace("text-", "text-")
                                  .replace("-400", "-300")
                                  .replace("-600", "-700")}`}
                              >
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                        No Interest Rates Data
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Interest rates configuration not available
                      </p>
                    </div>
                  )}

                  {/* Fees Grid */}
                  {hasValidData(systemParameters?.fees) ? (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Fee Structure
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {Object.entries(systemParameters.fees).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-300 group"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {typeof value === "number" &&
                                  key.toLowerCase().includes("fee")
                                    ? formatCurrency(value)
                                    : `${value}%`}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                        No Fee Structure Data
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Fee configuration not available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "limits" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                          Transaction Limits
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Daily and monthly transaction limits
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {Object.keys(systemParameters?.limits || {}).length}{" "}
                      limits configured
                    </div>
                  </div>

                  {hasValidData(systemParameters?.limits) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {Object.entries(systemParameters.limits).map(
                        ([key, value], index) => {
                          const icons = [
                            Shield,
                            Activity,
                            CheckCircle,
                            Database,
                          ];
                          const IconComponent = icons[index % icons.length];

                          return (
                            <div
                              key={key}
                              className="group bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800 dark:text-white capitalize text-sm">
                                      {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) =>
                                          str.toUpperCase()
                                        )}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                  {formatCurrency(value)}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Maximum allowed
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                        No Transaction Limits Data
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Transaction limits configuration not available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                          Security Settings
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          System security configuration and policies
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {
                        Object.keys(systemParameters?.securitySettings || {})
                          .length
                      }{" "}
                      settings
                    </div>
                  </div>

                  {hasValidData(systemParameters?.securitySettings) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(systemParameters.securitySettings).map(
                        ([key, value], index) => {
                          const isBoolean = typeof value === "boolean";
                          const isEnabled = isBoolean ? value : null;

                          return (
                            <div
                              key={key}
                              className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                                isBoolean
                                  ? isEnabled
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                                  : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                              }`}
                            >
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                  {isBoolean ? (
                                    isEnabled ? (
                                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                                    )
                                  ) : (
                                    <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                  )}
                                </div>
                                <div
                                  className={`text-lg font-bold mb-1 ${
                                    isBoolean
                                      ? isEnabled
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                      : "text-blue-600 dark:text-blue-400"
                                  }`}
                                >
                                  {isBoolean
                                    ? value
                                      ? "Enabled"
                                      : "Disabled"
                                    : value +
                                      (typeof value === "number" &&
                                      key.includes("Timeout")
                                        ? " min"
                                        : typeof value === "number" &&
                                          key.includes("Expiry")
                                        ? " days"
                                        : typeof value === "number"
                                        ? ""
                                        : "")}
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                        No Security Settings Data
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Security configuration not available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "backup" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <Server className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                          System Status & Backup
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Backup information and system maintenance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          (backupStatus?.backupStatus || "")
                            .toLowerCase()
                            .includes("success")
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } animate-pulse`}
                      ></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Live Status
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Backup Information */}
                    {hasValidData(backupStatus) ? (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-green-800 dark:text-green-200 text-lg flex items-center">
                            <Database className="h-5 w-5 mr-2" />
                            Backup Information
                          </h4>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              backupStatus.backupStatus
                            )} bg-white dark:bg-gray-800`}
                          >
                            {backupStatus.backupStatus || "Unknown"}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(backupStatus).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-2 border-b border-green-200/50 dark:border-green-700/50 last:border-b-0"
                            >
                              <span className="text-sm text-green-700 dark:text-green-300 capitalize flex items-center">
                                {key === "lastFullBackup" && (
                                  <Clock className="h-4 w-4 mr-1" />
                                )}
                                {key === "backupSize" && (
                                  <Database className="h-4 w-4 mr-1" />
                                )}
                                {key === "backupStatus" && (
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                )}
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                                :
                              </span>
                              <span className="font-medium text-green-800 dark:text-green-200 text-sm">
                                {key.includes("Backup") &&
                                !key.includes("Status")
                                  ? formatDateTime(value)
                                  : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                          No Backup Data
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Backup information not available
                        </p>
                      </div>
                    )}

                    {/* System Maintenance */}
                    {hasValidData(systemMaintenance) ? (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-blue-800 dark:text-blue-200 text-lg flex items-center">
                            <Settings className="h-5 w-5 mr-2" />
                            System Maintenance
                          </h4>
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300">
                            {systemMaintenance.estimatedDowntime || "Unknown"}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(systemMaintenance).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between items-center py-2 border-b border-blue-200/50 dark:border-blue-700/50 last:border-b-0"
                              >
                                <span className="text-sm text-blue-700 dark:text-blue-300 capitalize flex items-center">
                                  {key.includes("next") && (
                                    <Clock className="h-4 w-4 mr-1" />
                                  )}
                                  {key.includes("last") && (
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                  )}
                                  {key.includes("window") && (
                                    <Activity className="h-4 w-4 mr-1" />
                                  )}
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                  :
                                </span>
                                <span className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : key.includes("Maintenance") &&
                                      !key.includes("Window") &&
                                      !key.includes("Downtime")
                                    ? formatDateTime(value)
                                    : value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-600">
                        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                          No Maintenance Data
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Maintenance information not available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* System Actions */}
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                      <RefreshCcw className="h-5 w-5 mr-2" />
                      System Actions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        onClick={() => {
                          fetchSystemConfig();
                        }}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        <RefreshCcw className="h-4 w-4" />
                        <span>Refresh Data</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">
                        <CheckCircle className="h-4 w-4" />
                        <span>Run Backup</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">
                        <Settings className="h-4 w-4" />
                        <span>Maintenance</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SystemConfig;

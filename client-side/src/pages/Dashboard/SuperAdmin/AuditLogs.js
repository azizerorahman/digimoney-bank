import { useState, useEffect } from "react";
import { Search, User, FileText, AlertTriangle, Download } from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const AuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterTimeRange, setFilterTimeRange] = useState("30d");
  const [realTimeData, setRealTimeData] = useState({});

  // Fetch SuperAdmin data using custom hooks
  const {
    data: auditLogsData,
    loading: auditLogsLoading,
    error: auditLogsError,
    fetchData: fetchAuditLogs,
  } = useSuperAdminData("auditLogs");

  const {
    loading: systemOverviewLoading,
    error: systemOverviewError,
    fetchData: fetchSystemOverview,
  } = useSuperAdminData("systemOverview");

  // Loading and error states
  const isLoading = auditLogsLoading || systemOverviewLoading;
  const hasError = auditLogsError || systemOverviewError;

  // Process data with proper fallbacks
  const auditLogs = auditLogsData?.logs || [];

  // Helper functions
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Time filtering helper
  const isWithinTimeRange = (timestamp, range) => {
    const logDate = new Date(timestamp);
    const now = new Date();
    const diffHours = (now - logDate) / (1000 * 60 * 60);

    switch (range) {
      case "1h":
        return diffHours <= 1;
      case "24h":
        return diffHours <= 24;
      case "7d":
        return diffHours <= 168; // 7 * 24
      case "30d":
        return diffHours <= 720; // 30 * 24
      default:
        return true;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "Login":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Logout":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      case "Update":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
      case "Delete":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Create":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400";
      case "View":
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Failed":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  // Filter audit logs based on search, action, and time range
  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = filterAction === "all" || log.action === filterAction;

    // Apply time range filtering
    const matchesTimeRange = isWithinTimeRange(log.timestamp, filterTimeRange);

    return matchesSearch && matchesAction && matchesTimeRange;
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        lastUpdate: new Date().toLocaleTimeString(),
        activeUsers: Math.floor(Math.random() * 50) + 100,
        pendingTransactions: Math.floor(Math.random() * 20) + 5,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get activity stats
  const activityStats = {
    totalLogs: auditLogs.length,
    successfulActions: auditLogs.filter((log) => log.status === "Success")
      .length,
    failedActions: auditLogs.filter((log) => log.status === "Failed").length,
    systemActions: auditLogs.filter((log) => log.userId === "system").length,
  };

  const refreshAllData = () => {
    fetchAuditLogs();
    fetchSystemOverview();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
              <h3 className="text-red-800 dark:text-red-200 font-medium text-lg mb-2">
                Error Loading Audit Logs
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">
                {auditLogsError || systemOverviewError}
              </p>
              <button
                onClick={refreshAllData}
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10 lg:mb-12">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Audit Logs
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                Track and monitor all system activities and user actions
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Real-time System Status - Moved to Top */}
        <AnimatedSection delay={150}>
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-800/20 backdrop-blur-xl shadow-xl rounded-2xl sm:rounded-3xl border border-green-200/60 dark:border-green-700/40 p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500 hover:shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-200 mb-1">
                    System Status: Operational
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Last updated: {realTimeData.lastUpdate || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Active Users: {realTimeData.activeUsers || 125}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                    Pending: {realTimeData.pendingTransactions || 12}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Summary Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Logs Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(activityStats.totalLogs)}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-blue-700 dark:text-blue-300 font-medium">
                Total Logs
              </div>
            </div>

            {/* Successful Actions Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(activityStats.successfulActions)}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-700 dark:text-green-300 font-medium">
                Successful
              </div>
            </div>

            {/* Failed Actions Card */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(activityStats.failedActions)}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-red-700 dark:text-red-300 font-medium">
                Failed
              </div>
            </div>

            {/* System Actions Card */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(activityStats.systemActions)}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-purple-700 dark:text-purple-300 font-medium">
                System Actions
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filters Section */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search logs by user, action, or details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Action Filter */}
              <div className="lg:w-48">
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                >
                  <option value="all">All Actions</option>
                  <option value="Login">Login</option>
                  <option value="Logout">Logout</option>
                  <option value="Create">Create</option>
                  <option value="Update">Update</option>
                  <option value="Delete">Delete</option>
                  <option value="View">View</option>
                </select>
              </div>

              {/* Time Range Filter */}
              <div className="lg:w-48">
                <select
                  value={filterTimeRange}
                  onChange={(e) => setFilterTimeRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>

              {/* Export Button */}
              <button className="lg:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Audit Logs Table */}
        <AnimatedSection delay={400}>
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-gray-50/90 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-900/90 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden transition-all duration-500 hover:shadow-3xl">
            {/* Enhanced Table Header */}
            <div className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-blue-900/30 dark:to-indigo-900/30 px-6 py-6 border-b border-gray-200/60 dark:border-gray-700/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Audit Trail
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/70 dark:bg-gray-700/70 rounded-lg px-4 py-2 border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {filteredAuditLogs.length} / {auditLogs.length} entries
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50/90 via-slate-50/90 to-gray-100/90 dark:from-gray-700/90 dark:via-slate-700/90 dark:to-gray-800/90 backdrop-blur-sm">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      <div className="flex items-center gap-2">
                        <span>Timestamp</span>
                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>User</span>
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      Action
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      Resource & Details
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      IP Address
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b-2 border-gray-200/50 dark:border-gray-600/50">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/40 dark:divide-gray-600/40 bg-gradient-to-b from-white/40 to-gray-50/40 dark:from-gray-800/40 dark:to-gray-900/40">
                  {filteredAuditLogs.length > 0 ? (
                    filteredAuditLogs.map((log, index) => (
                      <tr
                        key={log.id || index}
                        className="group hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-indigo-50/60 hover:to-purple-50/80 dark:hover:from-blue-900/20 dark:hover:via-indigo-900/15 dark:hover:to-purple-900/20 transition-all duration-300 border-b border-gray-100/40 dark:border-gray-700/40"
                      >
                        <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {log.timestamp}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(log.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-11 w-11">
                              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                                <User className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {log.userName || log.userId}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {log.userId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold shadow-lg border ${getActionColor(
                              log.action
                            )} group-hover:scale-105 group-hover:shadow-xl transition-all duration-300`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-5">
                          <div className="max-w-xs">
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {log.resource}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg truncate">
                              {log.details}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                              {log.ipAddress}
                            </code>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold shadow-lg border ${getStatusColor(
                              log.status
                            )} group-hover:scale-105 group-hover:shadow-xl transition-all duration-300`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                            <FileText className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            No audit logs found
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 max-w-md text-center leading-relaxed">
                            {searchQuery || filterAction !== "all"
                              ? "Try adjusting your search filters or time range to see more results."
                              : "Audit logs will appear here as system activities occur. The system is currently monitoring all activities."}
                          </p>
                          <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>Monitoring active</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AuditLogs;

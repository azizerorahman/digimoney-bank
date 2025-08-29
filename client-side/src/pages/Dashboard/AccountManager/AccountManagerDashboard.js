import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import {
  TrendingUp,
  Calendar,
  ArrowRight,
  Clock,
  FileText,
  Phone,
  MapPin,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  UserPlus,
} from "lucide-react";

const AccountManagerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [dashboardData] = useState({
    metrics: {
      totalClients: 142,
      totalAUM: 85600000,
      monthlyRevenue: 284500,
      quarterlyTarget: 950000,
      targetProgress: 72,
      newClientsThisMonth: 8,
      clientRetentionRate: 96.8,
      avgClientValue: 602816,
    },
    recentActivity: [
      {
        id: 1,
        type: "meeting",
        client: "Robert Chen",
        action: "Portfolio Review Completed",
        time: "2 hours ago",
        status: "completed",
      },
      {
        id: 2,
        type: "call",
        client: "Maria Garcia",
        action: "Investment Strategy Call",
        time: "4 hours ago",
        status: "completed",
      },
      {
        id: 3,
        type: "alert",
        client: "David Kim",
        action: "Risk Assessment Required",
        time: "1 day ago",
        status: "pending",
      },
      {
        id: 4,
        type: "meeting",
        client: "Jennifer Lee",
        action: "Quarterly Review Scheduled",
        time: "2 days ago",
        status: "scheduled",
      },
    ],
    topClients: [
      {
        name: "Robert Chen",
        portfolio: 3200000,
        growth: 12.5,
        riskLevel: "Moderate",
        lastContact: "Today",
      },
      {
        name: "Maria Garcia",
        portfolio: 2800000,
        growth: 8.3,
        riskLevel: "Conservative",
        lastContact: "Yesterday",
      },
      {
        name: "David Kim",
        portfolio: 2400000,
        growth: -2.1,
        riskLevel: "Aggressive",
        lastContact: "3 days ago",
      },
      {
        name: "Jennifer Lee",
        portfolio: 1900000,
        growth: 15.2,
        riskLevel: "Moderate",
        lastContact: "1 week ago",
      },
    ],
    upcomingMeetings: [
      {
        client: "Alex Thompson",
        type: "Portfolio Review",
        time: "10:00 AM",
        date: "Today",
        location: "Conference Room A",
      },
      {
        client: "Linda Wilson",
        type: "Risk Assessment",
        time: "2:30 PM",
        date: "Today",
        location: "Virtual Meeting",
      },
      {
        client: "Michael Brown",
        type: "Investment Planning",
        time: "11:00 AM",
        date: "Tomorrow",
        location: "Client Office",
      },
    ],
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "meeting":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "call":
        return <Phone className="w-5 h-5 text-green-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            Scheduled
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
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
              Account Manager Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Manage your client relationships and portfolio performance
            </p>
          </div>
        </AnimatedSection>

        {/* Key Metrics Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 text-blue-600 dark:text-blue-400">
                {formatNumber(dashboardData.metrics.totalClients)}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                Active Clients
              </div>
            </div>

            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 text-green-600 dark:text-green-400">
                ${(dashboardData.metrics.totalAUM / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                Assets Under Management
              </div>
            </div>

            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 text-purple-600 dark:text-purple-400">
                ${(dashboardData.metrics.monthlyRevenue / 1000).toFixed(0)}K
              </div>
              <div className="text-xs sm:text-sm md:text-base text-purple-700 dark:text-purple-300 font-medium">
                Monthly Revenue
              </div>
            </div>

            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 text-yellow-600 dark:text-yellow-400">
                {dashboardData.metrics.clientRetentionRate}%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-yellow-700 dark:text-yellow-300 font-medium">
                Client Retention Rate
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection delay={300}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 mr-4">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Add New Client
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Onboard new customer
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 mr-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      Schedule Meeting
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Book client consultation
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 mr-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Generate Report
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Create performance report
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Content Grid - Improved Layout */}
        <div className="space-y-4">
          {/* Recent Activity - Full Width Section */}
          <AnimatedSection delay={400}>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                  Recent Activity
                </h3>
                <button
                  onClick={() =>
                    navigate("/dashboard/account-manager/communications")
                  }
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 hover:bg-gray-100/90 dark:hover:bg-gray-600/90 transition-all duration-300 group border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/70 dark:hover:border-gray-500/70"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center transition-all duration-300 shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {activity.client}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Upcoming Meetings - Full Width Section */}
          <AnimatedSection delay={500}>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                  Upcoming Meetings
                </h3>
                <button
                  onClick={() =>
                    navigate("/dashboard/account-manager/calendar")
                  }
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 group p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {dashboardData.upcomingMeetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                            {meeting.client}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {meeting.type}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          <span className="font-medium">
                            {meeting.time} • {meeting.date}
                          </span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Top Clients */}
        <AnimatedSection delay={600}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500 mt-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Top Clients by Portfolio Value
              </h3>
              <button
                onClick={() => navigate("/dashboard/account-manager/portfolio")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {dashboardData.topClients.map((client, index) => (
                <AnimatedSection key={index} delay={650 + index * 50}>
                  <div className="group p-4 sm:p-5 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 hover:bg-gray-100/90 dark:hover:bg-gray-600/90 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/70 dark:hover:border-gray-500/70">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {client.name}
                      </h4>
                      <div className="flex items-center">
                        {client.growth >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        <span
                          className={`text-xs font-bold ml-1 px-2 py-1 rounded-full ${
                            client.growth >= 0
                              ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30"
                              : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30"
                          }`}
                        >
                          {client.growth > 0 ? "+" : ""}
                          {client.growth}%
                        </span>
                      </div>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                      ${(client.portfolio / 1000000).toFixed(1)}M
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Risk Level:
                        </span>
                        <span
                          className={`font-bold px-2 py-1 rounded-full text-xs ${
                            client.riskLevel === "Conservative"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              : client.riskLevel === "Moderate"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {client.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Last Contact:
                        </span>
                        <span className="text-gray-900 dark:text-white font-bold">
                          {client.lastContact}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AccountManagerDashboard;

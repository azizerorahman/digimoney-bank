import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const AlertsAndNotifications = () => {
  const uId = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              uId,
            },
          }
        );

        if (res.data && res.data.success) {
          setNotifications(res.data.notifications);
        } else {
          toast.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [uId]);

  // Helper function to get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "balance_alert":
        return "⚠️";
      case "large_transaction":
        return "💰";
      case "security_alert":
        return "🔒";
      case "budget_alert":
        return "📊";
      case "credit_score":
        return "📈";
      case "payment_reminder":
        return "📅";
      default:
        return "🔔";
    }
  };

  // Helper function to get notification color
  const getNotificationColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600";
      case "high":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600";
      case "medium":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600";
      case "low":
        return "bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-400 dark:border-gray-600";
    }
  };

  // Helper function to get icon color
  const getIconColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-400";
      case "high":
        return "bg-yellow-400";
      case "medium":
        return "bg-blue-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  // Count notifications by priority
  const notificationCounts = {
    critical: notifications.filter((n) => n.priority === "critical").length,
    high: notifications.filter((n) => n.priority === "high").length,
    medium: notifications.filter((n) => n.priority === "medium").length,
    low: notifications.filter((n) => n.priority === "low").length,
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Alerts & Notifications
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Stay updated with your financial activities
            </p>
          </div>
        </AnimatedSection>

        {/* Summary Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Critical Alerts Card */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {notificationCounts.critical}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-red-700 dark:text-red-300 font-medium">
                Critical
              </div>
            </div>

            {/* High Priority Card */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {notificationCounts.high}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-yellow-700 dark:text-yellow-300 font-medium">
                High Priority
              </div>
            </div>

            {/* Medium Priority Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {notificationCounts.medium}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-blue-700 dark:text-blue-300 font-medium">
                Medium
              </div>
            </div>

            {/* Low Priority Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {notificationCounts.low}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-700 dark:text-green-300 font-medium">
                Low Priority
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          {/* All Alerts Combined */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${getNotificationColor(
                      notification.priority
                    )}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconColor(
                          notification.priority
                        )}`}
                      >
                        <span className="text-white">
                          {getNotificationIcon(notification.notificationType)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        {notification.amount && (
                          <span
                            className={`text-lg font-bold ${
                              notification.priority === "critical"
                                ? "text-red-600"
                                : notification.priority === "high"
                                ? "text-yellow-600"
                                : notification.priority === "medium"
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            {notification.notificationType === "credit_score"
                              ? `+${notification.amount}`
                              : notification.notificationType ===
                                "balance_alert"
                              ? `$${notification.amount}`
                              : notification.notificationType ===
                                "large_transaction"
                              ? `-$${notification.amount}`
                              : notification.notificationType === "budget_alert"
                              ? `$${notification.amount}`
                              : notification.notificationType ===
                                "payment_reminder"
                              ? `$${notification.amount}`
                              : notification.amount}
                          </span>
                        )}
                        {notification.accountType && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.accountType}
                          </p>
                        )}
                        {notification.action && (
                          <button
                            className={`mt-2 px-3 py-1 text-white text-xs rounded-full transition-all duration-300 ${
                              notification.priority === "critical"
                                ? "bg-red-600 hover:bg-red-700"
                                : notification.priority === "high"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">�</div>
                  <div className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                    No Recent Notifications
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    All caught up! No new notifications at this time.
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

export default AlertsAndNotifications;

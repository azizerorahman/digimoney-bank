import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const InvestmentPortfolio = () => {
  const uId = localStorage.getItem("userId");
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/investment-portfolios`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.success) {
          setPortfolio(res.data.portfolio);
        } else {
          toast.error("Failed to fetch investment portfolio");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        toast.error("Failed to fetch investment portfolio");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [uId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">
                📊
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                No Investment Portfolio Found
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                You don't have an investment portfolio yet.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  // Risk level color mapping
  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "#00A389";
      case "Moderate":
        return "#ffc658";
      case "High":
        return "#ff4444";
      default:
        return "#gray";
    }
  };

  // Colors for composition chart
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

  // Risk indicator component
  const RiskIndicator = ({ level, score }) => (
    <div className="flex items-center space-x-2">
      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${(score / 10) * 100}%`,
            backgroundColor: getRiskColor(level),
          }}
        />
      </div>
      <span
        className={`text-sm font-medium`}
        style={{ color: getRiskColor(level) }}
      >
        {level} ({score}/10)
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Investment Portfolio
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Track your investment performance and portfolio composition
            </p>
          </div>
        </AnimatedSection>

        {/* Portfolio Overview Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Portfolio Value */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-blue-200/30 dark:hover:shadow-blue-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-2">
                    Total Portfolio Value
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    ${portfolio.totalValue?.toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Gain/Loss */}
            <div
              className={`group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                portfolio.totalGainLoss >= 0
                  ? "hover:shadow-green-200/30 dark:hover:shadow-green-900/30"
                  : "hover:shadow-red-200/30 dark:hover:shadow-red-900/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-2">
                    Total Gain/Loss
                  </p>
                  <h3
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold group-hover:scale-110 transition-transform duration-300 ${
                      portfolio.totalGainLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {portfolio.totalGainLoss >= 0 ? "+" : ""}$
                    {portfolio.totalGainLoss?.toLocaleString()}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      portfolio.totalGainLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ({portfolio.totalGainLoss >= 0 ? "+" : ""}
                    {portfolio.totalGainLossPercentage}%)
                  </p>
                </div>
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 ${
                    portfolio.totalGainLoss >= 0
                      ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20"
                      : "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${
                      portfolio.totalGainLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        portfolio.totalGainLoss >= 0
                          ? "M7 11l5-5m0 0l5 5m-5-5v12"
                          : "M17 13l-5 5m0 0l-5-5m5 5V6"
                      }
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-orange-200/30 dark:hover:shadow-orange-900/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-2">
                    Portfolio Risk
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {portfolio.riskLevel}
                  </h3>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
              <RiskIndicator
                level={portfolio.riskLevel}
                score={portfolio.riskScore}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Charts Section */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Portfolio Composition - Pie Chart */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Portfolio Composition
              </h3>
              <div className="h-64 sm:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolio.composition}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={
                        window.innerWidth < 640
                          ? 60
                          : window.innerWidth < 1024
                          ? 70
                          : 80
                      }
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolio.composition?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                {portfolio.composition?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3"
                  >
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {item.name}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white ml-auto">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Over Time - Line Chart */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Performance Over Time
              </h3>
              <div className="h-64 sm:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolio.performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      fontSize={window.innerWidth < 640 ? 10 : 12}
                      tick={{ fill: "currentColor" }}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                      fontSize={window.innerWidth < 640 ? 10 : 12}
                      tick={{ fill: "currentColor" }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Portfolio Value",
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{
                        fill: "#8884d8",
                        strokeWidth: 2,
                        r: window.innerWidth < 640 ? 4 : 6,
                      }}
                      activeDot={{ r: window.innerWidth < 640 ? 6 : 8 }}
                      name="Portfolio Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Summary */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    6-Month Performance
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                    +
                    {portfolio.performanceHistory &&
                    portfolio.performanceHistory.length > 0
                      ? (
                          ((portfolio.totalValue -
                            portfolio.performanceHistory[0].value) /
                            portfolio.performanceHistory[0].value) *
                          100
                        ).toFixed(2)
                      : "0.00"}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
export default InvestmentPortfolio;

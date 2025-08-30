import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const LoanAndMortgageManagement = () => {
  const uId = localStorage.getItem("userId");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loans data
  useEffect(() => {
    const fetchLoans = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/loans`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setLoans(response.data.loans || []);
        } else {
          toast.error(response.data.message || "Failed to fetch loans data");
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        if (error.response?.status === 400) {
          toast.error("User ID is required");
        } else if (error.response?.status === 500) {
          toast.error("Server error occurred");
        } else {
          toast.error("Error loading loans data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [uId]);

  // Get primary loan (first one) for main display
  const primaryLoan = loans.length > 0 ? loans[0] : null;

  // Single loading screen for better UX
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  // If no loans found
  if (!primaryLoan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">
                🏦
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                No Loans Found
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                You don't have any loans registered in the system.
              </p>
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
              Loan & Mortgage Management
            </h1>
          </div>
        </AnimatedSection>

        {/* Outstanding Balance with Full Circle Gauge */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Outstanding Balance
              </h3>
              <div className="flex flex-col items-center">
                {/* Full Circle Gauge - Responsive */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-4 sm:mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Paid",
                            value:
                              primaryLoan.originalAmount -
                              primaryLoan.currentBalance,
                          },
                          {
                            name: "Remaining",
                            value: primaryLoan.currentBalance,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={
                          window.innerWidth < 640
                            ? 55
                            : window.innerWidth < 1024
                            ? 65
                            : 75
                        }
                        outerRadius={
                          window.innerWidth < 640
                            ? 75
                            : window.innerWidth < 1024
                            ? 85
                            : 95
                        }
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#EF4444" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Content - Responsive */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      ${primaryLoan.currentBalance.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium">
                      Remaining
                    </div>
                    <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-semibold mt-1 sm:mt-2">
                      {(
                        ((primaryLoan.originalAmount -
                          primaryLoan.currentBalance) /
                          primaryLoan.originalAmount) *
                        100
                      ).toFixed(1)}
                      % Paid
                    </div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="text-center space-y-2 sm:space-y-3 w-full">
                  <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Total Loan
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                      ${primaryLoan.originalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                    $
                    {(
                      primaryLoan.originalAmount - primaryLoan.currentBalance
                    ).toLocaleString()}{" "}
                    already paid
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule Timeline */}
            <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Payment Schedule Timeline
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {primaryLoan.paymentHistory &&
                  primaryLoan.paymentHistory.slice(-3).map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 sm:space-x-4 text-gray-800 dark:text-white"
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                          <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-white truncate">
                            {payment.date}
                          </span>
                          <span className="text-sm sm:text-base text-green-600 dark:text-green-400 font-bold">
                            ${payment.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Principal: ${payment.principal.toLocaleString()} |
                          Interest: ${payment.interest.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Upcoming Payments */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    Upcoming Payments
                  </h4>
                  {["2025-07-01", "2025-08-01", "2025-09-01"].map(
                    (date, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 sm:space-x-4 opacity-70 text-gray-800 dark:text-white"
                      >
                        <div className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                            <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-white truncate">
                              {date}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                              ${primaryLoan.monthlyPayment.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Principal vs Interest Breakdown */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-800 dark:text-white">
              Principal vs Interest Breakdown
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <div className="h-64 sm:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Principal Paid",
                          value: primaryLoan.principalPaid,
                          color: "#10B981",
                        },
                        {
                          name: "Interest Paid",
                          value: primaryLoan.interestPaid,
                          color: "#F59E0B",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) =>
                        window.innerWidth < 640
                          ? `${name.split(" ")[0]}: $${(value / 1000).toFixed(
                              0
                            )}k`
                          : `${name}: $${value.toLocaleString()}`
                      }
                      outerRadius={
                        window.innerWidth < 640
                          ? 80
                          : window.innerWidth < 1024
                          ? 90
                          : 100
                      }
                      dataKey="value"
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="group p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl sm:rounded-2xl border border-green-200 dark:border-green-700/50 transition-all duration-300 hover:scale-105">
                  <h4 className="text-sm sm:text-base font-bold text-green-800 dark:text-green-400 mb-2">
                    Total Principal Paid
                  </h4>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-105 transition-transform duration-300">
                    ${primaryLoan.principalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="group p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-xl sm:rounded-2xl border border-yellow-200 dark:border-yellow-700/50 transition-all duration-300 hover:scale-105">
                  <h4 className="text-sm sm:text-base font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                    Total Interest Paid
                  </h4>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-105 transition-transform duration-300">
                    ${primaryLoan.interestPaid.toLocaleString()}
                  </p>
                </div>
                <div className="group p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-700/50 transition-all duration-300 hover:scale-105">
                  <h4 className="text-sm sm:text-base font-bold text-blue-800 dark:text-blue-400 mb-2">
                    Interest Savings Opportunity
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-600 dark:text-blue-400">
                    Early payments could save $
                    {(primaryLoan.currentBalance * 0.15).toLocaleString()} in
                    interest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
export default LoanAndMortgageManagement;

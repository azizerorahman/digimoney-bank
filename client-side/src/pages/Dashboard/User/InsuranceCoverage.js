import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const InsuranceCoverage = () => {
  const uId = localStorage.getItem("userId");
  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/insurances`,
          {
            params: { uId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Insurance data fetched successfully:", res.data);
        if (res.data && res.data.success) {
          setInsuranceData(res.data.insurance);
          console.log("Insurance data set:", res.data.insurance);
        } else {
          toast.error("Failed to fetch insurance data");
        }
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        toast.error("Failed to fetch insurance data");
      } finally {
        setLoading(false);
      }
    };
    fetchInsuranceData();
  }, [uId]);

  // Helper function to get insurance type icon
  const getInsuranceIcon = (type) => {
    switch (type) {
      case "Auto Insurance":
        return "🚗";
      case "Home Insurance":
        return "🏠";
      case "Life Insurance":
        return "🛡️";
      case "Health Insurance":
        return "🏥";
      case "Travel Insurance":
        return "✈️";
      default:
        return "📋";
    }
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Settled":
      case "Paid":
        return "text-green-600 dark:text-green-400";
      case "Pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "Denied":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-orange-600 dark:text-orange-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (!insuranceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">
                🛡️
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                No Insurance Data Found
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                No insurance coverage information available at this time.
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
              Insurance Coverage
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Manage your insurance policies and track coverage details
            </p>
          </div>
        </AnimatedSection>

        {/* Total Annual Premiums Card */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500 hover:shadow-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Total Annual Premiums
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Combined yearly insurance costs
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">💰</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${insuranceData.totalPremiums?.toLocaleString() || "0"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Annual Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Insurance Policies Grid */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {insuranceData.policies?.map((policy, index) => (
              <div
                key={policy.id}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <span className="text-xl sm:text-2xl">
                        {getInsuranceIcon(policy.type)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-white">
                        {policy.type}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {policy.provider}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Policy: {policy.policyNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300">
                      ${policy.premium?.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Annual Premium
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Deductible
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white">
                      ${policy.deductible?.toLocaleString() || "N/A"}
                    </span>
                  </div>

                  {policy.type === "Auto Insurance" && policy.vehicles && (
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Vehicle:
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white ml-2">
                        {policy.vehicles[0]?.year} {policy.vehicles[0]?.make}{" "}
                        {policy.vehicles[0]?.model}
                      </span>
                    </div>
                  )}

                  {policy.type === "Life Insurance" && (
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                        Coverage Amount
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white">
                        ${policy.faceValue?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {policy.discounts && policy.discounts.length > 0 && (
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        Discounts:
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 ml-2">
                        {policy.discounts.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Recent Claims Section */}
        {insuranceData.claimsHistory &&
          insuranceData.claimsHistory.length > 0 && (
            <AnimatedSection delay={400}>
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-800 dark:text-white">
                  Recent Claims
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {insuranceData.claimsHistory.map((claim, index) => (
                    <div
                      key={index}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border border-gray-200/50 dark:border-gray-600/50 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50 transition-all duration-300 hover:scale-105 space-y-3 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                          <span className="text-lg sm:text-xl">📋</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white truncate">
                            {claim.description}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            {claim.type} •{" "}
                            {new Date(claim.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300">
                          ${claim.amount?.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs sm:text-sm font-medium ${getStatusColor(
                            claim.status
                          )}`}
                        >
                          {claim.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
      </div>
    </div>
  );
};

export default InsuranceCoverage;

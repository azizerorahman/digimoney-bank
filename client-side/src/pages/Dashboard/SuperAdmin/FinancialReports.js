import { DollarSign, TrendingUp, Target, ArrowUp } from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const FinancialReports = () => {
  const {
    data: financialReportingData,
    loading,
    error,
    fetchData,
  } = useSuperAdminData("financialReporting");

  // Debug logging
  console.log("FinancialReports Debug:", {
    financialReportingData,
    loading,
    error,
    dataType: "financialReporting",
    isUsingFallbackData: !financialReportingData,
  });

  // Process financial data with proper fallbacks based on the JSON data structure
  const financialData = financialReportingData;

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <AnimatedSection delay={100}>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
              <h3 className="text-red-800 dark:text-red-200 font-medium text-lg mb-2">
                Error Loading Financial Reports
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchData}
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
        <AnimatedSection delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10 lg:mb-12">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Financial Reports
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
                Comprehensive financial analytics and performance metrics
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Performance Metrics */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Revenue Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-green-700 dark:text-green-300 mb-1 sm:mb-2">
                    Total Revenue
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      financialData?.profitLoss?.totalRevenue || 0
                    )}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  12.5% from last quarter
                </span>
              </div>
            </div>

            {/* Net Income Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-blue-700 dark:text-blue-300 mb-1 sm:mb-2">
                    Net Income
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(financialData?.profitLoss?.netIncome || 0)}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  8.2% from last quarter
                </span>
              </div>
            </div>

            {/* ROA Card */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-purple-700 dark:text-purple-300 mb-1 sm:mb-2">
                    ROA
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {financialData?.performanceMetrics?.roa || 0}%
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  0.3% from last quarter
                </span>
              </div>
            </div>

            {/* ROE Card */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-orange-700 dark:text-orange-300 mb-1 sm:mb-2">
                    ROE
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {financialData?.performanceMetrics?.roe || 0}%
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  1.2% from last quarter
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Profit & Loss Statement */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Profit & Loss Statement
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-base sm:text-lg">
                    Revenue
                  </h4>
                  <div className="pl-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Interest Income
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.interestIncome || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Fee Income
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.feeIncome || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3 border-gray-200 dark:border-gray-600">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        Total Revenue
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400 text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.totalRevenue || 0
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-base sm:text-lg">
                    Expenses
                  </h4>
                  <div className="pl-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Operating Expenses
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.operatingExpenses || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Provision for Losses
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.provisionForLosses || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3 border-gray-200 dark:border-gray-600">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        Total Expenses
                      </span>
                      <span className="font-bold text-red-600 dark:text-red-400 text-sm sm:text-base">
                        {formatCurrency(
                          financialData?.profitLoss?.totalExpenses || 0
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Net Income
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(
                        financialData?.profitLoss?.netIncome || 0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Credit Risk
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Exposure
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        financialData?.riskManagement?.creditRisk
                          ?.totalExposure || 0
                      )}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      NPL Ratio
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                      {financialData?.riskManagement?.creditRisk?.nplRatio || 0}
                      %
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Provisioning
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        financialData?.riskManagement?.creditRisk
                          ?.provisioning || 0
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Market Risk
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      VaR (95%)
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        financialData?.riskManagement?.marketRisk?.var95 || 0
                      )}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Interest Rate Risk
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        financialData?.riskManagement?.marketRisk
                          ?.interestRateRisk || 0
                      )}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Currency Risk
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        financialData?.riskManagement?.marketRisk
                          ?.currencyRisk || 0
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Capital Adequacy */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Capital Adequacy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                  <p className="text-sm sm:text-base text-green-700 dark:text-green-300 mb-3 font-medium">
                    Capital Ratio
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {financialData?.capitalAdequacy?.capitalRatio || 0}%
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                    Well above minimum
                  </p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                  <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 mb-3 font-medium">
                    Tier 1 Ratio
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {financialData?.capitalAdequacy?.tier1Ratio || 0}%
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Strong position
                  </p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                  <p className="text-sm sm:text-base text-purple-700 dark:text-purple-300 mb-3 font-medium">
                    Leverage Ratio
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {financialData?.capitalAdequacy?.leverageRatio || 0}%
                  </p>
                  <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">
                    Regulatory compliant
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

export default FinancialReports;

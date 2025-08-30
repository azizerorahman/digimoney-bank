import { useState } from "react";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";
import { ArrowUp } from "lucide-react";

const InvestmentPerformance = () => {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const accountManagerData = {
    investmentPerformance: {
      portfolioSummary: {
        totalAUM: 12800000,
        ytdReturn: 8.7,
        monthlyReturn: 1.2,
        weeklyReturn: 0.3,
        benchmark: 7.2,
      },
      assetAllocation: {
        stocks: 48,
        bonds: 28,
        realEstate: 15,
        alternatives: 9,
      },
      topPerformers: [
        { name: "Tech Growth Fund", return: 15.8, allocation: 12 },
        { name: "Real Estate REIT", return: 11.2, allocation: 8 },
        { name: "International Equity", return: 9.5, allocation: 15 },
      ],
      riskMetrics: {
        portfolioRisk: "Moderate",
        sharpeRatio: 1.45,
        maxDrawdown: -8.2,
        volatility: 12.8,
      },
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Modal Components
  const MeetingModal = ({ isOpen, onClose }) => {
    const [meetingData, setMeetingData] = useState({
      customerId: "",
      type: "",
      date: "",
      time: "",
      duration: "60",
      location: "",
      agenda: "",
      attendees: "",
    });

    const handleInputChange = (field, value) => {
      setMeetingData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Meeting scheduled:", meetingData);
      // Add your meeting creation logic here

      // Reset form
      setMeetingData({
        customerId: "",
        type: "",
        date: "",
        time: "",
        duration: "60",
        location: "",
        agenda: "",
        attendees: "",
      });

      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Schedule New Meeting"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="meeting-form"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Schedule Meeting
            </button>
          </div>
        }
      >
        <form id="meeting-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Meeting Type
              </label>
              <select
                value={meetingData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                required
              >
                <option value="">Select Type...</option>
                <option value="portfolio-review">Portfolio Review</option>
                <option value="investment-planning">Investment Planning</option>
                <option value="risk-assessment">Risk Assessment</option>
                <option value="general-consultation">
                  General Consultation
                </option>
                <option value="quarterly-review">Quarterly Review</option>
                <option value="estate-planning">Estate Planning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Customer
              </label>
              <select
                value={meetingData.customerId}
                onChange={(e) =>
                  handleInputChange("customerId", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                required
              >
                <option value="">Select Customer...</option>
                {/* Add customer options here */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={meetingData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Time
              </label>
              <input
                type="time"
                value={meetingData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Duration
            </label>
            <select
              value={meetingData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Location/Platform
            </label>
            <select
              value={meetingData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              required
            >
              <option value="">Select Location...</option>
              <option value="office-meeting-room">Office Meeting Room</option>
              <option value="client-location">Client Location</option>
              <option value="video-call-teams">Video Call - Teams</option>
              <option value="video-call-zoom">Video Call - Zoom</option>
              <option value="phone-call">Phone Call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Agenda Items
            </label>
            <textarea
              rows="3"
              value={meetingData.agenda}
              onChange={(e) => handleInputChange("agenda", e.target.value)}
              placeholder="Enter meeting agenda items..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Additional Attendees
            </label>
            <input
              type="text"
              value={meetingData.attendees}
              onChange={(e) => handleInputChange("attendees", e.target.value)}
              placeholder="Enter email addresses separated by commas"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
            />
          </div>
        </form>
      </Modal>
    );
  };

  //Report modal
  const ReportModal = ({ isOpen, onClose }) => {
    const [reportData, setReportData] = useState({
      reportType: "",
      dateRange: "1M",
      customers: [],
      includeTransactions: true,
      includePerformance: true,
    });

    const handleReportSubmit = (e) => {
      e.preventDefault();
      console.log("Generating report:", reportData);
      // Add your report generation logic here
      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Generate Report"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="report-form"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Generate Report
            </button>
          </div>
        }
      >
        <form
          id="report-form"
          onSubmit={handleReportSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select
              value={reportData.reportType}
              onChange={(e) =>
                setReportData((prev) => ({
                  ...prev,
                  reportType: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
              required
            >
              <option value="">Select Report Type...</option>
              <option value="portfolio-summary">Portfolio Summary</option>
              <option value="performance-report">Performance Report</option>
              <option value="transaction-report">Transaction Report</option>
              <option value="revenue-report">Revenue Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <select
              value={reportData.dateRange}
              onChange={(e) =>
                setReportData((prev) => ({
                  ...prev,
                  dateRange: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 transition-colors"
            >
              <option value="1W">Last Week</option>
              <option value="1M">Last Month</option>
              <option value="3M">Last 3 Months</option>
              <option value="1Y">Last Year</option>
            </select>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Investment Performance
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Monitor portfolio performance and asset allocation
            </p>
          </div>
        </AnimatedSection>

        {/* Investment Performance Content */}
        <div className="space-y-4">
          {/* Performance Overview */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {formatCurrency(
                    accountManagerData.investmentPerformance.portfolioSummary
                      .totalAUM
                  )}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-blue-700 dark:text-blue-300 font-medium">
                  Total AUM
                </div>
              </div>

              <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  +
                  {
                    accountManagerData.investmentPerformance.portfolioSummary
                      .ytdReturn
                  }
                  %
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-700 dark:text-green-300 font-medium">
                  YTD Return
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  +
                  {
                    accountManagerData.investmentPerformance.portfolioSummary
                      .monthlyReturn
                  }
                  %
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-purple-700 dark:text-purple-300 font-medium">
                  Monthly Return
                </div>
              </div>

              <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  +
                  {(
                    accountManagerData.investmentPerformance.portfolioSummary
                      .ytdReturn -
                    accountManagerData.investmentPerformance.portfolioSummary
                      .benchmark
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-yellow-700 dark:text-yellow-300 font-medium">
                  vs Benchmark
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Asset Allocation Chart */}
          <AnimatedSection delay={300}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                  Asset Allocation
                </h3>
                <div className="space-y-4">
                  {Object.entries(
                    accountManagerData.investmentPerformance.assetAllocation
                  ).map(([asset, percentage]) => (
                    <div
                      key={asset}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {asset}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-black dark:text-white w-8">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                  Top Performers
                </h3>
                <div className="space-y-4">
                  {accountManagerData.investmentPerformance.topPerformers.map(
                    (fund, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            {fund.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {fund.allocation}% allocation
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 dark:text-green-400">
                            +{fund.return}%
                          </p>
                          <div className="flex items-center">
                            <ArrowUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Risk Metrics */}
          <AnimatedSection delay={400}>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 transition-all duration-500 mt-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Risk Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Portfolio Risk
                  </p>
                  <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {
                      accountManagerData.investmentPerformance.riskMetrics
                        .portfolioRisk
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sharpe Ratio
                  </p>
                  <p className="text-lg font-semibold text-black dark:text-white">
                    {
                      accountManagerData.investmentPerformance.riskMetrics
                        .sharpeRatio
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Max Drawdown
                  </p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {
                      accountManagerData.investmentPerformance.riskMetrics
                        .maxDrawdown
                    }
                    %
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Volatility
                  </p>
                  <p className="text-lg font-semibold text-black dark:text-white">
                    {
                      accountManagerData.investmentPerformance.riskMetrics
                        .volatility
                    }
                    %
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Meeting Modal */}
      <MeetingModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
};

export default InvestmentPerformance;

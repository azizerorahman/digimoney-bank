import AnimatedSection from "../../../components/AnimatedSection";
import {
  DollarSign,
  Target,
  Briefcase,
  ArrowUp,
  Award,
} from "lucide-react";

const RevenueAnalytics = () => {
  const accountManagerData = {
    customerPortfolio: [
      {
        customerId: "CUST-ENT-001",
        name: "TechCorp Industries",
        type: "Corporate",
        relationship: "Primary",
        since: "2019-03-15",
        riskProfile: "Conservative",
        totalValue: 2850000,
        monthlyRevenue: 8500,
        accounts: [
          {
            type: "Business Checking",
            balance: 485000,
            accountNumber: "****7891",
            status: "Active",
          },
          {
            type: "Investment Portfolio",
            balance: 1850000,
            accountNumber: "****2345",
            status: "Active",
            performance: 12.5,
          },
          {
            type: "Commercial Loan",
            balance: -515000,
            accountNumber: "****6789",
            status: "Current",
            rate: 4.25,
          },
        ],
        contacts: [
          {
            name: "James Wilson",
            title: "CFO",
            phone: "(555) 234-5678",
            email: "j.wilson@techcorp.com",
            primary: true,
          },
          {
            name: "Sarah Davis",
            title: "Treasurer",
            phone: "(555) 234-5679",
            email: "s.davis@techcorp.com",
            primary: false,
          },
        ],
        lastInteraction: {
          date: "2024-06-02",
          type: "Video Call",
          subject: "Q2 Investment Review",
          outcome: "Positive",
        },
        alerts: [
          {
            type: "opportunity",
            message: "Eligible for premium investment products",
            priority: "Medium",
          },
        ],
        investmentAllocation: {
          stocks: 45,
          bonds: 30,
          realEstate: 15,
          alternatives: 10,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Wire transfer received - $250,000",
            date: "2024-06-03",
            time: "14:23",
          },
          {
            type: "Communication",
            description: "Portfolio review email sent",
            date: "2024-06-02",
            time: "09:15",
          },
          {
            type: "Meeting",
            description: "Quarterly review meeting scheduled",
            date: "2024-06-01",
            time: "10:00",
          },
        ],
      },
      {
        customerId: "CUST-HNW-002",
        name: "Robert & Maria Martinez",
        type: "High Net Worth",
        relationship: "Joint",
        since: "2020-11-08",
        riskProfile: "Moderate",
        totalValue: 1650000,
        monthlyRevenue: 4200,
        accounts: [
          {
            type: "Private Banking",
            balance: 325000,
            accountNumber: "****4567",
            status: "Active",
          },
          {
            type: "Investment Portfolio",
            balance: 1125000,
            accountNumber: "****8901",
            status: "Active",
            performance: 9.8,
          },
          {
            type: "Mortgage",
            balance: -200000,
            accountNumber: "****2345",
            status: "Current",
            rate: 3.75,
          },
        ],
        contacts: [
          {
            name: "Robert Martinez",
            title: "Primary Account Holder",
            phone: "(555) 345-6789",
            email: "r.martinez@email.com",
            primary: true,
          },
          {
            name: "Maria Martinez",
            title: "Joint Account Holder",
            phone: "(555) 345-6790",
            email: "m.martinez@email.com",
            primary: true,
          },
        ],
        lastInteraction: {
          date: "2024-05-28",
          type: "In-Person Meeting",
          subject: "Estate Planning Discussion",
          outcome: "Follow-up Required",
        },
        alerts: [
          {
            type: "action",
            message: "Estate planning documents pending review",
            priority: "High",
          },
        ],
        investmentAllocation: {
          stocks: 55,
          bonds: 25,
          realEstate: 12,
          alternatives: 8,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Municipal bond purchase - $85,000",
            date: "2024-06-03",
            time: "11:45",
          },
          {
            type: "Communication",
            description: "Estate planning consultation call",
            date: "2024-05-28",
            time: "15:30",
          },
          {
            type: "Meeting",
            description: "Estate planning meeting completed",
            date: "2024-05-28",
            time: "14:00",
          },
        ],
      },
      {
        customerId: "CUST-SMB-003",
        name: "Green Valley Restaurant Group",
        type: "Small Business",
        relationship: "Primary",
        since: "2021-07-22",
        riskProfile: "Moderate Aggressive",
        totalValue: 890000,
        monthlyRevenue: 2800,
        accounts: [
          {
            type: "Business Checking",
            balance: 125000,
            accountNumber: "****5678",
            status: "Active",
          },
          {
            type: "Business Savings",
            balance: 285000,
            accountNumber: "****9012",
            status: "Active",
          },
          {
            type: "Equipment Loan",
            balance: -480000,
            accountNumber: "****3456",
            status: "Current",
            rate: 5.5,
          },
        ],
        contacts: [
          {
            name: "Michael Green",
            title: "Owner/CEO",
            phone: "(555) 456-7890",
            email: "m.green@greenvalley.com",
            primary: true,
          },
        ],
        lastInteraction: {
          date: "2024-06-01",
          type: "Phone Call",
          subject: "Expansion Financing Options",
          outcome: "Proposal Sent",
        },
        alerts: [
          {
            type: "opportunity",
            message: "Expansion loan pre-approved",
            priority: "High",
          },
        ],
        investmentAllocation: {
          stocks: 35,
          bonds: 40,
          realEstate: 20,
          alternatives: 5,
        },
        recentActivity: [
          {
            type: "Transaction",
            description: "Equipment financing disbursement - $45,000",
            date: "2024-06-02",
            time: "16:30",
          },
          {
            type: "Communication",
            description: "Expansion financing discussion",
            date: "2024-06-01",
            time: "14:00",
          },
          {
            type: "Meeting",
            description: "Business expansion planning session",
            date: "2024-05-30",
            time: "11:30",
          },
        ],
      },
    ],
    revenueMetrics: {
      thisMonth: {
        totalRevenue: 125000,
        target: 160000,
        growth: 8.5,
        breakdown: {
          fees: 75000,
          commissions: 35000,
          interest: 15000,
        },
      },
      byCustomer: [
        { name: "TechCorp Industries", revenue: 45000, percentage: 36 },
        { name: "Robert & Maria Martinez", revenue: 28000, percentage: 22.4 },
        {
          name: "Green Valley Restaurant Group",
          revenue: 18000,
          percentage: 14.4,
        },
        { name: "Others", revenue: 34000, percentage: 27.2 },
      ],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Revenue Analytics
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Track and analyze your revenue performance
            </p>
          </div>
        </AnimatedSection>

        {/* Revenue Overview Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* This Month Revenue Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    This Month
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.totalRevenue
                    )}
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center justify-center">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 ml-1">
                  +{accountManagerData.revenueMetrics.thisMonth.growth}%
                </span>
              </div>
            </div>

            {/* Target Progress Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                    Target Progress
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {Math.round(
                      (accountManagerData.revenueMetrics.thisMonth
                        .totalRevenue /
                        accountManagerData.revenueMetrics.thisMonth.target) *
                        100
                    )}
                    %
                  </p>
                </div>
                <Target className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (accountManagerData.revenueMetrics.thisMonth
                        .totalRevenue /
                        accountManagerData.revenueMetrics.thisMonth.target) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Fees Card */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">
                    Fees
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.breakdown.fees
                    )}
                  </p>
                </div>
                <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            {/* Commissions Card */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300">
                    Commissions
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.breakdown
                        .commissions
                    )}
                  </p>
                </div>
                <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Revenue by Customer */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Revenue by Customer
            </h3>
            <div className="space-y-4">
              {accountManagerData.revenueMetrics.byCustomer.map(
                (customer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-gray-100 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/50">
                        <span className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        {customer.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {formatCurrency(customer.revenue)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {customer.percentage}%
                        </p>
                      </div>
                      <div className="w-16 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                          style={{ width: `${customer.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Revenue Breakdown */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Revenue Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-600/30 rounded-lg border border-gray-100 dark:border-gray-600/30">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Management Fees
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.breakdown.fees
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-600/30 rounded-lg border border-gray-100 dark:border-gray-600/30">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Commissions
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.breakdown
                        .commissions
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-600/30 rounded-lg border border-gray-100 dark:border-gray-600/30">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Interest Income
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {formatCurrency(
                      accountManagerData.revenueMetrics.thisMonth.breakdown
                        .interest
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700/50">
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      Total Revenue
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-sm sm:text-base">
                      {formatCurrency(
                        accountManagerData.revenueMetrics.thisMonth.totalRevenue
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly Target
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(
                        accountManagerData.revenueMetrics.thisMonth.target
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (accountManagerData.revenueMetrics.thisMonth
                            .totalRevenue /
                            accountManagerData.revenueMetrics.thisMonth
                              .target) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700/50">
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                      Growth Rate
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400">
                      +{accountManagerData.revenueMetrics.thisMonth.growth}%
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                      Avg per Customer
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {formatCurrency(
                        accountManagerData.revenueMetrics.thisMonth
                          .totalRevenue /
                          accountManagerData.customerPortfolio.length
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default RevenueAnalytics;

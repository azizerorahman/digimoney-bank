import AnimatedSection from "../../../components/AnimatedSection";
import { useState } from "react";

export const csrDashboardData = {
  quickActions: [
    {
      id: "update-contact",
      title: "Update Contact Info",
      description: "Change phone, email, or address",
      icon: "contact",
      permission: "direct",
      category: "Account Updates",
    },
    {
      id: "account-preferences",
      title: "Account Preferences",
      description: "Update notifications, statements",
      icon: "settings",
      permission: "direct",
      category: "Account Updates",
    },
    {
      id: "temporary-hold",
      title: "Temporary Account Hold",
      description: "Place temporary hold on account",
      icon: "lock",
      permission: "direct",
      category: "Security",
    },
    {
      id: "process-payment",
      title: "Process Payment",
      description: "Process loan or credit card payment",
      icon: "payment",
      permission: "direct",
      category: "Transactions",
    },
    {
      id: "transfer-funds",
      title: "Transfer Funds",
      description: "Transfer between customer accounts",
      icon: "transfer",
      permission: "direct",
      category: "Transactions",
    },
    {
      id: "credit-limit",
      title: "Credit Limit Change",
      description: "Request credit limit adjustment",
      icon: "credit",
      permission: "approval",
      category: "Credit Services",
    },
    {
      id: "account-closure",
      title: "Account Closure",
      description: "Initiate account closure process",
      icon: "close",
      permission: "approval",
      category: "Account Management",
    },
    {
      id: "fraud-report",
      title: "Report Fraud",
      description: "Report suspicious activity",
      icon: "alert",
      permission: "escalation",
      category: "Security",
    },
  ],
  escalationDepartments: [
    {
      id: "credit",
      name: "Credit Department",
      phone: "ext. 2500",
      email: "credit@bank.com",
      availableHours: "8:00 AM - 6:00 PM",
      avgResponseTime: "2 hours",
      specialties: ["Credit limits", "Loan applications", "Credit disputes"],
    },
    {
      id: "fraud",
      name: "Fraud Prevention",
      phone: "ext. 911",
      email: "fraud@bank.com",
      availableHours: "24/7",
      avgResponseTime: "15 minutes",
      specialties: ["Suspicious activity", "Identity theft", "Card disputes"],
    },
    {
      id: "loans",
      name: "Loan Department",
      phone: "ext. 2600",
      email: "loans@bank.com",
      availableHours: "9:00 AM - 5:00 PM",
      avgResponseTime: "4 hours",
      specialties: ["Mortgage", "Personal loans", "Business loans"],
    },
    {
      id: "technical",
      name: "Technical Support",
      phone: "ext. 3000",
      email: "techsupport@bank.com",
      availableHours: "7:00 AM - 11:00 PM",
      avgResponseTime: "30 minutes",
      specialties: ["Online banking", "Mobile app", "System issues"],
    },
  ],
  supportResources: {
    commonIssues: [
      {
        category: "Account Access",
        issues: [
          {
            title: "Forgot Password",
            script:
              "I can help you reset your password. For security, I'll need to verify your identity with your date of birth and the last 4 digits of your SSN.",
            steps: [
              "Verify customer identity",
              "Generate temporary password",
              "Email reset link to registered email",
              "Advise customer to change password on first login",
            ],
          },
          {
            title: "Account Locked",
            script:
              "I see your account has been temporarily locked for security. Let me verify your identity and unlock it for you.",
            steps: [
              "Verify customer identity",
              "Check reason for lock",
              "Remove security hold if appropriate",
              "Advise customer on security best practices",
            ],
          },
        ],
      },
      {
        category: "Transactions",
        issues: [
          {
            title: "Disputed Charge",
            script:
              "I understand you're questioning a charge on your account. Let me pull up your recent transactions and we can review this together.",
            steps: [
              "Locate the disputed transaction",
              "Gather details about the dispute",
              "Determine if merchant contact is needed",
              "Initiate formal dispute if necessary",
              "Provide dispute timeline to customer",
            ],
          },
          {
            title: "Missing Deposit",
            script:
              "Let me check your account for any pending deposits. Sometimes deposits can take 1-2 business days to appear.",
            steps: [
              "Check for pending deposits",
              "Verify deposit method and timing",
              "Check with originating bank if needed",
              "Provide expected posting timeline",
            ],
          },
        ],
      },
    ],
    quickResponses: [
      {
        trigger: "hours",
        response:
          "Our customer service is available Monday-Friday 8:00 AM to 8:00 PM, and Saturday 9:00 AM to 5:00 PM.",
      },
      {
        trigger: "routing",
        response:
          "Your routing number is 123456789. You can also find this on your checks or in online banking.",
      },
      {
        trigger: "fees",
        response:
          "Let me pull up your fee schedule. I can also email you a complete list of current fees and charges.",
      },
    ],
  },
};

const QuickActions = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Copy to clipboard function
  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Quick Actions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Streamlined customer service tools and resources
            </p>
          </div>
        </AnimatedSection>

        {/* Quick Actions Grid */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
              Available Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {csrDashboardData.quickActions.map((action, index) => (
                <div
                  key={action.id}
                  className="group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {action.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div
                      className={`inline-flex px-3 py-1 text-xs sm:text-sm font-bold rounded-full border transition-all duration-300 ${
                        action.permission === "direct"
                          ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-600"
                          : action.permission === "approval"
                          ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-600"
                          : "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-600"
                      }`}
                    >
                      {action.permission === "direct"
                        ? "✓ Direct"
                        : action.permission === "approval"
                        ? "⏳ Approval Required"
                        : "⚠️ Escalation Required"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {action.category}
                    </div>
                  </div>

                  <button className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 hover:shadow-blue-500/30">
                    {action.permission === "direct"
                      ? "Execute Action"
                      : action.permission === "approval"
                      ? "Request Approval"
                      : "Escalate to Department"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Escalation Departments */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
              Escalation Departments
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {csrDashboardData.escalationDepartments.map((dept, index) => (
                <div
                  key={dept.id}
                  className="group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 transition-all duration-500 hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {dept.name}
                    </h4>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-400 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-green-200 dark:border-green-600">
                      Avg: {dept.avgResponseTime}
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg">📞</span>
                      <span className="font-medium">{dept.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg">📧</span>
                      <span className="font-mono text-sm">{dept.email}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg">🕐</span>
                      <span className="font-medium">{dept.availableHours}</span>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-bold mb-2">
                      Specialties:
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {dept.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full border border-blue-200 dark:border-blue-600 font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30">
                    Contact Department
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Support Resources */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
              Support Resources
            </h2>

            {/* Common Issues */}
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
              {csrDashboardData.supportResources.commonIssues.map(
                (category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200/30 dark:border-gray-700/30"
                  >
                    <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-4 sm:mb-5 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                      {category.category}
                    </h4>
                    <div className="space-y-4 sm:space-y-5">
                      {category.issues.map((issue, issueIndex) => (
                        <div
                          key={issueIndex}
                          className="border-l-4 border-blue-400 pl-4 sm:pl-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-r-lg p-3 sm:p-4"
                        >
                          <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-2">
                            {issue.title}
                          </div>
                          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 italic font-medium bg-gray-100/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                            "{issue.script}"
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">
                              Action Steps:
                            </div>
                            <ol className="list-decimal list-inside space-y-1 sm:space-y-2">
                              {issue.steps.map((step, stepIndex) => (
                                <li
                                  key={stepIndex}
                                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Quick Responses */}
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200/30 dark:border-gray-700/30">
              <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></span>
                Quick Responses
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {csrDashboardData.supportResources.quickResponses.map(
                  (response, index) => (
                    <div
                      key={index}
                      className="group flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 sm:p-4 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg sm:rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                    >
                      <div className="flex-1">
                        <span className="inline-block text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 sm:px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-700">
                          #{response.trigger}
                        </span>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-3 sm:ml-4 leading-relaxed">
                          {response.response}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(response.response, index)
                        }
                        className="self-start sm:self-center bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 opacity-0 group-hover:opacity-100"
                      >
                        {copiedIndex === index ? "✓ Copied!" : "Copy Response"}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
export default QuickActions;

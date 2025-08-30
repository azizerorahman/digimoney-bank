import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const Recommendations = () => {
  const uId = localStorage.getItem("userId");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Saving");

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!uId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/recommendations`,
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
          setRecommendations(res.data.recommendations);
        } else {
          toast.error("Failed to fetch recommendations");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast.error("Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [uId]);

  // Helper function to get icon based on iconType
  const getIcon = (iconType) => {
    const iconMap = {
      Car: "🚗",
      Phone: "📱",
      Lightning: "⚡",
      Bank: "🏦",
      Diamond: "💎",
      Globe: "🌍",
      Shield: "🛡️",
      CreditCard: "💳",
      Clipboard: "📋",
      Document: "📜",
    };
    return iconMap[iconType] || "💡";
  };

  // Organize recommendations by category
  const savingRecommendations = recommendations.filter(
    (rec) => rec.category === "Saving"
  );
  const investmentRecommendations = recommendations.filter(
    (rec) => rec.category === "Investment"
  );
  const financialHealthRecommendations = recommendations.filter(
    (rec) => rec.category === "Financial Health"
  );

  // Filter recommendations based on selected category
  const getFilteredRecommendations = () => {
    switch (selectedCategory) {
      case "Saving":
        return savingRecommendations;
      case "Investment":
        return investmentRecommendations;
      case "Financial Health":
        return financialHealthRecommendations;
      default:
        return recommendations;
    }
  };

  const filteredRecommendations = getFilteredRecommendations();

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
              Smart Recommendations
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Personalized financial insights to help you achieve your goals
            </p>
          </div>
        </AnimatedSection>

        {/* Summary Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Saving Opportunities Card */}
            <div
              onClick={() => setSelectedCategory("Saving")}
              className={`group cursor-pointer border rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                selectedCategory === "Saving"
                  ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/30 border-green-400 dark:border-green-500 shadow-lg scale-105"
                  : "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-green-200 dark:border-green-700/50 hover:shadow-green-200/50 dark:hover:shadow-green-900/30"
              }`}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {savingRecommendations.length}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-700 dark:text-green-300 font-medium">
                Saving Tips
              </div>
            </div>

            {/* Investment Opportunities Card */}
            <div
              onClick={() => setSelectedCategory("Investment")}
              className={`group cursor-pointer border rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                selectedCategory === "Investment"
                  ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800/50 dark:to-blue-700/30 border-blue-400 dark:border-blue-500 shadow-lg scale-105"
                  : "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/50 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30"
              }`}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {investmentRecommendations.length}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-blue-700 dark:text-blue-300 font-medium">
                Investment Options
              </div>
            </div>

            {/* Financial Health Card */}
            <div
              onClick={() => setSelectedCategory("Financial Health")}
              className={`group cursor-pointer border rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                selectedCategory === "Financial Health"
                  ? "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800/50 dark:to-purple-700/30 border-purple-400 dark:border-purple-500 shadow-lg scale-105"
                  : "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-200 dark:border-purple-700/50 hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30"
              }`}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {financialHealthRecommendations.length}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-purple-700 dark:text-purple-300 font-medium">
                Health Tips
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          {/* All Recommendations Combined */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
            {/* Filter Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                {selectedCategory === "Saving" && (
                  <>
                    Saving Opportunities ({savingRecommendations.length})
                  </>
                )}
                {selectedCategory === "Investment" && (
                  <>
                    Investment Options ({investmentRecommendations.length})
                  </>
                )}
                {selectedCategory === "Financial Health" && (
                  <>
                    Financial Health Tips (
                    {financialHealthRecommendations.length})
                  </>
                )}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {filteredRecommendations.length > 0 ? (
                filteredRecommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200/60 dark:border-gray-700/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    {/* Category Indicator */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1.5 ${
                        recommendation.category === "Saving"
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : recommendation.category === "Investment"
                          ? "bg-gradient-to-r from-blue-400 to-blue-600"
                          : "bg-gradient-to-r from-purple-400 to-purple-600"
                      }`}
                    />

                    <div className="p-6 sm:p-8">
                      <div className="flex items-start space-x-3 sm:space-x-5">
                        <div className="flex-shrink-0">
                          <div
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${
                              recommendation.category === "Saving"
                                ? "bg-gradient-to-br from-green-400/50 to-green-600/50 shadow-green-200/50 dark:shadow-green-900/50"
                                : recommendation.category === "Investment"
                                ? "bg-gradient-to-br from-blue-400/50 to-blue-600/50 shadow-blue-200/50 dark:shadow-blue-900/50"
                                : "bg-gradient-to-br from-purple-400/50 to-purple-600/50 shadow-purple-200/50 dark:shadow-purple-900/50"
                            }`}
                          >
                            <span className="text-white filter drop-shadow-sm text-3xl sm:text-2xl">
                              {getIcon(recommendation.iconType)}
                            </span>
                            {/* Glow effect */}
                            <div
                              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                                recommendation.category === "Saving"
                                  ? "bg-green-400"
                                  : recommendation.category === "Investment"
                                  ? "bg-blue-400"
                                  : "bg-purple-400"
                              } blur-lg`}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1 mb-4 lg:mb-0 lg:pr-6">
                              {/* Title with category badge */}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white leading-tight mb-2 sm:mb-0">
                                  {recommendation.title}
                                </h4>
                              </div>

                              {/* Description */}
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                                {recommendation.description}
                              </p>

                              {/* Action with enhanced styling */}
                              <div className="inline-flex items-center space-x-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                <span className="text-lg flex-shrink-0">
                                  💡
                                </span>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pr-2">
                                  {recommendation.action}
                                </p>
                              </div>
                            </div>

                            {/* Stats & Metrics */}
                            <div className="flex flex-col items-end justify-between h-[-webkit-fill-available]">
                              {recommendation.potential && (
                                <div className="text-center lg:text-right">
                                  <span
                                    className={`inline-block text-sm sm:text-base font-bold px-4 py-2 rounded-xl shadow-sm ${
                                      recommendation.category === "Saving"
                                        ? "text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-700"
                                        : recommendation.category ===
                                          "Investment"
                                        ? "text-blue-700 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                        : "text-purple-700 bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                                    }`}
                                  >
                                    {recommendation.potential}
                                  </span>
                                </div>
                              )}

                              {recommendation.difficulty &&
                                recommendation.category !==
                                  "Financial Health" && (
                                  <div className="text-center lg:text-right">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                                      {recommendation.category === "Investment"
                                        ? "Risk"
                                        : "Difficulty"}
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-end space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                      <span className="font-medium">
                                        {recommendation.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl ${
                        recommendation.category === "Saving"
                          ? "bg-gradient-to-br from-green-400 to-green-600"
                          : recommendation.category === "Investment"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : "bg-gradient-to-br from-purple-400 to-purple-600"
                      }`}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-16 sm:py-20">
                  <div className="text-5xl sm:text-6xl lg:text-7xl mb-6">
                    {selectedCategory === "Saving" && "💰"}
                    {selectedCategory === "Investment" && "📈"}
                    {selectedCategory === "Financial Health" && "🏥"}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    No {selectedCategory} Recommendations
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                    {selectedCategory === "Saving"
                      ? "Great job! No saving opportunities found. You're managing your finances well!"
                      : selectedCategory === "Investment"
                      ? "Your investment portfolio seems balanced. No urgent opportunities at the moment."
                      : "Excellent! Your financial health looks great. Keep it up!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Recommendations;

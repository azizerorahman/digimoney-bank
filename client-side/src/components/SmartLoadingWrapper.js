import React from "react";
import LoadingSpinner from "./Loading";
import AnimatedSection from "./AnimatedSection";

const SmartLoadingWrapper = ({
  isLoading,
  hasData,
  children,
  loadingText = "Loading...",
  emptyText = "No data available",
  minLoadingTime = 1000,
  showEmpty = true,
  animation = "fadeIn",
  className = "",
}) => {
  const [showContent, setShowContent] = React.useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = React.useState(false);

  // Ensure minimum loading time for smooth UX
  React.useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setMinTimeElapsed(false);

      const timer = setTimeout(() => {
        setMinTimeElapsed(true);
      }, minLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minLoadingTime]);

  // Show content when both loading is done and minimum time has elapsed
  React.useEffect(() => {
    if (!isLoading && minTimeElapsed) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minTimeElapsed]);

  if (isLoading || !minTimeElapsed) {
    return (
      <div
        className={`flex items-center justify-center min-h-[200px] ${className}`}
      >
        <LoadingSpinner size="lg" color="primary" text={loadingText} />
      </div>
    );
  }

  if (!hasData && showEmpty) {
    return (
      <AnimatedSection animation="fadeIn" className={className}>
        <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400">
          <svg
            className="w-16 h-16 mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6v2"
            />
          </svg>
          <p className="text-lg font-medium">{emptyText}</p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection animation={animation} className={className}>
      {showContent && children}
    </AnimatedSection>
  );
};

export default SmartLoadingWrapper;

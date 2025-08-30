import React from "react";

const StepContainer = ({
  children,
  currentStep,
  totalSteps,
  title,
  className = "",
}) => {
  return (
    <div
      className={`
      bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
      rounded-2xl sm:rounded-3xl
      border border-gray-200/50 dark:border-gray-700/50
      shadow-2xl hover:shadow-3xl
      transition-all duration-300
      p-4 sm:p-6 md:p-8 lg:p-10
      ${className}
    `}
    >
      {/* Step Progress Header */}
      <div className="mb-6 sm:mb-8">
        {title && (
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            {title}
          </h3>
        )}

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 ml-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      {children}
    </div>
  );
};

export default StepContainer;

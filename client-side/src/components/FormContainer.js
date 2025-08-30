import React from "react";

const FormContainer = ({
  children,
  title,
  subtitle,
  className = "",
  size = "default",
  showShadow = true,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "compact":
        return "p-4 sm:p-6";
      case "large":
        return "p-6 sm:p-8 md:p-10 lg:p-12";
      default:
        return "p-4 sm:p-6 md:p-8 lg:p-10";
    }
  };

  return (
    <div
      className={`
      bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
      rounded-2xl sm:rounded-3xl
      border border-gray-200/50 dark:border-gray-700/50
      ${showShadow ? "shadow-2xl hover:shadow-3xl" : ""}
      transition-all duration-300
      ${getSizeClasses()}
      ${className}
    `}
    >
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="mb-6 sm:mb-8">
          {title && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

export default FormContainer;

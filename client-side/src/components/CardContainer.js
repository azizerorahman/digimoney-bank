import React from "react";

const CardContainer = ({
  children,
  className = "",
  hover = true,
  size = "default",
  variant = "glass", // glass, solid, gradient
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "compact":
        return "p-3 sm:p-4";
      case "large":
        return "p-6 sm:p-8 md:p-10";
      default:
        return "p-4 sm:p-6 md:p-8";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "solid":
        return "bg-white dark:bg-gray-800";
      case "gradient":
        return "bg-gradient-to-br from-white/90 via-white/80 to-gray-50/80 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-900/80";
      default:
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl";
    }
  };

  return (
    <div
      className={`
      ${getVariantClasses()}
      rounded-2xl sm:rounded-3xl
      border border-gray-200/50 dark:border-gray-700/50
      shadow-2xl
      ${
        hover
          ? "hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
          : "transition-shadow duration-300"
      }
      ${getSizeClasses()}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default CardContainer;

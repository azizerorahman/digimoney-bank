const sizeClasses = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const strokeClasses = {
  xs: "border-2",
  sm: "border-2",
  md: "border-2",
  lg: "border-3",
  xl: "border-4",
};

const LoadingSpinner = ({
  size = "md",
  overlay = false,
  fullscreen = false,
  className = "",
  color = "primary",
  text = "",
}) => {
  const colorClasses = {
    primary: "border-primary dark:border-accent",
    secondary: "border-secondary dark:border-secondary",
    accent: "border-accent dark:border-primary",
    emerald: "border-emerald-500 dark:border-emerald-400",
    blue: "border-blue-500 dark:border-blue-400",
    white: "border-white",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`animate-spin ${sizeClasses[size]} ${strokeClasses[size]} ${colorClasses[color]} border-t-transparent rounded-full`}
        aria-hidden="true"
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (overlay || fullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ${className}`}
        role="status"
        aria-live="polite"
      >
        {spinner}
      </div>
    );
  }

  // Regular mode (inline)
  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {spinner}
    </div>
  );
};

export default LoadingSpinner;

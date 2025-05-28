const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const LoadingSpinner = ({
  size = "md",
  fullscreen = false,
  overlay = false,
  label = "",
  className = "",
  backdropBlur = false,
}) => {
  const spinner = (
    <span
      className={`inline-block animate-spin ${sizeClasses[size]} border-4 border-primary dark:border-accent border-t-transparent rounded-full`}
      aria-hidden="true"
    />
  );

  // Fullscreen mode (covers entire viewport)
  if (fullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
          backdropBlur ? "backdrop-blur-sm" : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {spinner}
        <span className="mt-4 text-white font-medium text-lg">{label}</span>
      </div>
    );
  }

  // Overlay mode (covers parent container)
  if (overlay) {
    return (
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${
          backdropBlur ? "backdrop-blur-sm" : ""
        } ${className}`}
        role="status"
        aria-live="polite"
      >
        {spinner}
        <span className="mt-2 text-white text-sm">{label}</span>
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
      <span className="mt-2 text-primary dark:text-accent text-sm">{label}</span>
    </div>
  );
};

export default LoadingSpinner;

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const LoadingSpinner = ({
  size = "md",
  overlay = false,
  className = "",
}) => {
  const spinner = (
    <span
      className={`inline-block animate-spin ${sizeClasses[size]} border-4 border-secondary border-t-transparent rounded-full`}
      aria-hidden="true"
    />
  );

  // Fullscreen mode (covers entire viewport)
  // if (fullscreen) {
  //   return (
  //     <div
  //       className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
  //         backdropBlur ? "backdrop-blur-sm" : ""
  //       }`}
  //       role="status"
  //       aria-live="polite"
  //     >
  //       {spinner}
  //     </div>
  //   );
  // }

  if (overlay) {
    return (
      <div
        className={` z-10 flex flex-col items-center justify-center fixed inset-0 backdrop-blur-sm ${className}`}
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

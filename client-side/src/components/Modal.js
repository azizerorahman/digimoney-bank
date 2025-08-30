import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  footer,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-4xl";
      case "xl":
        return "max-w-6xl";
      case "full":
        return "max-w-[95vw] max-h-[95vh]";
      default:
        return "max-w-2xl";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with consistent dashboard styling */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal Container with dashboard design pattern */}
      <div className="relative w-full">
        <div
          className={`
            ${getSizeClasses()}
            mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl
            rounded-2xl sm:rounded-3xl shadow-2xl 
            border border-gray-200/50 dark:border-gray-700/50
            max-h-[90vh] overflow-hidden
            transform transition-all duration-300 scale-100
            hover:shadow-3xl
          `}
        >
          {/* Header with dashboard styling */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50">
              {title && (
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="group p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-xl transition-all duration-200 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              )}
            </div>
          )}

          {/* Content with dashboard styling */}
          <div
            className={`overflow-y-auto ${
              size === "full" ? "max-h-[80vh]" : "max-h-[70vh]"
            } p-4 sm:p-6 md:p-8`}
          >
            {children}
          </div>

          {/* Footer if provided */}
          {footer && (
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-gray-50/30 to-white/30 dark:from-gray-800/30 dark:to-gray-700/30">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

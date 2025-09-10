import { Link } from "react-router-dom";
import { FaLock, FaHome, FaSignInAlt, FaShieldAlt } from "react-icons/fa";

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Lock Icon with Animation */}
        <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-pulse">
          <FaLock className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            401
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            You need to sign in to access this page. Please log in with your
            credentials to continue to the dashboard.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
            <FaShieldAlt className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm font-medium">
              This area requires authentication for security purposes
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <Link
            to="/login"
            className="w-full flex justify-center items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FaSignInAlt className="w-4 h-4" />
            Sign In to Continue
          </Link>

          <Link
            to="/"
            className="w-full flex justify-center items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FaHome className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;

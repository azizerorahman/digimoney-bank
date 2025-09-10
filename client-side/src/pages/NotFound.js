import { Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
} from "react-icons/fa";

const NotFound = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Warning Icon */}
        <div className="mx-auto w-28 h-28 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center animate-pulse">
          <FaExclamationTriangle className="w-14 h-14 text-yellow-600 dark:text-yellow-400" />
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-lg">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-6 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FaHome className="w-5 h-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

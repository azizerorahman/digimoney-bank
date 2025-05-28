import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const AccountUnderVerification = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // Function to get initials and a consistent color based on the user's name
  const getInitialsAvatar = () => {
    if (!user || !user.displayName) {
      // If no display name is available, use email or a default
      const email = user?.email || "";
      const initial = email ? email[0].toUpperCase() : "?";
      return { initial, color: "bg-indigo-600" };
    }

    const initial = user.displayName[0].toUpperCase();

    // Generate a consistent color based on the initial
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const colorIndex = initial.charCodeAt(0) % colors.length;

    return { initial, color: colors[colorIndex] };
  };

  const { initial, color } = getInitialsAvatar();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-950 via-primary to-indigo-900 dark:from-gray-800 dark:to-gray-900 p-6">
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${color} text-white font-bold text-2xl`}
            >
              {initial}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Account Verification
          </h2>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 px-6 py-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Verification in progress
              </span>
            </div>

            {/* Message */}
            <p className="text-center text-gray-600 dark:text-gray-300">
              Your account is currently under verification. Please wait for the
              confirmation message from our team.
            </p>

            {/* Timeline - Matching the image exactly */}
            <div className="w-full flex items-center justify-center">
              <div className="relative">
                <div className="absolute left-8 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                <div className="relative flex items-center mb-2">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-400 z-10"></div>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                      Account Created
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center mb-2">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-amber-400 z-10"></div>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                      Verification
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      In progress
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 z-10"></div>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Account Activation
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pending
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => navigate("/")}
              className="!mt-10 px-6 py-3 bg-gradient-to-r from-indigo-600 to-primary hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
            >
              Return to Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </motion.div>
      
    </div>
  );
};

export default AccountUnderVerification;

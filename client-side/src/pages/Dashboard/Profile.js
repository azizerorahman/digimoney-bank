import React, { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import LoadingSpinner from "../../components/Loading";
import axios from "axios";

const Profile = () => {
  const uId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user-details`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Set default profile data if API fails
        setProfile({
          name: "Demo User",
          fatherName: "Not provided",
          motherName: "Not provided",
          email: "user@example.com",
          phone: "Not provided",
          gender: "Not specified",
          address: "Not provided",
          role: ["user"],
          verified: false,
          admin: false,
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [uId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              View your personal information and account details
            </p>
          </div>
        </AnimatedSection>

        {/* Profile Card */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300"></div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {profile?.name || "User"}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">
                  {profile?.email || "No email"}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 mb-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      profile?.verified
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {profile?.verified ? "✅ Verified" : "❌ Unverified"}
                  </span>
                  {profile?.admin && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      👑 Admin
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Personal Information */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.name || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Father's Name
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.fatherName || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mother's Name
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.motherName || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.email || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {profile?.address || "Not provided"}
                    </p>
                  </div>

                  {/* User Roles */}
                  {profile?.role &&
                    Array.isArray(profile.role) &&
                    profile.role.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          User Roles
                        </label>
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <div className="flex flex-wrap gap-2">
                            {profile.role.map((role, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium capitalize"
                              >
                                {role.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Profile;

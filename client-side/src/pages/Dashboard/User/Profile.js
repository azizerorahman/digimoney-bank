import React, { useEffect, useState } from "react";
import AnimatedSection from "../../../components/AnimatedSection";
import LoadingSpinner from "../../../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const uId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data && res.data.success) {
          const profileData = res.data.profile;
          setProfile(profileData);
          setFormData({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            address: profileData.address || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Set default profile data if API fails
        setProfile({
          name: "User",
          email: "user@example.com",
          phone: "Not provided",
          address: "Not provided",
          role: "user",
          status: "Active",
          createdAt: new Date().toISOString(),
        });
        setFormData({
          name: "User",
          email: "user@example.com",
          phone: "Not provided",
          address: "Not provided",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [uId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile`,
        { ...formData, uId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.success) {
        setProfile((prev) => ({ ...prev, ...formData }));
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Manage your personal information and account settings
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {profile?.status || "Active"}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
                    {profile?.role || "User"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: profile?.name || "",
                          email: profile?.email || "",
                          phone: profile?.phone || "",
                          address: profile?.address || "",
                        });
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Cancel
                    </button>
                  </>
                )}
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
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {profile?.name || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {profile?.email || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {profile?.phone || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white min-h-[88px]">
                        {profile?.address || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account Role
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium capitalize">
                        {profile?.role || "User"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account Status
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                        {profile?.status || "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Member Since
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {profile?.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          User ID
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {uId?.slice(-8) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Security Settings
                    </h4>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-200">
                        Change Password
                      </button>
                      <button className="w-full px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-200">
                        Two-Factor Authentication
                      </button>
                      <button className="w-full px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-200">
                        Login History
                      </button>
                    </div>
                  </div>
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

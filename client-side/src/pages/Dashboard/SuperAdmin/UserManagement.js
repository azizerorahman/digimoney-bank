import { useState } from "react";
import {
  Search,
  User,
  Users,
  AlertTriangle,
  XCircle,
  Edit,
  Shield,
  UserCheck,
  UserX,
  Save,
  Key,
  Filter,
  Eye,
} from "lucide-react";
import useSuperAdminData from "../../../hooks/useSuperAdminData";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUserType, setFilterUserType] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch SuperAdmin data using custom hooks
  const {
    data: userManagementData,
    loading: userManagementLoading,
    error: userManagementError,
  } = useSuperAdminData("userManagement");

  const {
    data: userListData,
    loading: userListLoading,
    error: userListError,
  } = useSuperAdminData("userList");

  const {
    data: roleDefinitionsData,
    loading: roleDefinitionsLoading,
    error: roleDefinitionsError,
  } = useSuperAdminData("roleDefinitions");

  // Loading and error states
  const isLoading =
    userManagementLoading || userListLoading || roleDefinitionsLoading;
  const hasError = userManagementError || userListError || roleDefinitionsError;

  // Process data with proper fallbacks
  const processedData = {
    userManagement: userManagementData?.userStats
      ? userManagementData
      : {
          userStats: {
            totalEmployees: 1250,
            activeEmployees: 1180,
            customers: 124500,
            activeCustomers: 118200,
            adminUsers: 25,
            suspendedUsers: 85,
          },
        },
    userList: userListData?.users || [],
    roleDefinitions: roleDefinitionsData?.roles || [],
  };

  // Helper functions
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Suspended":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400";
      case "Account Manager":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      case "Loan Officer":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "Compliance Officer":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400";
      case "IT Administrator":
        return "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-400";
      case "Customer":
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-black dark:text-white";
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  // Filter users based on search and type
  const filteredUsers = processedData.userList.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterUserType === "all" ||
      (filterUserType === "employees" && user.role !== "Customer") ||
      (filterUserType === "customers" && user.role === "Customer") ||
      (filterUserType === "admins" &&
        ["Super Admin", "Admin", "IT Administrator"].includes(user.role)) ||
      (filterUserType === "suspended" && user.status === "Suspended") ||
      (filterUserType === "active" && user.status === "Active");

    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
            Error Loading User Management Data
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">
            {userManagementError || userListError || roleDefinitionsError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Comprehensive user administration and oversight
            </p>
          </div>
        </AnimatedSection>

        {/* User Statistics Cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Total Employees Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                    Total Employees
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats?.totalEmployees ||
                        0
                    )}
                  </p>
                </div>
                <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Active Employees Card */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                    Active Employees
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats
                        ?.activeEmployees || 0
                    )}
                  </p>
                </div>
                <UserCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Customers Card */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium mb-1">
                    Customers
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats?.customers || 0
                    )}
                  </p>
                </div>
                <User className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            {/* Active Customers Card */}
            <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20 border border-teal-200 dark:border-teal-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-teal-200/50 dark:hover:shadow-teal-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-teal-700 dark:text-teal-300 font-medium mb-1">
                    Active Customers
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats
                        ?.activeCustomers || 0
                    )}
                  </p>
                </div>
                <UserCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-teal-600 dark:text-teal-400" />
              </div>
            </div>

            {/* Admin Users Card */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium mb-1">
                    Admin Users
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats?.adminUsers || 0
                    )}
                  </p>
                </div>
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>

            {/* Suspended Users Card */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium mb-1">
                    Suspended Users
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                    {formatNumber(
                      processedData.userManagement?.userStats?.suspendedUsers ||
                        0
                    )}
                  </p>
                </div>
                <UserX className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* User Management Table */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500">
            {/* Table Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Top System Users
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Key personnel and high-priority users in the system
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 w-full sm:w-64"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      value={filterUserType}
                      onChange={(e) => setFilterUserType(e.target.value)}
                      className="pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="all">All Users</option>
                      <option value="employees">Employees</option>
                      <option value="customers">Customers</option>
                      <option value="admins">Administrators</option>
                      <option value="active">Active Users</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Filter Summary */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {filteredUsers.length} top users
                  {processedData.userList.length > 0 &&
                    ` (${processedData.userList.length} total)`}
                </span>
                {searchTerm && (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">
                    Filtered by: "{searchTerm}"
                  </span>
                )}
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Role & Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 group"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-11 w-11">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role & Department */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {user.department}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Activity */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {user.lastLogin}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatNumber(user.loginCount)} logins
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSelectUser(user)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No top users found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm
                      ? "Try adjusting your search criteria to find top users"
                      : "No top users match the selected filter"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                    Basic Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Name:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Email:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        User ID:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Role:
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-lg font-medium ${getRoleColor(
                          selectedUser.role
                        )}`}
                      >
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Department:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Status:
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-lg font-medium ${getStatusColor(
                          selectedUser.status
                        )}`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                    Activity Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Created:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.createdDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Last Login:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.lastLogin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Login Count:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatNumber(selectedUser.loginCount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Last Activity:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedUser.lastActivity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                  Permissions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedUser.permissions?.map((permission, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg font-medium"
                    >
                      {permission
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => handleEditUser(selectedUser)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit User
                </button>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Reset Password
                </button>
                {selectedUser.status === "Active" ? (
                  <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                    <UserX className="h-4 w-4" />
                    Suspend User
                  </button>
                ) : (
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Activate User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit User
                </h3>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingUser.name}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={editingUser.email}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    defaultValue={editingUser.role}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option>Account Manager</option>
                    <option>Loan Officer</option>
                    <option>Compliance Officer</option>
                    <option>IT Administrator</option>
                    <option>Super Admin</option>
                    <option>Customer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    defaultValue={editingUser.department}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option>Private Banking</option>
                    <option>Commercial Lending</option>
                    <option>Risk & Compliance</option>
                    <option>Information Technology</option>
                    <option>N/A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    defaultValue={editingUser.status}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditUserModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

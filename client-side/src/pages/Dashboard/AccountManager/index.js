// pages/Dashboard/AccountManager/index.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";

const AccountManager = () => {
  const location = useLocation();
  const { userInfo } = useUserInfo(localStorage.getItem("userId"));
  
  const navItems = [
    {
      name: "Customer Portfolio",
      path: "/dashboard/account-manager/customer-portfolio",
    },
    {
      name: "Investment Performance",
      path: "/dashboard/account-manager/investment-performance",
    },
    {
      name: "Calendar & Meetings",
      path: "/dashboard/account-manager/calendar-meetings",
    },
    {
      name: "Communications",
      path: "/dashboard/account-manager/communications",
    },
    {
      name: "Revenue Analytics",
      path: "/dashboard/account-manager/revenue-analytics",
    },
    {
      name: "Transaction Alerts",
      path: "/dashboard/account-manager/transaction-alerts",
    },
  ];

  return (
    <div className="account-manager-dashboard">
      {/* Dashboard header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Account Manager Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome, {userInfo?.name || userInfo?.email || "Account Manager"}
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* This is crucial - it renders the child route components */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountManager;

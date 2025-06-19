import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const User = ({ userInfo }) => {
  const { pathname } = useLocation();
  
  // Define navigation items for the user dashboard
  const navItems = [
    {
      name: "Transaction History",
      path: "/dashboard/user/transaction-history",
    },
    {
      name: "Budget Management",
      path: "/dashboard/user/budget-management",
    },
    {
      name: "Investment Portfolio",
      path: "/dashboard/user/investment-portfolio",
    },
    {
      name: "Loans & Mortgages",
      path: "/dashboard/user/loan-and-mortgage-management",
    },
    {
      name: "Credit Score",
      path: "/dashboard/user/credit-score-and-reports",
    },
    {
      name: "Insurance Coverage",
      path: "/dashboard/user/insurance-coverage",
    },
    {
      name: "Recommendations",
      path: "/dashboard/user/comparison-and-recommendation",
    },
    {
      name: "Alerts & Notifications",
      path: "/dashboard/user/alerts-and-notifications",
    },
  ];

  return (
    <div className="user-dashboard">
      {/* User dashboard header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome, {userInfo?.name || userInfo?.email || "User"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your finances and track your progress
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
                pathname === item.path
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

export default User;

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
      <div>
        <Outlet />
      </div>
  );
};

export default User;

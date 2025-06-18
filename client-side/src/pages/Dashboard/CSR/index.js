import { Link, Outlet, useLocation } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";

const CSR = () => {
  const location = useLocation();
  const { userInfo } = useUserInfo(localStorage.getItem("userId"));

  const navItems = [
    {
      name: "Customer Portfolio",
      path: "/dashboard/csr/customer-portfolio",
    },
    {
      name: "Service Requests",
      path: "/dashboard/csr/service-requests",
    },
    {
      name: "Transactions",
      path: "/dashboard/csr/transactions",
    },
    {
      name: "Quick Actions",
      path: "/dashboard/csr/quick-actions",
    },
  ];

  return (
    <div className="csr-dashboard">
      {/* Dashboard header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Customer Service Representative Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome, {userInfo?.name || userInfo?.email || "CSR"}
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

export default CSR;

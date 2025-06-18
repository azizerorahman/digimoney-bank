import { Link, Outlet, useLocation } from "react-router-dom";

const SuperAdmin = () => {
  const { pathname } = useLocation();
  
  const navItems = [
    {
      name: "User Management",
      path: "/dashboard/super-admin/user-management",
    },
    {
      name: "Audit Logs",
      path: "/dashboard/super-admin/audit-logs",
    },
    {
      name: "Financial Reports",
      path: "/dashboard/super-admin/financial-reports",
    },
    {
      name: "System Config",
      path: "/dashboard/super-admin/system-config",
    },
    {
      name: "Security & Compliance",
      path: "/dashboard/super-admin/security-and-compliance",
    },
  ];

  return (
    <div className="super-admin-dashboard">
      {/* Dashboard header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage system settings and user accounts
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

export default SuperAdmin;

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useUserInfo from "../../hooks/useUserInfo";
import AccountUnderVerification from "./AccountUnderVerification";
import LoadingSpinner from "../../components/Loading";
import Logout from "../Auth/Logout";
import {
  FaMoneyCheck,
  FaMoneyBill,
  FaUsers,
  FaChartLine,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaLightbulb,
  FaBell,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { MdRateReview, MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiHistoryLine } from "react-icons/ri";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const region = localStorage.getItem("region");
  // Sidebar open state: true for desktop, false for mobile by default
  const [open, setOpen] = useState(() => window.innerWidth >= 1024);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const check = useSelector((state) => state.checkUser);
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading } = useUserInfo(uId);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // State for active role (default to first role in the array or 'user')
  const [activeRole, setActiveRole] = useState(() => {
    const savedRole = localStorage.getItem("activeRole");
    if (savedRole && userInfo?.role?.includes(savedRole)) {
      return savedRole;
    }
    return userInfo?.role?.[0] || "user";
  });

  // Get user display information based on region
  const getUserDisplayInfo = () => {
    if (region === "global" && user) {
      // Global region: use Firebase user info
      return {
        displayName: user.displayName || user.email,
        email: user.email,
        initial: user.displayName?.charAt(0) || user.email?.charAt(0),
      };
    } else if (region === "china" && userInfo) {
      // China region: use backend user info
      return {
        displayName: userInfo.name || userInfo.email,
        email: userInfo.email,
        initial: userInfo.name?.charAt(0) || userInfo.email?.charAt(0),
      };
    }
    // Fallback
    return {
      displayName: "User",
      email: "",
      initial: "U",
    };
  };

  const userDisplayInfo = getUserDisplayInfo();
  const color = "bg-primary";

  // Get user verification status
  const { verified, loading } = check;

  // Handle direct navigation to /dashboard
  useEffect(() => {
    if (pathname === "/dashboard" && userInfo && !isLoading) {
      // Get user roles as an array
      const roles = Array.isArray(userInfo.role)
        ? userInfo.role
        : [userInfo.role];

      // Get active role (from localStorage or default to first role)
      const savedRole = localStorage.getItem("activeRole");
      const currentRole =
        savedRole && roles.includes(savedRole) ? savedRole : roles[0];

      // Redirect based on role
      switch (currentRole) {
        case "user":
          navigate("/dashboard/user");
          break;
        case "super-admin":
          navigate("/dashboard/super-admin");
          break;
        case "account-manager":
          navigate("/dashboard/account-manager");
          break;
        case "loan-officer":
          navigate("/dashboard/loan-officer");
          break;
        case "csr":
          navigate("/dashboard/csr");
          break;
        default:
          // Default to user dashboard if role is unknown
          navigate("/dashboard/user");
      }
    }
  }, [pathname, userInfo, isLoading, navigate]);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Responsive sidebar: auto-close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active role when userInfo changes
  useEffect(() => {
    if (userInfo?.role && userInfo.role.length > 0) {
      // If current activeRole is not in the user's roles, reset to first available role
      if (Array.isArray(userInfo.role) && !userInfo.role.includes(activeRole)) {
        setActiveRole(userInfo.role[0]);
        localStorage.setItem("activeRole", userInfo.role[0]);
      } else if (
        typeof userInfo.role === "string" &&
        userInfo.role !== activeRole
      ) {
        setActiveRole(userInfo.role);
        localStorage.setItem("activeRole", userInfo.role);
      }
    }
  }, [userInfo, activeRole]);

  // Handle role change
  const handleRoleChange = (role) => {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);

    // Navigate to the appropriate dashboard based on the selected role
    switch (role) {
      case "user":
        navigate("/dashboard/user");
        break;
      case "super-admin":
        navigate("/dashboard/super-admin");
        break;
      case "account-manager":
        navigate("/dashboard/account-manager");
        break;
      case "loan-officer":
        navigate("/dashboard/loan-officer");
        break;
      case "csr":
        navigate("/dashboard/csr");
        break;
      default:
        navigate("/dashboard");
    }
  };

  // Handle logout with toast notification
  const handleLogout = () => {
    Logout();
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  // Define menu items for different roles
  const menuItems = {
    user: [
      {
        title: "Dashboard",
        path: "/dashboard/user",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Overview of your account",
      },
      {
        title: "Profile",
        path: "/dashboard/user/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your profile settings",
      },
      {
        title: "Money Transfer",
        path: "/dashboard/user/money-transfer",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "Transfer money between accounts",
      },
      {
        title: "Transactions",
        path: "/dashboard/user/transaction-history",
        src: <RiHistoryLine className="w-5 h-5" />,
        description: "View your transaction history",
      },
      {
        title: "Budget Management",
        path: "/dashboard/user/budget-management",
        src: <FaMoneyBill className="w-5 h-5" />,
        description: "Manage your budget",
      },
      {
        title: "Investments",
        path: "/dashboard/user/investment-portfolio",
        src: <FaChartLine className="w-5 h-5" />,
        description: "Manage your investment portfolio",
      },
      {
        title: "Loans & Mortgages",
        path: "/dashboard/user/loan-and-mortgage-management",
        src: <FaHandHoldingUsd className="w-5 h-5" />,
        description: "Manage your loans and mortgages",
      },
      {
        title: "Insurance",
        path: "/dashboard/user/insurance-coverage",
        src: <FaShieldAlt className="w-5 h-5" />,
        description: "Manage your insurance coverage",
      },
      {
        title: "Recommendations",
        path: "/dashboard/user/recommendation",
        src: <FaLightbulb className="w-5 h-5" />,
        description: "View financial recommendations",
      },
      {
        title: "Alerts",
        path: "/dashboard/user/alerts-and-notifications",
        src: <FaBell className="w-5 h-5" />,
        description: "Manage your alerts and notifications",
      },
    ],
    "super-admin": [
      {
        title: "Dashboard",
        path: "/dashboard/super-admin",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Admin dashboard overview",
      },
      {
        title: "User Management",
        path: "/dashboard/super-admin/user-management",
        src: <FaUsers className="w-5 h-5" />,
        description: "Manage all users",
      },
      {
        title: "Financial Reports",
        path: "/dashboard/super-admin/financial-reports",
        src: <FaMoneyBill className="w-5 h-5" />,
        description: "View financial reports",
      },
      {
        title: "Audit Logs",
        path: "/dashboard/super-admin/audit-logs",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Review system audit logs",
      },
      {
        title: "System Config",
        path: "/dashboard/super-admin/system-config",
        src: <RiBarChartHorizontalLine className="w-5 h-5" />,
        description: "Configure system settings",
      },
      {
        title: "Security",
        path: "/dashboard/super-admin/security-and-compliance",
        src: <FaShieldAlt className="w-5 h-5" />,
        description: "Manage security settings",
      },
    ],
    "account-manager": [
      {
        title: "Dashboard",
        path: "/dashboard/account-manager",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Account manager dashboard overview",
      },
      {
        title: "Customer Portfolio",
        path: "/dashboard/account-manager/customer-portfolio",
        src: <FaUsers className="w-5 h-5" />,
        description: "Manage customer portfolios",
      },
      {
        title: "Meetings",
        path: "/dashboard/account-manager/meetings",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Schedule and view meetings",
      },
      {
        title: "Investments",
        path: "/dashboard/account-manager/investment-performance",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "Track investment performance",
      },
      {
        title: "Revenue Analytics",
        path: "/dashboard/account-manager/revenue-analytics",
        src: <FaMoneyBill className="w-5 h-5" />,
        description: "View revenue analytics",
      },
      {
        title: "Transaction Alerts",
        path: "/dashboard/account-manager/transaction-alerts",
        src: <RiBarChartHorizontalLine className="w-5 h-5" />,
        description: "Monitor transaction alerts",
      },
    ],
    "loan-officer": [
      {
        title: "Loan Portfolio",
        path: "/dashboard/loan-officer/loan-portfolio",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "View loan portfolio",
      },
      {
        title: "Application Pipeline",
        path: "/dashboard/loan-officer/application-pipeline",
        src: <FaUsers className="w-5 h-5" />,
        description: "Track loan applications",
      },
      {
        title: "Credit Analysis",
        path: "/dashboard/loan-officer/credit-analysis",
        src: <ImProfile className="w-5 h-5" />,
        description: "Analyze credit reports",
      },
      {
        title: "Risk Assessment",
        path: "/dashboard/loan-officer/risk-assessment",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Evaluate loan risks",
      },
      {
        title: "Communications",
        path: "/dashboard/loan-officer/communications",
        src: <RiBarChartHorizontalLine className="w-5 h-5" />,
        description: "Client communications",
      },
    ],
    csr: [
      {
        title: "Customer Profile",
        path: "/dashboard/csr/customer-profile",
        src: <FaUsers className="w-5 h-5" />,
        description: "View customer profiles",
      },
      {
        title: "Service Requests",
        path: "/dashboard/csr/service-requests",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Manage service requests",
      },
      {
        title: "Transactions",
        path: "/dashboard/csr/transactions",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "View customer transactions",
      },
      {
        title: "Quick Actions",
        path: "/dashboard/csr/quick-actions",
        src: <RiBarChartHorizontalLine className="w-5 h-5" />,
        description: "Perform quick actions",
      },
    ],
  };

  // Helper function to format role names
  const formatRoleName = (role) => {
    if (!role) return "User";

    // Handle special case for CSR
    if (role.toLowerCase() === "csr") return "CSR";

    // Split by hyphens and capitalize each word
    return role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Show loading spinner while direct navigation is being processed
  if (pathname === "/dashboard" && (isLoading || loading)) {
    return <LoadingSpinner overlay />;
  }

  // Get current menu based on active role
  const currentMenu = menuItems[activeRole] || menuItems.user;

  return (
    <>
      {verified ? (
        <div
          className={`${darkMode ? "dark" : ""} transition-colors duration-300`}
        >
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
              className={`
                ${open ? "w-64" : "w-20"}
                transition-all duration-300 ease-in-out
                bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800 shadow-xl
                flex flex-col
                relative
              `}
            >
              {/* Toggle button (always visible on mobile, sticky on desktop) */}
              <button
                onClick={() => setOpen(!open)}
                className="absolute -right-3 top-16 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none"
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              >
                <BsArrowLeftCircle
                  className={`w-5 h-5 transition-transform duration-300 ${
                    !open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Logo */}
              <div
                className={`flex items-center gap-x-3 px-6 py-5 ${
                  !open ? "justify-center" : ""
                }`}
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"></path>
                    <path d="M12 6v2m0 8v2"></path>
                  </svg>
                </div>
                {open && (
                  <h1 className="text-xl font-bold text-white">
                    DigiMoney Bank
                  </h1>
                )}
              </div>

              {/* User info */}
              <div
                className={`flex flex-col items-center mt-6 ${
                  !open ? "px-2" : "px-4 w-full"
                }`}
              >
                {/* User avatar */}
                <div
                  className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold uppercase`}
                >
                  {userDisplayInfo.initial}
                </div>

                {/* User details - shown when sidebar is open */}
                {open && (
                  <div className="mt-3 text-center w-full space-y-3">
                    <h4 className="text-sm font-medium text-white truncate">
                      {userDisplayInfo.displayName}
                    </h4>

                    {/* Role display/selector */}
                    {userInfo?.role && (
                      <div className="w-full">
                        {/* Role selector dropdown - for multiple roles */}
                        {Array.isArray(userInfo.role) &&
                        userInfo.role.length > 1 ? (
                          <select
                            value={activeRole}
                            onChange={(e) => handleRoleChange(e.target.value)}
                            className="w-full text-xs bg-indigo-800 dark:bg-gray-700 text-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 appearance-none cursor-pointer transition-all duration-200"
                          >
                            {userInfo.role.map((r) => (
                              <option
                                key={r}
                                value={r}
                                className="bg-indigo-800 dark:bg-gray-700 text-white"
                              >
                                {formatRoleName(r)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          /* Single role display */
                          <div className="w-full text-xs text-gray-300 bg-indigo-800 dark:bg-gray-700 px-3 py-2.5 rounded-lg h-10 flex items-center justify-center font-medium">
                            {formatRoleName(
                              typeof userInfo.role === "string"
                                ? userInfo.role
                                : userInfo.role[0]
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dark mode toggle */}
                    <div className="w-full">
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-full h-10 flex items-center justify-between bg-indigo-800 dark:bg-gray-700 hover:bg-indigo-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-200 px-3 py-2.5 group"
                        title={
                          darkMode
                            ? "Switch to Light Mode"
                            : "Switch to Dark Mode"
                        }
                      >
                        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                          {darkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                        <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                          {darkMode ? (
                            <FaSun className="w-4 h-4" />
                          ) : (
                            <FaMoon className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode toggle for collapsed sidebar */}
              {!open && (
                <div className="flex justify-center px-2 mt-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-10 h-10 flex items-center justify-center bg-indigo-800 dark:bg-gray-700 hover:bg-indigo-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
                    title={
                      darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                    }
                  >
                    {darkMode ? (
                      <FaSun className="w-5 h-5" />
                    ) : (
                      <FaMoon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}

              {/* Menu items */}
              <div className="flex flex-col justify-between flex-1 mt-6 overflow-y-auto">
                <nav>
                  {currentMenu.map((item, index) => {
                    // More precise active state detection
                    const isActive =
                      // Exact match for home path
                      (item.path === "/" && pathname === "/") ||
                      // For dashboard root paths like "/dashboard/user"
                      (item.path.includes("/dashboard/") &&
                        !item.path.split("/").slice(3).join("/") &&
                        pathname === item.path) ||
                      // For specific subpaths, ensure exact match or direct parent
                      (item.path !== "/" &&
                        pathname !== "/dashboard/user" &&
                        pathname.startsWith(item.path) &&
                        // Check if this is the most specific match
                        currentMenu.every(
                          (otherItem) =>
                            otherItem === item ||
                            !pathname.startsWith(otherItem.path) ||
                            otherItem.path.length < item.path.length
                        ));

                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center px-4 py-3 
            ${isActive ? "bg-indigo-800 dark:bg-gray-700" : ""} 
            text-white transition-colors duration-300 transform 
            hover:bg-indigo-800 dark:hover:bg-gray-700 hover:text-white`}
                        title={item.description}
                      >
                        <div
                          className={`${
                            open ? "min-w-[28px]" : "w-full"
                          } flex ${open ? "" : "justify-center"}`}
                        >
                          {item.src}
                        </div>
                        {open && (
                          <span className="mx-4 font-medium">{item.title}</span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 text-white transition-colors duration-300 transform hover:bg-indigo-800 dark:hover:bg-gray-700 hover:text-white mb-4"
                  title="Log out of your account"
                >
                  <div
                    className={`${open ? "min-w-[28px]" : "w-full"} flex ${
                      open ? "" : "justify-center"
                    }`}
                  >
                    <FiLogOut className="w-5 h-5" />
                  </div>
                  {open && <span className="mx-4 font-medium">Logout</span>}
                </button>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <AccountUnderVerification />
      )}
    </>
  );
};

export default Dashboard;

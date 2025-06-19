import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaMoneyCheck, FaMoneyBill, FaUsers } from "react-icons/fa";
import { MdRateReview, MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useUserInfo from "../../hooks/useUserInfo";
import AccountUnderVerification from "./AccountUnderVerification";
import LoadingSpinner from "../../components/Loading";
import Logout from "../Auth/Logout";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(true);
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

  // Get initial for avatar
  const initial = user?.displayName?.charAt(0) || user?.email?.charAt(0);
  const color = "bg-primary";

  // Get user verification status
  const { verified, loading } = check;

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Update active role when userInfo changes
  useEffect(() => {
    if (userInfo?.role && userInfo.role.length > 0) {
      // If current activeRole is not in the user's roles, reset to first available role
      if (!userInfo.role.includes(activeRole)) {
        setActiveRole(userInfo.role[0]);
        localStorage.setItem("activeRole", userInfo.role[0]);
      }
    }
  }, [userInfo, activeRole]);

  // Handle role change
  const handleRoleChange = (role) => {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
    
    // Navigate to the appropriate dashboard based on the selected role
    switch(role) {
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
        title: "Home",
        path: "/",
        src: <AiFillHome className="w-5 h-5" />,
        description: "Return to homepage",
      },
      {
        title: "Dashboard",
        path: "/dashboard/user",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Overview of your account",
      },
      {
        title: "Transactions",
        path: "/dashboard/user/transaction-history",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "View your transaction history",
      },
      {
        title: "Send Money",
        path: "/dashboard/user/send-money",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "Transfer funds to another account",
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
        src: <MdRateReview className="w-5 h-5" />,
        description: "Manage your investment portfolio",
      },
      {
        title: "Loans & Mortgages",
        path: "/dashboard/user/loan-and-mortgage-management",
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "Manage your loans and mortgages",
      },
      {
        title: "Credit Score",
        path: "/dashboard/user/credit-score-and-reports",
        src: <ImProfile className="w-5 h-5" />,
        description: "View your credit score and reports",
      },
      {
        title: "Insurance",
        path: "/dashboard/user/insurance-coverage",
        src: <FaUsers className="w-5 h-5" />,
        description: "Manage your insurance coverage",
      },
      {
        title: "Recommendations",
        path: "/dashboard/user/comparison-and-recommendation",
        src: <MdRateReview className="w-5 h-5" />,
        description: "View financial recommendations",
      },
      {
        title: "Alerts",
        path: "/dashboard/user/alerts-and-notifications",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Manage your alerts and notifications",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your account settings",
      },
    ],
    "super-admin": [
      {
        title: "Home",
        path: "/",
        src: <AiFillHome className="w-5 h-5" />,
        description: "Return to homepage",
      },
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
        src: <MdDashboard className="w-5 h-5" />,
        description: "Configure system settings",
      },
      {
        title: "Security",
        path: "/dashboard/super-admin/security-and-compliance",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage security settings",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your account settings",
      },
    ],
    "account-manager": [
      {
        title: "Home",
        path: "/",
        src: <AiFillHome className="w-5 h-5" />,
        description: "Return to homepage",
      },
      {
        title: "Dashboard",
        path: "/dashboard/account-manager",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Account manager overview",
      },
      {
        title: "Customer Portfolio",
        path: "/dashboard/account-manager/customer-portfolio",
        src: <FaUsers className="w-5 h-5" />,
        description: "Manage customer portfolios",
      },
      {
        title: "Calendar & Meetings",
        path: "/dashboard/account-manager/calendar-meetings",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Schedule and view meetings",
      },
      {
        title: "Communications",
        path: "/dashboard/account-manager/communications",
        src: <MdRateReview className="w-5 h-5" />,
        description: "Customer communications",
      },
      {
        title: "Investment Performance",
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
        src: <FaMoneyCheck className="w-5 h-5" />,
        description: "Monitor transaction alerts",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your account settings",
      },
    ],
    "loan-officer": [
      {
        title: "Home",
        path: "/",
        src: <AiFillHome className="w-5 h-5" />,
        description: "Return to homepage",
      },
      {
        title: "Dashboard",
        path: "/dashboard/loan-officer",
        src: <MdDashboard className="w-5 h-5" />,
        description: "Loan officer overview",
      },
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
        src: <MdRateReview className="w-5 h-5" />,
        description: "Client communications",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your account settings",
      },
    ],
    "csr": [
      {
        title: "Home",
        path: "/",
        src: <AiFillHome className="w-5 h-5" />,
        description: "Return to homepage",
      },
      {
        title: "Dashboard",
        path: "/dashboard/csr",
        src: <MdDashboard className="w-5 h-5" />,
        description: "CSR dashboard overview",
      },
      {
        title: "Customer Profile",
        path: "/dashboard/csr/customer-portfolio",
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
        src: <MdDashboard className="w-5 h-5" />,
        description: "Perform quick actions",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        src: <ImProfile className="w-5 h-5" />,
        description: "Manage your account settings",
      },
    ]
  };

  // Get current menu based on active role
  const currentMenu = menuItems[activeRole] || menuItems.user;

  return (
    <>
      {verified ? (
        <div className={`${darkMode ? "dark" : ""} transition-colors duration-300`}>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
              className={`${
                open ? "w-64" : "w-20"
              } transition-all duration-300 ease-in-out bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800 shadow-xl relative`}
            >
              {/* Toggle button */}
              <button
                onClick={() => setOpen(!open)}
                className="absolute -right-3 top-9 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              >
                <BsArrowLeftCircle
                  className={`w-5 h-5 transition-transform duration-300 ${
                    !open && "rotate-180"
                  }`}
                />
              </button>

              {/* Logo */}
              <div
                className={`flex items-center gap-x-3 px-6 py-5 ${
                  !open && "justify-center"
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span
                  className={`text-xl font-bold text-white transition-opacity duration-300 ${
                    !open && "opacity-0 hidden"
                  }`}
                >
                  DigiMoney
                </span>
              </div>

              {/* Role Switcher - Only show if user has multiple roles */}
              {userInfo?.role && userInfo.role.length > 1 && open && (
                <div className="px-4 mb-4">
                  <div className="bg-white/10 dark:bg-white/5 rounded-lg p-2">
                    <select
                      value={activeRole}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="w-full bg-transparent text-white border-0 focus:ring-2 focus:ring-accent text-sm rounded-md"
                    >
                      {userInfo.role.map((role) => (
                        <option key={role} value={role} className="bg-primary text-white">
                          {role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Menu items */}
              <nav className="mt-4 px-4">
                <ul className="space-y-2">
                  {currentMenu.map((menu, i) => (
                    <li key={i}>
                      <Link
                        to={menu.path}
                        className={`flex items-center gap-x-3.5 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300
                          ${
                            pathname === menu.path
                              ? "bg-white/20 dark:bg-white/10 text-white"
                              : "text-white/80 dark:text-white/80 hover:bg-white/10 dark:hover:bg-white/5"
                          }
                          ${!open && "justify-center"}
                        `}
                        title={!open ? menu.title : ""}
                      >
                        <span className="text-xl">{menu.src}</span>
                        <span
                          className={`transition-opacity duration-300 ${
                            !open && "opacity-0 hidden"
                          }`}
                        >
                          {menu.title}
                        </span>
                      </Link>
                    </li>
                  ))}

                  {/* Logout button */}
                  <li className="pt-2">
                    <button
                      onClick={handleLogout}
                      className={`flex items-center gap-x-3.5 py-2.5 px-3 rounded-lg text-sm font-medium w-full transition-all duration-300
                        text-white/90 hover:bg-red-500/20 hover:text-white
                        ${!open && "justify-center"}
                      `}
                      title={!open ? "Logout" : ""}
                    >
                      <span className="text-xl">
                        <FiLogOut />
                      </span>
                      <span
                        className={`transition-opacity duration-300 ${
                          !open && "opacity-0 hidden"
                        }`}
                      >
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Dark mode toggle */}
              <div
                className={`absolute bottom-4 ${
                  open ? "left-4 right-4" : "left-0 right-0 flex justify-center"
                }`}
              >
                <div
                  className={`flex items-center ${
                    open ? "justify-between" : "justify-center"
                  } bg-white/10 dark:bg-white/5 rounded-lg p-2`}
                >
                  <span
                    className={`text-white/90 text-xs ${!open && "hidden"}`}
                  >
                    Dark Mode
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={darkMode}
                      onChange={(e) => {
                        setDarkMode(e.target.checked);
                        localStorage.setItem(
                          "darkMode",
                          JSON.stringify(e.target.checked)
                        );
                      }}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
              {/* Mobile header with role switcher */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={() => setOpen(!open)}
                    className="block lg:hidden p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                    aria-label="Toggle sidebar"
                  >
                    <RiBarChartHorizontalLine className="w-6 h-6" />
                  </button>

                  <div className="text-xl font-bold text-primary dark:text-white">
                    {pathname === "/dashboard"
                      ? "Dashboard Overview"
                      : currentMenu.find((menu) => menu.path === pathname)?.title ||
                        "Dashboard"}
                  </div>

                  <div className="flex items-center gap-x-4">
                    {/* Role switcher dropdown for mobile */}
                    {userInfo?.role && userInfo.role.length > 1 && (
                      <select
                        value={activeRole}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      >
                        {userInfo.role.map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Avatar/Profile */}
                    <div className="flex items-center gap-2">
                      {userInfo?.profilePhoto ? (
                        <img
                          src={userInfo.profilePhoto}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {initial}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      ) : (
        <AccountUnderVerification />
      )}
      {(loading || isLoading) && <LoadingSpinner fullscreen overlay />}
    </>
  );
};

export default Dashboard;

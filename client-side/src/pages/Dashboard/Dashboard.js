import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftCircle } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd, AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaMoneyCheck, FaMoneyBill, FaUsers } from "react-icons/fa";
import { MdRateReview, MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useUserInfo from "../../hooks/useUserInfo";
import { fetchApprovedUser } from "../../redux/reducers/ApprovedUsersReducers";
import AccountUnderVerification from "./AccountUnderVerification";
import LoadingSpinner from "../../components/Loading";
import Logout from "../Auth/Logout";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const check = useSelector((state) => state.checkUser);
  const uId = localStorage.getItem("userId");
  const { admin, loadingAdmin } = useAdmin(uId);
  const { userInfo } = useUserInfo(uId);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Get initial for avatar
  const initial = user?.displayName?.charAt(0) || user?.email?.charAt(0);
  // Set a color for the avatar (you can adjust this logic as needed)
  const color = "bg-primary";

  // Check if approved user
  useEffect(() => {
    dispatch(fetchApprovedUser({ email: user?.email }));
  }, [dispatch, user?.email]);

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

  // Handle logout with toast notification
  const handleLogout = () => {
    Logout();
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  // Dashboard menu items
  const Menus = [
    {
      isAdmin: true,
      dualUser: true,
      title: "Home",
      path: "/",
      src: <AiFillHome className="w-5 h-5" />,
      description: "Return to homepage",
    },
    {
      isAdmin: true,
      dualUser: true,
      title: "Dashboard",
      path: "/dashboard",
      src: <MdDashboard className="w-5 h-5" />,
      description: "Overview of your account",
    },
    {
      isAdmin: true,
      title: "User Requests",
      path: "/dashboard/user-request",
      src: <AiOutlineUsergroupAdd className="w-5 h-5" />,
      description: "Manage pending user requests",
    },
    {
      isAdmin: false,
      title: "Balance",
      path: "/dashboard/balance",
      src: <FaMoneyBill className="w-5 h-5" />,
      description: "View your current balance",
    },
    {
      isAdmin: false,
      title: "Review",
      path: "/dashboard/review",
      src: <MdRateReview className="w-5 h-5" />,
      description: "Leave feedback about our services",
    },
    {
      isAdmin: false,
      title: "Transactions",
      path: "/dashboard/transactions",
      src: <FaMoneyCheck className="w-5 h-5" />,
      description: "View your transaction history",
    },
    {
      isAdmin: true,
      title: "Find Transaction",
      path: "/dashboard/findTransaction",
      src: <FaMoneyCheck className="w-5 h-5" />,
      description: "Search for specific transactions",
    },
    {
      isAdmin: true,
      title: "All Users",
      path: "/dashboard/allusers",
      src: <FaUsers className="w-5 h-5" />,
      description: "Manage all registered users",
    },
    {
      isAdmin: false,
      title: "Send Money",
      path: "/dashboard/send-money",
      src: <FaMoneyCheck className="w-5 h-5" />,
      description: "Transfer funds to another account",
    },
    {
      isAdmin: true,
      dualUser: true,
      title: "Profile",
      path: "/dashboard/profile",
      src: <ImProfile className="w-5 h-5" />,
      description: "Manage your account settings",
    },
  ];

  return (
    <>
      {verified ? (
        <div
          className={`${darkMode ? "dark" : ""} transition-colors duration-300`}
        >
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

              {/* Menu items */}
              <nav className="mt-8 px-4">
                <ul className="space-y-2">
                  {Menus.map((menu, i) => {
                    if (admin === menu?.isAdmin || menu.dualUser) {
                      return (
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
                      );
                    }
                    return null;
                  })}

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
              {/* Mobile menu button */}
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
                      : Menus.find((menu) => menu.path === pathname)?.title ||
                        "Dashboard"}
                  </div>

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

              {/* Dashboard content */}
              <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      ) : (
        <AccountUnderVerification />
      )}
      {(loadingAdmin || loading) && <LoadingSpinner fullscreen overlay />}
    </>
  );
};

export default Dashboard;

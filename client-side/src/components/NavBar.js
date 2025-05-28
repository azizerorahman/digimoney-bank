import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import RegionSelector from "../components/RegionSelector";

const NavBar = ({ setDarkMode, darkMode }) => {
  const [user] = useAuthState(auth);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode toggle
  const handleDarkMode = (e) => {
    const isDark = e.target.checked;
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    setDarkMode(isDark);
  };

  // Handle logout
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path ? "text-emerald-400" : "";
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 dark:text-white/90 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-white shadow-md"
          : "bg-gradient-to-r from-indigo-900 to-blue-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="DigiMoney Bank Home"
          >
            {/* Logo SVG with subtle animation */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 transition-all duration-300 hover:text-accent"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6"></path>
                <path d="M12 18v2"></path>
                <path d="M12 4v2"></path>
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            </div>
            <span className="font-sans text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              DigiMoney
              <span
                className={`transition-colors duration-300 ${
                  scrolled ? "text-emerald-500" : "text-emerald-400"
                }`}
              >
                {" "}
                Bank
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors ${isActive(
                "/"
              )}`}
            >
              Personal
            </Link>
            <Link
              to="/business"
              className={`px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors ${isActive(
                "/business"
              )}`}
            >
              Business
            </Link>

            {/* Products Dropdown with improved styling */}
            <div className="dropdown dropdown-end dropdown-hover">
              <label
                tabIndex="0"
                className="px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
              >
                Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </label>
              <ul
                tabIndex="0"
                className={`dropdown-content z-[1] menu p-2 shadow-lg rounded-xl w-56 backdrop-blur-md animate-fadeIn border ${
                  scrolled
                    ? "bg-white/90 text-gray-800 border-gray-100 dark:bg-gray-800/90 dark:text-white dark:border-gray-700"
                    : "bg-indigo-900/90 text-white border-indigo-800"
                }`}
              >
                <li>
                  <Link
                    to="/accounts"
                    className="hover:bg-opacity-10 hover:bg-gray-400 rounded-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cards"
                    className="hover:bg-opacity-10 hover:bg-gray-400 rounded-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Credit Cards
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loans"
                    className="hover:bg-opacity-10 hover:bg-gray-400 rounded-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/investments"
                    className="hover:bg-opacity-10 hover:bg-gray-400 rounded-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Investments
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              to="/resources"
              className={`px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors ${isActive(
                "/resources"
              )}`}
            >
              Resources
            </Link>
            <Link
              to="/support"
              className={`px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors ${isActive(
                "/support"
              )}`}
            >
              Support
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors ${isActive(
                  "/dashboard"
                )}`}
              >
                My Banking
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <RegionSelector scrolled={scrolled} />
            {/* Theme Toggle with improved styling */}
            <label className="swap swap-rotate bg-white/10 p-1 rounded-full hover:bg-white/20 transition-colors">
              <input
                type="checkbox"
                onChange={handleDarkMode}
                checked={darkMode}
                className="theme-controller"
                aria-label="Toggle dark mode"
              />
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex="0"
                  className="btn btn-circle avatar border-2 border-emerald-400 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-glow"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.photoURL ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className={`mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content rounded-xl w-64 backdrop-blur-md animate-fadeIn border ${
                    scrolled
                      ? "bg-white/90 text-gray-800 border-gray-100 dark:bg-gray-800/90 dark:text-white dark:border-gray-700"
                      : "bg-indigo-900/90 text-white border-indigo-800"
                  }`}
                >
                  <li className="mb-2">
                    <div className="flex flex-col items-start p-2">
                      <span className="font-bold">
                        {user.displayName || "Account Holder"}
                      </span>
                      <span className="text-xs opacity-70">{user.email}</span>
                    </div>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <Link to="/accounts" className="justify-between rounded-lg">
                      My Accounts
                      <span className="badge badge-sm bg-emerald-500 text-white">
                        3
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfers" className="rounded-lg">
                      Transfers
                    </Link>
                  </li>
                  <li>
                    <Link to="/payments" className="rounded-lg">
                      Bill Payments
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="rounded-lg">
                      Account Settings
                    </Link>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <button
                      onClick={logout}
                      className="text-red-400 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`px-4 pt-1.5 hidden md:flex rounded-lg font-medium transition-all duration-300 ${
                    scrolled
                      ? "bg-indigo-900 text-white hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-md"
                      : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-glow"
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={`hidden md:flex px-4 py-1 rounded-lg font-medium transition-all duration-300 ${
                    scrolled
                      ? "border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-800 hover:text-white dark:border-white/90 dark:text-white/90 hover:dark:bg-white/90 hover:dark:text-indigo-900"
                      : "border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-600 hover:shadow-glow hover:border-emerald-600 hover:text-white"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button with improved animation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn btn-ghost btn-circle"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end justify-center gap-1.5">
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "w-4"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu with improved styling */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden py-3 animate-fadeIn ${
              scrolled ? " text-gray-800 dark:text-white" : "text-white"
            }`}
          >
            <RegionSelector
              scrolled={scrolled}
              isMobile={true}
              onMobileClose={() => setMobileMenuOpen(false)}
            />
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`py-3 px-5 rounded-lg hover:bg-opacity-10 hover:bg-gray-400 ${isActive(
                  "/"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Personal Banking
              </Link>
              <Link
                to="/business"
                className={`py-3 px-5 rounded-lg hover:bg-opacity-10 hover:bg-gray-400 ${isActive(
                  "/business"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Business Banking
              </Link>

              {/* Mobile Products Dropdown with improved styling */}
              <div className="collapse collapse-arrow rounded-lg">
                <input type="checkbox" className="peer" />
                <div className="collapse-title py-3 px-5">
                  Products & Services
                </div>
                <div className="collapse-content peer-checked:!p-3 peer-checked:bg-white/5">
                  <Link
                    to="/accounts"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Accounts
                  </Link>
                  <Link
                    to="/cards"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Credit Cards
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-white">
                      New
                    </span>
                  </Link>
                  <Link
                    to="/loans"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Loans
                  </Link>
                  <Link
                    to="/investments"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Investments
                  </Link>
                </div>
              </div>

              <Link
                to="/resources"
                className={`py-3 px-5 rounded-lg hover:bg-opacity-10 hover:bg-gray-400 ${isActive(
                  "/resources"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/support"
                className={`py-3 px-5 rounded-lg hover:bg-opacity-10 hover:bg-gray-400 ${isActive(
                  "/support"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>

              {user && (
                <Link
                  to="/dashboard"
                  className={`py-3 px-5 rounded-lg hover:bg-opacity-10 hover:bg-gray-400 ${isActive(
                    "/dashboard"
                  )}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Banking
                </Link>
              )}

              {/* Mobile auth buttons */}
              {!user && (
                <div className="flex flex-col gap-2 !mt-6 !mb-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-center font-medium hover:bg-emerald-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg border-2 border-emerald-400 text-emerald-400 text-center font-medium hover:bg-emerald-400 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;

import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadingSpinner from "./components/Loading";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

// User components
import User from "./pages/Dashboard/User/";
import UserDashboard from "./pages/Dashboard/User/UserDashboard";
import AlertsAndNotifications from "./pages/Dashboard/User/AlertsAndNotifications";
import BudgetManagement from "./pages/Dashboard/User/BudgetManagement";
import ComparisonAndRecommendations from "./pages/Dashboard/User/ComparisonAndRecommendations";
import CreditScoreAndReports from "./pages/Dashboard/User/CreditScoreAndReports";
import InsuranceCoverage from "./pages/Dashboard/User/InsuranceCoverage";
import InvestmentPortfolio from "./pages/Dashboard/User/InvestmentPortfolio";
import LoanAndMortgageManagement from "./pages/Dashboard/User/LoanAndMortgageManagement";
import TransactionHistory from "./pages/Dashboard/User/TransactionHistory";

// Super Admin components
import SuperAdmin from "./pages/Dashboard/SuperAdmin";
import SuperAdminDashboard from "./pages/Dashboard/SuperAdmin/SuperAdminDashboard";
import AuditLogs from "./pages/Dashboard/SuperAdmin/AuditLogs";
import FinancialReports from "./pages/Dashboard/SuperAdmin/FinancialReports";
import UserManagement from "./pages/Dashboard/SuperAdmin/UserManagement";
import SystemConfig from "./pages/Dashboard/SuperAdmin/SystemConfig";
import SecurityAndCompliance from "./pages/Dashboard/SuperAdmin/SecurityAndCompliance";

// Account Manager components
import AccountManager from "./pages/Dashboard/AccountManager";
import CalendarMeetings from "./pages/Dashboard/AccountManager/CalendarMeetings";
import AMCommunications from "./pages/Dashboard/AccountManager/AMCommunications";
import AMCustomerPortfolio from "./pages/Dashboard/AccountManager/AMCustomerPortfolio";
import InvestmentPerformance from "./pages/Dashboard/AccountManager/InvestmentPerformance";
import RevenueAnalytics from "./pages/Dashboard/AccountManager/RevenueAnalytics";
import TransactionAlerts from "./pages/Dashboard/AccountManager/TransactionAlerts";

// Loan Officer components
import LoanOfficer from "./pages/Dashboard/LoanOfficer";
import ApplicationPipeline from "./pages/Dashboard/LoanOfficer/ApplicationPipeline";
import LOCommunications from "./pages/Dashboard/LoanOfficer/LOCommunications";
import RiskAssessment from "./pages/Dashboard/LoanOfficer/RiskAssessment";
import CreditAnalysis from "./pages/Dashboard/LoanOfficer/CreditAnalysis";
import LoanPortfolio from "./pages/Dashboard/LoanOfficer/LoanPortfolio";

// CSR components
import CSR from "./pages/Dashboard/CSR";
import CSRCustomerProfile from "./pages/Dashboard/CSR/CSRCustomerProfile";
import QuickActions from "./pages/Dashboard/CSR/QuickActions";
import ServiceRequests from "./pages/Dashboard/CSR/ServiceRequests";
import Transactions from "./pages/Dashboard/CSR/Transactions";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import useUserInfo from "./hooks/useUserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";

function App() {
  // Use React Router's location
  const location = useLocation();
  const hideNFPaths = ["/login", "/register", "/dashboard"];
  const showNF = !hideNFPaths.some((path) => location.pathname.includes(path));

  const [user] = useAuthState(auth);
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading } = useUserInfo(uId);

  // Dark mode state management
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Function to redirect users to their appropriate dashboard based on role
  const getDashboardRedirect = () => {
    // If still loading user info, show a loading state
    if (isLoading) {
      return <LoadingSpinner fullscreen overlay />;
    }
    
    // If no user info or no user is logged in, redirect to login
    if (!user || !userInfo) {
      return <Navigate to="/login" replace />;
    }
    
    // If user has no roles, redirect to login (should not happen, but just in case)
    if (!userInfo.role || (Array.isArray(userInfo.role) && userInfo.role.length === 0)) {
      return <Navigate to="/login" replace />;
    }
    
    // Get the active role (either from localStorage or first available role)
    const roles = Array.isArray(userInfo.role) ? userInfo.role : [userInfo.role];
    const savedRole = localStorage.getItem("activeRole");
    const activeRole = (savedRole && roles.includes(savedRole)) ? savedRole : roles[0];
    
    // Redirect based on active role
    switch (activeRole) {
      case "user":
        return <Navigate to="/dashboard/user" replace />;
      case "super-admin":
        return <Navigate to="/dashboard/super-admin" replace />;
      case "account-manager":
        return <Navigate to="/dashboard/account-manager" replace />;
      case "loan-officer":
        return <Navigate to="/dashboard/loan-officer" replace />;
      case "csr":
        return <Navigate to="/dashboard/csr" replace />;
      default:
        // If somehow we get an unknown role, default to user dashboard
        return <Navigate to="/dashboard/user" replace />;
    }
  };

  return (
    <>
      {showNF && <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default dashboard route redirects based on role */}
          <Route index element={
            <ProtectedRoute>
              {getDashboardRedirect()}
            </ProtectedRoute>
          } />

          {/* User routes */}
          <Route
            path="user"
            element={
              <ProtectedRoute role="user">
                <User userInfo={userInfo} />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard userInfo={userInfo} />} />
            <Route
              path="alerts-and-notifications"
              element={<AlertsAndNotifications />}
            />
            <Route path="budget-management" element={<BudgetManagement />} />
            <Route
              path="comparison-and-recommendation"
              element={<ComparisonAndRecommendations />}
            />
            <Route
              path="credit-score-and-reports"
              element={<CreditScoreAndReports />}
            />
            <Route path="insurance-coverage" element={<InsuranceCoverage />} />
            <Route
              path="investment-portfolio"
              element={<InvestmentPortfolio />}
            />
            <Route
              path="loan-and-mortgage-management"
              element={<LoanAndMortgageManagement />}
            />
            <Route
              path="transaction-history"
              element={<TransactionHistory />}
            />
          </Route>

          {/* Super Admin routes */}
          <Route
            path="super-admin"
            element={
              <ProtectedRoute role="super-admin">
                <SuperAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<SuperAdminDashboard />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="financial-reports" element={<FinancialReports />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="system-config" element={<SystemConfig />} />
            <Route
              path="security-and-compliance"
              element={<SecurityAndCompliance />}
            />
          </Route>

          {/* Account Manager routes */}
          <Route
            path="account-manager"
            element={
              <ProtectedRoute role="account-manager">
                <AccountManager />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="customer-portfolio" replace />}
            />
            <Route path="calendar-meetings" element={<CalendarMeetings />} />
            <Route path="communications" element={<AMCommunications />} />
            <Route
              path="customer-portfolio"
              element={<AMCustomerPortfolio />}
            />
            <Route
              path="investment-performance"
              element={<InvestmentPerformance />}
            />
            <Route path="revenue-analytics" element={<RevenueAnalytics />} />
            <Route path="transaction-alerts" element={<TransactionAlerts />} />
          </Route>

          {/* Loan Officer routes */}
          <Route
            path="loan-officer"
            element={
              <ProtectedRoute role="loan-officer">
                <LoanOfficer />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="loan-portfolio" replace />} />
            <Route
              path="application-pipeline"
              element={<ApplicationPipeline />}
            />
            <Route path="communications" element={<LOCommunications />} />
            <Route path="credit-analysis" element={<CreditAnalysis />} />
            <Route path="loan-portfolio" element={<LoanPortfolio />} />
            <Route path="risk-assessment" element={<RiskAssessment />} />
          </Route>

          {/* CSR routes */}
          <Route
            path="csr"
            element={
              <ProtectedRoute role="csr">
                <CSR />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="customer-portfolio" replace />}
            />
            <Route path="customer-portfolio" element={<CSRCustomerProfile />} />
            <Route path="quick-actions" element={<QuickActions />} />
            <Route path="service-requests" element={<ServiceRequests />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>

          {/* Catch-all for invalid dashboard routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Catch-all for invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showNF && <Footer />}
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;

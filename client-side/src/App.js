import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
// import User from "./pages/Auth/User";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/Dashboard/LandingPage";
import User from "./pages/Auth/User";
import Transactions from "./pages/Dashboard/Transactions";
import UserLanding from "./pages/Dashboard/User/UserLanding";
import AlertsAndNotifications from "./pages/Dashboard/User/AlertsAndNotifications";
import BudgetManagement from "./pages/Dashboard/User/BudgetManagement";
import ComparisonAndRecommendations from "./pages/Dashboard/User/ComparisonAndRecommendations";
import CreditScoreAndReports from "./pages/Dashboard/User/CreditScoreAndReports";
import InsuranceCoverage from "./pages/Dashboard/User/InsuranceCoverage";
import InvestmentPortfolio from "./pages/Dashboard/User/InvestmentPortfolio";
import LoanAndMortgageManagement from "./pages/Dashboard/User/LoanAndMortgageManagement";
import TransactionHistory from "./pages/Dashboard/User/TransactionHistory";
import useUserInfo from "./hooks/useUserInfo";

function App() {
  // Use React Router's location
  const location = useLocation();
  const hideNFPaths = ["/login", "/register", "/dashboard"];
  const showNF = !hideNFPaths.some((path) => location.pathname.includes(path));

  const uId = localStorage.getItem("userId");
  const { userInfo } = useUserInfo(uId);

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
  }, [darkMode]);

  return (
    <>
      {showNF && <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            index
            element={
              <User>
                <UserLanding userInfo={userInfo} />
              </User>
            }
          />
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
          <Route path="transaction-history" element={<TransactionHistory />} />

          {/* <Route path="profile" element={<Profile />} />
          <Route path="balance" element={<Balance />} />
          <Route path="user-request" element={<UserRequest />} />
          <Route path="allusers" element={<PrivateadminRoute><AllUsers /></PrivateadminRoute>} />
          <Route path="findtransection" element={<PrivateadminRoute><FindTransection /></PrivateadminRoute>} />
          <Route path="information/:id" element={<UserInformation />} />
          <Route path="sendmoney" element={<SendMoney />} />
          <Route path="review" element={<Review />} />
          <Route path="transection" element={<Transection />} />
          <Route path="balance" element={<Balance />} /> */}
        </Route>
      </Routes>
      {showNF && <Footer />}
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;

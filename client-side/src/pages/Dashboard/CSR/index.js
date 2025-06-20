import { Link, Outlet, useLocation } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";

const CSR = () => {
  const location = useLocation();
  const { userInfo } = useUserInfo(localStorage.getItem("userId"));


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

      {/* This is crucial - it renders the child route components */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default CSR;

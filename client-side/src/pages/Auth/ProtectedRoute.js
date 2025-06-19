import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Loading";
import useUserInfo from "../../hooks/useUserInfo";
import Logout from "./Logout";

const ProtectedRoute = ({ children, role }) => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading, error } = useUserInfo(uId);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userInfo || !userInfo.email || error) {
    Logout();
    toast.error("Session expired. Please log in again.");
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (role && !userInfo.role.includes(role)) {
    toast.error("You don't have permission to access this page.");
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;

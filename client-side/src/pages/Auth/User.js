import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import useUserInfo from "../../hooks/useUserInfo";
import Logout from "./Logout";

const User = ({ children }) => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading, error } = useUserInfo(uId);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userInfo || !userInfo.email || error) {
    Logout();
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default User;

import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import useUserInfo from "../../hooks/useUserInfo";

const User = ({ children }) => {
  const uId = localStorage.getItem("userId");
  console.log("User ID from User:", uId);
  const { userInfo, isLoading, error } = useUserInfo(uId);
  console.log("User Info:", userInfo);
  console.log("Is Loading:", isLoading);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (!userInfo || !userInfo.email) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default User;

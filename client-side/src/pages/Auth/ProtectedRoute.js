import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/Loading";
import useUserInfo from "../../hooks/useUserInfo";
import Logout from "./Logout";

const ProtectedRoute = ({ children, role }) => {
  const [user, loading] = useAuthState(auth);
  const region = localStorage.getItem("region");
  const accessToken = localStorage.getItem("accessToken");
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading, error } = useUserInfo(uId);
  const location = useLocation();

  // Show loading while checking authentication
  if (loading || isLoading) {
    return <LoadingSpinner fullscreen overlay />;
  }

  // Check authentication based on region
  const isAuthenticated = () => {
    if (region === "global") {
      // Global region: requires both Firebase user and backend token
      return user && accessToken && uId;
    } else if (region === "china") {
      // China region: only requires backend token and userId
      return accessToken && uId;
    } else {
      // No region selected or invalid region
      return false;
    }
  };

  // If not authenticated or error in user info, redirect to login
  if (!isAuthenticated() || !userInfo || error) {
    console.log("Authentication failed:", {
      region,
      user: !!user,
      accessToken: !!accessToken,
      uId: !!uId,
      userInfo: !!userInfo,
      error,
    });

    Logout();
    toast.error("Session expired. Please log in again.");
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  // If role is specified, check if user has that role
  if (role && userInfo.role) {
    // Handle both array and string role formats
    const userRoles = Array.isArray(userInfo.role)
      ? userInfo.role
      : [userInfo.role];

    if (!userRoles.includes(role)) {
      toast.error("You don't have permission to access this page.");

      // Get active role or default to first role
      const activeRole = localStorage.getItem("activeRole") || userRoles[0];

      // Redirect to their active role dashboard instead of login
      return (
        <Navigate
          to={`/dashboard/${activeRole}`}
          state={{ from: location }}
          replace
        />
      );
    }
  }

  // User is authenticated and has required role (or no role was required)
  return children;
};

export default ProtectedRoute;

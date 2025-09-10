import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/Loading";
import useUserInfo from "../../hooks/useUserInfo";

const ProtectedRoute = ({ children, role }) => {
  const [user, loading] = useAuthState(auth);
  const region = localStorage.getItem("region");
  const accessToken = localStorage.getItem("accessToken");
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading, error } = useUserInfo(uId);
  const location = useLocation();

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

  // Show loading only while Firebase is loading
  if (loading) {
    return <LoadingSpinner fullscreen overlay />;
  }

  // If not authenticated, redirect to unauthorized page immediately
  if (!isAuthenticated()) {
    return <Navigate to={"/unauthorized"} state={{ from: location }} replace />;
  }

  // Show loading while fetching user info (only if authenticated)
  if (isLoading) {
    return <LoadingSpinner fullscreen overlay />;
  }

  // If error in user info or no user info, redirect to unauthorized page
  if (!userInfo || error) {
    return <Navigate to={"/unauthorized"} state={{ from: location }} replace />;
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

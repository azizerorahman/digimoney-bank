import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/Loading";

const User = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default User;

import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Logout from "./Logout";
import LoadingSpinner from "../../components/Loading";

const Admin = ({ children }) => {
  const location = useLocation();
  const { admin, loadingAdmin, error } = useAdmin();
  if (loadingAdmin) {
    return <LoadingSpinner overlay />;
  }

  if (!admin || error) {
    Logout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Admin;

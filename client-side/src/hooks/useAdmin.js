import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Logout from "../pages/Auth/Logout";

const useAdmin = () => {
  const [admin, setAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    if (uId) {
      fetch(`${process.env.REACT_APP_API_URL}/admin?uId=${uId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            Logout();
            localStorage.removeItem("accessToken");
            toast.error("Forbidden access");
            throw new Error("Forbidden access");
          }
          
          if (res.status === 400) {
            toast.error("User ID is required");
            throw new Error("User ID is required");
          }
          
          if (res.status === 404) {
            setAdmin(false);
            return null;
          }
          
          if (res.status === 500) {
            toast.error("Server error. Please try again later.");
            throw new Error("Server error");
          }

          return res.json();
        })
        .then((data) => {
          if (data) {
            setAdmin(data.admin);
          }
          setLoadingAdmin(false);
        })
        .catch((err) => {
          console.error("Error checking admin status:", err);
          setError(err.message || 'Failed to check admin status');
          setAdmin(false);
          setLoadingAdmin(false);
        });
    } else {
      setAdmin(false);
      setLoadingAdmin(false);
    }
  }, []);

  return { admin, loadingAdmin, error };
};

export default useAdmin;
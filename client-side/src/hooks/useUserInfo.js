import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const useUserInfo = (user) => {
  const url = `http://localhost:4000/user-details?email=${user?.email}`;
  
  const {
    data: userInfo,
    isLoading,
    error,
    refetch,
  } = useQuery(
    [`userDetails${user?.email}`],
    async () => {
      if (!user?.email) {
        return null;
      }
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      if (response.status === 401 || response.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        toast.error("Forbidden access");
        throw new Error("Forbidden access");
      }
      
      if (response.status === 400) {
        toast.error("Email is required");
        throw new Error("Email is required");
      }
      
      if (response.status === 404) {
        return null;
      }
      
      if (response.status === 500) {
        toast.error("Server error. Please try again later.");
        throw new Error("Server error");
      }
      
      const data = await response.json();
      return data;
    },
    {
      enabled: !!user?.email,
      onError: (err) => {
        console.error("Error fetching user details:", err);
      }
    }
  );

  return { userInfo, isLoading, error, refetch };
};

export default useUserInfo;

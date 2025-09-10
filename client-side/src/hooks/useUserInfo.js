import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const useUserInfo = (uId) => {
  const url = `${process.env.REACT_APP_API_URL}/user-details?uId=${uId}`;

  const {
    data: userInfo,
    isLoading,
    error,
    refetch,
  } = useQuery(
    [`userDetails${uId}`],
    async () => {
      if (!uId) {
        return null;
      }

      // Check if user is actually authenticated before making request
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return null;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("activeRole");
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
      enabled: !!uId && !!localStorage.getItem("accessToken"),
      onError: (err) => {
        console.error("Error fetching user details:", err);
      },
    }
  );

  return { userInfo, isLoading, error, refetch };
};

export default useUserInfo;

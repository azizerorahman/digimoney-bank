import { useEffect } from "react";
import { useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`${process.env.REACT_APP_API_URL}/admin?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setLoadingAdmin(false);
        });
    }
  }, [user]);

  return { admin, loadingAdmin };
};
export default useAdmin;

import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;

    const signInUser = { email: email };

    if (email) {
      fetch(`http://localhost:4000/token/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const newToken = data.token;
          localStorage.setItem("accessToken", newToken);
          setToken(newToken);
        });
    }
  }, [user]);
  return [token];
};
export default useToken;

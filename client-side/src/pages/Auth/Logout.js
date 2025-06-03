import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Logout = () => {
  const region = localStorage.getItem("region");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  sessionStorage.clear();
  if (region === "global") {
    signOut(auth);
  }
  
  window.location.href = "/";
};

export default Logout;

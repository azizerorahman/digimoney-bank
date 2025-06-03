import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/Loading";
import RegionSelector from "../../components/RegionSelector";
import encryptPassword from "./EncryptPassword";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const region = localStorage.getItem("region");
  const passwordRef = useRef(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    setFocus,
    trigger,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signInWithEmailAndPassword, user, firebaseLoading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  // Focus email on mount
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  // Show Firebase errors in toast
  useEffect(() => {
    if (error) {
      toast.error(
        error.message
          .substring(22)
          .replace(/[()']+/g, "")
          .replace(/[-']+/g, " ")
          .replace(/^./, (c) => c.toUpperCase())
      );
    }
  }, [error]);

  // Show validation errors in toast
  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors.email, errors.password]);

  // Common function to handle backend login - memoized with useCallback
  const handleBackendLogin = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const encryptedPassword = encryptPassword(password);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            encryptedPassword: encryptedPassword,
          }),
        });

        const result = await response.json();

        if (result.success && result.token) {
          localStorage.setItem("accessToken", result.token);
          localStorage.setItem("userId", result.uId);
          toast.success("Login successful!");
          navigate("/dashboard", { replace: true });
        } else {
          toast.error(result.message || "Login failed");
        }
      } catch (err) {
        console.error("Backend login error:", err);
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  // Handle Firebase user login success for global region
  useEffect(() => {
    if (user && region === "global" && passwordRef.current) {
      handleBackendLogin(user.user.email, passwordRef.current);
      // Clear password from ref after use for security
      passwordRef.current = null;
    }
  }, [user, region, handleBackendLogin]);

  const onSubmit = async (data) => {
    if (region === "global") {
      // Store password in ref for later use in useEffect
      passwordRef.current = data.password;
      await signInWithEmailAndPassword(data.email, data.password);
      // Backend login will be handled in useEffect when user state changes
    } else if (region === "china") {
      // For China region, directly use backend authentication
      await handleBackendLogin(data.email, data.password);
    } else {
      toast.error("Please select a valid region");
    }
  };

  const handleReset = async () => {
    const email = getValues("email");
    if (email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      await sendPasswordResetEmail(email);
      toast.success(`Password reset email sent to ${email}!`);
    } else {
      setError("email", {
        type: "manual",
        message: "Please enter a valid email address to reset password.",
      });
      toast.error("Please enter a valid email address to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800">
      <div className="absolute top-4 right-4 z-10">
        <RegionSelector scrolled={false} />
      </div>

      <div className="w-full max-w-md bg-white/10 dark:bg-white/5 rounded-xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-accent"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6"></path>
              <path d="M12 18v2"></path>
              <path d="M12 4v2"></path>
            </svg>
            <span className="font-bold text-2xl text-white dark:text-white tracking-tight">
              DigiMoney<span className="text-accent"> Bank</span>
            </span>
          </div>
          <h2 className="text-white dark:text-white/90 text-lg font-semibold">
            Login to your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div>
            <label
              className="block text-white/80 dark:text-white/90 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="text"
              autoComplete="email"
              className={`w-full px-4 py-2 rounded-lg bg-white/20 dark:bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition ${
                errors.email ? "ring-2 ring-error" : ""
              }`}
              placeholder="you@email.com"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
                onBlur: () => trigger("email"),
              })}
            />
          </div>
          <div>
            <label
              className="block text-white/80 dark:text-white/90 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`w-full px-4 py-2 rounded-lg bg-white/20 dark:bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition pr-12 ${
                  errors.password ? "ring-2 ring-error" : ""
                }`}
                placeholder="********"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                  onBlur: () => trigger("password"),
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-accent transition"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 012.9-4.61m2.1-2.19A9.97 9.97 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.97 9.97 0 01-4.199 5.294M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {region === "global" && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-accent text-sm hover:underline bg-transparent border-none p-0"
                style={{ background: "none" }}
              >
                Forgot password?
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || firebaseLoading}
            className="w-full py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || firebaseLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-8 text-center text-white/70 dark:text-white/80 text-sm">
          Don&rsquo;t have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>
      </div>
      {(isLoading || firebaseLoading || sending) && <LoadingSpinner overlay />}
    </div>
  );
};

export default Login;

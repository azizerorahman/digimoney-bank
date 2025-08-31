import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { FaRedoAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { MdContentPaste } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Loading";
import encryptPassword from "./EncryptPassword";
import RegionSelector from "../../components/RegionSelector";

const ToggleRadioGroup = ({ label, name, options, error, control }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-white/80 mb-1">{label}</label>
    <Controller
      control={control}
      name={name}
      rules={{ required: `Please select a ${label.toLowerCase()}` }}
      render={({ field }) => (
        <div className="flex gap-1.5">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`px-5 py-1 font-medium rounded-lg transition-all duration-300 border-2 
                ${field.value === opt.value
                  ? "border-accent bg-accent text-white shadow"
                  : error
                    ? "border-red-500 text-white/80 hover:bg-white/10"
                    : "border-white/80 dark:border-white/90 bg-transparent text-white/80 hover:bg-white/10"
                }
              `}
              onClick={() => field.onChange(opt.value)}
              tabIndex={0}
              aria-pressed={field.value === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    />
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </div>
);

const CustomSelect = ({
  label,
  error,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col relative" ref={selectRef}>
      {label && (
        <label className="text-sm font-medium text-white/80 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-accent transition
          ${error ? "ring-2 ring-red-500" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {value ? (
            options.find((o) => o.value === value)?.label
          ) : (
            <span className="text-white/60">{placeholder}</span>
          )}
        </span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul
          className="z-10 mt-0.5 w-full rounded-lg py-1.5 shadow-lg bg-slate-900/95 dark:bg-slate-800/95 ring-1 ring-black ring-opacity-5"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer select-none transition
                ${value === opt.value
                  ? "bg-accent text-white"
                  : "text-white/80 hover:bg-white/20"
                }
              `}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="text-xs text-red-400 mt-1 mb-1">{error}</span>}
    </div>
  );
};

const InputWithPaste = ({
  label,
  error,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      inputRef.current?.focus();
    } catch {
      toast.error("Could not access clipboard.");
    }
  };

  return (
    <div className="flex flex-col relative">
      {label && (
        <label className="text-sm font-medium text-white/80 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
            ${error ? "ring-2 ring-red-500" : ""} pr-32`}
          {...props}
        />

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 py-1 px-3"
          onClick={handlePaste}
          tabIndex={-1}
        >
          <MdContentPaste className="text-white" />
        </div>
      </div>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  );
};

const imageStorageKey = process.env.REACT_APP_IMGBB_KEY;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      gender: "",
      accountType: "",
      transactionId: "",
    },
  });

  const navigate = useNavigate();
  const region = localStorage.getItem("region");

  // Firebase
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // Webcam
  const webcamRef = useRef(null);
  const [webcamAvailable, setWebcamAvailable] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Document upload
  const [docFile, setDocFile] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setDocFile(acceptedFiles[0]);
        setValue("image", acceptedFiles);
        trigger("image");
      }
    },
    [setValue, trigger]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxFiles: 1,
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = loading || updating || isSubmitting;

  // Show errors as toast - consolidated error handling
  useEffect(() => {
    const formatErrorMessage = (errorMsg) => {
      if (!errorMsg) return "";
      return (
        errorMsg
          .replace(/^Firebase: Error /, "")
          .replace(/[()]/g, "")
          ?.charAt(0)
          .toUpperCase() +
        errorMsg
          .replace(/^Firebase: Error /, "")
          .replace(/[()]/g, "")
          ?.slice(1)
      );
    };

    if (error) {
      toast.error(formatErrorMessage(error.message));
    } else if (updateError) {
      toast.error(formatErrorMessage(updateError.message));
    }
  }, [error, updateError]);

  // Check webcam availability
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setWebcamAvailable(true);
      })
      .catch(() => {
        setWebcamAvailable(false);
        toast.error(
          "No webcam detected. Please use a phone or device with a camera."
        );
      });
  }, []);

  // Webcam capture handler
  const handleCapture = useCallback(() => {
    if (!webcamAvailable) {
      toast.error(
        "Webcam not available. Please use a phone or device with a camera."
      );
      return;
    }
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        toast.error("Could not capture photo. Please try again.");
        return;
      }
      setCapturedPhoto(imageSrc);
      toast.success("Photo captured!");
    }
  }, [webcamAvailable]);

  // Form submit handler with improved error handling and rollback
  const onSubmit = async (data) => {
    // Validate required inputs first
    if (webcamAvailable && !capturedPhoto) {
      toast.error("Please capture a photo with a clear view of your face.");
      return;
    }
    if (!docFile) {
      toast.error("Please upload a document.");
      return;
    }
    if (!data.transactionId) {
      toast.error("Please enter a transaction ID.");
      return;
    }

    setIsSubmitting(true);
    let firebaseUser = null;
    let uploadedDocUrl = null;

    try {
      const {
        name,
        email,
        password,
        phone,
        address,
        amount,
        fatherName,
        motherName,
        accountType,
        gender,
        transactionId,
      } = data;

      // Step 1: Create Firebase Auth user only if region is global
      if (region === "global") {
        const userCredential = await createUserWithEmailAndPassword(
          email,
          password
        );
        firebaseUser = userCredential.user;

        // Step 2: Update profile
        await updateProfile({ displayName: name });
      }

      // Step 3: Upload document to ImgBB
      const formData = new FormData();
      formData.append("image", docFile);
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

      const imgResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!imgResponse.ok) {
        throw new Error("Document upload failed. Please try again.");
      }

      const imgResult = await imgResponse.json();
      if (!imgResult.success) {
        throw new Error("Document upload failed. Please try again.");
      }

      uploadedDocUrl = imgResult.data.url;

      // Step 4: Register user in your backend database
      const encryptedPassword = encryptPassword(password);
      const currentUser = {
        name,
        fatherName,
        motherName,
        email,
        phone,
        accountType,
        address,
        amount,
        gender,
        document: uploadedDocUrl,
        depositTID: transactionId,
        verificationImage: capturedPhoto,
        encryptedPassword: encryptedPassword,
        region,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        // Try to parse error response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to save user data to database"
        );
      }

      const result = await response.json();

      if (!result.success || !result.token) {
        throw new Error(
          "Failed to create account. Authentication token not received."
        );
      }

      // Store token
      localStorage.setItem("accessToken", result.token);
      localStorage.setItem("userId", result.result?.insertedId);

      // If everything succeeded
      toast.success("Account created successfully!");
      reset();
      setCapturedPhoto(null);
      setDocFile(null);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Consolidated error handling
      console.error("Registration error:", error);

      // Attempt rollback if needed (only for global region)
      if (firebaseUser && region === "global") {
        try {
          // If we created a Firebase user but later steps failed, delete the user
          await firebaseUser.delete();
        } catch (rollbackError) {
          console.error("Rollback failed:", rollbackError);
          toast.error("Registration failed partially. Please contact support.");
          return;
        }
      }

      // Show a single error message
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800">
      <div className="absolute top-4 right-4 z-10">
        <RegionSelector scrolled={false} />
      </div>
      <div className="w-full max-w-5xl bg-white/10 dark:bg-white/5 rounded-xl shadow-xl p-8">
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
            Create a New Account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Your Name
                </label>
                <input
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.name ? "ring-2 ring-red-500" : ""}`}
                  {...register("name", {
                    required: "Enter your name",
                    minLength: {
                      value: 2,
                      message: "Name should be at least 2 characters",
                    },
                    onBlur: () => trigger("name"),
                  })}
                />
                {errors.name && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Father's Name
                </label>
                <input
                  placeholder="Michael Doe"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.fatherName ? "ring-2 ring-red-500" : ""}`}
                  {...register("fatherName", {
                    required: "Enter your father's name",
                    minLength: {
                      value: 2,
                      message: "Name should be at least 2 characters",
                    },
                    onBlur: () => trigger("fatherName"),
                  })}
                />
                {errors.fatherName && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.fatherName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Mother's Name
                </label>
                <input
                  placeholder="Sarah Doe"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.motherName ? "ring-2 ring-red-500" : ""}`}
                  {...register("motherName", {
                    required: "Enter your mother's name",
                    minLength: {
                      value: 2,
                      message: "Name should be at least 2 characters",
                    },
                    onBlur: () => trigger("motherName"),
                  })}
                />
                {errors.motherName && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.motherName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="18XXXXXXXX"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                  ${errors.phone ? "ring-2 ring-red-500" : ""}`}
                  {...register("phone", {
                    required: "Enter phone number",
                    minLength: { value: 8, message: "Phone number too short" },
                    onBlur: () => trigger("phone"),
                  })}
                />

                {errors.phone && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Address
                </label>
                <input
                  placeholder="123 Main St, Dhaka"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.address ? "ring-2 ring-red-500" : ""}`}
                  {...register("address", {
                    required: "Enter your address",
                    minLength: { value: 3, message: "Address too short" },
                    onBlur: () => trigger("address"),
                  })}
                />
                {errors.address && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <ToggleRadioGroup
                label="Gender"
                name="gender"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
                error={errors.gender?.message}
                control={control}
              />
              {/* Webcam always visible */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-white/80 mb-1 block w-full text-left">
                  Clear Photo of Yourself
                </label>
                {webcamAvailable ? (
                  <>
                    <div className="w-full flex flex-col items-center relative">
                      {!capturedPhoto ? (
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className="rounded-lg border-2 border-accent w-full h-auto"
                          videoConstraints={{
                            facingMode: "user",
                          }}
                        />
                      ) : (
                        <img
                          src={capturedPhoto}
                          alt="Captured"
                          className="rounded-lg border-2 border-accent w-full h-auto object-cover"
                        />
                      )}

                      {!capturedPhoto ? (
                        <div
                          onClick={handleCapture}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white cursor-pointer absolute bottom-3 right-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <FaCamera className="text-2xl" />
                        </div>
                      ) : (
                        <div
                          onClick={() => setCapturedPhoto(null)}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white cursor-pointer absolute bottom-3 right-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <FaRedoAlt className="text-2xl" />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-error">
                    Please use a phone or device with a camera to capture photo.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Controller
                control={control}
                name="accountType"
                rules={{ required: "Select account type" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Account Type"
                    error={errors.accountType?.message}
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { label: "Select Account Type", value: "" },
                      { label: "Savings Account", value: "Savings Accounts" },
                      { label: "Salary Account", value: "Checking Account" },
                      { label: "Student Account", value: "Student Account" },
                      { label: "Business Account", value: "Business Account" },
                      { label: "Others", value: "Others" },
                    ]}
                    placeholder="Choose account type"
                  />
                )}
              />
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Amount Deposited
                </label>
                <input
                  type="number"
                  placeholder="2000"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.amount ? "ring-2 ring-red-500" : ""}`}
                  {...register("amount", {
                    required: "Enter an amount deposited",
                    min: { value: 1000, message: "Minimum deposit is 1000$" },
                    pattern: {
                      value: /^\d+$/,
                      message: "Amount must be a number",
                    },
                  })}
                />
                {errors.amount && (
                  <span className="text-xs text-red-400 my-1">
                    {errors.amount.message}
                  </span>
                )}
              </div>
              <Controller
                control={control}
                name="transactionId"
                rules={{
                  required: "Enter a valid transaction ID.",
                  minLength: {
                    value: 5,
                    message: "Enter a valid transaction ID.",
                  },
                }}
                render={({ field }) => (
                  <InputWithPaste
                    label="Transaction ID"
                    placeholder="Paste your transaction ID"
                    error={errors.transactionId?.message}
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="transactionId"
                  />
                )}
              />
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.email ? "ring-2 ring-red-500" : ""}`}
                  {...register("email", {
                    required: "Enter an email",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email",
                    },
                    onBlur: () => trigger("email"),
                  })}
                />
                {errors.email && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="At least 8 characters, 1 number & 1 special"
                  className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition
                    ${errors.password ? "ring-2 ring-red-500" : ""}`}
                  {...register("password", {
                    required: "Enter a password",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: "At least one number and one special character",
                    },
                    onBlur: () => trigger("password"),
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <ToggleRadioGroup
                label="Verification Method"
                name="verificationMethod"
                options={[
                  { label: "National Identity Card", value: "NID" },
                  { label: "Passport", value: "Passport" },
                ]}
                error={errors.verificationMethod?.message}
                control={control}
              />
              {/* Drag & Drop with Document Type Toggle inside */}
              <div className="flex flex-col h-full">
                <label className="text-sm font-medium text-white/80 mb-1">
                  Document Upload
                </label>
                <div
                  {...getRootProps()}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition ${isDragActive
                      ? "border-accent bg-accent/10"
                      : "border-white/30 bg-white/10"
                    } hover:border-accent cursor-pointer min-h-[340px] w-full h-full`}
                  style={{ minHeight: 340 }}
                >
                  <input {...getInputProps()} />
                  {docFile ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(docFile)}
                        alt="Document Preview"
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <button
                        type="button"
                        className="text-xs py-1 px-4 absolute top-2 right-2 border-2 border-white/80 dark:border-white/90 text-white dark:text-white/90 font-medium rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDocFile(null);
                          setValue("image", null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <span className="text-white/60 text-base text-center">
                      {isDragActive
                        ? `Drop the file here ...`
                        : `Drag & drop your document here, or click to select`}
                    </span>
                  )}
                </div>
                {errors.image && (
                  <span className="text-xs text-red-400 mt-1">
                    {errors.image.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition shadow disabled:opacity-50"
            disabled={isLoading || !webcamAvailable}
          >
            Register
          </button>
          <p className="mt-8 text-center text-white/70 dark:text-white/80 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
      {/* Show spinner when loading */}
      {isLoading && <LoadingSpinner overlay />}
    </div>
  );
};

export default Register;

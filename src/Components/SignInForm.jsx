import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "./signInSchema";
import api from "../api/axios";
import "./SignInForm.css";

export default function SignInForm() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    // 1. Reset alert banners
    setApiError("");
    setSuccessMessage("");

    try {
      // 2. Query /users instead of /login to avoid the 404 error
      const response = await api.get("/users", {
        params: {
          email: data.email.trim(),
        },
      });

      // 3. Unpack user array
      const users = response.data;

      // 4. Validate matching user credentials
      if (users.length > 0 && users[0].password === data.password) {
        setSuccessMessage("Signed in successfully!");
        localStorage.setItem("user", JSON.stringify(users[0]));
        reset();
      } else {
        setApiError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Sign-in request failed:", err);
      const message =
        err.response?.data?.message ||
        "Unable to sign in. Please try again later.";
      setApiError(message);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-wrapper">
        {/* LEFT: BRAND PANEL */}
        <div className="signin-brand-panel">
          <div className="signin-glow-top" />
          <div className="signin-glow-bottom" />
          <div className="signin-brand-content">
            <h2 className="signin-brand-title">
              Welcome <span className="accent">Back</span>
            </h2>
            <p className="signin-brand-subtitle">
              Sign in to access your enterprise dashboard and manage your account.
            </p>
          </div>
        </div>

        {/* RIGHT: FORM PANEL */}
        <div className="signin-form-panel">
          <div className="signin-card">
            <div className="signin-header">
              <h1 className="signin-title">Sign In</h1>
              <p className="signin-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Banners */}
            {successMessage && (
              <div className="signin-banner signin-banner-success">
                {successMessage}
              </div>
            )}
            {apiError && (
              <div className="signin-banner signin-banner-error">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                register={register}
                error={errors.email?.message}
              />

              <Field
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                register={register}
                error={errors.password?.message}
              />

              <div className="signin-options-row">
                <label className="signin-remember">
                  <input type="checkbox" {...register("rememberMe")} />
                  <span>Remember me</span>
                </label>

                <a href="/forgot-password" className="signin-forgot-link">
                  Can't access my account
                </a>
              </div>

              <button
                type="submit"
                className="signin-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>

              <p className="signin-footer-text">
                Don't have an account?{" "}
                <a href="/signup" className="signin-footer-link">
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder, register, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="signin-field">
      <label htmlFor={name} className="signin-label">
        {label}
      </label>

      <div className="signin-input-wrapper">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className={`signin-input${error ? " has-error" : ""}`}
        />

        {isPasswordField && (
          <button
            type="button"
            className="signin-eye-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && <span className="signin-error-text">{error}</span>}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
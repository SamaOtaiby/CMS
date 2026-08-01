import { useState } from "react";
import "./SignUpForm.css";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: replace with real API call once backend contract is confirmed
    // e.g. fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(formData) })
    console.log("Sign up submitted:", formData);
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        {/* LEFT: BRAND PANEL */}
        <div className="signup-brand-panel">
          <div className="signup-glow-top" />
          <div className="signup-glow-bottom" />

          <div className="signup-brand-content">
            <h2 className="signup-brand-title">Welcome</h2>
            <p className="signup-brand-subtitle">
              Sign up to create your enterprise account, manage operations, and
              collaborate securely across your digital ecosystem.
            </p>
          </div>
        </div>

        {/* RIGHT: FORM PANEL WITH INNER CARD */}
        <div className="signup-form-panel">
          <div className="signup-card">
            <div className="signup-header">
              <h1 className="signup-title">Sign Up</h1>
              <p className="signup-subtitle">Sign up to create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <Field
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Field
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <label className="signup-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <button type="submit" className="signup-btn-primary">
                Sign Up
              </button>

              <div className="signup-divider">
                <div className="signup-divider-line" />
                <span className="signup-divider-text">or</span>
                <div className="signup-divider-line" />
              </div>

              {/* Google Button with Icon on the right */}
              <button type="button" className="signup-btn-google">
                <span>Continue with Google</span>
                <GoogleIcon />
              </button>

              <p className="signup-footer-text">
                Already have an account?{" "}
                <a href="/signin" className="signup-footer-link">
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div className="signup-field">
      <label htmlFor={name} className="signup-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`signup-input${error ? " has-error" : ""}`}
      />
      {error && <span className="signup-error-text">{error}</span>}
    </div>
  );
}
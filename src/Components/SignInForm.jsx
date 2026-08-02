import { useState } from "react";
import "./SignInForm.css";

export default function SignInForm() {
  const [formData, setFormData] = useState({
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
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: replace with real API call once backend endpoint is confirmed
    console.log("Sign in submitted:", formData);
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
              Sign in to access your enterprise dashboard, manage operations,
              and collaborate securely across your digital ecosystem.
            </p>
          </div>
        </div>

        {/* RIGHT: FORM PANEL WITH INNER CARD */}
        <div className="signin-form-panel">
          <div className="signin-card">
            <div className="signin-header">
              <h1 className="signin-title">Sign In</h1>
              <p className="signin-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="signin-form">
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

              <div className="signin-options-row">
                <label className="signin-remember">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>

                <a href="/forgot-password" className="signin-forgot-link">
                  Can't access my account
                </a>
              </div>

              <button type="submit" className="signin-btn-primary">
                Sign In
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

function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div className="signin-field">
      <label htmlFor={name} className="signin-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`signin-input${error ? " has-error" : ""}`}
      />
      {error && <span className="signin-error-text">{error}</span>}
    </div>
  );
}
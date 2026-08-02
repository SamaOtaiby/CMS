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
    console.log(e.target);
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

    // replace with real API
    console.log("Sign up submitted:", formData);
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <div className="signup-brand-panel">
          <div className="signup-glow-top" />
          <div className="signup-glow-bottom" />

          <div className="signup-brand-content">
            <h2 className="signup-brand-title"> Welcome</h2>
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

            <form className="signup-form" onSubmit={handleSubmit}>
              {[
                {
                  label: "Full Name",
                  name: "fullName",
                  type: "text",
                  placeholder: "Enter your name",
                  value: formData.fullName,
                  onChange: handleChange,
                },
                {
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  placeholder: "Enter your email",
                  value: formData.email,
                  onChange: handleChange,
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  placeholder: "Enter your password",
                  value: formData.password,
                  onChange: handleChange,
                },
              ].map((field) => (
                <Field
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[field.name]}
                />
              ))}

              <label className="signup-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <button
                type="submit"
                className="signup-btn-primary"
              >
                Sign Up
              </button>

              <div className="signup-divider">
                <div className="signup-divider-line" />
                <span className="signup-divider-text">or</span>
                <div className="signup-divider-line" />
              </div>

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

function Field({ label, name, type, placeholder, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  // Toggle input type dynamically if it's a password field
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="signup-field">
      <label htmlFor={name} className="signup-label">
        {label}
      </label>

      <div className="signup-input-wrapper">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`signup-input${error ? " has-error" : ""}`}
        />

        {isPasswordField && (
          <button
            type="button"
            className="signup-eye-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && <span className="signup-error-text">{error}</span>}
    </div>
  );
}

/* --- ICONS --- */

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
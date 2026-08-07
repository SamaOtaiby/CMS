import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./signUpSchema";
import api from "../api/axios";
import "./SignUpForm.css";

export default function SignUpForm() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "Sales Rep",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
  
    setApiError("");
    setSuccessMessage("");

    
    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      //  Axios POST request
      const response = await api.post("/users", payload);

     
      console.log("User created successfully:", response.data);
      setSuccessMessage("Account created successfully! You can now sign in.");
      reset(); 
    } catch (err) {
      console.error("Sign-up error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create account. Please try again.";
      setApiError(message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <div className="signup-form-panel">
          <div className="signup-card">
            <h1 className="signup-title">Sign Up</h1>

           
            {successMessage && (
              <div className="signup-banner signup-banner-success">
                {successMessage}
              </div>
            )}
            {apiError && (
              <div className="signup-banner signup-banner-error">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              <Field
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                register={register}
                error={errors.fullName?.message}
              />

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

              <div className="signup-field">
                <label className="signup-label">Role</label>
                <select {...register("role")} className="signup-input">
                  <option value="Sales Rep">Sales Rep</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.role && (
                  <span className="signup-error-text">{errors.role.message}</span>
                )}
              </div>

      
              <button
                type="submit"
                className="signup-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder, register, error }) {
  return (
    <div className="signup-field">
      <label htmlFor={name} className="signup-label">{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`signup-input${error ? " has-error" : ""}`}
      />
      {error && <span className="signup-error-text">{error}</span>}
    </div>
  );
}
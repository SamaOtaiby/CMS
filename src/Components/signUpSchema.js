import * as yup from "yup";

export const signUpSchema = yup.object({

fullName: yup
.string()
.required("Full name is required"),
email: yup
.string()
.email("Enter a valid email")
.required("Email is required"),
password: yup
.string()
.required("Password is required")
.min(8, "Password must be at least 8 characters long"),
role:
 yup.string()
 .required("Role is required"),
  rememberMe: yup.boolean(),
});
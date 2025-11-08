import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebookF, FaApple, FaEyeSlash, FaEye, FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await signUpUser(values);
      toast.success("Sign-up successful! Redirecting to login...");
      resetForm();
      setTimeout(() => navigate("/"), 2000); // redirect to login after 2s
    } catch (error) {
      toast.error("Sign-up failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffe4e1",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        className="bg-white p-5 rounded-4 shadow"
        style={{ width: "100%", maxWidth: "500px" }} // bigger size
      >
        <IoIosArrowBack
          className="mb-3"
          size={28}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h4 className="fw-bold mb-3 text-center text-md-start">Create Account</h4>
        <p className="text-muted mb-4 text-center text-md-start" style={{ fontSize: "14px" }}>
          Please enter your full name, email, and password to sign up.{" "}
          <span className="text-success fw-semibold">Enjoy your food!</span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Brown John"
                  className="form-control rounded-3 py-2"
                  style={{ borderRadius: "10px" }}
                />
                <ErrorMessage name="fullName" component="div" className="text-danger small" />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3">
                    <FaEnvelope className="text-secondary" />
                  </span>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    className="form-control rounded-end-3 border-start-0"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="form-control border-end-0"
                  />
                  <span
                    className="input-group-text bg-white border-start-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye className="text-secondary" /> : <FaEyeSlash className="text-secondary" />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 text-white fw-semibold mb-3"
                style={{ backgroundColor: "#0A5C2E", borderRadius: "12px", fontSize: "18px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <p className="text-center mt-3 text-muted small">Or Continue with</p>
              <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                {[FaGoogle, FaFacebookF, FaApple].map((Icon, idx) => (
                  <div
                    key={idx}
                    className="rounded-circle border d-flex align-items-center justify-content-center mb-2"
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  >
                    <Icon size={20} color={idx === 1 ? "#1877F2" : undefined} />
                  </div>
                ))}
              </div>

              <p className="text-center small mb-0">
                Already have an account?{" "}
                <span className="text-success fw-semibold" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                  Log In
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAccount;

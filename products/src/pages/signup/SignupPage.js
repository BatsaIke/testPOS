import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css"; // Reusing LoginPage styles
import { signupActions } from "../../actions/authAction";
import { set_Alert } from "../../actions/alertAction";
import Spinner from "../../UI/Spinner"; // Assuming you have a Spinner component

const SignupPage = () => {
  const [loading, setLoading] = useState(false); // State to track API call
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Show spinner before API call
    try {
      const response = await dispatch(signupActions(data));
      if (response.success === true) {
        dispatch(set_Alert("Signup successful. Kindly login.", "success"));
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false); // Hide spinner after API call
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}></div>
      <div className={styles.rightSection}>
        {loading ? ( // Show spinner when loading
          <Spinner />
        ) : (
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up to Syst</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Username</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Username is required" })}
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.errorText}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className={styles.errorText}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.signupLink}>
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;

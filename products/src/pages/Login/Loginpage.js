import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { loginUser } from "../../actions/authAction";
import { set_Alert } from "../../actions/alertAction";
import Spinner from "../../UI/Spinner"; // Assuming you have a Spinner component

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleLogin = async (data) => {
    setLoading(true); // Show spinner before API call
    try {
      console.log("Data to be sent:", data);
      let status = await dispatch(loginUser(data));
      if (status.success === true) {
        dispatch(set_Alert("Login successful", "success"));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Hide spinner after API call
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}></div>
      <div className={styles.rightSection}>
        {loading ? ( // Show spinner during API call
          <Spinner />
        ) : (
          <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
            <h2>Log in to Syst</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="text"
                  {...register("text", { required: "Email is required" })}
                />
                {errors.text && (
                  <span className={styles.errorText}>
                    {errors.text.message}
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
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <span className={styles.errorText}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>
              Log in
            </button>
            <p>
              Don't have an account?{" "}
              <a href="/signup" className={styles.signupLink}>
                Sign up
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

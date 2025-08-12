import React, { useState } from "react";
import styles from "./authenticator.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import validator from "validator"; // ✅ add validator.js

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState(null);

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Email validation handler
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validator.isEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // ✅ Password validation handler
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isLongEnough = value.length >= 8;
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (!isLongEnough) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!hasLetter || !hasNumber) {
      setPasswordError("Password must include at least one letter and one number.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Final check before submit
    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (passwordError) return;

    try {
      const data = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(data));
      navigate("/");
    } catch (err) {
      setFormError(err.data?.message || "Failed to register");
    }
  };

  return (
    <section className={styles.auth}>
      <form className={styles.inputAllCont} onSubmit={handleSubmit}>
        <h1 className="heading1">Register</h1>

        <div className={styles.inputCont}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputCont}>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>

        <div className={styles.inputCont}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        {formError && <p className={styles.error}>{formError}</p>}

        <section className={styles.actionsCont}>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={isLoading || emailError || passwordError}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className={styles.signUp}>
            <p className="heading4">Already have an account?</p>{" "}
            <NavLink className={styles.navLink} to="/signin">
              Sign In
            </NavLink>
          </div>
        </section>
      </form>
    </section>
  );
};

export default Register;

import React, { useState } from "react";
import styles from "./authenticator.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials(data)); // { user, accessToken }
      // TODO: redirect or close modal, etc.
      navigate("/");
    } catch (err) {
      setError(err.data?.message || "Failed to login");
    }
  };

  return (
    <section className={styles.auth}>
      <form className={styles.inputAllCont} onSubmit={handleSubmit}>
        <h1 className="heading1">Login</h1>
        <div className={styles.inputCont}>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputCont}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <section className={styles.actionsCont}>
          <button className={styles.loginButton} type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className={styles.signUp}>
            <p className="heading4">Don’t have an account?</p>{" "}
            <NavLink className={styles.navLink} to="/signup">
              Sign Up
            </NavLink>
          </div>
        </section>
      </form>
    </section>
  );
};

export default Login;

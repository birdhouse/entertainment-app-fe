import React, { useState } from "react";
import styles from "./authenticator.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(data)); // { user, accessToken }
      // TODO: redirect or update UI after successful registration
      navigate("/");
    } catch (err) {
      setError(err.data?.message || "Failed to register");
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

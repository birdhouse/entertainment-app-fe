import React from "react";
import styles from "./authenticator.module.scss";
import { NavLink } from "react-router-dom";

const Authenticator = () => {
  return (
    <section className={styles.auth}>
      <section className={styles.inputAllCont}>
        <h2>Login</h2>
        <div className={styles.inputCont}>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className={styles.inputCont}>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
      </section>

      <button className={styles.loginButton}>Sign In</button>

      <div className={styles.signUp}>
        <p>Don’t have an account?</p> <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </section>
  );
};

export default Authenticator;

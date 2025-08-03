import React from "react";
import styles from "./authenticator.module.scss";
import { NavLink } from "react-router-dom";

const Authenticator = () => {
  return (
    <section className={styles.auth}>
      <section className={styles.inputAllCont}>
        <h1 className="heading1">Login</h1>
        <div className={styles.inputCont}>
          <input type="email" id="email" placeholder="Email address" />
        </div>

        <div className={styles.inputCont}>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div className={styles.inputCont}>
          <input type="password" id="password" placeholder="Password" />
        </div>
      </section>
      <section className={styles.actionsCont}>
        <button className={styles.loginButton}>Sign In</button>

        <div className={styles.signUp}>
          <p className="heading4">Don’t have an account?</p>{" "}
          <NavLink className={styles.navLink} to="/signup">
            Sign Up
          </NavLink>
        </div>
      </section>
    </section>
  );
};

export default Authenticator;

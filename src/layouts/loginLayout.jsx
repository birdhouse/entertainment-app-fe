import React from "react";
import styles from "./loginLayout.module.scss";
import Login from "../components/authenticator/Login";

const LoginLayout = () => {
  return (
    <section className={styles.login}>
      <Login />
    </section>
  );
};

export default LoginLayout;

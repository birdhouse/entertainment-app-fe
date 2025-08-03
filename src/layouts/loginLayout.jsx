import React from "react";
import Authenticator from "../components/authenticator/Authenticator";
import styles from "./loginLayout.module.scss";

const LoginLayout = () => {
  return (
    <section className={styles.login}>
      <Authenticator />
    </section>
  );
};

export default LoginLayout;

import React from "react";

import styles from "./loginLayout.module.scss";
import Register from "../components/authenticator/Authenticator2";

const RegisterLayout = () => {
  return (
    <section className={styles.login}>
      <Register />
    </section>
  );
};

export default RegisterLayout;

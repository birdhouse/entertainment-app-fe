import styles from "./auth.module.scss";
import Register from "../../components/authenticator/Register";

const RegisterLayout = () => {
  return (
    <section className={styles.login}>
      <Register />
    </section>
  );
};

export default RegisterLayout;

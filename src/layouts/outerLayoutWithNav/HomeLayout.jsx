import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./homeLayout.module.scss";
import NavigationBar from "../../components/navigationBar/NavigationBar";

const HomeLayout = () => {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <Outlet />
    </main>
  );
};

export default HomeLayout;

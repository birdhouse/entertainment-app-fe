import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../navigationBar.module.scss";
import avatar from "../../../assets/image-avatar.png";

const ProfileLink = () => {
  return (
    <NavLink to="/profile" className={styles.navProfile}>
      <img src={avatar} alt="" />
    </NavLink>
  );
};

export default ProfileLink;

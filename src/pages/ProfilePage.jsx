import React from "react";
import { useGetMeQuery } from "../services/userApi";
import styles from "./profilePage.module.scss";
import { useLogoutAllMutation, useLogoutMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/image-avatar.png";

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const [logoutAll] = useLogoutAllMutation();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data) return <p style={{ paddingLeft: "164px" }}>No data found.</p>;

  const { name, email, createdAt } = data;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutAll().unwrap();
      navigate("/signin");
    } catch (err) {
      console.error("Logout from all devices failed:", err);
    }
  };

  return (
    <div className={styles.profilePage}>
      <section className={styles.avatarUsername}>
        <section id="sec-avatar" className={styles.secAvatar}>
          <img src={avatar} alt={`${name}'s Avatar`} />
        </section>

        <section id="username-sec" className={styles.usernameSec}>
          <p className="heading5">Username</p>
          <h2 className="heading2m">{name}</h2>
        </section>
      </section>

      <section className={styles.bottom}>
        <section className={styles.emailDate}>
          <section id="sec-email" className={styles.secEmail}>
            <p className="heading5">Email</p>
            <h2 className="heading2m">{email}</h2>
          </section>

          <section id="datecreated-sec" className={styles.dateCreatedSec}>
            <p className="heading5">Date Created</p>
            <h2 className="heading2m">{formattedDate}</h2>
          </section>
        </section>

        <section className={styles.exit}>
          <section id="sec-logout" className={styles.secLogout}>
            <button onClick={handleLogout}>Log Out</button>
          </section>

          <section id="logoutall-devices-sec" className={styles.logoutAllDevicesSec}>
            <button onClick={handleLogoutAll}>Log Out from All Devices</button>
          </section>
        </section>
      </section>
    </div>
  );
}

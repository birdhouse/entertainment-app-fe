import styles from "./navigationBar.module.scss";
import HomeLink from "./navLinks/HomeLink";
import MovieLink from "./navLinks/MovieLink";
import TVLink from "./navLinks/TVLink";
import BookmarkLink from "./navLinks/BookmarkLink";
import ProfileLink from "./navLinks/ProfileLink";
import AppLogo from "./AppLogo";

const NavigationBar = () => {
  return (
    <section className={styles.navBar}>
      <div className={styles.appLogo}>
        <AppLogo />
      </div>
      <div className={styles.navIcons}>
        <HomeLink />
        <MovieLink />
        <TVLink />
        <BookmarkLink />
      </div>

      <ProfileLink />
    </section>
  );
};

export default NavigationBar;

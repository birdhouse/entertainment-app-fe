import React from "react";
import { useGetBookmarksQuery } from "../services/userApi";
import RegularCard from "../components/regularCard/RegularCard";
import styles from "./bookmarked.module.scss";
import useContentWithBookmarks from "../utils/useContentWithBookmarks";

const Bookmarked = () => {
  const { data: bookmarks, isLoading } = useGetBookmarksQuery();

  console.log(bookmarks);

  if (isLoading) return <p>Loading...</p>;

  const bookmarkedMovies = bookmarks?.filter((b) => b.media_type === "movie") || [];
  const bookmarkedTV = bookmarks?.filter((b) => b.media_type === "tv") || [];

  return (
    <div className={styles.bmCont}>
      <section className={styles.bookmarks}>
        <h1 className="heading1">Bookmarked Movies</h1>
        <ul>
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((b) => <RegularCard content={b} key={b.id} />)
          ) : (
            <p className="heading5">No Movies saved</p>
          )}
        </ul>
      </section>
      <section className={styles.bookmarks}>
        <h1 className="heading1">Bookmarked TV Series</h1>
        <ul>
          {bookmarkedTV.length > 0 ? (
            bookmarkedTV.map((b) => <RegularCard content={b} key={b.id} />)
          ) : (
            <p className="heading5">No TV Series saved</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Bookmarked;

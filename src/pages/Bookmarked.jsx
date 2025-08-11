import React from "react";
import { useGetBookmarksQuery } from "../services/userApi";
import RegularCard from "../components/regularCard/RegularCard";
import styles from "./bookmarked.module.scss";

const Bookmarked = () => {
  const { data: bookmarks, isLoading } = useGetBookmarksQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <section className={styles.bookmarks}>
        <h1>Bookmarked Movies</h1>

        <ul>
          {bookmarks?.map((b) =>
            b.media_type === "movie" ? <RegularCard content={b} /> : "No Movies saved"
          )}
        </ul>
      </section>
      <section className={styles.bookmarks}>
        <h1>Bookmarked TV Series</h1>

        <ul>
          {bookmarks?.map((b) =>
            b.media_type === "tv" ? <RegularCard content={b} /> : "No TV Series saved"
          )}
        </ul>
      </section>
    </div>
  );
};

export default Bookmarked;

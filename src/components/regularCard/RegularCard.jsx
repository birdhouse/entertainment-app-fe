import React from "react";
import styles from "./regularCard.module.scss";
import movieIcon from "../../assets/icon-category-movie.svg";
import tvIcon from "../../assets/icon-category-tv.svg";
import PlayButton from "../playButton/PlayButton";
import BookmarkIcon from "../bookmarkIcon/BookmarkIcon";

const RegularCard = ({ content }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${content.poster_path}`;
  // console.log(typeof content.release_date, content.release_date, "release date");

  const bookmarkContent = {
    tmdb_id: content.id || content.tmdb_id, // assuming you'll need the id for bookmark functionality
    poster_path: content.poster_path,
    release_date: content.release_date,
    first_air_date: content.first_air_date,
    media_type: content.media_type,
    adult: content.adult,
    original_title: content.original_title,
    original_name: content.original_name,
    isBookmarked: content.isBookmarked,
  };

  console.log("isbookmarked", content.isBookmarked);
  return (
    <li className="li">
      <div className={styles.cardBackground} style={{ backgroundImage: `url(${imageUrl})` }}>
        <BookmarkIcon content={bookmarkContent} />
        <PlayButton />
      </div>

      <div className={styles.contentInfo}>
        <div className={styles.labels}>
          <p className={`${styles.release} heading4`}>
            {content.release_date?.slice(0, 4) || content.first_air_date?.slice(0, 4) || "N/A"}
          </p>
          <div className={styles.typeCont}>
            <img src={content.media_type === "movie" ? movieIcon : tvIcon} alt="" />
            <p className={`${styles.release} heading4`}>
              {content.media_type === "movie" ? "Movie" : "TV Show"}
            </p>
          </div>
          <p className={`${styles.release} heading4`}>{content.adult ? "18+" : "PG"}</p>
        </div>
        <div className={styles.contentTitle}>
          <p className="heading2m">
            {content.original_title?.slice(0, 20) || content.original_name?.slice(0, 20)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default RegularCard;

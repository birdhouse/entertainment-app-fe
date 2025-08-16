import React from "react";
import styles from "./trendingCard.module.scss";
import movieIcon from "../../assets/icon-category-movie.svg";
import tvIcon from "../../assets/icon-category-tv.svg";
import PlayButton from "../playButton/PlayButton";
import BookmarkIcon from "../bookmarkIcon/BookmarkIcon";

const TrendingCard = ({ content }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${content.poster_path}`;

  console.log("trendiing content", content);

  return (
    <div>
      <div className={styles.cardBackground}>
        <div className={styles.imgCont}>
          <img src={imageUrl} alt={content.original_title || content.original_name} />
        </div>
        <BookmarkIcon content={content} />
        <PlayButton />

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
              {content.original_title?.slice(0, 25) || content.original_name?.slice(0, 25)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;

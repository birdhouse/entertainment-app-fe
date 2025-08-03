import React from "react";
import styles from "./trendingCard.module.scss";
import movieIcon from "../../assets/icon-category-movie.svg";
import tvIcon from "../../assets/icon-category-tv.svg";
import PlayButton from "../playButton/PlayButton";

const TrendingCard = ({ content }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${content.poster_path}`;
  return (
    <li>
      <div className={styles.cardBackground} style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className={styles.bookmarkIcon}>
          <input type="checkbox" name="bookmark" id="bookmark" />
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke-width="1.5"
            />
          </svg>
        </div>
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
    </li>
  );
};

export default TrendingCard;

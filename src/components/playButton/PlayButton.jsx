import styles from "./playButton.module.scss";

const PlayButton = () => {
  return (
    <button className={styles.playButton}>
      <div className={styles.playCont}>
        <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFF"
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          />
        </svg>
      </div>
      <p className="heading3">Play</p>
    </button>
  );
};

export default PlayButton;

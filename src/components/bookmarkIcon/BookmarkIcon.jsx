import React, { useState } from "react";
import styles from "./bookmarkIcon.module.scss";
import { useToggleBookmarkMutation } from "../../services/userApi";

const BookmarkIcon = ({ content }) => {
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [toggle, setToggle] = useState(content.isBookmarked);

  const handleClick = async () => {
    try {
      // Call the mutation and wait for the response
      content.isBookmarked = !content.isBookmarked;
      const result = await toggleBookmark(content);

      // Check if the mutation was successful and has data
      if (result.data) {
        // Update the toggle state based on the action returned from backend
        setToggle(result.data.action);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Revert the UI state if the API call fails
      setToggle((prev) => !prev);
    }
  };

  return (
    <div className={styles.bookmarkIcon} onClick={handleClick}>
      <input
        type="checkbox"
        name="bookmark"
        id="bookmark"
        checked={toggle}
        onChange={() => {}} // Empty handler to prevent React warning
        readOnly // Makes the checkbox controlled
      />
      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
        <path
          d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default BookmarkIcon;

import styles from "./bookmarkIcon.module.scss";
import { useDispatch } from "react-redux";
import { useToggleBookmarkMutation, userApi } from "../../services/userApi";

const BookmarkIcon = ({ content }) => {
  const dispatch = useDispatch();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const handleClick = async () => {
    // Optimistic cache update
    dispatch(
      userApi.util.updateQueryData("getBookmarks", undefined, (draft) => {
        const idx = draft.findIndex((b) => b.tmdb_id === content.tmdb_id);
        if (idx >= 0) {
          draft.splice(idx, 1); // remove if already bookmarked
        } else {
          draft.push({ tmdb_id: content.tmdb_id }); // add new bookmark
        }
      })
    );

    try {
      // Send update to server
      content.isBookmarked = !content.isBookmarked;
      await toggleBookmark(content).unwrap();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);

      // Rollback on error by forcing a re-fetch
      dispatch(userApi.util.invalidateTags(["Bookmarks"]));
    }
  };

  return (
    <div className={styles.bookmarkIcon} onClick={handleClick}>
      <input
        type="checkbox"
        name="bookmark"
        id={`bookmark-${content.tmdb_id}`}
        checked={content.isBookmarked}
        readOnly
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

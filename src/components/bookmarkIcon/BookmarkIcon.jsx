import styles from "./bookmarkIcon.module.scss";
import { useDispatch } from "react-redux";
import { useToggleBookmarkMutation, userApi } from "../../services/userApi";
import { getBookmarkContent } from "../../utils/getBookmarkContent";
import { useLocation } from "react-router-dom";

const BookmarkIcon = ({ content }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bookmarkContent = location.pathname.startsWith("/bookmarks")
    ? content
    : getBookmarkContent(content);
  const [toggleBookmark] = useToggleBookmarkMutation();

  const handleClick = async () => {
    dispatch(
      userApi.util.updateQueryData("getBookmarks", undefined, (draft) => {
        const idx = draft.findIndex((b) => b.tmdb_id === content.tmdb_id);
        ~idx ? draft.splice(idx, 1) : draft.push({ tmdb_id: content.tmdb_id });
      })
    );

    try {
      // bookmarkContent.isBookmarked = !bookmarkContent.isBookmarked;
      await toggleBookmark(bookmarkContent).unwrap();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      dispatch(userApi.util.invalidateTags(["Bookmarks"]));
    }
  };

  return (
    <div className={styles.bookmarkIcon} onClick={handleClick}>
      <input
        type="checkbox"
        name="bookmark"
        id={`bookmark-${bookmarkContent.tmdb_id}`}
        checked={bookmarkContent.isBookmarked}
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

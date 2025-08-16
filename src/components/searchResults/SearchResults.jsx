import RegularCard from "../regularCard/RegularCard";
import { useSearchMediaQuery } from "../../services/tmdbApi";
import styles from "./searchResults.module.scss";
import { useGetBookmarksQuery } from "../../services/userApi";
import useContentWithBookmarks from "../../hooks/useContentWithBookmarks";

const SearchResults = ({ searchTerm, mediaType }) => {
  const searchQuery = useSearchMediaQuery(
    { mediaType: mediaType?.type, query: searchTerm },
    { skip: mediaType.type === "bookmark" || !searchTerm }
  );
  const bookmarksQuery = useGetBookmarksQuery(undefined, {
    skip: mediaType.type !== "bookmark",
  });

  const filteredBookmarks = (bookmarksQuery.data || []).filter((bm) =>
    (bm.original_title || bm.original_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading = searchQuery.isLoading || bookmarksQuery.isLoading;
  const data = mediaType.type !== "bookmark" ? searchQuery.data : filteredBookmarks;

  // In your SearchResults component:
  const { contentWithBookmarkStatus } = useContentWithBookmarks(
    mediaType.type !== "bookmark" ? data : null
  );

  console.log("bookmarks query", bookmarksQuery.data, "searchterm", searchTerm);
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className={styles.searchResults}>
      <h1 className="heading1">Search Results</h1>
      <ul>
        {mediaType.type !== "bookmark"
          ? contentWithBookmarkStatus?.map((item) => <RegularCard key={item.id} content={item} />)
          : data.map((item) => <RegularCard key={item.id} content={item} />)}
      </ul>
    </section>
  );
};

export default SearchResults;

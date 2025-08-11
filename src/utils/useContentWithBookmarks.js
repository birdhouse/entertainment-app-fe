import React from "react";
import { useGetBookmarksQuery } from "../services/userApi"; // your RTK query for bookmarks

function useContentWithBookmarks(content) {
  const { data: bookmarks = [], isLoading: bookmarksLoading, isError } = useGetBookmarksQuery();

  const isLoading = bookmarksLoading;

  // Cross-reference content with bookmarks
  const contentWithBookmarkStatus = React.useMemo(() => {
    if (!content?.results || !bookmarks) return [];

    const bookmarkedIds = new Set(bookmarks.map((b) => b.tmdb_id));

    return content.results.map((cont) => ({
      ...cont,
      isBookmarked: bookmarkedIds.has(cont.id), // assuming cont.id and bookmark ids are numbers
    }));
  }, [content, bookmarks]);

  return { contentWithBookmarkStatus, isLoading, isError };
}

export default useContentWithBookmarks;

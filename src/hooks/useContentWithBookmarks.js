import React from "react";
import { useGetBookmarksQuery } from "../services/userApi";

function useContentWithBookmarks(content) {
  const { data: bookmarks = [], isLoading: bookmarksLoading, isError } = useGetBookmarksQuery();

  const isLoading = bookmarksLoading;

  const contentWithBookmarkStatus = React.useMemo(() => {
    if (!content?.results || !bookmarks) return [];

    const bookmarkedIds = new Set(bookmarks.map((b) => b.tmdb_id));

    return content.results.map((cont) => ({
      ...cont,
      isBookmarked: bookmarkedIds.has(cont.id),
    }));
  }, [content, bookmarks]);

  return { contentWithBookmarkStatus, isLoading, isError };
}

export default useContentWithBookmarks;

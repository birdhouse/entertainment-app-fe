export const getBookmarkContent = (content) => {
  return {
    tmdb_id: content.tmdb_id || content.id,
    poster_path: content.poster_path,
    release_date: content.release_date,
    first_air_date: content.first_air_date,
    media_type: content.media_type,
    adult: content.adult,
    original_title: content.original_title,
    original_name: content.original_name,
    isBookmarked: content.isBookmarked,
  };
};

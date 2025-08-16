import React from "react";
import { useGetPopularMoviesQuery } from "../services/tmdbApi/tmdbApi";
import RegularCard from "../components/regularCard/RegularCard";
import styles from "./movies.module.scss";
import useContentWithBookmarks from "../hooks/useContentWithBookmarks";

const Movies = () => {
  const { data, isLoading, isError } = useGetPopularMoviesQuery();
  const { contentWithBookmarkStatus } = useContentWithBookmarks(data);
  const addedMediaType = contentWithBookmarkStatus.map((cont) => ({
    ...cont,
    media_type: "movie",
  }));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log("movies", data);

  return (
    <section className={styles.movies}>
      <h1 className="heading1">Movies</h1>
      <ul>
        {addedMediaType.map((item) => (
          <RegularCard content={item} key={crypto.randomUUID()} />
        ))}
      </ul>
    </section>
  );
};

export default Movies;

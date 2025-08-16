import React from "react";
import { useGetPopularTvQuery } from "../../services/tmdbApi";
import styles from "./tvshows.module.scss";
import RegularCard from "../../components/regularCard/RegularCard";
import useContentWithBookmarks from "../../hooks/useContentWithBookmarks";

const TVshows = () => {
  const { data, isLoading, isError } = useGetPopularTvQuery();
  const { contentWithBookmarkStatus } = useContentWithBookmarks(data);

  const addedMediaType = contentWithBookmarkStatus.map((cont) => ({
    ...cont,
    media_type: "tv",
  }));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  return (
    <section className={styles.tvshows}>
      <h1 className="heading1">TV Shows</h1>
      <ul>
        {addedMediaType.map((item) => (
          <RegularCard content={item} key={crypto.randomUUID()} />
        ))}
      </ul>
    </section>
  );
};

export default TVshows;

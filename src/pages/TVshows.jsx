import React from "react";
import { useGetPopularTvQuery } from "../features/tmdbApi/tmdbApi";
import styles from "./tvshows.module.scss";
import RegularCard from "../components/regularCard/RegularCard";

const TVshows = () => {
  const { data, isLoading, isError } = useGetPopularTvQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);

  return (
    <section className={styles.tvshows}>
      <h1 className="heading1">TV Shows</h1>
      <ul>
        {data.results.map((item) => (
          <RegularCard content={item} key={crypto.randomUUID()} />
        ))}
      </ul>
    </section>
  );
};

export default TVshows;

import React from "react";
import { useGetPopularMoviesQuery } from "../services/tmdbApi/tmdbApi";
import RegularCard from "../components/regularCard/RegularCard";
import styles from "./movies.module.scss";

const Movies = () => {
  const { data, isLoading, isError } = useGetPopularMoviesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);

  return (
    <section className={styles.movies}>
      <h1 className="heading1">Movies</h1>
      <ul>
        {data.results.map((item) => (
          <RegularCard content={item} key={crypto.randomUUID()} />
        ))}
      </ul>
    </section>
  );
};

export default Movies;

import React from "react";
import { useGetPopularMoviesQuery } from "../features/tmdbApi/tmdbApi";

const Movies = () => {
  const { data, isLoading, isError } = useGetPopularMoviesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {data.results.map((item) => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

import React from "react";
import { useGetTrendingQuery } from "../features/tmdbApi/tmdbApi";
import TrendingCard from "./TrendingCard";
const Trending = () => {
  const { data, isLoading, isError } = useGetTrendingQuery({
    mediaType: "all",
    timeWindow: "day",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data || !data.results) return <p>No data found.</p>;

  console.log(data);

  return (
    <>
      <h1>Trending</h1>
      <ul>
        {data.results.map((item) => (
          <TrendingCard content={item} key={crypto.randomUUID()} />
        ))}
      </ul>
    </>
  );
};

export default Trending;

import React from "react";
import RegularCard from "../components/RegularCard";
import { useSearchMediaQuery } from "../features/tmdbApi/tmdbApi";

const SearchResults = ({ searchTerm, mediaType }) => {
  const { data, isLoading } = useSearchMediaQuery(
    { mediaType: mediaType.type, query: searchTerm },
    { skip: !searchTerm }
  );

  if (isLoading) return <p>Loading...</p>;
  console.log(data);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {data.results.map((item) => (
          <RegularCard content={item} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

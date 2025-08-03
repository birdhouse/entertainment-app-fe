import React from "react";
import RegularCard from "../regularCard/RegularCard";
import { useSearchMediaQuery } from "../../features/tmdbApi/tmdbApi";
import styles from "./searchResults.module.scss";
const SearchResults = ({ searchTerm, mediaType }) => {
  const { data, isLoading } = useSearchMediaQuery(
    { mediaType: mediaType.type, query: searchTerm },
    { skip: !searchTerm }
  );

  if (isLoading) return <p>Loading...</p>;
  console.log(data);

  return (
    <section className={styles.searchResults}>
      <h1>Search Results</h1>
      <ul>
        {data.results.map((item) => (
          <RegularCard content={item} />
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;

import React from "react";
import { useLocation } from "react-router-dom";
import { useGetPopularDynamicQuery } from "../features/tmdbApi/tmdbApi";
import Home from "../pages/Home";
import { getPathName } from "../utils/getPathName";
import Trending from "../components/Trending";

const PageLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "");

  const { data, isLoading } = useGetPopularDynamicQuery({ mediaType: currentPage, page: 1 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {currentPage === "" && <Trending />}
      <>
        <h1>{getPathName(currentPage)}</h1>
        <ul>
          {data.results.map((item) => (
            <li key={item.id}>{item.title || item.name}</li>
          ))}
        </ul>
      </>
    </>
  );
};

export default PageLayout;

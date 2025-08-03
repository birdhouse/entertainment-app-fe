import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/searchBar/SearchBar";
import SearchResults from "../components/searchResults/SearchResults";

import { useLocation } from "react-router-dom";
import { getQueryType } from "../utils/getQueryType";

import styles from "./homeInner.module.scss";

const HomeLayoutInner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const mediaType = getQueryType(location.pathname.replace("/", ""));
  console.log(mediaType);

  return (
    <div className={styles.homeInner}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} mediaType={mediaType} />
      {searchTerm ? <SearchResults searchTerm={searchTerm} mediaType={mediaType} /> : <Outlet />}
    </div>
  );
};

export default HomeLayoutInner;

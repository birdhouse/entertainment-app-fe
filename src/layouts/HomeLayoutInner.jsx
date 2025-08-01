import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

import { useLocation } from "react-router-dom";
import { getQueryType } from "../utils/getQueryType";

const HomeLayoutInner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const mediaType = getQueryType(location.pathname.replace("/", ""));
  console.log(mediaType);

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} mediaType={mediaType} />
      {searchTerm ? <SearchResults searchTerm={searchTerm} mediaType={mediaType} /> : <Outlet />}
    </div>
  );
};

export default HomeLayoutInner;

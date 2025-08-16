// src/features/api/tmdbApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${process.env.REACT_APP_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //  Trending Movies/TV (day or week)
    getTrending: builder.query({
      query: ({ mediaType = "all", timeWindow = "day" }) => `trending/${mediaType}/${timeWindow}`,
    }),

    //  Dynamic Search (for movies or tv)
    searchMedia: builder.query({
      query: ({ mediaType = "movie", query, page = 1 }) =>
        `search/${mediaType}?query=${encodeURIComponent(query)}&page=${page}`,
    }),

    //  Popular Movies
    getPopularMovies: builder.query({
      query: (page = 1) => `movie/popular?page=${page}`,
    }),

    //  Popular TV Shows
    getPopularTv: builder.query({
      query: (page = 1) => `tv/popular?page=${page}`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useSearchMediaQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvQuery,
} = tmdbApi;

// src/features/api/tmdbApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWE2ZjdhMDk1ZmRjMTYzMGZlZWQ2MjhjZjg5Yjk1ZCIsIm5iZiI6MTc1Mzg4MDY3My4xMDUsInN1YiI6IjY4OGExODYxMDU5YzRiMDAyNmQwMjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zlTPQzFxHuwXj3b6TTyuY8IgCEc7GB_nXa8v-6BEpA"; // Replace with your actual API key

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Trending Movies/TV (day or week)
    getTrending: builder.query({
      query: ({ mediaType = "all", timeWindow = "day" }) => `trending/${mediaType}/${timeWindow}`,
    }),

    // Search Movies and TV shows
    search: builder.query({
      query: ({ query, page = 1 }) =>
        `search/multi?query=${encodeURIComponent(query)}&page=${page}`,
    }),

    // Dynamic Search (for movies or tv)
    searchMedia: builder.query({
      query: ({ mediaType = "movie", query, page = 1 }) =>
        `search/${mediaType}?query=${encodeURIComponent(query)}&page=${page}`,
    }),

    // Get Movie Details
    getMovieById: builder.query({
      query: (id) => `movie/${id}`,
    }),

    // Get TV Show Details
    getTvById: builder.query({
      query: (id) => `tv/${id}`,
    }),

    // Popular Movies
    getPopularMovies: builder.query({
      query: (page = 1) => `movie/popular?page=${page}`,
    }),

    // Popular TV Shows
    getPopularTv: builder.query({
      query: (page = 1) => `tv/popular?page=${page}`,
    }),

    // Popular dynamic
    getPopularDynamic: builder.query({
      query: ({ mediaType = "movie", page = 1 }) => `${mediaType}/popular?page=${page}`,
    }),
    // get images
    getMediaImages: builder.query({
      query: ({ type, id }) => `${type}/${id}/images`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useSearchQuery,
  useSearchMediaQuery,
  useGetMovieByIdQuery,
  useGetTvByIdQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvQuery,
  useGetPopularDynamicQuery,
  useGetMediaImagesQuery,
} = tmdbApi;

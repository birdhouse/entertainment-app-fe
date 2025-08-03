// src/services/tmdbApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWE2ZjdhMDk1ZmRjMTYzMGZlZWQ2MjhjZjg5Yjk1ZCIsIm5iZiI6MTc1Mzg4MDY3My4xMDUsInN1YiI6IjY4OGExODYxMDU5YzRiMDAyNmQwMjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zlTPQzFxHuwXj3b6TTyuY8IgCEc7GB_nXa8v-6BEpA"; // Replace with your actual API key

export const tmdbImageApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMediaImages: builder.query({
      query: ({ type, id }) => `${type}/${id}/images`,
    }),
  }),
});

export const { useGetMediaImagesQuery } = tmdbImageApi;

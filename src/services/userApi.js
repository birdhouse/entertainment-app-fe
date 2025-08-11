// src/services/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/users", // matches app.use("/api/users", userRoutes)
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Bookmarks"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      providesTags: ["User"],
    }),
    getBookmarks: builder.query({
      query: () => "/bookmark",
      providesTags: ["Bookmarks"],
    }),
    toggleBookmark: builder.mutation({
      query: (bookmarkData) => ({
        url: "/bookmarks",
        method: "PUT",
        body: bookmarkData,
      }),
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const { useGetMeQuery, useGetBookmarksQuery, useToggleBookmarkMutation } = userApi;

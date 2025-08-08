// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/tmdbApi/tmdbApi";
import { authApi } from "../services/authApi"; // <-- our new RTK Query slice
import authReducer from "../features/authSlice"; // <-- our new auth state slice

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, // <-- for storing accessToken + user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware).concat(authApi.middleware), // <-- add middleware for authApi
});

// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../features/tmdbApi/tmdbApi";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});

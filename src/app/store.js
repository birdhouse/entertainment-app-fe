// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/tmdbApi";
import { authApi } from "../services/authApi";
import { userApi } from "../services/userApi"; // ✅ import new API slice
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer, // ✅ add reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tmdbApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware), // ✅ add middleware
});

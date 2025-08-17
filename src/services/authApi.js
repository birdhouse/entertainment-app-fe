import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to include cookies in fetch calls
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/api/auth`,
  credentials: "include", // <-- this sends HttpOnly refreshToken cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    logoutAll: builder.mutation({
      query: () => ({
        url: "/logoutAll",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useLogoutAllMutation,
} = authApi;

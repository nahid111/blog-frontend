import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/token/`,
        method: "POST",
        body: data
      })
    }),
    userDetails: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/users/current/`,
        method: "GET"
      })
    })
  })
});

export const { useLoginMutation, useUserDetailsMutation } = userApiSlice;

import type { User } from "../types";
import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userDetails: builder.mutation<User, void>({
      query: () => ({
        url: `${URL_PREFIX}/users/current/`,
        method: "GET"
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/token/`,
        method: "POST",
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/sign-up/`,
        method: "POST",
        body: data
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/users/current/`,
        method: "PUT",
        body: data
      })
    })
  })
});

export const {
  useLoginMutation,
  useUserDetailsMutation,
  useRegisterMutation,
  useUpdateUserMutation
} = userApiSlice;

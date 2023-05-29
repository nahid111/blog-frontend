import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/sign-up/`,
        method: "POST",
        body: data
      })
    }),
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

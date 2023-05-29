import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.mutation({
      query: () => ({ url: URL_PREFIX, method: "GET" })
    }),
    createPosts: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data })
    }),
    deletePost: builder.mutation({
      query: (data, id) => ({ url: `${URL_PREFIX}/${id}`, method: "DELETE" })
    }),
    updatePost: builder.mutation({
      query: (data, id) => ({
        url: `${URL_PREFIX}/${id}`,
        method: "PUT",
        body: data
      })
    })
  })
});

export const {
  useGetPostsMutation,
  useCreatePostsMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = postsApiSlice;

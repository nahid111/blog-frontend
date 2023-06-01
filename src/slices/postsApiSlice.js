import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1/posts/";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.mutation({
      query: () => ({ url: URL_PREFIX, method: "GET" })
    }),
    createPosts: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data })
    }),
    getPost: builder.mutation({
      query: (id) => ({ url: `${URL_PREFIX}/${id}`, method: "GET" })
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `${URL_PREFIX}/${id}`, method: "DELETE" }),
      validateStatus: (response) => response.status === 204
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
  useGetPostMutation,
  useCreatePostsMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = postsApiSlice;

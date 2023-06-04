import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1/posts/";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id) => `${URL_PREFIX}/${id}`,
      providesTags: ["PostTag"]
    }),
    getPosts: builder.query({
      query: () => URL_PREFIX,
      providesTags: ["PostsTag"]
    }),
    createPosts: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data }),
      invalidatesTags: ["PostsTag"]
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `${URL_PREFIX}/${id}`, method: "DELETE" }),
      validateStatus: (response) => response.status === 204,
      invalidatesTags: ["PostsTag"]
    }),
    updatePost: builder.mutation({
      query: ({ data, id }) => ({
        url: `${URL_PREFIX}/${id}/`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["PostsTag", "PostTag", "PostCategoriesTag"]
    }),
    getPostComments: builder.query({
      query: (id) => `${URL_PREFIX}/${id}/comments/`,
      providesTags: ["PostCommentsTag"]
    }),
    getPostCategories: builder.query({
      query: (id) => `${URL_PREFIX}/${id}/categories/`,
      providesTags: ["PostCategoriesTag"]
    })
  })
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useCreatePostsMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostCommentsQuery,
  useGetPostCategoriesQuery
} = postsApiSlice;

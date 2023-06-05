import { apiSlice } from "./apiSlice";
import type { Comment } from "../types";

const URL_PREFIX = "/api/v1/comments/";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], void>({
      query: () => URL_PREFIX,
      providesTags: ["CommentsTag"]
    }),
    createComment: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data }),
      invalidatesTags: ["CommentsTag", "PostCommentsTag"]
    }),
    deleteComment: builder.mutation({
      query: (id) => ({ url: `${URL_PREFIX}/${id}/`, method: "DELETE" }),
      invalidatesTags: ["CommentsTag", "PostCommentsTag"]
    })
  })
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = commentsApiSlice;

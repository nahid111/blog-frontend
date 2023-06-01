import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1/categories/";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation({
      query: () => ({ url: URL_PREFIX, method: "GET" })
    }),
    createCategory: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data })
    }),
    deleteCategory: builder.mutation({
      query: (data, id) => ({ url: `${URL_PREFIX}/${id}`, method: "DELETE" })
    })
  })
});

export const {
  useGetCategoriesMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApiSlice;

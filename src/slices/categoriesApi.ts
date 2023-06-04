import { apiSlice } from "./apiSlice";
const URL_PREFIX = "/api/v1/categories/";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => URL_PREFIX,
      providesTags: ["CategoriesTag"],
      invalidatesTags: ["PostCategoriesTag"]
    }),
    createCategory: builder.mutation({
      query: (data) => ({ url: URL_PREFIX, method: "POST", body: data }),
      invalidatesTags: ["CategoriesTag"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `${URL_PREFIX}/${id}/`, method: "DELETE" }),
      invalidatesTags: ["CategoriesTag"]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApiSlice;

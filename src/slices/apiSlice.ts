import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import type { RootState, AppDispatch } from "../store";
import { logout, tokenReceived } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "", // leave empty when using proxy
  prepareHeaders: (headers, { getState }) => {
    // set access token if available
    const userInfo = (getState() as RootState).auth.userInfo;
    if (userInfo && userInfo.access) {
      headers.set("authorization", `Bearer ${userInfo.access}`);
    }
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log(
      "%c Refreshing Token ",
      "background-color: lightblue; color: black"
    );
    const userInfo = (api.getState() as RootState).auth.userInfo;
    if (userInfo && userInfo.refresh) {
      const refreshResult = await baseQuery(
        {
          url: "/api/v1/token/refresh/",
          method: "POST",
          body: { refresh: userInfo.refresh }
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        // store the new token
        api.dispatch(tokenReceived(refreshResult.data));
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "CategoriesTag",
    "CommentsTag",
    "PostTag",
    "PostsTag",
    "PostCommentsTag",
    "PostCategoriesTag"
  ],
  endpoints: (builder) => ({})
});

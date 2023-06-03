import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout, tokenReceived } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "", // leave empty when using proxy
  prepareHeaders: (headers, { getState }) => {
    // set access token if available
    const userInfo = getState().auth.userInfo;
    if (userInfo && userInfo.access) {
      headers.set("authorization", `Bearer ${userInfo.access}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("%cRefreshing Token", "background-color: yellow;");
    // try to get a new token
    const userInfo = api.getState().auth.userInfo;
    if (userInfo && userInfo.refresh) {
      console.log(userInfo.refresh);
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
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

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

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});

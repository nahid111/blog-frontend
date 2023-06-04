import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import { toast } from "react-toastify";

const rtkQueryErrorLogger = (apiSlice) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.originalStatus === 500) {
      toast.error("internal server error", { theme: "colored" });
    }
    if (action.payload.status) {
      if (action.payload.status === 500) {
        toast.error("Token expired. Please Sign-in");
      }
      if (action.payload.status === 400) {
        for (let key in action.payload.data) {
          toast.error(`${key}: ${action.payload.data[key][0]}`);
        }
      }
    }
    console.error(action.payload);
    toast.error(action.payload.data?.detail);
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQueryErrorLogger)
      .concat(apiSlice.middleware),
  devTools: true
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    tokenReceived: (state, action) => {
      state.userInfo.access = action.payload.access;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state.userInfo, access: action.payload.access })
      );
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials, tokenReceived, logout } = authSlice.actions;

export default authSlice.reducer;

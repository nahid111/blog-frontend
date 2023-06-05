import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: {
    refresh: string | null;
    access: string | null;
    id: number;
    last_login: string | null;
    email: string;
    name: string | null;
    avatar: string | null;
    created_at: string;
    is_active: boolean;
    is_admin: boolean;
    is_staff: boolean;
    is_superuser: boolean;
  } | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
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
      state.userInfo!.access = action.payload.access;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state.userInfo, access: action.payload.access })
      );
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials, tokenReceived, logout } = authSlice.actions;

export default authSlice.reducer;

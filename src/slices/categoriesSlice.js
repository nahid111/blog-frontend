import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: []
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categoryList = action.payload;
    },
    clearCategories: (state, action) => {
      state.categoryList = [];
    }
  }
});

export const { setCategories, clearCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

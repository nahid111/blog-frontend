import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: []
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.postList = action.payload;
    },
    removePost: (state, action) => {
      state.postList = state.filter((post) => post.id !== action.payload.id);
    },
    updatePost: (state, action) => {
      const indx = state.postList.findIndex(
        (post) => post.id == action.payload.id
      );
      state.postList[indx] = action.payload;
    },
    clearPosts: (state, action) => {
      state.postList = [];
    }
  }
});

export const { setPosts, removePost, updatePost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;

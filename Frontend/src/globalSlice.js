import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "globalData",
  initialState: {
    authUser: null,
    posts: [],
    recommendedUserData: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
    },
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    setRecommendedUserData: (state, action) => {
      state.recommendedUserData = action.payload;
    },
  },
});

export const { setAuthUser, clearAuthUser, setRecommendedUserData, setPost } =
  globalSlice.actions;
export default globalSlice.reducer;

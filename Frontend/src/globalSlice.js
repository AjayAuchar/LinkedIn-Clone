import { createSlice } from "@reduxjs/toolkit";
const globalSlice = createSlice({
  name: "globalData",
  initialState: {
    authUser: null,
    posts: [],
    recommendedUserData: [],
    notifications: [],
    connectionRequests: [],
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
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setConnectionRequests: (state, action) => {
      state.connectionRequests = action.payload;
    },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  setRecommendedUserData,
  setNotifications,
  setPost,
  setConnectionRequests,
} = globalSlice.actions;
export default globalSlice.reducer;

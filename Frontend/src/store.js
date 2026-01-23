import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";

export const store = configureStore({
  reducer: {
    globalData: globalReducer,
  },
});

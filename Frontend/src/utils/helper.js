import { axiosInstance } from "./axios";
import {
  setAuthUser,
  setConnectionRequests,
  setNotifications,
} from "../globalSlice";
import { setPost } from "../globalSlice";

const checkAuthUser = async (dispatch) => {
  try {
    const userData = await axiosInstance.get("/auth/me");
    if (userData?.data) {
      dispatch(setAuthUser(userData.data));
    }
  } catch (err) {
    dispatch(setAuthUser(null));

    if (err.response.status === 401) {
      return null;
    }

    console.log(err.response.data.message || "Something went wrong");
  }
};

const getPosts = async (dispatch) => {
  try {
    const postRes = await axiosInstance.get("/posts");
    dispatch(setPost([...postRes.data]));
  } catch (error) {
    console.log(error);
  }
};

const getConnectionRequests = async (dispatch) => {
  try {
    const connectionRes = await axiosInstance.get("/connections/requests");
    console.log(connectionRes, "connectionRes");
    dispatch(setConnectionRequests(connectionRes?.data));
  } catch (error) {
    console.log(`Error fetching getConnectionRequests: ${error}`);
  }
};

const getNotifications = async (dispatch) => {
  // if (authUser) {
  try {
    const postRes = await axiosInstance.get("/notifications");
    dispatch(setNotifications(postRes));
  } catch (error) {
    console.log(`Error fetching getNotifications: ${error}`);
  }
  // }
};

export { checkAuthUser, getPosts, getConnectionRequests, getNotifications };

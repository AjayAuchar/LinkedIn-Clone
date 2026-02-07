import { axiosInstance } from "./axios";
import { setAuthUser } from "../globalSlice";
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

export { checkAuthUser, getPosts };

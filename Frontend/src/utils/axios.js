import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://linkedin-clone-nbvs.onrender.com",
  withCredentials: true,
});

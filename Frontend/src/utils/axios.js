import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://linkedin-clone-nbvs.onrender.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

import React, { use, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { checkAuthUser } from "../../utils/helper";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      console.log(loginRes, "err");

      await checkAuthUser(dispatch);
      toast.success(loginRes.data.message || "Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

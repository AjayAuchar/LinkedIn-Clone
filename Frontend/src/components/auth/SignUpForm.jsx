import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { checkAuthUser } from "../../utils/helper";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userData = await axiosInstance.post("/auth/signup", {
        name,
        email,
        username,
        password,
      });
      toast.success(userData.data.message || "Account created successfully!");

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      checkAuthUser(dispatch);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong.");
      console.log(error.response.data.message, "error ");
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <button type="submit" className="btn btn-primary w-full text-white">
        Agree & Join
      </button>
    </form>
  );
};

export default SignUpForm;

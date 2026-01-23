import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/auth/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser } from "./utils/helper";

function App() {
  const authUser = useSelector((state) => state.globalData.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthUser(dispatch);
  }, []);
  // console.log(authUser, "authuser");

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;

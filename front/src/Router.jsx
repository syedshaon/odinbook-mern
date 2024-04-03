import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userReducer";
import { messengerActions } from "./store/messenger_reducer";

import Home from "./pages/Home";
import Login from "./pages/People/Login";
import AuthError from "./pages/People/AuthError";
import LoginAuthCallBack from "./pages/People/LoginAuthCallBack";
import Signup from "./pages/People/Signup";
import Verify_signup from "./pages/People/Verify_signup";
import GetVerificationEmail from "./pages/People/GetVerificationEmail";
import GetResetPw from "./pages/People/GetResetPw";
import Reset_pw from "./pages/People/Reset_pw";
import Settings from "./pages/People/Settings";
import People_Profile from "./pages/People_Profile";
import People_All from "./pages/People_All";
import Messenger from "./pages/Messenger";
import ErrorPage from "./pages/ErrorPage";
import PrivacyPolicy from "./pages/Privacy";

const Router = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(authState.backendURL + "/getAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        // Handle error if needed
        return;
      }
      if (response.ok) {
        dispatch(userActions.setAllUsers({ users: responseData }));
        dispatch(messengerActions.setInitialActiveReciepient({ users: responseData }));
      }

      // Handle error if needed
      return;
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    isLoggedIn && fetchAllUsers();
  }, [authState.backendURL, authState.token, dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-auth-error" element={<AuthError />} />
        <Route path="/login-auth-callback" element={<LoginAuthCallBack />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:vtoken" element={<Verify_signup />} />
        <Route path="/get-verification-email" element={<GetVerificationEmail />} />
        <Route path="/get-reset-password" element={<GetResetPw />} />
        <Route path="/reset-password/:vtoken" element={<Reset_pw />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Login />} />
        <Route path="/user/:uid" element={isLoggedIn ? <People_Profile /> : <Login />} />
        <Route path="/allpeople" element={isLoggedIn ? <People_All /> : <Login />} />
        <Route path="/messenger" element={isLoggedIn ? <Messenger /> : <Login />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

// authState

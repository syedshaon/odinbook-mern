import Router from "./Router";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authReducer";
import { userActions } from "./store/userReducer";
import { messengerActions } from "./store/messenger_reducer";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  ////////////////////////////////////////////////////////////////////////
  // START: Used to verify user's login status when user reload the page.
  ////////////////////////////////////////////////////////////////////////
  const validateLoginStatus = async () => {
    // console.log("token : ", localStorage.getItem("token"));
    if (localStorage.getItem("token") && !authState.isLoggedIn) {
      try {
        const response = await fetch(authState.backendURL + "/validateLoginStatus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log(response);
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.user) {
          dispatch(authActions.login({ user: responseData.user, token: localStorage.getItem("token"), expire: localStorage.getItem("expire") }));
          dispatch(userActions.setCurrentUser({ user: responseData.user }));
          dispatch(messengerActions.setCurrentUser({ user: responseData.user }));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("followed_posts");
          dispatch(authActions.logout());
        }
      } catch (error) {
        // console.error("Error in validateLoginStatus:", error);
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////
  // END: Used to verify user's login status when user reload the page.
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  // Start: Used when user sign in OR sign up with Google/Facebook
  ////////////////////////////////////////////////////////////////////////
  const loadMe = async () => {
    // loadMe ran
    try {
      const response = await fetch(authState.backendURL + "/loadme", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.user) {
        dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
        dispatch(userActions.setCurrentUser({ user: responseData.user }));
        dispatch(messengerActions.setCurrentUser({ user: responseData.user }));
      }
    } catch (error) {
      // console.error("Error in validateLoginStatus:", error);
    }
  };

  useEffect(() => {
    // fetchAllUsers();
    if (Cookies.get("auth_cookie")) {
      loadMe();
    }
    validateLoginStatus();
  }, []);

  ////////////////////////////////////////////////////////////////////////
  // END: Used when user sign in OR sign up with Google/Facebook
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  // Start: Check every minute and refersh JWT Token at the 9th minute
  ////////////////////////////////////////////////////////////////////////
  const RefreshJwtToken = async () => {
    let tokenExpires = new Date(authState.expire); // Convert the string to a Date object

    // Calculate the difference between tokenExpires and the current time
    let timeDifferenceMs = (tokenExpires - new Date()) / (60 * 1000);

    console.log("JWT token will get refreshed in " + (timeDifferenceMs - 1) + "minutes.");

    if (authState.token && timeDifferenceMs < 1) {
      console.log("RefreshJwtToken ran");
      try {
        const response = await fetch(authState.backendURL + "/refresh", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.user) {
          dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("expire");
          dispatch(authActions.logout());
        }
      } catch (error) {
        // console.error("Error in validateLoginStatus:", error);
      }
    }
  };

  useEffect(() => {
    console.log("CONSOLE LOGGING INTENTIONALLY :> ");
    RefreshJwtToken();

    // Run the test every minute (60 seconds * 1000 milliseconds)
    const intervalId = setInterval(RefreshJwtToken, 60 * 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [authState.expire, authState.isLoggedIn]);

  ////////////////////////////////////////////////////////////////////////
  // END: Check every minute and refersh JWT Token at the 9th minute
  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Router />
    </>
  );
}

export default App;

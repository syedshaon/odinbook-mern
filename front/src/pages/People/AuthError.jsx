import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";
import { userActions } from "../../store/userReducer";
import { messengerActions } from "../../store/messenger_reducer";
import Loading from "../Loading";

const isFacebookApp = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};

function AuthError() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [showLoading, setShowLoading] = useState(true);
  const [showResetPW, setResetPW] = useState(false);
  const [showVerify, setVerify] = useState(false);
  const [responseFromBackEnd, setResponseFromBackEnd] = useState(false);
  const [noUserError, setNoUserError] = useState("");
  const [authError, setAuthError] = useState("");

  const navigateTo = useNavigate();

  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (isFacebookApp() && !window.location.href.includes("redirect_fb")) {
      setIsWebView(true);
    }
  }, []);

  if (authState.isLoggedIn) {
    navigateTo("/");
    return;
  }

  useEffect(() => {
    if (Cookies.get("no_user") || Cookies.get("auth_error")) {
      setResponseFromBackEnd(true);
    }

    setNoUserError(Cookies.get("no_user"));
    setAuthError(Cookies.get("auth_error"));
    setTimeout(() => {
      setResponseFromBackEnd(false);
      Cookies.set("no_user", "");
      Cookies.set("auth_error", "");
    }, 5000);
    // Check if the user is logged in
    if (authState.isLoggedIn) {
      // Redirect to the previous page or a default page
      const previousPage = navigateTo.location.state?.from || "/";

      // Redirect to the previous page after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        // Use navigate from 'react-router-dom' instead of history.push
        navigateTo(previousPage);
      }, 1500);

      // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    }
  }, [authState.isLoggedIn, navigateTo]);

  setTimeout(() => {
    setShowLoading(false);
  }, 100);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

        credentials: "include",
      });

      if (!response.ok) {
        const responseData = await response.json();
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        if (responseData.type === "verify") {
          setVerify(true);
        }
        if (responseData.type === "wrongPW") {
          setResetPW(true);
        }
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }
      // Handle the successful response (if needed)
      const responseData = await response.json();
      console.log("Response from backend:", responseData);

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expire", responseData.expire);
      localStorage.setItem("currentUser", JSON.stringify(responseData.user));

      dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
      dispatch(userActions.setCurrentUser({ user: responseData.user }));
      dispatch(messengerActions.setCurrentUser({ user: responseData.user }));

      // Hide signup form
      setResponseFromBackEnd("Logged In Successfully. ....");

      // Redirect to the previous page or a default page
      const previousPage = navigateTo.location.state?.from || "/";

      // Redirect to "/home" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        history.push(previousPage);
        // navigateTo("/");
      }, 1500);

      // // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <>
      {!showLoading ? (
        <section className="mt-5 md:mt-0 text-gray-600 body-font bg-gray-100 h-screen flex items-start md:items-center ">
          <div className="container xl:px-32 px-5  mx-auto flex flex-wrap items-center justify-center  ">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-bold lg:text-5xl text-3xl text-blue-600 text-center md:text-left ">Odinbook</h1>
              <p className="leading-relaxed mt-4 lg:text-2xl text-md lg:max-w-xl font-medium  text-black text-center md:text-left ">Odinbook helps you connect and share with the people in your life.</p>
            </div>
            <div className="mt-4 lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8">
              {responseFromBackEnd && (
                <h3 className="response text-orange-500   text-md font-bold container mx-auto text-center mb-3">
                  Authentication Error. {noUserError && "No User Found."} {authError && "Please Retry."}
                </h3>
              )}
              <form onSubmit={handleSignInSubmit} className=" flex flex-col md:ml-auto w-full  ">
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required className="  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                <button className=" mt-4  cursor-pointer text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 ">Sign In</button>

                <hr className="my-3" />

                <button onClick={() => navigateTo("/signup")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600 ">
                  Sign Up
                </button>
                {showResetPW && (
                  <>
                    <hr className="my-3" />

                    <button onClick={() => navigateTo("/get-reset-password")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600">
                      Reset Password
                    </button>
                  </>
                )}

                {showVerify && (
                  <>
                    <hr className="my-3" />

                    <button onClick={() => navigateTo("/get-verification-email")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-700 ">
                      Get Verification Email
                    </button>
                  </>
                )}
              </form>
              <div className=" flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                {/* <hr className="my-3" />

                <a className="fb btn cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600 flex justify-center" href={`${authState.backSiteURL}auth/facebook_signin`}>
                  <i className="fa fa-facebook fa-fw" /> Continue with Facebook
                </a> */}
                <hr className="my-3" />
                {!isWebView && (
                  <>
                    <a className="google btn cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-700 flex justify-center" href={`${authState.backSiteURL}auth/google_signin`}>
                      <i className="fa fa-google fa-fw" /> Continue with Google
                    </a>

                    <hr className="my-3" />
                  </>
                )}

                <button
                  onClick={() =>
                    sendDataToBackend({
                      email: "Blake_Brekke91@gmail.com",
                      password: "AQ222sdddfdg3234!@",
                    })
                  }
                  className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-800 "
                >
                  Sign In as Guest 1
                </button>
                <hr className="my-3" />

                <button
                  onClick={() =>
                    sendDataToBackend({
                      email: "Khalil_Stark16@gmail.com",
                      password: "AQ222sdddfdg3234!@",
                    })
                  }
                  className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-900 "
                >
                  Sign In as Guest 2
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default AuthError;

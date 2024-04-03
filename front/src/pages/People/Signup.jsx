import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const isFacebookApp = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};

function Signup() {
  const navigateTo = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (isFacebookApp() && !window.location.href.includes("redirect_fb")) {
      setIsWebView(true);
    }
    // Check if the user is logged in
    if (authState.isLoggedIn) {
      // Redirect to the homepage
      navigateTo("/");
    }
  }, [authState.isLoggedIn]);
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [pwError, setPWError] = useState(false);
  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePWChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
    e.target.value === formData.repeatPassword ? setPWError(false) : setPWError(true);
    if (e.target.value.length < 8 || !/[A-Z]/.test(e.target.value) || !/[a-z]/.test(e.target.value) || !/[0-9]/.test(e.target.value)) {
      setErrorMessage("Password must contain 8+ characters, one uppercase letter, one lowercase letter, and one number.");
    } else {
      setErrorMessage("");
    }
  };
  const handleRptPWChange = (e) => {
    setFormData({
      ...formData,
      repeatPassword: e.target.value,
    });
    e.target.value === formData.password ? setPWError(false) : setPWError(true);
    if (e.target.value.length < 8 || !/[A-Z]/.test(e.target.value) || !/[a-z]/.test(e.target.value) || !/[0-9]/.test(e.target.value)) {
      setErrorMessage("Password must contain 8+ characters, one uppercase letter, one lowercase letter, and one number.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        const responseData = await response.json();
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        return;
      }

      // Handle the successful response (if needed)
      const responseData = await response.json();
      // console.log("Response from backend:", responseData.message);

      // Hide signup form
      setResponseFromBackEnd(responseData.message);

      // Redirect to "/login" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        navigateTo("/login");
      }, 4500);

      // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 mt-5 md:mt-0 body-font bg-gray-100 h-screen flex items-start md:items-center ">
        <div className="container xl:px-32 px-5  mx-auto flex flex-wrap items-center  ">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-5xl text-3xl text-blue-600 text-center md:text-left ">Odinbook</h1>
            <p className="leading-relaxed mt-2 md:mt-4 lg:text-2xl text-md lg:max-w-xl font-medium  text-black text-center md:text-left ">Odinbook helps you connect and share with the people in your life.</p>
          </div>
          <form onSubmit={handleSignupSubmit} className="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center md:ml-auto w-full  mt-4 md:mt-0">
            {responseFromBackEnd && <h3 className="response text-orange-500 text-md font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}
            <div className="flex gap-2">
              <input type="text" maxLength="10" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required className=" w-1/2  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              <input type="text" maxLength="10" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" required className=" w-1/2  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <input type="text" maxLength="50" name="username" value={formData.username} onChange={handleInputChange} placeholder="username" required className="  mb-2 md:mb-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <input type="email" maxLength="50" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className=" w-full mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

            <input type="password" name="password" maxLength="50" value={formData.password} onChange={handlePWChange} placeholder="Password" required className={pwError ? "border-orange-500 border-2 w-full mb-2 md:mb-4  bg-white rounded    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" : "w-full mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"} />
            <input type="password" maxLength="50" name="repeatPassword" value={formData.repeatPassword} onChange={handleRptPWChange} placeholder="Repeat Password" required className={pwError ? "border-orange-500 border-2 w-full mb-2 md:mb-4  bg-white rounded   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" : "w-full mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"} />
            {errorMessage && <p className="text-sm text-orange-500 font-bold">{errorMessage}</p>}
            <button className=" w-full mt-4 cursor-pointer  text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 ">Sign Up</button>

            <hr className="my-2" />
            {!isWebView && (
              <>
                <a className="w-full google btn cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-700 flex justify-center" href={`${authState.backSiteURL}auth/google_signin`}>
                  <i className="fa fa-google fa-fw" /> Continue with Google
                </a>

                <hr className="my-2" />
              </>
            )}

            <p className="text-sm text-blue-500   text-center  ">Already have an Account?</p>
            <hr className="mb-1" />

            <button onClick={() => navigateTo("/signin")} className="w-full cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-800 ">
              Sign In
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;

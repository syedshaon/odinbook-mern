import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function GetVerificationEmail() {
  const navigateTo = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the user is logged in
    if (authState.isLoggedIn) {
      // Redirect to the homepage
      navigateTo("/");
    }
  }, [authState.isLoggedIn]);

  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);

  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGetVerificationEmailSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/getVerificationEmail", {
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
        navigateTo("/signin");
      }, 2500);

      // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font bg-gray-100 h-screen flex items-center ">
        <div className="container xl:px-32 px-5  mx-auto flex flex-wrap items-center  ">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-5xl text-6xl text-blue-600 text-center md:text-left ">Odinbook</h1>
            <p className="leading-relaxed mt-4 lg:text-2xl text-xl lg:max-w-xl font-medium  text-black text-center md:text-left ">Odinbook helps you connect and share with the people in your life.</p>
          </div>
          <form onSubmit={handleGetVerificationEmailSubmit} className="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center md:ml-auto w-full mt-10 md:mt-0">
            {responseFromBackEnd && <h3 className="response text-orange-500 text-xl font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}

            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className=" w-full mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

            <button className=" w-full mt-4 cursor-pointer  text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 ">Resend Email</button>
            <p className="text-sm text-blue-500 mt-3 text-center pt-4">Don't have Account?</p>
            <hr className="my-3" />

            <button onClick={() => navigateTo("/signin")} className="w-full cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600 ">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default GetVerificationEmail;

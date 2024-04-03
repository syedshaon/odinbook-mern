import Navbar from "../Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";

function Settings() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const navigateTo = useNavigate();
  const [pwError, setPWError] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    repeatPassword: "",
  });

  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePwChangeSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(authState.backendURL + "/changePass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      // Handle the successful response (if needed)
      const responseData = await response.json();
      setResponseFromBackEnd(responseData.message);
      //   console.log("Response from backend:", responseData);

      if (response.ok) {
        // Redirect to "/home" after 1500 milliseconds (1.5 seconds)
        const timeoutId = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expire");
          dispatch(authActions.logout());
          navigateTo("/signin");
        }, 1500);

        // // Cleanup the timeout on component unmount or if the redirect happens
        return () => clearTimeout(timeoutId);
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font bg-gray-100 h-screen flex items-center ">
        <div className="container xl:px-32 px-5    md:w-1/2  mx-auto flex flex-wrap items-center  ">
          <form onSubmit={handlePwChangeSubmit} className=" bg-white shadow-lg rounded-lg p-8 flex flex-col items-center md:ml-auto w-full mt-10 md:mt-0">
            {responseFromBackEnd && <h3 className="response text-orange-500 text-md font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}

            <input
              type="password"
              name="password"
              value={formData.newPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                });
                e.target.value === formData.repeatPassword ? setPWError(false) : setPWError(true);
              }}
              placeholder="New Password"
              required
              className={pwError ? "border-orange-500 border-2 w-full mb-4  bg-white rounded   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" : "w-full mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"}
            />
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  repeatPassword: e.target.value,
                });
                e.target.value === formData.newPassword ? setPWError(false) : setPWError(true);
              }}
              placeholder="Retype New Password"
              required
              className={pwError ? "border-orange-500 border-2 w-full mb-4  bg-white rounded   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" : "w-full mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"}
            />

            <button className=" w-full mt-4 cursor-pointer  text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 ">Change Password</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Settings;

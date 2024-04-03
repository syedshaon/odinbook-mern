import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Verify_signup() {
  const { vtoken } = useParams();
  console.log(vtoken);
  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  const authState = useSelector((state) => state.auth);
  const navigateTo = useNavigate();
  const [vFailState, setVFailState] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(authState.backendURL + "/verifyEmail?token=" + vtoken, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setResponseFromBackEnd(responseData.message);
      console.log(responseData);

      if (!response.ok) {
        setVFailState(true);
        // Redirect to "/login" after 1500 milliseconds (1.5 seconds)
        const timeoutId = setTimeout(() => {
          navigateTo("/getVerificationEmail");
        }, 2500);
      }
      if (response.ok) {
        // Redirect to "/login" after 1500 milliseconds (1.5 seconds)
        const timeoutId = setTimeout(() => {
          navigateTo("/signin");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font bg-gray-100 h-screen flex flex-col items-center  justify-center ">
      <h1 className="title-font font-bold lg:text-5xl text-6xl text-blue-600 text-center md:text-left mb-10">Odinbook</h1>
      <h1>{responseFromBackEnd}</h1>

      {vFailState && (
        <div>
          <hr className="my-3" />

          <button onClick={() => navigateTo("/signin")} className="w-full cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600 ">
            Sign In
          </button>
        </div>
      )}
    </section>
  );
}

export default Verify_signup;

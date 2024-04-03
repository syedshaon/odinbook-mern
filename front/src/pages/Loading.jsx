import React from "react";
import Spinner from "../assets/spinner.svg";

function Loading() {
  // console.log("coming from Loading.");
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img className="animate-spin w-48 h-48" src={Spinner} alt="Loading..." />
    </div>
  );
}

export default Loading;

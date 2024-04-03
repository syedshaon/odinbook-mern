import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";

import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import Authenticator from "../ImageKit/Authenticator";

const CreatePostForm = ({ SetAllPosts }) => {
  const authState = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [imgKitImgUrl, setImgKitImgUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const startsWithUploads = /^uploads/;
  const inputRef = useRef();

  useEffect(() => {
    // Focus on the input element when the component mounts

    const handleResize = () => {
      // Update showContact based on window width
      if (window.innerWidth > 767) {
        inputRef.current.focus();
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value) {
      setShowError(false);
    }
  };

  const handleThumbnailChange = (e) => {
    setSendDisabled(true);
    // Assuming you have a single file input for the thumbnail
    const file = e.target.files[0];
    if (file) {
      setShowError(false);
    }
    setThumbnail(file);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!text && !imgKitImgUrl) {
      setShowError(true);
      seterrorMessage("Text/Image Required!");
      return;
    }

    if (text.replace(/\s/g, "").length == 0 && !imgKitImgUrl) {
      setShowError(true);
      seterrorMessage("Text/Image Required!");
      return;
    }
    setShowError(false);
    seterrorMessage("");

    // console.log(formData);

    // Call a function to send data to the backend API
    sendDataToBackend({ text: text, thumbnail: imgKitImgUrl });
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      // console.log(responseData);
      setThumbnail(null);
      setText("");
      if (!response.ok) {
        console.log("Response from backend:", responseData.message);
        seterrorMessage(responseData.message);
        return;
      }

      SetAllPosts((prevPosts) => [responseData, ...prevPosts]);

      // Handle the successful response (if needed)

      // console.log("Response from backend:", responseData.message);

      // Hide signup form
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
    }
  };

  const validateFileFunction = (file) => {
    console.log("validating");
    if (file.size < 5000000) {
      // Less than 1mb
      console.log("less than 5mb");
      return true;
    }
    console.log("more than 5mb");
    alert("Images must be less than 5mb");
    return false;
  };

  const onUploadProgress = (progress) => {
    const percentage = ((progress.loaded / progress.total) * 100).toFixed(0);
    setUploadProgress(percentage);
    // console.log("Progress", progress);
  };

  const onUploadStart = (state) => {
    setSendDisabled(true);
  };
  const onSuccess = (res) => {
    setImgKitImgUrl(res.filePath);
    setSendDisabled(false);
    // console.log("Success", res.filePath);
  };

  return (
    <div className="bg-white p-4 my-4 rounded-md shadow-md container">
      <div className="flex">
        {authState.user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={authState.user.profilePicture} alt="Profile picture" className="rounded-full h-10 w-10 mr-2" /> : <IoPersonSharp className="rounded-full h-10 w-10 mr-2" />}

        <textarea ref={inputRef} maxLength="200" placeholder={`What's on your mind ${authState.user.firstName}?`} value={text} onChange={handleTextChange} className="bg-gray-300 text-black placeholder:text-black rounded-md flex-1 min-h-[90px] px-3 py-2 border  resize-none focus:outline-none" />
      </div>

      {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail Preview" className="my-2 rounded-md mx-auto shadow-md max-h-40" />}

      <div className={`grid grid-cols-3   ml-12 justify-between content-between items-center ${errorMessage && "grid-rows-2 md:grid-rows-1"}`}>
        <label className="col-start-1 col-end-3 md:col-end-2 row-start-1 row-end-2 my-2  flex items-center space-x-2">
          <span className="bg-blue-600 text-white text-md px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">Choose Image</span>

          <IKContext publicKey="public_D3R2YXCqESRUwCNMgLufGCsa8GY=" urlEndpoint="https://ik.imagekit.io/odinbook" authenticator={Authenticator}>
            <IKUpload onChange={handleThumbnailChange} onUploadStart={onUploadStart} id="imageInput" style={{ display: "none" }} accept="image/*" onUploadProgress={onUploadProgress} validateFile={validateFileFunction} fileName="post.png" onSuccess={onSuccess} />
          </IKContext>
        </label>
        {errorMessage && <p className=" col-start-1 md:col-start-2 md:col-end-3 col-end-4 text-center md:row-start-1 md:row-end-2 row-start-2 row-end-3 text-red-500 font-bold errorMessage">{errorMessage}</p>}
        {/* {showError && <p className="absolute text-red-400 font-semibold top-3 w-[165px]  right-24">Text/Image Required!</p>} */}

        <div className=" ml-auto col-start-3 col-end-4 row-start-1 row-end-2 relative  w-24  md:w-40  h-[40px]     ">
          <button onClick={handlePostSubmit} disabled={sendDisabled === true} type="submit" className={`  absolute left-0 top-0 flex justify-center items-center   focus:outline-none z-20    text-white hover:text-gray-200 w-24  md:w-40 text-md  h-[40px] rounded-lg ${sendDisabled ? "bg-transparent" : "bg-blue-600"}`}>
            Post
          </button>
          <div className={`flex justify-center items-center rounded-lg   z-10  w-24  md:w-40   absolute left-0 top-0 ${!sendDisabled && "hidden"} `}>
            <div style={{ width: `${uploadProgress}%` }} className="bg-blue-600 flex-none h-[40px]  text-xl rounded-l-lg"></div>
            <div style={{ width: `${100 - uploadProgress}%` }} className="bg-gray-400 flex-none h-[40px] text-right flex items-center justify-end text-xl  pr-2 rounded-r-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;

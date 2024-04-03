import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";
import { IKContext, IKUpload } from "imagekitio-react";
import Authenticator from "../ImageKit/Authenticator";

export const ProfilePicUploadButton = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/updateProfilePic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        console.log(responseData);
        alert(responseData.message);
        return;
      }

      // console.log("Response from backend:", responseData.message);
      dispatch(authActions.updateProfilePic(responseData.profilePicture));

      return;
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      console.log("Error sending data to backend: " + err.message);
    }
  };

  const handleClick = (e) => {
    // Trigger the file input
    e.stopPropagation();
    document.getElementById("fileInput1").click();
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

  const onSuccess = (res) => {
    sendDataToBackend({ thumbnail: res.filePath });
    // setSendDisabled(false);
    console.log("Success", res.filePath);
  };

  return (
    <div>
      <CiEdit className="w-10 h-10" onClick={handleClick} />
      {/* <input type="file" id="fileInput1" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" /> */}

      <IKContext publicKey="public_D3R2YXCqESRUwCNMgLufGCsa8GY=" urlEndpoint="https://ik.imagekit.io/odinbook" authenticator={Authenticator}>
        <IKUpload id="fileInput1" style={{ display: "none" }} accept="image/*" validateFile={validateFileFunction} fileName="profilePic.png" onSuccess={onSuccess} />
      </IKContext>
    </div>
  );
};

export const CoverUploadButton = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/updateCoverPic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      // console.log(responseData);
      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        console.log(responseData);
        alert(responseData.message);
        return;
      }

      dispatch(authActions.updateCoverPic(responseData.coverPicture));

      return;
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      console.log("Error sending data to backend: " + err.message);
    }
  };

  const handleClick = () => {
    // Trigger the file input
    document.getElementById("fileInput2").click();
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

  const onSuccess = (res) => {
    sendDataToBackend({ cover: res.filePath });
    // setSendDisabled(false);
    console.log("Success", res.filePath);
  };

  return (
    <div>
      <CiEdit className="w-10 h-10" onClick={handleClick} />
      {/* <input type="file" id="fileInput2" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" /> */}

      <IKContext publicKey="public_D3R2YXCqESRUwCNMgLufGCsa8GY=" urlEndpoint="https://ik.imagekit.io/odinbook" authenticator={Authenticator}>
        <IKUpload id="fileInput2" style={{ display: "none" }} accept="image/*" validateFile={validateFileFunction} fileName="coverPic.png" onSuccess={onSuccess} />
      </IKContext>
    </div>
  );
};

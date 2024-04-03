import React, { useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";
import { MdCancel } from "react-icons/md";

export const NameUpdateForm = ({ SetShowEditName }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        console.log(responseData.message);
        return;
      }

      if (response.ok) {
        dispatch(authActions.update(responseData));
        SetShowEditName(false);
        return;
      }
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      //setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleClick = (e) => {
    // Trigger the file input
    e.stopPropagation();
    document.getElementById("fileInput1").click();
  };

  const [formData, setFormData] = useState({
    firstName: authState.user.firstName,
    lastName: authState.user.lastName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleNameUpdateSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  return (
    <form className="flex flex-col md:flex-row justify-center items-center gap-3 mb-4">
      <input type="text" maxLength="10" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required className="   bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 leading-8 transition-colors duration-200 ease-in-out pl-3 " />
      <input type="text" maxLength="10" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" required className="   bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 leading-8 transition-colors duration-200 ease-in-out  pl-3 " />

      <div className="flex gap-4  ">
        <BiSolidSave onClick={handleNameUpdateSubmit} className="cursor-pointer h-10 w-10 text-blue-500" />
        <MdCancel className="h-10 w-10 text-blue-500 cursor-pointer" onClick={() => SetShowEditName(false)} />
      </div>
    </form>
  );
};

export const BioUpdateForm = ({ SetShowEditBio }) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        console.log(responseData.message);
        return;
      }
      // console.log(responseData);
      SetShowEditBio(false);
      dispatch(authActions.update(responseData));
      return;
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      //setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const [bio, setBio] = useState(authState.user.bio);

  const handleNameUpdateSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend({ bio });
  };

  return (
    <form className=" w-full flex flex-col md:flex-row justify-center items-center gap-3 mb-4">
      <textarea maxLength="200" type="text" name="Bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" required className="w-full md:w-2/3  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none  text-gray-700 leading-8 transition-colors duration-200 ease-in-out pl-3 " />

      <div className="flex">
        <BiSolidSave onClick={handleNameUpdateSubmit} className="cursor-pointer h-10 w-10 text-blue-500" />
        <MdCancel className="h-10 w-10 text-blue-500 cursor-pointer" onClick={() => SetShowEditBio(false)} />
      </div>
    </form>
  );
};

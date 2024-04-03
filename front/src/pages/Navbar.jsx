import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

import { MdHome } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IKImage } from "imagekitio-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users);
  const navigateTo = useNavigate();

  const Logout = async () => {
    try {
      const response = await fetch(authState.backendURL + "/signout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.logout === true) {
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("followed_posts");
        dispatch(authActions.logout());
        navigateTo("/");
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="pt-1 md:pt-0 bg-white h-max   w-full shadow grid   items-center content-between   grid-cols-2  grid-rows-2  gap-0 md:grid-rows-1 md:grid-cols-4 fixed top-0 left-0 z-50 border-b">
      {/* LEFT NAV */}
      <NavLink to="/" className="no-underline col-start-1 col-end-2 row-start-1 row-end-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex items-center justify-between w-full md:w-max px-4   min-w-[200px]">
        <p className="mr-2 hidden md:flex no-underline text-white bg-blue-500 p-3 circle rounded-full w-[20px] h-[20px]  justify-center items-center text-2xl font-bold">O</p>
        <p className="inline-block md:hidden  no-underline text-blue-500 text-2xl font-bold">OdinBook</p>
      </NavLink>

      {/* END LEFT NAV */}

      {/* MAIN NAV */}
      <ul className="main-nav  bg-gray-200 md:bg-white m-0 col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-2 flex w-full lg:w-max items-center justify-center list-none md:mx-auto">
        <li className="w-1/5 md:w-max text-center  ">
          <NavLink to="/" className=" text-xl py-2 px-3 xl:px-12 cursor-pointer    text-gray-600 relative border-solid border-x-0 border-b-4 border-t-0 border-transparent hover:bg-gray-100  hover:text-blue-500 hover:border-blue-500 flex items-center justify-center ">
            <MdHome />
          </NavLink>
        </li>

        <li className="w-1/5 md:w-max text-center">
          <NavLink to="/allpeople" className="text-xl py-2 px-3 xl:px-12 cursor-pointer    text-gray-600 relative border-solid border-x-0 border-b-4 border-t-0 border-transparent hover:bg-gray-100  hover:text-blue-500 hover:border-blue-500 flex items-center justify-center ">
            <FaUserGroup />
            {usersState.rcvdFrndRequest.length > 0 && <span className="text-xs absolute top-0 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">{usersState.rcvdFrndRequest.length}+</span>}
          </NavLink>
        </li>
        <li className="w-1/5 md:w-max text-center">
          <NavLink to="/messenger" className="text-xl py-2 px-3 xl:px-12 cursor-pointer    text-gray-600 relative border-solid border-x-0 border-b-4 border-t-0 border-transparent hover:bg-gray-100  hover:text-blue-500 hover:border-blue-500 flex items-center justify-center  ">
            <FaFacebookMessenger />
          </NavLink>
        </li>
      </ul>
      {/* END MAIN NAV */}

      {/* RIGHT NAV */}
      <ul className="  m-0 col-start-2 col-end-3 row-start-1 row-end-2  md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2  flex mx-4 items-center    justify-end">
        <NavLink to={`/user/${authState.user.username}`} className="text-black">
          <li className="h-full  flex">
            <div className="text-xl flex items-center justify-center  bg-gray-200 rounded-full mx-1 p-1 cursor-pointer hover:bg-gray-300 relative">{authState.user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={authState.user.profilePicture} alt="Thumbnail Preview" className="max-w-full cursor-pointer max-h-[500px] mx-auto   w-9 h-9 rounded-full  " /> : <IoPersonSharp className="w-9 h-9 rounded-full" />}</div>
          </li>
        </NavLink>

        <li className="h-full flex cursor-pointer" onClick={Logout}>
          <div className="text-xl flex items-center justify-center  bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
            <IoMdLogOut />
          </div>
        </li>

        {/* <li className="h-full flex">
          <div className="text-xl grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
            <FaRegBell />
            <span className="text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center">9</span>
          </div>
        </li> */}
        <NavLink to="/settings" className="text-black">
          <li className="h-full flex">
            <div className="text-xl grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
              <FaCog />
            </div>
          </li>
        </NavLink>
      </ul>
      {/* END RIGHT NAV */}
    </nav>
  );
};

export default Navbar;

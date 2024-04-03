import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userReducer";

import UserList from "./Components/UserList";
import Navbar from "./Navbar";
import Footer from "./Footer";

function People_All() {
  const usersState = useSelector((state) => state.users);
  const [activeList, setActiveList] = useState("pending");

  return (
    <div>
      <Navbar />

      <div className="container max-w-[95vw] mx-auto mt-[120px] md:mt-20 ">
        <div className="people   flex flex-wrap justify-center items-center gap-4">
          <p className={`${activeList === "pending" ? "bg-green-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white" : "bg-blue-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white"}`} onClick={() => setActiveList("pending")}>
            Received Friend Request
          </p>

          <p className={`${activeList === "friends" ? "bg-green-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white" : "bg-blue-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white"}`} onClick={() => setActiveList("friends")}>
            Friends
          </p>

          <p className={`${activeList === "sent-fr" ? "bg-green-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white" : "bg-blue-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white"}`} onClick={() => setActiveList("sent-fr")}>
            Sent Friend Request
          </p>

          <p className={`${activeList === "follow" ? "bg-green-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white" : "bg-blue-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white"}`} onClick={() => setActiveList("follow")}>
            People You Follow
          </p>

          <p className={`${activeList === "other" ? "bg-green-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white" : "bg-blue-500 cursor-pointer py-1 px-2 md:p-3 mx-2 rounded text-white"}`} onClick={() => setActiveList("other")}>
            People You may Know
          </p>
        </div>

        {activeList === "pending" && <UserList users={usersState.rcvdFrndRequest} listType={"acceptfriend"} />}

        {activeList === "friends" && <UserList users={usersState.myFriends} listType={"deletefriend"} />}

        {activeList === "sent-fr" && <UserList users={usersState.sentFrndRequest} listType={"deletefriendrequest"} />}

        {activeList === "follow" && <UserList users={usersState.followingPeople} listType={"unfollow"} />}

        {activeList === "other" && <UserList users={usersState.ohterPeople} listType={"others"} />}
      </div>

      <Footer />
    </div>
  );
}

export default People_All;

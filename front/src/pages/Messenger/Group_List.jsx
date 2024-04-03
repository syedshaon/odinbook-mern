import { messengerActions } from "../../store/messenger_reducer";
const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";

import { NavLink } from "react-router-dom";
import Loading from "../Loading";
// Get visitor's timezone offset in minutes
const visitorTimezoneOffset = new Date().getTimezoneOffset();

function Group_List() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);
  const authState = useSelector((state) => state.auth);
  const allGroupConversations = useSelector((state) => state.messenger.allGroupConversations);

  // console.log(allGroupConversations);
  // console.log(allUsers);

  return (
    <div>
      {allGroupConversations &&
        allGroupConversations.map((conversation) => (
          <div onClick={() => dispatch(messengerActions.setActiveGroup(conversation))} key={conversation._id} className="mx-2  bg-gray-300 cursor-pointer rounded-md mb-5 flex-col items-center  ">
            <h3 className="text-center text-md font-bold">{conversation.groupName}</h3>
            <div className="overflow-hidden   flex justify-center">
              {conversation.participants.map((participantId) => {
                const participant = allUsers.find((user) => user._id === participantId);
                if (participant) {
                  return (
                    <div className="w-12 h-12 relative flex flex-shrink-0" key={participant._id}>
                      {participant.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={participant.profilePicture} className=" shadow-md rounded-full w-full h-full object-cover " alt={`Profile of ${participant.username}`} /> : <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Group_List;

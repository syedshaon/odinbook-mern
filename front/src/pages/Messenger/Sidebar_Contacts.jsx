import { messengerActions } from "../../store/messenger_reducer";
const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";

function Sidebar_Contacts() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.availAbleUsers);
  const authState = useSelector((state) => state.auth);
  const Messenger = useSelector((state) => state.messenger);
  const sortedUsers = useSelector((state) => state.messenger.sortedUsers);

  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll mb-32">
      {allUsers &&
        Messenger.allConversations &&
        sortedUsers.map((user) => {
          return (
            <div onClick={() => dispatch(messengerActions.setActiveReciepient(user))} key={user._id} className=" cursor-pointer flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative">
              <div className="w-16 h-16 relative flex flex-shrink-0">
                {user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={user.profilePicture} className=" shadow-md rounded-full w-full h-full object-cover " alt={`Profile of ${user.username}`} /> : <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />}

                <div className="absolute bg-gray-200 p-1 rounded-full bottom-0 right-0">{Messenger.activeUsers.includes(user._id) ? <div className="bg-green-500 rounded-full w-3 h-3" /> : <div className="bg-gray-500 rounded-full w-3 h-3" />}</div>
              </div>
              <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className="font-bold text-sm">{`${user.firstName} ${user.lastName}`}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Sidebar_Contacts;

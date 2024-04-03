import { useDispatch, useSelector } from "react-redux";
import { IKImage } from "imagekitio-react";
import React, { useRef, useState, useEffect } from "react";
const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };

import PopupImg from "../Components/PopupImg";
import { authActions } from "../../store/authReducer";
import { IoPersonSharp } from "react-icons/io5";

function Conversations_Ppl() {
  const authState = useSelector((state) => state.auth);
  const activeReciepient = useSelector((state) => state.messenger.activeReciepient);
  const currentUserId = useSelector((state) => state.auth.user.id);
  const activeConversation = useSelector((state) => state.messenger.activeConversation);
  const dispatch = useDispatch();

  const messagesContainerRef = useRef();
  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Add event listener for orientation changes
    const handleOrientationChange = () => {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [activeConversation]);
  return (
    <div ref={messagesContainerRef} className=" max-h-[60vh] chat-body p-4 flex-1 overflow-y-scroll">
      {activeConversation &&
        activeConversation.messages.map((message, index) => {
          const lastMessage = activeConversation.messages.length - 1 === index;

          if (message.sender === currentUserId) {
            return (
              <div key={message._id} className="flex flex-row justify-end  mb-3">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                  <div className="flex items-stretch flex-row-reverse group">
                    {message.type === "text" ? (
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">{message.content}</p>
                    ) : (
                      <>
                        <IKImage onClick={() => dispatch(authActions.showPopup(message.content))} className="max-h-[300px] cursor-pointer max-w-[60%]  md:max-w-[70%]" urlEndpoint="https://ik.imagekit.io/odinbook" path={message.content} />
                        <PopupImg />
                      </>
                    )}
                    <p className="p-4   text-center text-xs text-gray-500"> {new Date(message.timestamp).toLocaleDateString("en-US", options)}</p>
                  </div>
                </div>
              </div>
            );
          } else {
            // setShowImage(false);
            return (
              <div key={message._id} className="flex flex-row justify-start mb-3">
                <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">{activeReciepient.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={activeReciepient.profilePicture} className="border border-gray-500 shadow-md rounded-full w-full h-full object-cover" alt={`Profile of ${activeReciepient.username}`} /> : <IoPersonSharp className="border border-gray-500 shadow-md rounded-full w-full h-full object-cover" />}</div>
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                  <div className="flex items-stretch  group">
                    {message.type === "text" ? (
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">{message.content}</p>
                    ) : (
                      <>
                        <IKImage onClick={() => dispatch(authActions.showPopup(message.content))} className="max-h-[300px] cursor-pointer max-w-[60%]  md:max-w-[70%]" urlEndpoint="https://ik.imagekit.io/odinbook" path={message.content} />
                        <PopupImg />
                      </>
                    )}

                    <p className="px-4 pt-6 text-center  text-xs text-gray-500"> {new Date(message.timestamp).toLocaleDateString("en-US", options)}</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default Conversations_Ppl;

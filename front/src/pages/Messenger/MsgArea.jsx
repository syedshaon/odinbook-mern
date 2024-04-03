// Show all messages between users
// CREATE NEW MESSAGE

import { useDispatch, useSelector } from "react-redux";
import { IKContext, IKUpload } from "imagekitio-react";

import { GrGallery } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import RecieverHeading from "./RecieverHeading";
import Conversations from "./Conversations";
import { messengerActions } from "../../store/messenger_reducer";
import Authenticator from "../ImageKit/Authenticator";
function MsgArea({ setShowContact }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [textDisabled, setTextDisabled] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgKitImgUrl, setImgKitImgUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  // const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messengerState = useSelector((state) => state.messenger);
  const contactView = useSelector((state) => state.messenger.contactView);

  // const socket = io("http://localhost:3000", { withCredentials: true, query: { id: authState.user.id } });

  useEffect(() => {
    const newSocket = io(authState.backSiteURL, { withCredentials: true, query: { sender: authState.user.id, token: authState.token } });
    setSocket(newSocket);
    // Connect to Socket.IO server
    newSocket.connect();

    const receiveMessageHandler = (message) => {
      // console.log(message);
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(messengerActions.updateAllConversations(message));
    };
    const receiveGroupMessageHandler = (message) => {
      // console.log(message);
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(messengerActions.updateGroupConversations(message));
    };
    const receiveActiveUsersHandler = (message) => {
      // console.log(message.userIdsArray);
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(messengerActions.setActiveUsers(message.userIdsArray));
    };

    // Listen for incoming messages
    newSocket.on("receiveMessage", receiveMessageHandler);
    newSocket.on("receiveGroupMessage", receiveGroupMessageHandler);
    newSocket.on("activeUsers", receiveActiveUsersHandler);

    // Clean up socket connection and event listener on unmount
    return () => {
      newSocket.disconnect();
      newSocket.off("receiveMessage", receiveMessageHandler);
      newSocket.off("receiveGroupMessage", receiveGroupMessageHandler);
    };
  }, [authState]); // Empty dependency array ensures the effect runs only once on mount

  const sendMessage = (e) => {
    // console.log("sendMessage called"); // Add this line
    if (imgUrl) {
      setErrorMessage("");
      if (contactView === true) {
        socket.emit("image", { text: imgKitImgUrl, recievers: [messengerState.activeReciepient._id], conId: messengerState.activeConversation ? messengerState.activeConversation._id : null });
      } else {
        socket.emit("groupImage", { text: imgKitImgUrl, recievers: messengerState.activeGroupReciepient, conId: messengerState.activeGroupConversation._id });
      }
    } else {
      if (messageInput.replace(/\s/g, "").length == 0) {
        setErrorMessage("Text/Image Required!");
        return;
      }
      setErrorMessage("");
      if (contactView === true) {
        // Emit a message to the server
        socket.emit("sendMessage", { text: messageInput, recievers: [messengerState.activeReciepient._id], conId: messengerState.activeConversation ? messengerState.activeConversation._id : null });
      } else {
        socket.emit("groupMessage", { text: messageInput, recievers: messengerState.activeGroupReciepient, conId: messengerState.activeGroupConversation._id });
      }
    }

    setTextDisabled(false);
    setMessageInput("");
    setImgUrl(null);
  };
  const handleKeyDown = (e) => {
    // console.log("Key pressed: ", e.key); // Add this line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      sendMessage(); // Send the message

      // Clear the input field (you may need to call setMessageInput("") here)
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      // Add a new line to the input area
      setMessageInput((prevValue) => prevValue + "\n");
    }
  };

  const handleFileChange = async (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setTextDisabled(true);
  };

  const handleIconClick = (e) => {
    // Trigger the file input
    e.stopPropagation();
    document.getElementById("imageInput").click();
  };

  const validateFileFunction = (file) => {
    console.log("validating");
    if (file.size < 5000000) {
      // Less than 1mb
      // console.log("less than 5mb");
      setSendDisabled(false);
      return true;
    }
    // console.log("more than 5mb");
    alert("Images must be less than 5mb");
    setSendDisabled(true);
    return false;
  };

  const onUploadStart = (state) => {
    setTextDisabled(true);
    setSendDisabled(true);
  };
  const onUploadProgress = (progress) => {
    const percentage = ((progress.loaded / progress.total) * 100).toFixed(0);
    setUploadProgress(percentage);
    // console.log("Progress", progress);
  };

  const onError = (err) => {
    // setShowError(true);
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    setImgKitImgUrl(res.filePath);
    setSendDisabled(false);
    console.log("Success", res.filePath);
  };

  return (
    <section className="msgArea mt-[96px] md:mt-14   flex   w-full relative   flex-col flex-auto justify-between md:border-l md:border-gray-800">
      <>
        <RecieverHeading setShowContact={setShowContact} />
        <Conversations />
      </>

      <div className="chat-footer w-full   flex-none">
        {errorMessage && <p className="text-center font-bold text-orange-600">{errorMessage}</p>}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-row   px-4 pt-0 pb-5 justify-center items-center">
          <GrGallery className="mx-2 cursor-pointer text-blue-600 hover:text-blue-700 w-6 h-6 " onClick={handleIconClick} />
          {/* <input type="file" id="imageInput" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" /> */}
          <IKContext publicKey="public_D3R2YXCqESRUwCNMgLufGCsa8GY=" urlEndpoint="https://ik.imagekit.io/odinbook" authenticator={Authenticator}>
            <IKUpload onUploadStart={onUploadStart} onChange={handleFileChange} id="imageInput" style={{ display: "none" }} accept="image/*" validateFile={validateFileFunction} onUploadProgress={onUploadProgress} fileName="msg.png" onError={onError} onSuccess={onSuccess} />
          </IKContext>

          {imgUrl && <div className={`w-20 hidden md:block h-16 bg-contain mr-6 bg-no-repeat  ${!imgUrl && "hidden"}`} style={{ backgroundImage: `url(${imgUrl})` }}></div>}

          <textarea disabled={textDisabled === true} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={handleKeyDown} className="    resize-none     rounded-lg py-3 pl-5 pr-10 w-full border border-gray-300 focus:border-gray-400   focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in" type="text" placeholder="Aa" />
          <div onClick={sendMessage} className="relative  w-20 md:w-24 h-10 mr-4 ml-2  md:mx-4">
            <button disabled={sendDisabled === true} className={`  absolute left-0 top-0 flex justify-center items-center   focus:outline-none z-20    text-white hover:text-gray-200 w-20 md:w-24   h-10     rounded-lg ${sendDisabled ? "bg-transparent" : "bg-blue-600"}`}>
              <BsFillSendFill className="text-xl " />
            </button>
            <div className={`flex justify-center items-center    z-10  w-20 md:w-24   absolute left-0 top-0 ${!sendDisabled && "hidden"} `}>
              <div style={{ width: `${uploadProgress}%` }} className="bg-blue-600 flex-none h-10  text-xl rounded-l-lg"></div>
              <div style={{ width: `${100 - uploadProgress}%` }} className="bg-gray-400 flex-none h-10  text-right flex items-center justify-end text-xl  pr-2 rounded-r-lg"></div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
export default MsgArea;

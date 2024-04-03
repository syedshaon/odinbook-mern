import Navbar from "./Navbar";

import Sidebar from "./Messenger/Sidebar";
import MsgArea from "./Messenger/MsgArea";
import { messengerActions } from "../store/messenger_reducer";

import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function Messenger() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const [showContacts, setShowContact] = useState(true);

  const fetchMessages = async () => {
    // console.log("fetch messages");
    try {
      const response = await fetch(authState.backSiteURL + "msg/getAllConversations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const responseData = await response.json();

      // console.log(responseData);
      if (!response.ok) {
        console.log(responseData);
        // setShowError(true);
        // Handle error if needed
        return;
      }
      if (response.ok) {
        dispatch(messengerActions.setAllConversations(responseData.conversations));
        // console.log(responseData.conversations);
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };
  useEffect(() => {
    fetchMessages();
    const handleResize = () => {
      // Update showContact based on window width
      if (window.innerWidth > 767 && window.innerHeight > 767) {
        setShowContact(true);
      } else {
        setShowContact(false);
      }
    };

    // Initial check on component mount
    handleResize();

    // It causes issues when screen size changes on mobile devices
    // // Add event listener for window resize
    // window.addEventListener("resize", handleResize);

    // // Cleanup event listener on component unmount
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return (
    <>
      <Navbar />

      <div className="h-screen w-full flex antialiased text-black   overflow-hidden">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow   flex flex-row min-h-0">
            {showContacts && <Sidebar />}
            <MsgArea setShowContact={setShowContact} />
          </main>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Messenger;

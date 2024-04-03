import People_Groups_Add from "./Sidebar_Groups_Add";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { messengerActions } from "../../store/messenger_reducer";
import Group_List from "./Group_List";

function Sidebar_Groups() {
  const dispatch = useDispatch();
  const [showAddPop, setShowAddPop] = useState(false);
  const authState = useSelector((state) => state.auth);

  const fetchGroupMessages = async () => {
    try {
      const response = await fetch(authState.backSiteURL + "msg/getGroupConversations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // setShowError(true);
        // Handle error if needed
        return;
      }
      if (response.ok) {
        dispatch(messengerActions.setAllGroupConversations(responseData.conversations));
        // console.log(responseData.conversations);
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };
  useEffect(() => {
    fetchGroupMessages();
  }, []);

  return (
    <div className="grow bg-gray-200 relative">
      <Group_List />
      {showAddPop && <People_Groups_Add setShowAddPop={setShowAddPop} />}
      <div onClick={() => setShowAddPop((prev) => !prev)} className="absolute text-white py-3 text-center cursor-pointer  bottom-36 rounded md:bottom-20 w-full bg-gray-900">
        {showAddPop ? "Close Popup" : "Add Group"}
      </div>
    </div>
  );
}

export default Sidebar_Groups;

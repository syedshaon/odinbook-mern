const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { messengerActions } from "../../store/messenger_reducer";
import { IKImage } from "imagekitio-react";

function Sidebar_Groups_Add({ setShowAddPop }) {
  const authState = useSelector((state) => state.auth);

  const sortedUsers = useSelector((state) => state.messenger.sortedUsers);

  const dispatch = useDispatch();

  const [selectedPeople, setSelectedPeople] = useState([authState.user.id]);
  const [groupName, setGroupName] = useState("");
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(authState.backSiteURL + "msg/group/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ participants: selectedPeople, groupName: groupName }),
      });
      // console.log(response);
      if (!response.ok) {
        const responseData = await response.json();
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        return;
      }

      // Handle the successful response (if needed)
      const responseData = await response.json();
      // console.log("Response from backend:", responseData);

      dispatch(messengerActions.addGroupConversations(responseData.conversation));

      setShowAddPop(false);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      //   setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handlePeopleSelection = (personId) => {
    // Check if the person is already selected
    const isSelected = selectedPeople.includes(personId);

    // If selected, remove from the list; otherwise, add to the list
    setSelectedPeople((prevSelectedPeople) => (isSelected ? prevSelectedPeople.filter((selectedPersonId) => selectedPersonId !== personId) : [...prevSelectedPeople, personId]));
  };

  const handleGroupNameAdd = (e) => {
    e.stopPropagation();
    setGroupName(e.target.value);
  };
  return (
    <>
      <div onClick={() => setShowAddPop(false)} className=" mt-5 w-screen h-screen   flex justify-center items-center z-10 fixed top-0 left-0 "></div>

      <div className="fixed  md:bottom-[25%] z-20 shadow-lg rounded-lg w-full border-2 border-gray-400 h-full     max-h-[400px] md:w-4/5 md:left-[10%]   lg:w-1/2 lg:left-[25%]  bg-white">
        <h2 className="text-center mt-5 text-2xl text-black">Create a Group</h2>
        <form className="  mt-8 w-full max-w-[95%] mx-auto flex flex-col items-center" onSubmit={handleCreateGroup}>
          <input value={groupName} onChange={handleGroupNameAdd} maxLength="15" className="w-1/2 mb-4  bg-white rounded border border-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Group Name" required type="text" />
          <p className="text-md font-bold">Select People</p>

          <div className=" max-w-full contacts p-2 flex flex-1 overflow-x-scroll ">
            {sortedUsers &&
              sortedUsers.map((user) => {
                return (
                  <div onClick={() => handlePeopleSelection(user._id)} key={user._id} className="  border-2 border-gray-500 mr-5  cursor-pointer flex justify-between items-center p-3 hover:bg-gray-300 rounded-lg relative">
                    <span className=" absolute top-0 right-0   text-2xl text-blue-500" style={{ cursor: "pointer" }}>
                      {selectedPeople.some((id) => id === user._id) && <IoCheckmarkDoneSharp />}
                    </span>

                    <div className="w-16 h-16 relative flex flex-shrink-0">{user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={user.profilePicture} className=" shadow-md rounded-full w-full h-full object-cover " alt={`Profile of ${user.username}`} /> : <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />}</div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 block group-hover:block">
                      <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <button disabled={selectedPeople.length === 1} className="w-1/2 mx-auto mt-4 cursor-pointer text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-md bg-blue-600" type="submit">
            Save
          </button>
        </form>
        <IoCloseCircleOutline
          onClick={(e) => {
            setShowAddPop(false);
          }}
          className="cursor-pointer text-3xl hover:text-blue-700   text-blue-500 absolute top-3 right-3"
        />
      </div>
    </>
  );
}

export default Sidebar_Groups_Add;

//
// Used in People_All.jsx to create list of people of different categories
//
const startsWithUploads = /^uploads/;
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userReducer";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Loading from "../Loading";
import { IKImage } from "imagekitio-react";

const UserList = ({ users, listType }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleAddFriend = async (personToFriend) => {
    try {
      const response = await fetch(authState.backendURL + "/sendFriendRequest/" + personToFriend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleSendFriendRqst({ personToFriend: personToFriend }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const cancelFriendRequest = async (cancelFrndRqstId) => {
    try {
      const response = await fetch(authState.backendURL + "/cancelFriendRequest/" + cancelFrndRqstId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleCancelFriendRequest({ cancelFrndRqstId: cancelFrndRqstId }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const acceptFriendRequest = async (acceptFrndRqstId) => {
    try {
      const response = await fetch(authState.backendURL + "/acceptFriendRequest/" + acceptFrndRqstId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleAcceptFriendRequest({ acceptFrndRqstId: acceptFrndRqstId }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const rejectFriendRequest = async (rejectFrndRqstId) => {
    try {
      const response = await fetch(authState.backendURL + "/rejectFriendRequest/" + rejectFrndRqstId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleRejectFriendRequest({ rejectFrndRqstId: rejectFrndRqstId }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const deleteFriend = async (deleteFrndRqstId) => {
    try {
      const response = await fetch(authState.backendURL + "/deleteFriend/" + deleteFrndRqstId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleDeleteFriend({ deleteFrndRqstId: deleteFrndRqstId }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleFollow = async (personToFollowID) => {
    try {
      const response = await fetch(authState.backendURL + "/follow/" + personToFollowID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      dispatch(userActions.handleFollow({ personToFollowID: personToFollowID }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleUnFollow = async (personToUnfollowID) => {
    try {
      const response = await fetch(authState.backendURL + "/unfollow/" + personToUnfollowID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      // setRefresh((prev) => prev + 1);
      dispatch(userActions.handleUnFollow({ personToUnfollowID: personToUnfollowID }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <div className="min-h-[80vh] mt-5">
      {!users && <Loading />}
      {users.length > 0 && (
        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user._id} className="   bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <NavLink to={`../user/${user.username}`}>{user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={user.profilePicture} className="  w-40 h-40 object-cover rounded-full mb-4 " alt={`Profile of ${user.username}`} /> : <IoPersonSharp className="w-40   h-40 rounded-full" />}</NavLink>
              <NavLink to={`../user/${user.username}`}>
                <h2 className="text-md text-blue-500 font-bold mb-2">{`${user.firstName} ${user.lastName}`}</h2>
              </NavLink>
              {listType === "acceptfriend" && (
                <div className="flex">
                  <div onClick={() => acceptFriendRequest(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-blue-500">Accept Request</p>
                  </div>

                  <div onClick={() => rejectFriendRequest(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-red-500">Reject</p>
                  </div>
                </div>
              )}
              {listType === "deletefriend" && (
                <div className="flex">
                  <div onClick={() => deleteFriend(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-blue-500">Unfriend</p>
                  </div>
                </div>
              )}
              {listType === "deletefriendrequest" && (
                <div onClick={() => cancelFriendRequest(user._id)} className="flex">
                  <div className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-green-500">Cancel Request</p>
                  </div>
                </div>
              )}
              {listType === "unfollow" && (
                <div className="flex">
                  <div onClick={() => handleUnFollow(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-red-500">Unfollow</p>
                  </div>
                </div>
              )}
              {listType === "others" && (
                <div className="flex">
                  <div onClick={() => handleFollow(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-blue-500">Follow</p>
                    <p className="py-1 px-3 bg-blue-400">{user.followers.length}</p>
                  </div>

                  <div onClick={() => handleAddFriend(user._id)} className=" flex  cursor-pointer ml-5 text-white text-sm ">
                    <p className="py-1 px-3 rounded-sm bg-green-500">Add Friend</p>
                    <p className="py-1 px-3 bg-green-400">{user.friends.length} </p>
                  </div>
                </div>
              )}

              {/* <div className="flex">
              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-blue-500">Follow</p>
                <p className="py-1 px-3 bg-blue-400">{user.followers.length}</p>
              </div>

              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-green-500">Add Friend</p>
                <p className="py-1 px-3 bg-green-400">{user.friends.length} </p>
              </div>
            </div> */}
            </div>
          ))}
        </div>
      )}
      {users.length == 0 && (
        <div className="flex flex-col justify-center items-center min-h-[80vh]  w-full">
          <MdOutlinePersonSearch className="text-red-500 bold text-7xl" />
          <h3 className="text-blue-500 bold text-xl">No One here!</h3>
        </div>
      )}
    </div>
  );
};

export default UserList;

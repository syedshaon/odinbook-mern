//
// Conditionally show and initiates friend, unfriend, cancel friend,
//  follow, unfollow USED IN SINGLE PROFILE PAGE (People_Single.jsx)
//
//

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userReducer";

function FollowFriend({ fndNumber, setFrndNumber, flwNumber, setFlwNumber, personToFollow, setRefresh, showPendingfriend, showUnfriend, showUnfollow, showAcceptFriend, setAccedptFriend }) {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showFollowers, setShowFollowers] = useState(false);

  useEffect(() => {
    if (personToFollow === authState.user.id) {
      setShowFollowers(true);
    }
  }, []);

  const handleAddFriend = async () => {
    try {
      const response = await fetch(authState.backendURL + "/sendFriendRequest/" + personToFollow, {
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

      dispatch(userActions.handleSendFriendRqst({ personToFriend: personToFollow }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(authState.backendURL + "/follow/" + personToFollow, {
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

      setFlwNumber((prev) => prev + 1);
      dispatch(userActions.handleFollow({ personToFollowID: personToFollow }));

      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleUnFollow = async () => {
    try {
      const response = await fetch(authState.backendURL + "/unfollow/" + personToFollow, {
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

      setFlwNumber((prev) => prev - 1);
      dispatch(userActions.handleUnFollow({ personToUnfollowID: personToFollow }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleDeleteFriend = async () => {
    try {
      const response = await fetch(authState.backendURL + "/deleteFriend/" + personToFollow, {
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

      setFrndNumber((prev) => prev - 1);
      dispatch(userActions.handleDeleteFriend({ deleteFrndRqstId: personToFollow }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      const response = await fetch(authState.backendURL + "/acceptFriendRequest/" + personToFollow, {
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

      setFrndNumber((prev) => prev + 1);
      setAccedptFriend((prev) => !prev);
      dispatch(userActions.handleAcceptFriendRequest({ acceptFrndRqstId: personToFollow }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleRejectFriend = async () => {
    try {
      const response = await fetch(authState.backendURL + "/rejectFriendRequest/" + personToFollow, {
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

      setAccedptFriend((prev) => !prev);
      dispatch(userActions.handleRejectFriendRequest({ rejectFrndRqstId: personToFollow }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  return (
    <div className="connect flex justify-end items-start gap-3 col-start-3 col-end-4 ">
      {showFollowers && !showAcceptFriend && (
        <div className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Followers</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      {!showFollowers && !showUnfollow && !showAcceptFriend && (
        <div onClick={handleFollow} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Follow</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      {!showFollowers && showUnfollow && !showAcceptFriend && (
        <div onClick={handleUnFollow} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Unfollow</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      {!showPendingfriend && !showUnfriend && !showAcceptFriend && (
        <div onClick={handleAddFriend} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Add Friend</p>
          <p className="py-1 px-3 bg-blue-400">{fndNumber ? fndNumber : "0"} </p>
        </div>
      )}
      {showPendingfriend && (
        <div className=" flex  ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Friend Request Sent</p>
        </div>
      )}
      {showUnfriend && (
        <div onClick={handleDeleteFriend} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Unfriend</p>
          <p className="py-1 px-3 bg-blue-400">{fndNumber ? fndNumber : "0"} </p>
        </div>
      )}
      {showAcceptFriend && (
        <>
          <div onClick={handleAcceptFriend} className=" flex  cursor-pointer ml-5 text-white ">
            <p className="py-1 px-3 bg-blue-500">Accept Friend</p>
            <p className="py-1 px-3 bg-blue-400">{fndNumber ? fndNumber : "0"} </p>
          </div>
          <div onClick={handleRejectFriend} className=" flex  cursor-pointer ml-5 text-white ">
            <p className="py-1 px-3 bg-blue-500">Reject Friend</p>
            <p className="py-1 px-3 bg-blue-400">{fndNumber ? fndNumber : "0"} </p>
          </div>
        </>
      )}
    </div>
  );
}

export default FollowFriend;

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { currentUser: JSON.parse(localStorage.getItem("currentUser")), allUsers: [], availAbleUsers: [], activeRecipient: [], myFriends: [], sentFrndRequest: [], rcvdFrndRequest: [], followingPeople: [], ohterPeople: [] },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.users;
      state.availAbleUsers = action.payload.users.filter((user) => user._id !== state.currentUser.id);

      // Update myFriends using a selector
      state.myFriends = action.payload.users.filter((user) => user.friends.includes(state.currentUser.id));

      state.sentFrndRequest = action.payload.users.filter((user) => user.pendingFriends.includes(state.currentUser.id));
      state.rcvdFrndRequest = action.payload.users.filter((user) => state.currentUser.pendingFriends.includes(user._id));
      state.followingPeople = action.payload.users.filter((user) => user.followers.includes(state.currentUser.id));
      state.ohterPeople = action.payload.users.filter((user) => {
        return !user.pendingFriends.includes(state.currentUser.id) && !state.currentUser.pendingFriends.includes(user._id) && !state.currentUser.friends.includes(user._id) && !state.currentUser.following.includes(user._id) && user._id !== state.currentUser.id;
      });

      // state.followingPeople = "";
      // state.ohterPeople = "";
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    handleFollow: (state, action) => {
      const personToFollowID = action.payload.personToFollowID;

      const personToFollow = state.allUsers.filter((user) => user._id == personToFollowID);
      // console.log(personToFollow);

      state.currentUser.following = [...state.currentUser.following, personToFollowID]; // Use this

      state.followingPeople = [...state.followingPeople, personToFollow[0]];

      // state.followingPeople.push(personToFollow[0]);
      state.ohterPeople = state.ohterPeople.filter((user) => user._id !== personToFollowID);
    },
    handleUnFollow: (state, action) => {
      const personToUnfollowID = action.payload.personToUnfollowID;

      const personToUnfollow = state.allUsers.filter((user) => user._id == personToUnfollowID);
      // console.log(personToUnfollow);

      state.currentUser.following = state.currentUser.following.filter((userId) => userId !== personToUnfollowID);

      state.followingPeople = state.followingPeople.filter((user) => user._id !== personToUnfollowID);

      // Check if the user already exists in the array
      const userExists = state.ohterPeople.some((user) => user._id === personToUnfollowID);

      // If the user doesn't exist, add them to the array
      if (!userExists) {
        state.ohterPeople.push(personToUnfollow[0]);
      }
    },
    handleSendFriendRqst: (state, action) => {
      const personToFriendID = action.payload.personToFriend;

      const personToSendFriendRqst = state.allUsers.filter((user) => user._id == personToFriendID);

      // state.currentUser.SendFriendRqsting.push(personToSendFriendRqstID);
      state.sentFrndRequest = [...state.sentFrndRequest, personToSendFriendRqst[0]];
      // state.sentFrndRequest.push(personToSendFriendRqst[0]);
      state.ohterPeople = state.ohterPeople.filter((user) => user._id !== personToFriendID);
    },
    handleCancelFriendRequest: (state, action) => {
      const cancelFrndRqstId = action.payload.cancelFrndRqstId;

      const personToCancelFrndRqstOf = state.allUsers.filter((user) => user._id == cancelFrndRqstId);
      // console.log(personToCancelFrndRqstOf);

      state.sentFrndRequest = state.sentFrndRequest.filter((user) => user._id !== cancelFrndRqstId);

      // Check if the user already exists in the array
      const userExists = state.ohterPeople.some((user) => user._id === cancelFrndRqstId);

      // If the user doesn't exist, add them to the array
      if (!userExists) {
        state.ohterPeople = [...state.ohterPeople, personToCancelFrndRqstOf[0]];
        // state.ohterPeople.push(personToCancelFrndRqstOf[0]);
      }
    },
    handleAcceptFriendRequest: (state, action) => {
      const acceptFrndRqstId = action.payload.acceptFrndRqstId;

      const personToAcceptFrndRqstOf = state.allUsers.filter((user) => user._id == acceptFrndRqstId);
      // console.log(personToCancelFrndRqstOf);

      state.ohterPeople = state.ohterPeople.filter((user) => user._id !== acceptFrndRqstId);

      state.myFriends = [...state.myFriends, personToAcceptFrndRqstOf[0]];
      // state.myFriends.push(personToAcceptFrndRqstOf[0]);

      state.rcvdFrndRequest = state.rcvdFrndRequest.filter((user) => user._id !== acceptFrndRqstId);
    },
    handleRejectFriendRequest: (state, action) => {
      const rejectFrndRqstId = action.payload.rejectFrndRqstId;

      const personToRejectFrndRqstOf = state.allUsers.filter((user) => user._id == rejectFrndRqstId);
      // console.log(personToCancelFrndRqstOf);

      // Check if the user already exists in the array
      const userExists = state.ohterPeople.some((user) => user._id === personToRejectFrndRqstOf);

      // If the user doesn't exist, add them to the array
      if (!userExists) {
        state.ohterPeople = [...state.ohterPeople, personToRejectFrndRqstOf[0]];
        // state.ohterPeople.push(personToRejectFrndRqstOf[0]);
      }

      state.rcvdFrndRequest = state.rcvdFrndRequest.filter((user) => user._id !== rejectFrndRqstId);
    },
    handleDeleteFriend: (state, action) => {
      const deleteFrndRqstId = action.payload.deleteFrndRqstId;

      const friendToDelete = state.allUsers.filter((user) => user._id == deleteFrndRqstId);
      // console.log(personToCancelFrndRqstOf);

      // Check if the user already exists in the array
      const userExists = state.ohterPeople.some((user) => user._id === friendToDelete);

      // If the user doesn't exist, add them to the array
      if (!userExists) {
        state.ohterPeople = [...state.ohterPeople, friendToDelete[0]];
        // state.ohterPeople.push(friendToDelete[0]);
      }

      state.myFriends = state.myFriends.filter((user) => user._id !== deleteFrndRqstId);
    },
  },
});

export default usersSlice.reducer;

export const userActions = usersSlice.actions;

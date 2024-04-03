import { createSlice } from "@reduxjs/toolkit";

const messengerSlice = createSlice({
  name: "messenger",
  initialState: { currentUser: JSON.parse(localStorage.getItem("currentUser")), allConversations: "", activeReciepient: "", activeConversation: "", allGroupConversations: "", activeGroupReciepient: "", activeGroupConversation: "", contactView: true, activeUsers: [], sortedUsers: [] },
  reducers: {
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    alterContactView: (state, action) => {
      state.contactView = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    setAllConversations: (state, action) => {
      state.allConversations = action.payload;
      state.activeConversation = action.payload.find((conversation) => {
        return conversation.participants.some((participant) => participant === state.activeReciepient._id);
      });
      // Update myFriends using a selector
    },
    setActiveReciepient: (state, action) => {
      //   console.log(action);
      state.activeReciepient = action.payload;

      state.activeConversation = state.allConversations.find((conversation) => {
        return conversation.participants.some((participant) => participant === action.payload._id);
      });
    },
    setInitialActiveReciepient: (state, action) => {
      const allUsers = [...action.payload.users];
      const currentUser = state.currentUser;
      const allConversations = state.allConversations;

      // Extract unique user IDs from the participants array in allConversations
      const participantUserIds =
        allConversations &&
        allConversations.reduce((userIds, conversation) => {
          const participants = conversation.participants;
          return userIds.concat(participants.filter((id) => !userIds.includes(id)));
        }, []);

      // Sort allUsers based on whether _id is in conversationUserIds
      // Sort allUsers based on the order of appearance in participantUserIds
      const sortedUsers =
        allUsers &&
        allUsers.sort((userA, userB) => {
          const indexA = participantUserIds.indexOf(userA._id);
          const indexB = participantUserIds.indexOf(userB._id);

          // Users not found in the participants array should appear at the end
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });
      const sortedUsersWithoutCurrentUser = sortedUsers && sortedUsers.filter((user) => user._id !== state.currentUser.id);

      // const availAbleUsers = action.payload.users.filter((user) => user._id !== state.currentUser.id);
      //   console.log(action);
      state.sortedUsers = sortedUsersWithoutCurrentUser;

      state.activeReciepient = sortedUsersWithoutCurrentUser && sortedUsersWithoutCurrentUser[0];

      state.activeConversation =
        state.allConversations &&
        sortedUsersWithoutCurrentUser &&
        state.allConversations.find((conversation) => {
          return conversation.participants.some((participant) => participant === sortedUsersWithoutCurrentUser[0]._id);
        });

      // console.log("AllUsers", allUsers);
      // console.log("allConversations", allConversations);
      // console.log("sortedUsers", sortedUsers);
    },

    updateAllConversations: (state, action) => {
      if (!state.allConversations) {
        state.allGroupConversations = action.payload;
        state.activeGroupConversation = action.payload[0];
        state.activeGroupReciepient = action.payload[0].participants.filter((id) => id !== state.currentUser.id);
      } else {
        const replacementObject = action.payload.conversation;

        //   console.log(action.payload.conversation._id);
        const targetConversationId = action.payload.conversation._id;

        // Check if replacementObject already exists in allConversations
        const conversationIndex = state.allConversations.findIndex((conversationObj) => conversationObj._id === targetConversationId);

        if (conversationIndex !== -1) {
          // If replacementObject exists, update it
          state.allConversations[conversationIndex] = replacementObject;
        } else {
          // If replacementObject does not exist, add it to the array
          state.allConversations.push(replacementObject);
        }

        state.activeConversation = state.allConversations.find((conversation) => {
          return conversation.participants.some((participant) => participant === state.activeReciepient._id);
        });
      }

      // Update myFriends using a selector
    },
    setAllGroupConversations: (state, action) => {
      state.allGroupConversations = action.payload;
      state.activeGroupConversation = action.payload[0];
      state.activeGroupReciepient = action.payload[0].participants.filter((id) => id !== state.currentUser.id);

      // state.activeGroup = action.payload.find((conversation) => {
      //   return conversation.participants.some((participant) => participant === state.activeReciepient._id);
      // });
      // Update myFriends using a selector
    },
    setActiveGroup: (state, action) => {
      //   console.log(action);
      state.activeGroupReciepient = action.payload.participants.filter((id) => id !== state.currentUser.id);
      state.activeGroupConversation = action.payload;
      //   state.allConversations &&
      //   state.allConversations.find((conversation) => {
      //     return conversation.participants.some((participant) => participant === action.payload._id);
      //   });
    },
    updateGroupConversations: (state, action) => {
      // console.log(action.payload.conversation);
      const replacementObject = action.payload.conversation;
      //   console.log(action.payload.conversation._id);
      const targetConversationId = action.payload.conversation._id;
      // Check if replacementObject already exists in allConversations
      const conversationIndex = state.allGroupConversations.findIndex((conversationObj) => conversationObj._id === targetConversationId);
      if (conversationIndex !== -1) {
        // If replacementObject exists, update it
        state.allGroupConversations[conversationIndex] = replacementObject;
      } else {
        // If replacementObject does not exist, add it to the array
        state.allGroupConversations.push(replacementObject);
      }
      state.activeGroupConversation = state.allGroupConversations.find((conversation) => {
        return conversation._id === state.activeGroupConversation._id;
      });
    },
    addGroupConversations: (state, action) => {
      // const newConversation = action.payload;
      if (!state.allGroupConversations) {
        state.allGroupConversations = [];
      }

      state.allGroupConversations.push(action.payload);
      state.activeGroupConversation = action.payload;
    },
  },
});

export default messengerSlice.reducer;

export const messengerActions = messengerSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;
const backUrl = import.meta.env.VITE_BACK_URL;
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_AUTH_END = import.meta.env.VITE_IMAGEKIT_AUTH_END;
const IMAGEKIT_THUMB = import.meta.env.VITE_IMAGEKIT_THUMB;

const dUser = { id: "", username: "", firstName: "", lastName: "", bio: "", pendingFriends: [], friends: [], following: [], followers: [], profilePicture: "", coverPicture: "", posts: [] };
const imgKit = {
  IMAGEKIT_PUBLIC_KEY: "public_D3R2YXCqESRUwCNMgLufGCsa8GY=",
  IMAGEKIT_URL_ENDPOINT: "https://ik.imagekit.io/odinbook",
  IMAGEKIT_AUTH_END: IMAGEKIT_AUTH_END,
  IMAGEKIT_THUMB: "tr:n-ik_ml_thumbnail",
  Popup_show: false,
  Popup_url: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: dUser, token: localStorage.getItem("token"), expire: localStorage.getItem("expire"), backendURL: apiUrl, backSiteURL: backUrl, imgKit: imgKit },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.expire) {
        state.expire = action.payload.expire;
      }
      //   localStorage.setItem("token", action.payload.token);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = dUser;
      state.token = null;
      state.expire = null;
      //   localStorage.removeItem("token");
      //   clear cookie
    },
    update: (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.bio = action.payload.bio;
    },
    updateProfilePic: (state, action) => {
      state.user.profilePicture = action.payload;
    },
    updateCoverPic: (state, action) => {
      state.user.coverPicture = action.payload;
    },
    showPopup: (state, action) => {
      state.imgKit.Popup_show = true;
      state.imgKit.Popup_url = action.payload;
    },
    hidePopup: (state, action) => {
      state.imgKit.Popup_show = false;
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;

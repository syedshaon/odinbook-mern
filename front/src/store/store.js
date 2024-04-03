import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import usersReducer from "./userReducer";
import messengerReducer from "./messenger_reducer";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    messenger: messengerReducer,
  },
});

export default Store;

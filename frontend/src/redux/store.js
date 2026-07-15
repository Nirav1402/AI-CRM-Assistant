import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./slices/chatSlice";
import interactionReducer from "./slices/interactionSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    interaction: interactionReducer,
  },
});

export default store;
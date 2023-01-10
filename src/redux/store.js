import { combineReducers, configureStore } from "@reduxjs/toolkit";

import walletReducer from "./slices/walletSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  // posts: postsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

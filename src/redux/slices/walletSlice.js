import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: null,
  allAccounts: [],
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = current(state).allAccounts.includes(action.payload)
        ? action.payload
        : null;
    },

    disconnectCurrentAccount: (state) => {
      state.currentAccount = null;
    },

    updateAccountsList: (state, action) => {
      state.allAccounts = action.payload;
      
      if (!action.payload.includes(current(state).currentAccount)) {
        state.currentAccount = null;
      }
    },
  },
});

export const {
  setCurrentAccount,
  disconnectCurrentAccount,
  updateAccountsList,
} = walletSlice.actions;

export default walletSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  smsCount: 0,
  feedbackBalance: 500,
};

const receiversSlice = createSlice({
  name: "receivers",
  initialState,
  reducers: {
    createReceivers(state, action) {
      state.data.push(action.payload);
    },

    postSmsBalance(state, action) {
      let staticFeedbackBalance = 500;
      let newSmsCount = Math.ceil(action.payload / 156);
      state.smsCount = newSmsCount;
      state.feedbackBalance = staticFeedbackBalance - action.payload;
    },
  },
});

export const { createReceivers, postSmsBalance } = receiversSlice.actions;

export default receiversSlice.reducer;

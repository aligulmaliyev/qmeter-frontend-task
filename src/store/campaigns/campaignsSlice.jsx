import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    createCampaign(state, action) {
      const existingCampaign = state.data.find(
        (item) => item?.id === action.payload?.id
      );
      if (!existingCampaign) {
        state.data.unshift(action.payload);
      }
    },
    editCampaign(state, action) {
      const existingCampaignIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      delete action.payload.draft;
      state.data.splice(existingCampaignIndex, 1, action.payload);
    },
    deleteCampaign(state, action) {
      const removeItem = state.data.filter(
        (item) => item.id !== action.payload
      );
      state.data = removeItem;
    },
  },
});

export const {
  createCampaign,
  createDraftCampaign,
  editCampaign,
  deleteCampaign,
} = campaignsSlice.actions;

export default campaignsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import campaignsSlice from "./campaigns/campaignsSlice";
import receiversSlice from "./treads/treadsSlice";

export const store = configureStore({
  reducer: {
    campaigns: campaignsSlice,
    receivers: receiversSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

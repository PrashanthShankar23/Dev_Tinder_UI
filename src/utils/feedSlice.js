import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => null,
    removeUserFromFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload),
  },
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;

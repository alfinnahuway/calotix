import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const toolSlices = createSlice({
  name: "eventslices",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = toolSlices.actions;
export default toolSlices.reducer;

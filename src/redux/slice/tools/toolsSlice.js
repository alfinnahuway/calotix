import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollPosition: 0,
};

const toolSlices = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const { setScrollPosition } = toolSlices.actions;
export default toolSlices.reducer;

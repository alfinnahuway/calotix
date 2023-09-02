import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrder: [],
};

const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setAllOrder: (state, action) => {
      state.allOrder = action.payload;
    },
  },
});

export const { setAllOrder } = transactionSlice.actions;
export default transactionSlice.reducer;

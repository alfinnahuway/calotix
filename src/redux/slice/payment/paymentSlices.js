import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentData: [],
};

const toolSlices = createSlice({
  name: "paymentslices",
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
  },
});

export const { setPaymentData } = toolSlices.actions;
export default toolSlices.reducer;

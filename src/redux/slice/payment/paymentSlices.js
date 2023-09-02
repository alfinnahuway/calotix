import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentData: [],
  statusPayment: "",
};

const toolSlices = createSlice({
  name: "paymentslices",
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },

    setStatusPayment: (state, action) => {
      state.statusPayment = action.payload;
    },
  },
});

export const { setPaymentData, setStatusPayment } = toolSlices.actions;
export default toolSlices.reducer;

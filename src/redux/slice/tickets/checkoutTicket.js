import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutTickets: {},
  fetchCheckout: {},
  localData: [],
  payment: "",
  loading: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutTickets: (state, action) => {
      state.checkoutTickets = action.payload;
    },
    setFetchCheckout: (state, action) => {
      state.fetchCheckout = action.payload;
    },
    setLocalData: (state, action) => {
      state.localData = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCheckoutTickets,
  setFetchCheckout,
  setLocalData,
  setPayment,
  setLoading,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;

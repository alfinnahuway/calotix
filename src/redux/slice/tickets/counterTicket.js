import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: {},
  subtotal: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id } = action.payload;
      state.quantity[id] = (state.quantity[id] || 0) + 1;
    },

    decrement: (state, action) => {
      const { id } = action.payload;
      if (state.quantity[id] > 0) {
        state.quantity[id] = state.quantity[id] - 1;
      }
    },
    setQuantity: (state, action) => {
      const { quantityId } = action.payload;

      if (!state.quantity[quantityId]) {
        state.quantity = {};
      }
    },

    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
  },
});

export const { increment, decrement, setSubtotal, setQuantity } =
  counterSlice.actions;
export default counterSlice.reducer;

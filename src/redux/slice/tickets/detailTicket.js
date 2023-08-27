import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTicket: [],
  posterUrl: "",
  loadingTicket: true,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setAllTicket: (state, action) => {
      state.allTicket = action.payload;
    },
    setLoadingTicket: (state, action) => {
      state.loadingTicket = action.payload;
    },
    setPosterUrl: (state, action) => {
      state.posterUrl = action.payload;
    },
  },
});

export const { setAllTicket, setLoadingTicket, setPosterUrl } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;

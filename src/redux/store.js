import { configureStore } from "@reduxjs/toolkit";
import counterTicket from "./slice/tickets/counterTicket";
import checkoutTicket from "./slice/tickets/checkoutTicket";
import detailTicket from "./slice/tickets/detailTicket";
import toolsSlice from "./slice/tools/toolsSlice";
import eventSlices from "./slice/events/eventSlices";
import paymentSlices from "./slice/payment/paymentSlices";
import transactionSlice from "./slice/transaction/transactionSlice";

const store = configureStore({
  reducer: {
    counter: counterTicket,
    checkout: checkoutTicket,
    tickets: detailTicket,
    tools: toolsSlice,
    eventslices: eventSlices,
    paymentslices: paymentSlices,
    transactionSlice: transactionSlice,
  },
});

export default store;

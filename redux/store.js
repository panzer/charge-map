import { configureStore } from "@reduxjs/toolkit";
import chargersReducer from "./chargersReducer";
import stationCommsReducer from "./stationComms";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    chargers: chargersReducer,
    stationComms: stationCommsReducer,
    auth: authReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import chargersReducer from "./chargersReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    chargers: chargersReducer,
    auth: authReducer,
  },
});

export default store;

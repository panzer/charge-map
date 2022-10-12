import { createSlice, createSelector } from "@reduxjs/toolkit";
import { beginCharge } from "../api/stationCommunications";

// Defines Redux handling of the station charging sessions
const stationsCommsSlice = createSlice({
  name: "stationsComms",
  initialState: {
    // TODO: consider adding the charger id here so status can be displayed on the map more nicely
    // TODO: define an enum
    status: "init", // one of: init, pending, success, failure
  },
  reducers: {
    sessionPending(state, action) {
      return {
        ...state,
        status: "pending",
      };
    },
    sessionSuccess(state, action) {
      return {
        ...state,
        status: "success",
      };
    },
    sessionFailure(state, action) {
      console.error(action);
      return {
        ...state,
        status: "failure",
      };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = stationsCommsSlice;
// Extract and export each action creator by name
export const { sessionPending, sessionSuccess, sessionFailure } = actions;

// Thunks (async actions)
export const requestCharge = ({ user_id, car_id, charger_id }) => async (
  dispatch
) => {
  dispatch(sessionPending());
  beginCharge({ user_id, car_id, charger_id })
    .then((response) => dispatch(sessionSuccess(response.data)))
    .catch((error) => {
      dispatch(sessionFailure(error.response));
    });
};

// Selectors
// TODO: This would be a good place to select chargers based on location
// TODO: Consider grouping results if they are too close together
export const selectStationStatus = createSelector(
  (state) => state.chargers,
  (chargers) => chargers.status
);

export const selectIsStationLoading = createSelector(
  selectStationStatus,
  (status) => status === "pending" // TODO: use enum
);

// Export the reducer, either as a default or named export
export default reducer;

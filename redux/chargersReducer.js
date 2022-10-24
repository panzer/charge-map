import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getLocations } from "../api/chargers";

// Defines Redux handling of the charger locations data
const chargersSlice = createSlice({
  name: "chargers",
  initialState: {
    locations: [],
    isLoading: false,
  },
  reducers: {
    chargersPending(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    chargersSuccess(state, { payload: data }) {
      // TODO: Figure out why sometimes there is an error
      // TypeError: undefined is not a function (near '...data.map...')
      try {
        return {
          // TODO: Instead of bulk replacing locations, locations should be some datastructure (R-Tree?)
          // that allows for lookups based on bounding box
          locations: data.map(
            ({ ID, UUID, AddressInfo: { Latitude, Longitude } }) => ({
              charger_id: ID, // same as "ChargePointID"
              uuid: UUID,
              lat: Latitude,
              lon: Longitude,
            })
          ),
          isLoading: false,
        };
      } catch {
        return {
          ...state,
          isLoading: false,
        };
      }
    },
    chargersFailure(state, action) {
      console.error(action);
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = chargersSlice;
// Extract and export each action creator by name
export const { chargersPending, chargersSuccess, chargersFailure } = actions;

// Thunks (async actions)
export const fetchChargers = ({ lat1, lon1, lat2, lon2 }) => async (
  dispatch
) => {
  // Rough idea for new approach:
  // 1. Split the current view into NxM segments, for simplicity the first attempt will be 3x3
  // 2. Query the openchargers API for each segment, with some arbitrary maximum results.
  // 3. Two R-Trees will be used. First one used to check if current view has the maximum results possible. "isFilled"?
  // 4. Second one actually holds the points (lat lon) of the chargers + any metadata needed for further functionality
  // 5. When view is refreshed, consult isFilled r-tree to determine if more points lay in that area
  dispatch(chargersPending());
  getLocations({ lat1, lon1, lat2, lon2 })
    .then((response) => dispatch(chargersSuccess(response.data)))
    .catch((response) => {
      dispatch(chargersFailure(response));
    });
};

// Selectors
// TODO: This would be a good place to select chargers based on location
// TODO: Consider grouping results if they are too close together
export const selectChargers = createSelector(
  (state) => state.chargers,
  (chargers) => chargers.locations
);

export const selectIsChargersLoading = createSelector(
  (state) => state.chargers,
  (chargers) => chargers.isLoading
);

// Export the reducer, either as a default or named export
export default reducer;

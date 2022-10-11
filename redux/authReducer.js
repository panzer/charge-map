import { createSlice, createSelector } from "@reduxjs/toolkit";

import { postAuthentication } from "../api/chargers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    key: undefined, // string
    status: undefined, // integer HTTP status
    message: undefined, // string for errors
    isPending: false,
  },
  reducers: {
    authPending(state, action) {
      console.log(action);
      return {
        ...state,
        isPending: true,
      };
    },
    authSuccess(state, { payload }) {
      return {
        ...state,
        isPending: false,
        key: payload.Data.access_token,
        status: 200,
      };
    },
    authFailure(state, { payload }) {
      return {
        ...state,
        isPending: false,
        key: undefined,
        status: payload.status,
        message: payload.message,
      };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { authPending, authSuccess, authFailure } = actions;

export const authenticateUser = ({ email, password }) => async (dispatch) => {
  console.log(email, password);
  dispatch(authPending());
  postAuthentication({ email, password })
    .then((response) => dispatch(authSuccess(response.data)))
    .catch(({ response }) =>
      dispatch(authFailure({ status: response.status, message: response.data }))
    );
};

// Selectors
export const authSelector = createSelector((state) => state.auth);

// Export the reducer, either as a default or named export
export default reducer;

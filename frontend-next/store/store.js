import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { combineReducers } from "redux";

// Action types
const SET_USER_LOCATION = "SET_USER_LOCATION";

const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

// Action creators
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

// Action creators
export const setUserLocation = (lat, lng) => {
  return {
    type: SET_USER_LOCATION,
    payload: { lat, lng },
  };
};

// Reducers
const initialLocationState = {
  lat: null,
  lng: null,
};

const initialUserState = null;

const locationReducer = (state = initialLocationState, action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  location: locationReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

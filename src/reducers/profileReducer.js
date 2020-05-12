import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR
} from "../actions/types";

const initialState = {
  isUpdating: false,
  isFetching: false,
  success: null,
  message: ""
};

export const profileReducer = (state = initialState, action) => {
  let output = {};
  switch (action.type) {
    case UPDATE_PROFILE:
      output = {
        ...state,
        isUpdating: true,
        success: null,
        message: ""
      };
      return output;
    case UPDATE_PROFILE_ERROR:
      output = {
        ...state,
        isUpdating: false,
        success: false,
        message: action.payload.message
      };
      console.log("Output: ", output);
      return output;
    case UPDATE_PROFILE_SUCCESS:
      output = {
        ...state,
        isUpdating: false,
        success: true,
        message: action.payload.message
      };
      return output;
    case FETCH_PROFILE:
      output = {
        ...state,
        isFetching: true,
        success: null,
        message: ""
      };
      console.log("HIT REDUCER!")
      return output;
    case FETCH_PROFILE_ERROR:
      output = {
        ...state,
        isFetching: false,
        success: false,
        message: action.payload.message
      };
      return output;
    case FETCH_PROFILE_SUCCESS:
      output = {
        ...state,
        isFetching: false,
        success: true,
        message: action.payload.message
      };
      return output;
    default:
      return state;
  }
};

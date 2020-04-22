import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_INITIALIZE,
  UPDATE_PROFILE_SUCCESS,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  SET_PROFILE,
  CLEAR_PROFILE
} from "../actions/types";

const initialState = {
  data: {
    id: "",
    sub: "",
    tokens: {
      accessToken: "",
      idToken: "",
      refreshToken: ""
    },
    attributes: {},
    emails: [],
    phoneNumbers: [],
    name: {
      displayName: "",
      givenName: "",
      middleName: "",
      familyName: ""
    },
  },
  isLoggedIn: false,
  // data: null,
  isUpdating: false,
  isUpdated: null,
  isFetching: false,
  success: null,
  message: ""
};

export const profileReducer = (state = initialState, action) => {
  let output = {};
  switch (action.type) {
    case UPDATE_PROFILE_INITIALIZE: 
      output = {
        ...state,
        isUpdating: false,
        isUpdated: null,
        message: ""
      };
      return output;

    case CLEAR_PROFILE: 
      output = initialState;
      return output;

    case UPDATE_PROFILE:
      output = {
        ...state,
        isUpdating: true,
        isUpdated: null,
        message: ""
      };
      return output;
    case UPDATE_PROFILE_ERROR:
      output = {
        ...state,
        isUpdating: false,
        isUpdated: false,
        message: action.payload.message
      };
      return output;
    case UPDATE_PROFILE_SUCCESS:
      output = {
        ...state,
        isUpdating: false,
        isUpdated: true,
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
        data: action.payload,
        isLoggedIn: true,
        isFetching: false,
        success: true,
        message: action.payload.message,
      };
      return output;
    case SET_PROFILE: 
      output = {
        ...state,
        data: action.payload
      }
      return output;
    default:
      return state;
  }
};

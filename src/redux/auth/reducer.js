import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP,
  SIGNUP_INITIALIZE,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions";

const initState = {
  accessToken: "",
  idtoken: "",
  refreshToken: "",
  status: {
    isCreating: false,
    isCreated: null,
    isLoggingIn: false,
    isLoggedIn: false,
  },
  error: null,
};

export const auth = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: initState.accessToken,
        idtoken: initState.idtoken,
        refreshToken: initState.refreshToken,
        status: {
          ...state.status,
          isLoggedIn: false,
          isLoggingIn: true,
        },
        error: initState.error,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isLoggedIn: false,
          isLoggingIn: false,
        },
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        accessToken: action.payload.accessToken,
        idtoken: action.payload.idToken,
        refreshToken: action.payload.refreshToken,
        status: {
          ...state.status,
          isLoggedIn: true,
          isLoggingIn: false,
        },
      };
    case LOGOUT:
      return initState;

    default:
      return state;
  }
};

export default auth;

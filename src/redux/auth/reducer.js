import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from "../actions";

const initState = {
  accessToken: "",
  idtoken: "",
  refreshToken: "",
  status: {
    isLoggingIn: false,
    isLoggedIn: false,
  },
  error: null,
};

export const authReducer = (state = initState, action) => {
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
          isLoggingIn: true
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
        }
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        idtoken: action.payload.idToken,
        refreshToken: action.payload.refreshToken,
        status: {
          ...state.status,
          isLoggedIn: true,
          isLoggingIn: false
        }
      }
  
    default:
      break;
  }
}

export default authReducer;
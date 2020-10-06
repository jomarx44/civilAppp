import {
  SIGNUP,
  SIGNUP_INITIALIZE,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions";

const initState = {
  status: {
    isCreating: false,
    isCreated: null,
  },
  error: null,
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        status: {
          ...state.status,
          isCreated: null,
          isCreating: true,
        },
      };
    case SIGNUP_INITIALIZE:
      return {
        ...state,
        error: initState.error,
        status: {
          ...state.status,
          isCreated: initState.status.isCreated,
          isCreating: initState.status.isCreating,
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isCreated: false,
          isCreating: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        status: {
          ...state.status,
          isCreated: true,
          isCreating: false,
        },
      };
    default:
      return state;
  }
};

export default user;

import {
  FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ATTRIBUTE,
  FETCH_PROFILE_ATTRIBUTE_ERROR,
  FETCH_PROFILE_ATTRIBUTE_SUCCESS,
} from "../actions";

const initState = {
  data: null,
  error: null,
  status: {
    isFetching: false
  }
};

export const profile = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROFILE: 
      return {
        ...state,
        error: initState.error,
        status: {
          ...state.status,
          isFetching: true
        }
      };
    case FETCH_PROFILE_ERROR: 
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isFetching: false
        }
      };
    case FETCH_PROFILE_SUCCESS: 
      return {
        ...state,
        data: action.payload.profileData,
        status: {
          ...state.status,
          isFetching: false
        }
      };
    case FETCH_PROFILE_ATTRIBUTE: 
      return {
        ...state,
        error: initState.error,
        status: {
          ...state.status,
          isFetching: true
        }
      };
    case FETCH_PROFILE_ATTRIBUTE_ERROR: 
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isFetching: false
        }
      };
    case FETCH_PROFILE_ATTRIBUTE_SUCCESS: 
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.attributeIndex]: action.payload.attributeValue
        },
        status: {
          ...state.status,
          isFetching: false
        }
      }
    default:
      return state;
  }
};

export default profile;

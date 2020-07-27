import {
  CREATE_USER,
  FETCH_USER_INFO,
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_SUCCESS,
} from "../actions";

const initState = {
  createdList: {},
  createdListByIds: [],
  info: null,
  error: null,
  status: {
    isFetchingInfo: false
  }
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case CREATE_USER:
      console.log(action.payload.user.id);
      return {
        ...state,
        createdList: {
          ...state.createdList,
          [action.payload.user.id]: action.payload.user,
        },
        createdListByIds: [...state.createdListByIds, action.payload.user.id],
      };
    case FETCH_USER_INFO: 
      return {
        ...state,
        error: null,
        status: {
          ...state.status,
          isFetchingInfo: true
        }
      }
    case FETCH_USER_INFO_ERROR: 
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isFetchingInfo: false
        }
      }
    case FETCH_USER_INFO_SUCCESS: 
      return {
        ...state,
        info: action.payload.userInfo,
        status: {
          ...state.status,
          isFetchingInfo: false
        }
      }
    default:
      return state;
  }
};

export default user;

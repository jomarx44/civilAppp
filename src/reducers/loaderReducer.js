// To be added
import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from '../actions/types';

const initialState = {
  payload: {
    is_fetching: false,
  },
  success: null,
}

export const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH: 
      return {
        ...state,
        payload: {
          is_fetching: true
        }
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        payload: {
          ...action.payload,
          is_fetching: false
        },
        success: true
      }
    case FETCH_ERROR:
      return {
        ...state,
        payload: {
          ...action.payload,
          is_fetching: false
        },
        success:false
      }
    default: 
      return state;
  }
}

export default LoaderReducer;
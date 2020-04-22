import { SEARCH_CITY, SEARCH_CITY_ERROR, SEARCH_CITY_SUCCESS } from "../actions/types";

const initialState = {
  isFetching: false,
  data: []
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CITY:
      return {
        isFetching: true,
        data: []
      }

    case SEARCH_CITY_ERROR:
      return initialState;

    case SEARCH_CITY_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
  
    default:
      return state;
  }
}

export default cityReducer;
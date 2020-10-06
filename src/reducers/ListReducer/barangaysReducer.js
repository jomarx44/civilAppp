import { FETCH_BARANGAYS, FETCH_BARANGAYS_ERROR, FETCH_BARANGAYS_SUCCESS } from "../../actions/types";

const initialState = {
  isFetching: false,
  data: {},
  listsById: []
};

export const barangaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BARANGAYS:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_BARANGAYS_ERROR:
      return {
        ...state,
        isFetching: false
      };

    case FETCH_BARANGAYS_SUCCESS:
      return {
        isFetching: false,
        data: {
          ...action.payload.data
        },
        listsById: [
          ...action.payload.listsById
        ]
      };
  
    default:
      return state;
  }
}

export default barangaysReducer;
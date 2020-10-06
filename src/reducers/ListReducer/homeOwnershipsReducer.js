import { FETCH_HOMEOWNERSHIP_ERROR, FETCH_HOMEOWNERSHIP_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const HomeOwnershipsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOMEOWNERSHIP_ERROR:
      return state;

    case FETCH_HOMEOWNERSHIP_SUCCESS:
      return {
        data: {
          ...state.data,
          ...action.payload.data
        },
        listsById: [
          ...state.listsById,
          ...action.payload.listsById
        ]
      };
  
    default:
      return state;
  }
}

export default HomeOwnershipsReducer;
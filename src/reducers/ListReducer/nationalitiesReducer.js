import { FETCH_NATIONALITY_ERROR, FETCH_NATIONALITY_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const nationalitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NATIONALITY_ERROR:
      return state;

    case FETCH_NATIONALITY_SUCCESS:
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

export default nationalitiesReducer;
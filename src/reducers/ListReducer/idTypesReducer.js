import { FETCH_IDTYPE_ERROR, FETCH_IDTYPE_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const idTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IDTYPE_ERROR:
      return state;

    case FETCH_IDTYPE_SUCCESS:
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

export default idTypesReducer;
import { FETCH_FUNDSOURCE_ERROR, FETCH_FUNDSOURCE_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const fundSourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FUNDSOURCE_ERROR:
      return state;

    case FETCH_FUNDSOURCE_SUCCESS:
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

export default fundSourcesReducer;
import { FETCH_JOBTITLE_ERROR, FETCH_JOBTITLE_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const jobTitlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBTITLE_ERROR:
      return state;

    case FETCH_JOBTITLE_SUCCESS:
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

export default jobTitlesReducer;
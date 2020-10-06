import { FETCH_CIVILSTATUS_ERROR, FETCH_CIVILSTATUS_SUCCESS } from "../../actions/types";

const initialState = {
  data: {},
  listsById: []
};

export const civilStatusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CIVILSTATUS_ERROR:
      return state;

    case FETCH_CIVILSTATUS_SUCCESS:
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

export default civilStatusesReducer;
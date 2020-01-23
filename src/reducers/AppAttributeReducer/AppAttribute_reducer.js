import {
  FETCH_APPATTRIBUTES,
  FETCH_APPATTRIBUTES_SUCCESS,
  FETCH_APPATTRIBUTES_ERROR,
  UPDATE_APPATTRIBUTES,
  UPDATE_APPATTRIBUTES_SUCCESS,
  UPDATE_APPATTRIBUTES_ERROR
} from "./AppAttribute_actions";

const initialState = {
  
};

export const AppAttributeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPATTRIBUTES:
      return;
    case FETCH_APPATTRIBUTES_ERROR:
      return;
    case FETCH_APPATTRIBUTES_SUCCESS:
      return;
    case UPDATE_APPATTRIBUTES:
      return;
    case UPDATE_APPATTRIBUTES_ERROR:
      return;
    case UPDATE_APPATTRIBUTES_SUCCESS:
      return;
    default:
      return state;
  }
}
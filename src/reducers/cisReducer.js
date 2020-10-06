import {
  CHECK_OTP_SUCCESS,
  CLEAR_CIS
} from "../actions/types";

const cisState = {
  id: null
};

export const cisReducer = (state = cisState, action) => {
  switch (action.type) {
    case CHECK_OTP_SUCCESS:
      return action.payload;
      
    case CLEAR_CIS: 
      return cisState;
      
    default:
      return state;
  }
};

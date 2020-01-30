import * as TYPE from "../actions/types";

const cisState = {
  id: ""
};

export const cisReducer = (state = cisState, action) => {
  switch (action.type) {
    case TYPE.CHECK_OTP_SUCCESS:
      console.log("CIS: ", action.payload);
      return action.payload;
    default:
      return state;
  }
};

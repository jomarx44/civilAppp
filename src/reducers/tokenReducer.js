import * as TYPE from "../actions/types";

const tokenState = {
  token: ""
};

export const tokenReducer = (state = tokenState, action) => {
  switch (action.type) {
    case TYPE.REQUEST_OTP_SUCCESS:
      console.log("Token: ", action.payload);
      return action.payload;
    default:
      return state;
  }
};

import * as TYPE from "../actions/types";

const otpState = {
  isFetching: false,
  message: "",
  success: null
};

export const otpReducer = (state = otpState, action) => {
  switch (action.type) {
    case TYPE.REQUEST_OTP:
      return {
        isFetching: true,
        success: null,
        message: ""
      };
    case TYPE.REQUEST_OTP_ERROR:
      console.log("Error in requesting OTP");
      console.log("Error: ", action.payload);
      return action.payload;
    case TYPE.CHECK_OTP:
      return {
        isFetching: true,
        success: null,
        message: ""
      };
    case TYPE.CHECK_OTP_ERROR:
      console.log('Error in Verifying OTP');
      console.log('Error: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

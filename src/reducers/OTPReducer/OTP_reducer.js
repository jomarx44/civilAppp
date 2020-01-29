import {
  CHECK_OTP,
  CHECK_OTP_ERROR,
  CHECK_OTPTM_SUCCESS,
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
} from "./OTP_actions";

const otpState = {
  isFetching: false,
  message: "",
  success: null
};

export const otpReducer = (state = otpState, action) => {
  switch (action.type) {
    case REQUEST_OTP:
      return {
        isFetching: true,
        success: null,
        message: ""
      };
    case REQUEST_OTP_ERROR:
      console.log("Error in requesting OTP");
      console.log("Error: ", action.payload);
      return action.payload;
    case CHECK_OTP:
      return {
        isFetching: true,
        success: null,
        message: ""
      };
    case CHECK_OTPTM_SUCCESS: 
      return action.payload;
    case CHECK_OTP_ERROR:
      console.log("Error in Verifying OTP");
      console.log("Error: ", action.payload);
      return action.payload;
    default:
      return state;
  }
};

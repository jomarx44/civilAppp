import {
  CHECK_OTP,
  CHECK_OTP_ERROR,
  CHECK_OTPTM_SUCCESS,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  REQUEST_OTP_ERROR,
} from "./OTP_actions";

const otpState = {
  isFetching: false,
  message: "",
  success: null,
  token: ''
};

export const otpReducer = (state = otpState, action) => {
  let output;
  switch (action.type) {
    case REQUEST_OTP:
      output = {
        isFetching: true,
        success: null,
        message: "",
        token: ''
      };
      console.log("Request OTP Reducer: ", output);
      return output;

    case REQUEST_OTP_SUCCESS:
      output = {
        ...state,
        ...action.payload
      }
      console.log("Request OTP (Success) Reducer: ", output);
      return output;

    case REQUEST_OTP_ERROR:
      output = {
        ...state,
        ...action.payload
      };
      console.log("Request OTP (Error) Reducer: ", output)
      return output;

    case CHECK_OTP:
      output = {
        ...state,
        isFetching: true,
        message: "",
        success: null
      };
      console.log("Check OTP Reducer: ", output);
      return output;

    case CHECK_OTPTM_SUCCESS: 
      output = {
        ...state,
        ...action.payload
      }
      console.log("Check OTP (Success) Reducer: ", output);
      return output;

    case CHECK_OTP_ERROR:
      output = {
        ...state,
        ...action.payload
      };
      console.log("Check OTP (Error) Reducer: ", output)
      return output;

    default:
      return state;
  }
};

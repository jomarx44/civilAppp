import {
  CHECK_OTP,
  CHECK_OTP_ERROR,
  CHECK_OTP_INITIALIZE,
  CHECK_OTP_SUCCESS,
  CHECK_OTPTM_SUCCESS,
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_INITIALIZE,
  REQUEST_OTP_SUCCESS,
} from "../../actions/types";

const otpState = {
  isFetching: false,
  message: "",
  success: null,
  isVerified: null,
  token: ''
};

export const otpReducer = (state = otpState, action) => {
  let output;
  switch (action.type) {
    case REQUEST_OTP_INITIALIZE:
      output = {
        ...state,
        isFetching: null,
        success: null,
        message: "",
        token: ''
      };
      return output;

    case REQUEST_OTP:
      output = {
        ...state,
        isFetching: true,
        success: null,
        message: "",
        token: ''
      };
      console.log("Request OTP Reducer: ", output);
      return output;

    case REQUEST_OTP_SUCCESS:
      output = {
        isFetching: false,
        success: true,
        message: "",
        token: action.payload.token,
      }
      console.log("Request OTP (Success) Reducer: ", output);
      return output;

    case REQUEST_OTP_ERROR:
      output = {
        isFetching: false,
        success: false,
        message: action.payload.message,
        token: "",
      };
      console.log("Request OTP (Error) Reducer: ", output)
      return output;

    case CHECK_OTP_INITIALIZE:
      output = {
        ...state,
        isFetching: null,
        message: "",
        isVerified: null
      }

      return output

    case CHECK_OTP:
      output = {
        ...state,
        isFetching: true,
        message: "",
        isVerified: null
      };
      console.log("Check OTP Reducer: ", output);
      return output;

    case CHECK_OTPTM_SUCCESS: 
      output = {
        ...state,
        isFetching: false,
        isVerified: true
      };
      console.log("Check OTP (Success) Reducer: ", output);
      return output;

    case CHECK_OTP_ERROR:
      output = {
        ...state,
        isFetching: false,
        isVerified: false,
        message: action.payload.message
      };
      console.log("Check OTP (Error) Reducer: ", output)
      return output;

    default:
      return state;
  }
};

export default otpReducer;

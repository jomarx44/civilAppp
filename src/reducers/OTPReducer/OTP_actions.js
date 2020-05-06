import { postOnly, getDataOnly, alertBox } from "../../actions/axiosCalls";
import * as NavigationService from "../../navigation/NavigationService.js";
import * as TYPE from "../../actions/types";
import { APIErrorLogging } from "../../library/helpers";
import * as Profile from "../../store/profile"

export const verifyOTP_BytePerByte = ({ token, otp }) => {
  const json_data = {
    path: "byteperbyte/CISVerify",
    params: {
      token,
      otp,
    },
  };
  
  return (dispatch) => {
    dispatch({
      type: TYPE.CHECK_OTP,
    });
    return getDataOnly(json_data)
      .then((response) => {
        const response_data = response.data.data["Register.Info"];
        const has_data = checkStatus(response) && !response_data.ErrorMsg;
        
        // return;
        if (has_data) {
          dispatch({
            type: TYPE.CHECK_OTP_SUCCESS,
            payload: {
              id: response_data.cis_no, //CIS id
            },
          });
          dispatch({
            type: TYPE.CHECK_OTPTM_SUCCESS
          })
        } else {
          dispatch({
            type: TYPE.CHECK_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.ErrorMsg,
              token: token,
            },
          });
          alertBox("Wrong OTP Code. Please try again.");
        }
      })
      .catch((error) => {
        // alertBox(
        //   "Ooops! There's something wrong connecting to the server. Please try again."
        // );
        // dispatch({
        //   type: TYPE.CHECK_OTP_ERROR,
        //   payload: {
        //     success: false,
        //     isFetching: false,
        //     message: error
        //   }
        // });
        APIErrorLogging(error);
      });
  };
};

export const requestOTP_TM = ({
  mobile_number,
  email,
  save_info,
  otpScreen = "OTPOpenAccount",
  toNavId = "",
  messageIfVerified = "",
  shouldPutAttributes = true,
  next = null,
}) => {
  // const json_data = {
  //   path: "tm/otp",
  //   body: {
  //     mobile_number,
  //     save_info
  //   }
  // };
  const json_data = {
    path: "tm/otp",
    body: {
      mobile_number,
      email: email,
      save_info,
    },
  };

  Object.keys(json_data.body)
    .forEach((key) => (json_data.body[key] == null) && delete json_data.body[key]);

  
  return (dispatch) => {
    dispatch({
      type: TYPE.REQUEST_OTP,
    });

    return postOnly(json_data)
      .then((response) => {
        
        const response_data = response.data;
        const has_data = response_data.status == "ok";
        if (has_data) {
          dispatch({
            type: TYPE.REQUEST_OTP_SUCCESS,
            payload: {
              isFetching: false,
              success: true,
              token: response_data.token,
              message: response_data.msg ? response_data.msg : "",
              next: next,
            },
          });
          NavigationService.navigate(otpScreen, {
            navid: toNavId,
            message: messageIfVerified,
            shouldPutAttributes: shouldPutAttributes,
          });
        } else {
          dispatch({
            type: TYPE.REQUEST_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.msg,
            },
          });
          
          alertBox(response_data.msg);
        }
      })
      .catch((error) => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: TYPE.REQUEST_OTP_ERROR,
          payload: {
            isFetching: false,
            success: false,
            message: error,
          },
        });
        if (error.response) {
          
          
          
        } else if (error.request) {
          
        } else {
          
        }
        
      });
  };
};

export const verifyOTP_TM = ({
  token,
  otp,
  navid = "",
  message = "",
  next = null,
}) => {
  const json_data = {
    path: "tm/otp_verify",
    body: {
      token: token + otp,
    },
  };
  
  return (dispatch) => {
    dispatch({
      type: TYPE.CHECK_OTP,
    });
    return postOnly(json_data)
      .then((response) => {
        
        const response_data = response.data.data;
        const has_data = response_data.status == "ok";

        if (has_data) {
          dispatch({
            type: TYPE.CHECK_OTPTM_SUCCESS,
            payload: {
              isFetching: false,
              success: true,
              message: "",
            },
          });
          if (message != "") {
            alertBox(message);
          }

          if (navid != "") {
            NavigationService.navigate(navid);
          }

          Profile.deleteSignUpData();
          Profile.deleteFormData();
        } else {
          dispatch({
            type: TYPE.CHECK_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.message,
            },
          });
          alertBox(response_data.message);
        }
      })
      .catch((error) => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: TYPE.CHECK_OTP_ERROR,
          payload: {
            success: false,
            isFetching: false,
            message: error,
          },
        });
      });
  };
};

const checkStatus = (response) => {
  return response.data.status == "ok";
};

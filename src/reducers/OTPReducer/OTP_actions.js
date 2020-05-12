import { postOnly, getDataOnly, alertBox } from "../../actions/axiosCalls";
import NavigationService from "../../navigation/NavigationService.js";

export const REQUEST_OTP = "REQUEST_OTP";
export const REQUEST_OTP_ERROR = "REQUEST_OTP_ERROR";
export const REQUEST_OTP_SUCCESS = "REQUEST_OTP_SUCCESS";

export const CHECK_OTP = "CHECK_OTP";
export const CHECK_OTP_ERROR = "CHECK_OTP_ERROR";
export const CHECK_OTP_SUCCESS = "CHECK_OTP_SUCCESS";

export const CHECK_OTPTM_SUCCESS = "CHECK_OTPTM_SUCCESS";

export const verifyOTP_BytePerByte = ({ token, otp }) => {
  const json_data = {
    path: "byteperbyte/CISVerify",
    params: {
      token,
      otp
    }
  };
  console.log("Verify OTP and Token: ", json_data);
  return dispatch => {
    dispatch({
      type: CHECK_OTP
    });
    return getDataOnly(json_data)
      .then(response => {
        const response_data = response.data.data["Register.Info"];
        const has_data = checkStatus(response) && !response_data.ErrorMsg;
        console.log("Verify OTP and Token Response: ", response_data);
        // return;
        if (has_data) {
          dispatch({
            type: CHECK_OTP_SUCCESS,
            payload: {
              id: response_data.cis_no //CIS id
            }
          });
          alertBox("Linked Account successfully!");
          NavigationService.navigate("Dashboard");
        } else {
          dispatch({
            type: CHECK_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.ErrorMsg,
              token: token
            }
          });
          alertBox("Wrong OTP Code. Please try again.");
        }
      })
      .catch(error => {
        // alertBox(
        //   "Ooops! There's something wrong connecting to the server. Please try again."
        // );
        // dispatch({
        //   type: CHECK_OTP_ERROR,
        //   payload: {
        //     success: false,
        //     isFetching: false,
        //     message: error
        //   }
        // });
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};

export const requestOTP_TM = ({
  mobile_number,
  save_info,
  otpScreen = "OTPOpenAccount",
  toNavId = "",
  messageIfVerified = "",
  shouldPutAttributes = true,
  next = null
}) => {
  const json_data = {
    path: "tm/otp",
    body: {
      mobile_number,
      save_info
    }
  };

  console.log("Request OTP and Token: ", json_data);
  return dispatch => {
    dispatch({
      type: REQUEST_OTP
    });

    return postOnly(json_data)
      .then(response => {
        console.log("Request OTP response: ", response.data);
        const response_data = response.data;
        const has_data = response_data.status == "ok";
        if (has_data) {
          dispatch({
            type: REQUEST_OTP_SUCCESS,
            payload: {
              isFetching: false,
              success: true,
              token: response_data.token,
              message: response_data.msg ? response_data.msg : "",
              next: next
            }
          });
          NavigationService.navigate(otpScreen, {
            navid: toNavId,
            message: messageIfVerified,
            shouldPutAttributes: shouldPutAttributes
          });
        } else {
          dispatch({
            type: REQUEST_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.msg
            }
          });
          console.log(response_data);
          alertBox(response_data.msg);
        }
      })
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: REQUEST_OTP_ERROR,
          payload: {
            isFetching: false,
            success: false,
            message: error
          }
        });
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};

export const verifyOTP_TM = ({ token, otp, navid = "", message = "", next = null }) => {
  const json_data = {
    path: "tm/otp_verify",
    body: {
      token: token + otp
    }
  };
  console.log("Verify OTP and Token: ", json_data);
  return dispatch => {
    dispatch({
      type: CHECK_OTP
    });
    return postOnly(json_data)
      .then(response => {
        console.log("Verify Token and OTP response: ", response.data);
        const response_data = response.data.data;
        const has_data = response_data.status == "ok";

        if (has_data) {
          dispatch({
            type: CHECK_OTPTM_SUCCESS,
            payload: {
              isFetching: false,
              success: true,
              message: ""
            }
          });
          if (message != "") {
            alertBox(message);
          }

          if (navid != "") {
            NavigationService.navigate(navid);
          }

          if(next) {
            next();
          }
        } else {
          dispatch({
            type: CHECK_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.message
            }
          });
          alertBox(response_data.message);
        }
      })
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: CHECK_OTP_ERROR,
          payload: {
            success: false,
            isFetching: false,
            message: error
          }
        });
      });
  };
};

const checkStatus = response => {
  return response.data.status == "ok";
};

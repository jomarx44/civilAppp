import ChangeMobileNumberScreen from "./ChangeMobileNumberScreen";

import { connect } from "react-redux";
import API from "../../actions/api";
import {
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
} from "../../actions/types";

const mapStateToProps = ({ cis, otp }) => ({
  cis: cis,
  otp: otp,
});

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    requestOTP: ({ mobile_number, save_info }) => {
      dispatch({
        type: REQUEST_OTP,
      });

      // const test = () => {
      //   dispatch({
      //     type: REQUEST_OTP_SUCCESS,
      //     payload: {
      //       token: "5479244",
      //     },
      //   });
      //   navigation.navigate("OTPChangeMobileNumberScreen", {
      //     phoneNumber: mobile_number,
      //   });
      // };

      // const testingInterval = setInterval(() => {
      //   test();
      //   clearInterval(testingInterval);
      // }, 2000);

      // return;

      API.requestOTP({
        mobile_number,
        save_info,
      })
        .then(({ data: { token, status, msg } }) => {
          if (token && token != "") {
            dispatch({
              type: REQUEST_OTP_SUCCESS,
              payload: {
                token: token,
              },
            });
            navigation.navigate("OTPChangeMobileNumberScreen", {
              phoneNumber: mobile_number,
            });
          } else {
            dispatch({
              type: REQUEST_OTP_ERROR,
              payload: {
                message: msg,
              },
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: REQUEST_OTP_ERROR,
            payload: {
              message: error,
            },
          });
        });
    },
  };
};

export const CreateMobileNumber = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeMobileNumberScreen);

export default CreateMobileNumber;

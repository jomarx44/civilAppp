import React, { useEffect } from "react";
import { Alert, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EmailConfirmationScreen } from "./EmailConfirmationScreen";
import { auth } from "../../API";

export const EmailConfirmationContainer = ({ otp }) => {
  useEffect(() => {
    getSignupData();
  }, []);

  useEffect(() => {
    otp.request();
  }, []);

  const onResendEmail = (userId) => {
    auth.resendEmail(userId)
      .then(({ data: { success } }) => {
        if(success) {
          alert("Email Verification successfully resent. Please check your email.")
        }
      })
      .catch()
  }

  const getSignupData = async () => {
    let signupData = await AsyncStorage.getItem("SIGNUP_DATA");
    if (signupData) {
      signupData = JSON.parse(signupData);
    }
  };

  return (
    <EmailConfirmationScreen
      email={}
      onResendEmail={() => onResendEmail()}
      onVerify={() => email.verify()}
    />
  );
};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    otp: {
      request: (params) => {
        dispatch();
      },
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailConfirmationContainer);

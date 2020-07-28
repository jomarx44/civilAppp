import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "react-native";

// Custom Component Here
import { ModifiedOTP } from "./ModifiedOTP";

// Others
import { transferMoney } from "../../API";

export const OTPTransferMoney = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const [token, setToken] = useState(null);
  const { route } = props;

  useEffect(() => {
    requestOTP();
  }, []);

  const requestOTP = () => {
    transferMoney
      .otp(accountNumber)
      .then(({ data: { data } }) => {
        const { token, ErrorMsg: errorMessage, ReturnCode: returnCode } = data[
          "Account.Info"
        ];
        if (token) {
          setToken(token);
        } else {
          Alert.alert(
            "Request OTP Failed",
            "Ooops! There's something wrong connecting to the server. Please try again."
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };

  const handleDone = (code) => {};

  return (
    <ModifiedOTP onDone={handleDone} isLoading={isLoading} loadingText="" />
  );
};

OTPTransferMoney.propTypes = {};

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    requestOTP: (accountNumber) => {
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPTransferMoney);

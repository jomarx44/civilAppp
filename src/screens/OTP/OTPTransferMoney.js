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
  const {
    navigation,
    route: {
      params: { formData },
    },
  } = props;

  useEffect(() => {
    // No Form Data passed
    if (!formData) {
      Alert.alert("OTP Failed", "You must review the transfer form first.", [
        { text: "Go Back", onPress: navigation.goBack },
      ]);
    } else {
      if(!token) {
        handleRequestOTP();
      }
    }
  }, []);

  const handleRequestOTP = () => {
    return transferMoney
      .otp(formData.sourceAccount.accountNumberFormatted)
      .then(({ data: { data } }) => {
        const { token, ErrorMsg: errorMessage } = data["Account.Info"];
        if (token) {
          return setToken(token);
        }

        Alert.alert("Invalid Account Number", errorMessage, [
          {
            text: "Retry",
            onPress: () => handleRequestOTP(),
          },
          {
            text: "Cancel",
            onPress: navigation.navigate("ReviewTransfer", {
              formData,
            }),
            style: "cancel",
          },
        ]);
      })
      .catch(() => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again.",
          [
            {
              text: "Retry",
              onPress: () => handleRequestOTP(),
            },
          ]
        );
      });
  };

  const handleDone = (code) => {
    setLoadingState(true);
    return transferMoney
      .transfer({
        amount: formData.amount,
        bankCode: formData.bankCode,
        recipientAccountNumber: formData.recipientAccountNumber,
        recipientMobileNumber: formData.recipientMobileNumber,
        recipientAccountName: formData.recipientAccountName,
        senderAccountNumber: formData.sourceAccount.accountNumber,
      }, { otp: code, token })
      .then(({ data: { data, status } }) => {
        const {
          ErrorMsg: errorMessage,
          inv
        } = data["Account.Info"];
        if( inv ) {
          navigation.navigate("SuccessTransferMoney", { formData })
        } else {
          Alert.alert("Transfer Money Failed", errorMessage);
        }
      })
      .catch(() => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again.",
          [
            {
              text: "Retry",
              onPress: () => handleDone(code),
            },
            {
              text: "Cancel",
              style: "cancel"
            },
          ]
        );
      })
      .finally(() => setLoadingState(false));
  };

  return (
    <ModifiedOTP onDone={handleDone} isLoading={isLoading} loadingText="Verifying OTP Code..." />
  );
};

OTPTransferMoney.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    requestOTP: (accountNumber) => {
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPTransferMoney);

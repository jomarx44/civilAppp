import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { ModifiedOTP } from "./ModifiedOTP";

// Others
import { OTP, profile } from "../../API";

export const OTPBankAccount = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [token, setToken] = useState(null);
  const {
    auth,
    navigation,
    route: { params },
  } = props;

  useEffect(() => {
    if (!params.formData) {
      Alert.alert(
        "Failed",
        "You need to fill-up the Edit Mobile Number form first.",
        [
          {
            text: "Ok",
            onPress: handleBack,
          },
        ]
      );
    } else {
      handleRequestOTP();
    }
  }, [params?.formData]);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //     handleBack();
  //   });
  // }, [navigation, params?.formData]);

  const handleRequestOTP = () => {
    OTP.request(
      {
        mobileNumber: params?.formData?.phoneNumber,
      },
      {
        mobileNumber: params?.formData?.phoneNumber,
      }
    )
      .then(({ data: { msg: message, status, token } }) => {
        if (token) {
          setToken(token);
          return true;
        }

        Alert.alert("Invalid Phone Number", message, [
          {
            text: "Retry",
            onPress: () => handleRequestOTP(),
          },
          {
            text: "Cancel",
            onPress: handleBack,
            style: "cancel",
          },
        ]);
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });

    return false;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveBankAccount = () => {
    setLoadingState(true);
    setLoadingText("Updating Mobile Number");
    profile
      .addAttribute({
        accessToken: auth.accessToken,
        attributeName: "phoneNumber",
        attributeValue: params?.formData?.phoneNumber,
      })
      .then(({ data: { success, message } }) => {
        if (success) {
          Alert.alert(
            "Change Mobile Number",
            "Mobile Number was successfully changed.",
            [
              {
                text: "Ok",
                onPress: () =>
                  navigation.navigate("ViewProfile", { reload: true }),
              },
            ]
          );
        } else {
          Alert.alert(
            "Change Mobile Number",
            "Failed while changing mobile number",
            [
              {
                text: "Retry",
                onPress: () => handleSaveBankAccount(),
              },
              {
                text: "Cancel",
                onPress: handleBack,
                style: "cancel",
              },
            ]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      })
      .finally(() => setLoadingState(false));
  };

  const handleDone = (code) => {
    setLoadingState(true);
    setLoadingText("Verifying OTP Code");
    OTP.verify(code, token)
      .then(({ data: { data } }) => {
        const { message, status } = data;
        if (status === "ok") {
          handleSaveBankAccount();
        } else {
          Alert.alert(
            "Mismatch Token and Code",
            "The OTP you entered is invalid. Please try again."
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      })
      .finally(() => setLoadingState(false));
  };

  return (
    <ModifiedOTP
      onDone={handleDone}
      isLoading={isLoading}
      loadingText={loadingText}
    />
  );
};

OTPBankAccount.propTypes = {};

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPBankAccount);

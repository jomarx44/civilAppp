import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert } from "react-native";
import { connect, useDispatch } from 'react-redux'
import { ModifiedOTP } from "./ModifiedOTP"

// Others
import { OTP, profile } from "../../API";


export const OTPLoginNonVerified = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState("Verifying OTP Code");
  const [token, setToken] = useState(null);
  const dispatch = useDispatch()
  const {
    auth,
    navigation,
    route: { params },
  } = props;

  useEffect(() => {
    if (!params?.phoneNumber) {
      Alert.alert(
        "Failed",
        "An error has occurred. Please try again.",
        [
          {
            text: "Ok",
            onPress: () => dispatch({type: "LOGOUT"}),
          },
        ]
      );
    } else {
      handleRequestOTP()
    }
  }, [params?.phoneNumber]);

  const handleRequestOTP = () => {
    console.log("Phone Number: ", params?.phoneNumber);
    OTP.request(
      {
        mobileNumber: params?.phoneNumber
      },
      {
        mobileNumber: params?.phoneNumber,
      }
    )
      .then(({ data: { msg: message, status, token } }) => {
        if (token) {
          console.log("Token: ", token)
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
    navigation.navigate("EmailConfirmation");
  };

  const handleDone = (code) => {
    setLoadingState(true);
    setLoadingText("Verifying OTP Code")
    OTP.verify(code, token)
      .then(({ data: { data } }) => {
        const { message, status } = data;
        if (status === "ok") {
          Alert.alert("Successful", "You have successfully verified your account.", [
            {
              text: "Ok",
              onPress: () => navigation.navigate("Login")
            }
          ])
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
    
  }

  return (
    <ModifiedOTP 
      onDone={handleDone}
      isLoading={isLoading}
      loadingText={loadingText}
    />
  )
}

OTPLoginNonVerified.propTypes = {}

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPLoginNonVerified);

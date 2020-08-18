import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { EmailConfirmation } from "./EmailConfirmation";
import { auth } from "../../API";
import { Loader } from "../../components";

export const EmailConfirmationContainer = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const {
    user: { createdList, createdListByIds },
    navigation,
  } = props;
  const createdUser = createdList[createdListByIds[0]]
    ? createdList[createdListByIds[0]]
    : { id: null, email: null };

  const handleResendEmail = () => {
    if(createdUser.id) {
      setLoadingState(true);
      setLoadingText("Resending...");
      auth
        .resendEmail(createdUser.id)
        .then(({ data: { success, message } }) => {
          if (success) {
            Alert.alert(
              "Resend Email Success",
              "Email Verification successfully resent. Please check your email."
            );
          } else {
            Alert.alert("Resend Email Failed", message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        })
        .finally(() => {
          setLoadingState(false);
          setLoadingText(null);
        });
    }
  };

  const handleVerifyEmail = () => {
    if(createdUser.id) {
      setLoadingState(true);
      setLoadingText("Verifying...");
      auth
        .verifyEmail(createdUser.id)
        .then(({ data }) => {
          if (data.isEmailVerified) {
            navigation.navigate("OTPMobileAccount", { phoneNumber: createdUser.phoneNumber });
          } else {
            Alert.alert(
              "Verification Failed",
              "Email Verification successfully resent. Please check your email."
            );
          }
        })
        .catch((error) => {
          Alert.alert(
            "Server Error",
            "Ooops! There's something wrong connecting to the server. Please try again."
          );
        })
        .finally(() => {
          setLoadingState(false);
          setLoadingText(null);
        });
    }
  };

  return (
    <React.Fragment>
      <EmailConfirmation
        data={createdUser}
        onResendEmail={() => handleResendEmail()}
        onVerify={() => handleVerifyEmail()}
      />
      <Loader isVisible={isLoading} loadingText={loadingText} />
    </React.Fragment>
  );
};

EmailConfirmationContainer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailConfirmationContainer);

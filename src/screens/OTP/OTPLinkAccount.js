import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { CIS, bankAccount } from "../../API";
import { ModifiedOTP } from "./ModifiedOTP";

export const OTPLinkAccount = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const {
    auth,
    navigation,
    route: { params },
  } = props;

  useEffect(() => {
    if (!params?.token) {
      Alert.alert(
        "Failed",
        "You need to fill-up the Link Account form first.",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("LinkAccount"),
          },
        ]
      );
    }
  }, [params?.token]);

  /**
   * Link Account Event Handler
   * @param {String} CISNumber CIS Number
   */
  const handleLinkAccount = (CISNumber) => {
    setLoadingState(true);
    setLoadingText("Linking Account...");
    bankAccount
      .link(CISNumber, auth.accessToken)
      .then(({ data: { success } }) => {
        if (success) {
          Alert.alert("Link Account", "Linked Account Successfully.", [
            {
              text: "Ok",
              onPress: () => navigation.navigate("Dashboard"),
            },
          ]);
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

  /**
   * CIS Verify Event Handler
   * @param {String} code OTP Code
   */
  const handleDone = (code) => {
    setLoadingState(true);
    setLoadingText("Verifying OTP Code...");
    CIS.verify(params.token, code)
      .then(({ data: { data } }) => {
        const { ErrorMsg: ErrorMessage, cis_no: CISNumber } = data[
          "Register.Info"
        ];
        if (CISNumber) {
          // Verified
          // Put CIS as attributes
          handleLinkAccount(CISNumber);
        } else {
          // Mismatch Token
          Alert.alert("Wrong OTP Code", ErrorMessage);
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

OTPLinkAccount.propTypes = {
  navigation: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth 
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPLinkAccount);

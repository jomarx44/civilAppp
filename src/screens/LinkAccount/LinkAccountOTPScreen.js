import React, { useState, useEffect } from "react";
import { Alert, View, Text } from "react-native";
import { connect } from "react-redux";

// Custom Component
import { OTPScreen } from "../OTPScreen";
import API from "../../actions/api";
import { requestUniqueId } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import {
  CHECK_OTP,
  CHECK_OTPTM_SUCCESS,
  CHECK_OTP_ERROR,
} from "../../actions/types";

export const LinkAccountOTPScreen = ({
  cis,
  otp,
  token,
  account,
  navigation: { navigate },
  verifyOTP,
  linkAccount,
}) => {
  const [OTPValue, setOTPValue] = useState("");

  useEffect(() => {
    if (otp.isVerified === true) {
      linkAccount({
        cis_no: cis.id,
        access_token: token.tokens.access_token
      })
    } else if (otp.isVerified === false) {
      Alert.alert("OTP", "Wrong OTP Code. Please try again");
    }
  }, [otp.isVerified]);

  useEffect(() => {
    if (account.isLinked) {
      Alert.alert("Link Account", "Linked Account Successfully.", [
        {
          text: "Ok",
          onPress: () => navigate("Dashboard"),
        },
      ]);
    }
  }, [account.isLinked]);

  const onDone = () => {
    verifyOTP({
      token: otp.token,
      otp: OTPValue,
    });
  };

  return (
    <OTPScreen
      onDone={onDone}
      otp={otp}
      value={OTPValue}
      setValue={setOTPValue}
    />
  );
};

const mapStateToProps = ({ otp, account, token, cis }) => ({
  cis,
  otp,
  token,
  account,
});

const mapDispatchToProps = (dispatch) => {
  return {
    verifyOTP: (payload) => {
      dispatch(API.verifyOTPBPBwithDispatch(payload));
    },
    linkAccount: (payload) => {
      dispatch(API.linkAccountWithDispatch(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkAccountOTPScreen);

import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

// Custom Component
import { OTPScreen } from "../OTPScreen";
import API from "../../actions/api";

export const LinkAccountOTPScreen = ({
  appAttribute,
  cis,
  otp,
  token,
  account,
  navigation: { navigate },
  verifyOTP,
  linkAccount,
  getAccounts
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
          onPress: () => {

            getAccounts(appAttribute.attributes.cis_no);
            navigate("Dashboard")
          },
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

const mapStateToProps = ({ appAttribute, otp, account, token, cis }) => ({
  appAttribute,
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
    },
    getAccounts: (cisno) => {
      dispatch(API.getAccounts(cisno));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkAccountOTPScreen);

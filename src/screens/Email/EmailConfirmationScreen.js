import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContainedButton, TextButton } from "../../components/Buttons";
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer";
import { EmailDescription } from "./EmailDescription";
import { EmailLogo } from "./EmailLogo";
import { EmailTitle } from "./EmailTitle";
import config from "../../config";

export const EmailConfirmationScreen = ({ email, onResendEmail, onVerify }) => {
  return (
    <React.Fragment>
      <View style={[styles.defaultContainerStyle]}>
        <EmailLogo
          image={require("res/images/ic_email_confirmation.png")}
          style={{ marginBottom: 15, marginTop: 60 }}
        />
        <EmailTitle style={{ marginBottom: 24 }}>Email Confirmation</EmailTitle>
        <EmailDescription
          style={{ marginBottom: 10, width: "80%", maxWidth: 400 }}
        >
          We have sent an email to {email} to confirm the validity of your email
          address. After receiving the email, we will be sending an OTP to your
          mobile number.
        </EmailDescription>
        <TextButton
          label="resent email confirmation"
          labelStyle={{
            color: config.colors.emailSecondary,
            fontFamily: "Avenir_Medium",
            fontSize: 16,
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
          onPress={onResendEmail}
        />
      </View>

      <FormButtonContainer containerStyle={{ marginTop: 25 }}>
        <ContainedButton
          buttonStyle={{
            backgroundColor: config.colors.emailSecondary,
          }}
          label="OK"
          loading={false}
          onPress={onVerify}
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export default EmailConfirmationScreen;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
  },
});

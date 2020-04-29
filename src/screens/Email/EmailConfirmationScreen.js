import React from "react";
import { StyleSheet, Text, View } from "react-native";

import PNTextButton from "../../library/components/Buttons/PNTextButton";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer";
import { EmailDescription } from "./EmailDescription";
import { EmailLogo } from "./EmailLogo";
import { EmailTitle } from "./EmailTitle";

// Others
import config from "../../config";

const EmailConfirmationScreen = ({ email }) => {
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
        <PNTextButton
          label="resent email confirmation"
          labelStyle={{
            color: config.colors.emailSecondary,
            fontFamily: "Avenir_Medium",
            fontSize: 16,
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
          onPress={() => {}}
        />
      </View>

      <FormButtonContainer containerStyle={{marginTop: 25}}>
        <PNContainedButton
          buttonStyle={{
            backgroundColor: config.colors.emailSecondary,
          }}
          label="OK"
          loading={false}
          onPress={() => {}}
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

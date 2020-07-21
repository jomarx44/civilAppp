import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { EmailDescription } from "./EmailDescription";
import { EmailLogo } from "./EmailLogo";
import { EmailTitle } from "./EmailTitle";
import { ContainedButton, TextButton } from "../../components/Buttons";
import { StackButtonView } from "../../layouts/Button";
import { ic_email_confirmation } from "../../res/images";
import { styles } from "./styles";
import config from "../../config";

export const EmailConfirmation = (props) => {
  const { data, onResendEmail, onVerify } = props;
  return (
    <React.Fragment>
      <View style={styles.container}>
        <EmailLogo image={ic_email_confirmation} />
        <EmailTitle>Email Confirmation</EmailTitle>
        <EmailDescription>
          We have sent an email to {data.email} to confirm the validity of your email
          address. After receiving the email, we will be sending an OTP to your
          mobile number.
        </EmailDescription>
        <TextButton
          label="resend email confirmation"
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
      <StackButtonView style={{ marginTop: 25 }}>
        <ContainedButton
          buttonStyle={{
            backgroundColor: config.colors.emailSecondary,
          }}
          label="OK"
          loading={false}
          onPress={onVerify}
        />
      </StackButtonView>
    </React.Fragment>
  );
};

EmailConfirmation.propTypes = {
  data: PropTypes.object,
  onResendEmail: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default EmailConfirmation;

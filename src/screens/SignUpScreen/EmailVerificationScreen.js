import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Dimensions,
  StyleSheet,
  View,
  PixelRatio
} from "react-native";
import { Container, Button, Text } from "native-base";

import styles from "styles/commonStyle";
import { connect } from "react-redux";
import API from "actions/api";
import { requestOTP_TM } from "../../reducers/OTPReducer/OTP_actions";
import { alertBox } from "../../actions/axiosCalls";
import * as Profile from "store/profile";
import { relativeTimeThreshold } from "moment";
import Overlay from "library/components/Overlay";

class EmailVerificationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signup_data: ""
  };

  getSignupData = async () => {
    let signupdata = await AsyncStorage.getItem("SIGNUP_DATA");
    signupdata = JSON.parse(signupdata);
    if (signupdata) {
      this.setState({ signup_data: signupdata });
    }
  };

  resend_email = () => {
    let { signup_data } = this.state;
    console.log("Signup Data: ", signup_data);
    this.props.resend_email(signup_data.id);
  }

  componentDidMount() {
    this.getSignupData();
  }

  checkEmailAndGoNext() {
    let { signup_data } = this.state;
    console.log("Signup Data: ", signup_data);
    if (signup_data) {
      this.props.checkEmail(signup_data.id);
    }
  }

  componentDidUpdate(prevProps) {

    if(prevProps.response !== this.props.response) {
      if (
        this.props.response.success &&
        this.props.response.action === "isEmailVerified"
      ) {
        // save the data
        console.log("Email Verified Response: ", this.props.response);
        if (this.props.response.isEmailVerified) {
          AsyncStorage.getItem("FORM_DATA").then(response => {
            response = JSON.parse(response);
            this.props.requestOTP_TM({
              mobile_number: response.phoneNumber,
              save_info: response,
              otpScreen: "OTPSignUp",
              toNavId: "Login",
              messageIfVerified: "Successfully Created!",
              shouldPutAttributes: false,
              next: () => {
                Profile.deleteSignUpData();
                Profile.deleteFormData();
              }
            });
          });
        } else {
          alertBox("Please verify you email account first.");
          console.log("status is " + this.props.response.status);
        }
      }
    }
  }

  render() {
    let { height, width } = Dimensions.get("window");
    let signup_data = this.state.signup_data;
    let email = "";
    if (signup_data.emails) {
      email = signup_data.emails[0].value;
    }

    return (
      <Container>
        <View
          style={[
            styles.containerBlue,
            { padding: 35, justifyContent: "center" }
          ]}
        >
          <View style={[{ flex: 1, alignItems: "center" }]}>
            <Image source={require("res/images/ic_email.png")} />
          </View>

          <View
            style={[
              { flex: 2, alignItems: "center", justifyContent: "flex-end" }
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Avenir_Medium",
                color: "#FFFFFF",
                fontSize: 32
              }}
            >
              Email Confirmation
            </Text>
            <View style={{ paddingHorizontal: 30, marginTop: 32 }}>
              <Text style={[localStyle.text, { fontSize: 16 }]}>
                We have sent an email to{" "}
                <Text style={[localStyle.text, { color: "#F5AC14" }]}>
                  {email}
                </Text>{" "}
                to confirm the validity of your email address. After receiving
                the email, we will be sending an OTP to your mobile number.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              { flex: 1, alignItems: "center", justifyContent: "flex-end" }
            ]}
            onPress={() => {this.resend_email()}}
          >
            <Text
              style={[
                localStyle.text,
                {
                  textDecorationLine: "underline",
                  fontSize: 16 / PixelRatio.getFontScale()
                }
              ]}
            >
              resend email confirmation
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              disabled={this.props.response.is_fetching || this.props.otp.isFetching}
              style={localStyle.button}
              onPress={() => this.checkEmailAndGoNext()}
            >
              { this.props.response.is_fetching || this.props.otp.isFetching ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={{color: '#FFF', fontFamily: 'Avenir_Medium', fontSize: 16}}>NEXT</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {this.props.response.resending && this.props.response.resent === null && (
          <Overlay>
            <ActivityIndicator color="#FFF" size="large" />
          </Overlay>
        )}
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  text: {
    fontFamily: "Avenir_Medium",
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "normal",
    lineHeight: 24
  },
  button: {
    backgroundColor: '#F5AC14',
    height: 50,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18
  }
});

const mapStateToProps = state => {
  console.log("OTP: ", state.otp);
  return {
    response: state.auth,
    otp: state.otp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkEmail: userId => {
      dispatch(API.checkEmail(userId));
    },
    requestOTP_TM: params => {
      dispatch(requestOTP_TM(params));
    },
    resend_email: params => {
      dispatch(API.resend_email(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationScreen);

import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
  PixelRatio
} from "react-native";
import {
  Container,
  Button,
  Text,
  Input
} from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import { Col, Row, Grid } from "react-native-easy-grid";

import NavigationService from "navigation/NavigationService.js";
import { connect } from "react-redux";
import { verifyOTP_BytePerByte } from "../../reducers/OTPReducer/OTP_actions"
import API from "../../actions/api";

const {
  height,
  width
} = Dimensions.get('window');

class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signup_data: "",
    form_data: "",
    sms_sent: false,
    is_navigated: false,
    access_token: "",
    counter: 0,
    otp: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: ""
  };

  componentDidUpdate(prevProps) {
    // const {
    //   response: {
    //     success,
    //     action
    //   }
    // } = this.props;
    // if (
    //   success &&
    //   action === "isOTPCorrect" &&
    //   this.state.is_navigated == false
    // ) {
    //   NavigationService.navigate("ConnectCreateAccountScreen");
    // }
  }

  getSignupData = async () => {
    let signupdata = await AsyncStorage.getItem("SIGNUP_DATA");
    signupdata = JSON.parse(signupdata);
    if (signupdata) {
      this.setState({ signup_data: signupdata });
    }
  };

  getFormData = async () => {
    let formdata = await AsyncStorage.getItem("FORM_DATA");
    formdata = JSON.parse(formdata);
    if (formdata) {
      this.setState({ form_data: formdata });
      this.props.loginInitial(
        this.state.signup_data.emails[0].value,
        formdata.password
      );
    }
  };

  onPressedDigit = value => {
    let { otp, counter } = this.state;
    otp += value;
    counter += 1;
    this.setState({ counter: counter });
    this.setState({ otp: otp });

    this.setState({ [`d${counter}`]: value});
    if(counter == 7) {
      this.props.verifyOTP_BytePerByte({
        token: this.props.token.token,
        otp
      });
    }
  };

  componentDidMount() {
    this.getSignupData();
    this.getFormData();
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  render() {
    const { d1, d2, d3, d4, d5, d6, d7 } = this.state;
    return (
      <Container>
        <View style={[styles.containerBlue, { flex: 1 }]}>
          <View style={[{ flex: 1, marginTop: 40 }]}>
            <Text
              style={[
                localStyle.text,
                { fontSize: 32 / PixelRatio.getFontScale() }
              ]}
            >
              OTP
            </Text>
            <Text
              style={[
                localStyle.text,
                { fontSize: 16 / PixelRatio.getFontScale() }
              ]}
            >
              Please type the verification code sent to your mobile number.
            </Text>
          </View>

          <View style={[{ flex: 1 }]}>
            <View style={localStyle.item}>
              <Grid style={styles.grid}>
                <Col style={[localStyle.digit]}>
                  <Input value={d1} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d2} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d3} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d4} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d5} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d6} style={localStyle.digit_text} />
                </Col>
                <Col style={[localStyle.digit]}>
                  <Input value={d7} style={localStyle.digit_text} />
                </Col>
              </Grid>
            </View>
          </View>
          <View style={[{ flex: 4 }]}>
            <View style={localStyle.kpgrid}>
              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("1")}
                  >
                    <Text style={localStyle.kptext}>1</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("2")}
                  >
                    <Text style={localStyle.kptext}>2</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("3")}
                  >
                    <Text style={localStyle.kptext}>3</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("4")}
                  >
                    <Text style={localStyle.kptext}>4</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("5")}
                  >
                    <Text style={localStyle.kptext}>5</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("6")}
                  >
                    <Text style={localStyle.kptext}>6</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("7")}
                  >
                    <Text style={localStyle.kptext}>7</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("8")}
                  >
                    <Text style={localStyle.kptext}>8</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("9")}
                  >
                    <Text style={localStyle.kptext}>9</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("")}
                  >
                    <Text style={localStyle.kptext}></Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("0")}
                  >
                    <Text style={localStyle.kptext}>0</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.onPressedDigit("<")}
                  >
                    <Text style={localStyle.kptext}>&lt;</Text>
                  </Button>
                </Col>
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  digit: {
    marginHorizontal: '2.25%',
    backgroundColor: "#FFFFFF"
  },
  digit_text: {
    fontFamily: 'OpenSans_Bold',
    fontSize: 16,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    height: 35,
    paddingHorizontal: '1.45%',
    marginTop: '3%',
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: "#FFFFFF"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },
  kptext: {
    flex: 1,
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center"
  },
  kpdigit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  kpgrid: {
    flex: 4,
    flexDirection: "column"
  },
  kprow: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    flexDirection: "row"
  },

  kpitem: {
    height: 52,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const { token, cis } = state;

  return {
    token,
    cis
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginInitial: (username, password) => {
      dispatch(API.loginInitial(username, password));
    },
    verifyOTP_BytePerByte: (token, otp) => {
      dispatch(verifyOTP_BytePerByte(token, otp));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);

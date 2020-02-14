// TO BE REFACTORED!!
// To be done:
// * Dynamic OTP Functions and Hooks
// ** Will put the request OTP Handler Here
// ** Function to be used on Verify
// ** Functions to be used After Verification
// ** Dynamic Navigation Route
// * Separated Components for each Items
// * To be moved on OTPScreen

import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
  PixelRatio
} from "react-native";
import { Container, Button, Text, Input } from "native-base";
import Overlay from "../../library/components/Overlay";

import styles from "styles/commonStyle";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import { Col, Row, Grid } from "react-native-easy-grid";

import { connect } from "react-redux";
import { verifyOTP_TM } from "../../reducers/OTPReducer/OTP_actions";
import {
  requestUniqueId,
  putAttributes
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";

const { height, width } = Dimensions.get("window");

class OTPOpenAccountScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

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
    const { otp, putAttributes, requestUniqueId, appAttribute } = this.props;

    if (prevProps.otp !== otp) {
      console.log("REQUEST ID");
      if (!otp.isFetching && otp.success) {
        requestUniqueId(appAttribute.temporary_attributes);
      }
    }

    if (prevProps.appAttribute !== appAttribute) {
      if (
        appAttribute &&
        !appAttribute.is_fetching &&
        appAttribute.temporary_key
      ) {
        console.log("HERE NA!", this.props.navigation.getParam('shouldPutAttributes'));
        console.log('App Attribute: ', appAttribute);
        if(this.props.navigation.getParam('shouldPutAttributes') == true) {
          AsyncStorage.getItem("ACCESS_TOKEN").then(response => {
            const data = {
              attribute_name: appAttribute.temporary_key,
              attribute_value: appAttribute.temporary_attributes,
              access_token: response
            };
            console.log("appAttribute: ", appAttribute)
              putAttributes(data);
          });
        }
      }
    }
  }

  // On Remove Digit
  handleRemove = async() => {
    let {otp, counter} = this.state;
    otp = otp.slice(0, -1);
    this.setState({[`d${counter}`]: ''});
    if(counter > 0) {
      counter -= 1;
    }
    this.setState({counter, otp });
  }

  handlePressDigit = value => {
    let { otp, counter } = this.state;
    otp += value;
    counter += 1;
    this.setState({ counter: counter });
    this.setState({ otp: otp });

    this.setState({ [`d${counter}`]: value });
    if (counter == 7) {
      const { getParam } = this.props.navigation;
      // console.log(this.props.navigation.getParam('navid'));
      this.props.verifyOTP_TM({
        token: this.props.otp.token,
        otp,
        navid: getParam('navid') ? getParam('navid') : '',
        message: getParam('message') ? getParam('message') : '',
        next: getParam('next') ? getParam ('next') : null
      });
    }
  };

  render() {
    const { appAttribute, otp } = this.props;

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
                <Col style={[localStyle.digit, d1 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d1} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d2 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d2} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d3 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d3} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d4 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d4} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d5 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d5} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d6 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d6} style={[localStyle.digit_text]} editable={false} />
                </Col>
                <Col style={[localStyle.digit, d7 != '' && {borderBottomWidth: 0}]}>
                  <Input value={d7} style={[localStyle.digit_text]} editable={false} />
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
                    onPress={() => this.handlePressDigit("1")}
                  >
                    <Text style={localStyle.kptext}>1</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("2")}
                  >
                    <Text style={localStyle.kptext}>2</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("3")}
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
                    onPress={() => this.handlePressDigit("4")}
                  >
                    <Text style={localStyle.kptext}>4</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("5")}
                  >
                    <Text style={localStyle.kptext}>5</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("6")}
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
                    onPress={() => this.handlePressDigit("7")}
                  >
                    <Text style={localStyle.kptext}>7</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("8")}
                  >
                    <Text style={localStyle.kptext}>8</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("9")}
                  >
                    <Text style={localStyle.kptext}>9</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handlePressDigit("0")}
                  >
                    <Text style={localStyle.kptext}>0</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button
                    transparent
                    light
                    onPress={() => this.handleRemove()}
                  >
                    <Text style={localStyle.kptext}>&lt;</Text>
                  </Button>
                </Col>
              </View>
            </View>
          </View>
        </View>
        { (appAttribute.isUpdating || otp.isFetching) && (
          <Overlay>
            <ActivityIndicator color="#FFF" size="large" />
          </Overlay>
        )}
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  digit: {
    marginHorizontal: "2.25%",
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1
  },
  digit_text: {
    color: '#ffffff',
    fontFamily: "Avenir_Medium",
    fontSize: 29,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    height: 35,
    paddingHorizontal: "1.45%",
    marginTop: "3%",
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
  const { appAttribute, token, otp } = state;

  return {
    appAttribute,
    token,
    otp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyOTP_TM: (token, otp) => {
      dispatch(verifyOTP_TM(token, otp));
    },
    putAttributes: params => {
      dispatch(putAttributes(params));
    },
    requestUniqueId: attributes => {
      dispatch(requestUniqueId(attributes));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPOpenAccountScreen);

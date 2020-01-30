import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  Container,
  Button,
  Text,
} from "native-base";
import { connect } from "react-redux";
import { setLoggedState } from "store/auth";
import { alertBox } from "../../actions/axiosCalls.js";
import KeyboardShift from "library/components/CDKeyboardShift.js";
import styles from "styles/commonStyle";
import NavigationService from "navigation/NavigationService.js";

// APIs
import API from "actions/api";
import IBMAppId from "../../actions/ibmappid";

// Action Creator
import { getAttributes, putAttributes } from '../../reducers/AppAttributeReducer/AppAttribute_actions';
import * as LocalAuthentication from "expo-local-authentication";
import * as Profile from "../../store/profile";

class LoginScreen extends React.Component {
  input_username;
  input_password;

  state = {
    isReady: false,
    compatible: false,
    fingerprints: false,
    user: {
      username: "riczenn@thousandminds.com",
      password: "qwertyuiop"
    },
    result: ""
  };

  componentDidMount() {
    //this.checkDeviceForHardware();
    //this.checkForFingerprints();
    //this.getLoginInformation();
  }

  componentDidUpdate(prevProps) {
    const { response, userInfo, getAppAttributes, updateAppAttributes } = this.props;
    // if (this.props.response) {
    //   // NavigationService.navigate("DashboardScreen");
    //   console.log('HERRE!');
    //   NavigationService.navigate("AnnouncementScreen");
    // }
    if (
      !response.is_fetching &&
      response.success &&
      response.action === "signin"
    ) {
      userInfo(response.access_token);
      AsyncStorage.setItem('ACCESS_TOKEN', response.access_token)

      // putAttributes({
      //   attribute_name: 'alvin',
      //   attribute_value: {
      //     first_name: 'Alvin',
      //     middle_name: 'Viernes',
      //     last_name: 'Ching',
      //     mobile_number: '09953186216',
      //     email_address: 'alvin@thousandminds.com',
      //     address: 'Zone 6, San Patricio, Delfin Albano, Isabela',
      //   },
      //   access_token: response.access_token
      // });
      NavigationService.navigate("AnnouncementScreen");
    }

    // if (
    //   this.props.response.meta &&
    //   this.props.response.meta.resourceType &&
    //   this.props.response.meta.resourceType === "User"
    // ) {
    //   console.log('META: ', this.props.response);
    //   Profile.setSignUpData(this.props.response);
    //   // NavigationService.navigate("DashboardScreen");
    //   NavigationService.navigate("AnnouncementScreen");
    // }
  }

  getLoginInformation = async () => {
    let accessData = await AsyncStorage.getItem("ACCESS_DATA");
    if (accessData !== null) {
      accessData = JSON.parse(accessData);
      this.setState({
        isModal: false
      });
      this.scanFingerprint();
    }
  };

  onChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({ user: user });
  };

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your finger."
    });
    // console.log("Scan Result:", result);
  };

  showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            this.scanFingerprint();
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel"
        }
      ]
    );
  };

  handleDataReceived(msgData) {
    // add to profile data
    Profile.setProfileData(msgData.data.attributes);
    Profile.setAccessData(msgData.data.accessData);
    setLoggedState("Authenticated");

    this.setState({
      text2: `Message from web view ${msgData}`
    });
    msgData.isSuccessfull = true;
  }

  login() {
    const { user } = this.state;
    this.props.login(user.username, user.password);
  }

  render() {
    let { height, width } = Dimensions.get("window");
    const { is_fetching, message, success } = this.props.response;

    if (!is_fetching && message && !success) {
      alertBox(message);
    }

    return (
      <Container style={styles.containerBlue}>
        <KeyboardShift>
          {() => (
            <View>
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={[
                      buttonStyles.logo,
                      {
                        width: width - 30,
                        height: height * 0.09,
                        marginTop: height * 0.2
                      }
                    ]}
                    source={require("res/images/ic_logo_login.png")}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <TextInput
                    placeholder="Email"
                    onChangeText={text => this.onChangeText(text, "username")}
                    ref={input => {
                      this.input_username = input;
                    }}
                    style={[buttonStyles.textbox, {}]}
                  />

                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.onChangeText(text, "password")}
                    ref={input => {
                      this.input_password = input;
                    }}
                    style={[buttonStyles.textbox, {}]}
                  />

                  <Button
                    full
                    transparent
                    light
                    onPress={() =>
                      NavigationService.navigate("ForgotPasswordScreen")
                    }
                    style={buttonStyles.forgotButtonTrans}
                  >
                    <Text style={[{ fontWeight: "bold" }]}>
                      FORGOT PASSWORD?
                    </Text>
                  </Button>

                  <Button
                    full
                    style={buttonStyles.button}
                    onPress={() => this.login()}
                    disabled={is_fetching}
                  >
                    {is_fetching ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text>LOGIN</Text>
                    )}
                  </Button>

                  <Button
                    full
                    transparent
                    light
                    onPress={() => NavigationService.navigate("SignUpScreen")}
                    style={buttonStyles.buttonTrans}
                  >
                    <Text style={[{ fontWeight: "bold" }]}>
                      CREATE MOBILE ACCOUNT
                    </Text>
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}
        </KeyboardShift>
      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  logo: {
    // height: 70,
    marginBottom: 70
  },
  button: {
    height: 50,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "#f5ac14"
  },
  buttonTrans: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  textbox: {
    height: 48,
    marginTop: 20,
    marginLeft: 30,
    paddingLeft: 20,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  forgotButtonTrans: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    response: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(API.login(username, password));
    },
    userInfo: token => {
      dispatch(IBMAppId.getUserInfo(token));
    },
    getAttributes: (parameters) => {
      dispatch(getAttributes(parameters));
    },
    putAttributes: (parameters) => {
      dispatch(putAttributes(parameters));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

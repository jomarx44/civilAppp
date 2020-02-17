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
import KeyboardShift from "library/components/CDKeyboardShift.js";
import styles from "styles/commonStyle";
import NavigationService from "navigation/NavigationService.js";

// APIs
import API from "actions/api";
import IBMAppId from "../../actions/ibmappid";

// Action Creator
import { getAttributes, putAttributes } from '../../reducers/AppAttributeReducer/AppAttribute_actions';
import * as LocalAuthentication from "expo-local-authentication";
import * as Profile from "store/profile";

class LoginScreen extends React.Component {
  input_username;
  input_password;

  state = {
    isReady: false,
    compatible: false,
    fingerprints: false,
    user: {
      // username: "alvinching.official@gmail.com",
      // password: "alvinviernes"
      username: '',
      password: ''
    },
    result: "",
    signupdata: {}
  };
  
  static navigationOptions = {
    header: null
  }
  
  async componentDidMount() {
    //this.checkDeviceForHardware();
    //this.checkForFingerprints();
    //this.getLoginInformation();
    let signupdata = await AsyncStorage.getItem("SIGNUP_DATA");
    console.log(signupdata);
    signupdata = JSON.parse(signupdata);
    this.setState({ signupdata: signupdata })
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
      Profile.setAccessToken(response.access_token)
    }
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
                    value={this.state.user.username}
                  />

                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.onChangeText(text, "password")}
                    ref={input => {
                      this.input_password = input;
                    }}
                    style={[buttonStyles.textbox, {}]}
                    value={this.state.user.password}
                  />

                  <Button
                    full
                    transparent
                    light
                    onPress={() =>
                      NavigationService.navigate("ForgotPassword")
                    }
                    style={buttonStyles.forgotButtonTrans}
                  >
                    <Text style={{margin:0, padding: 0}}>
                      FORGOT PASSWORD
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
                      <Text style={buttonStyles.buttonText}>LOGIN</Text>
                    )}
                  </Button>

                  <Button
                    full
                    transparent
                    light
                    onPress={() => {
                      if (this.state.signupdata) {
                        NavigationService.navigate("EmailVerification");
                      } else {
                        NavigationService.navigate("CreateMobileAccount");
                      }
                        // NavigationService.navigate("EmailVerification");
                    }}
                    // onPress={() => NavigationService.navigate("EmailVerification")}
                    style={buttonStyles.buttonTrans}
                  >
                    <Text style={buttonStyles.buttonTransText}>
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
    borderRadius: 4,
    height: 50,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "#f5ac14"
  },
  buttonText: {
    fontFamily: 'Avenir_Heavy',
    fontSize: 16
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
  buttonTransText: {
    fontFamily: 'Avenir_Heavy',
    fontSize: 16
  },
  textbox: {
    height: 48,
    marginTop: 20,
    marginLeft: 30,
    paddingLeft: 20,
    marginRight: 30,
    borderRadius: 4,
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
    justifyContent: "flex-end",
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

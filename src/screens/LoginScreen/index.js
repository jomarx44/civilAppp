import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";

// APIs

// Custom Components
import Modal from "react-native-modal";
import KeyboardShift from "library/components/KeyboardShift";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";

// Others
import config from "../../config";
import API from "../../actions/api";
import IBMAppId from "../../actions/ibmappid";
import * as Profile from "store/profile";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import {
  getAttributes,
  putAttributes,
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";

const { height, width } = Dimensions.get("window");

export const ModalLoginFingerprint = ({
  isVisible,
  isFingerprintSuccess,
  setModalVisibility,
}) => (
  <Modal
    isVisible={isVisible}
    style={modalStyle.defaultContainerStyle}
    onBackButtonPress={() => {}}
  >
    <View style={modalStyle.defaultContentStyle}>
      <Image
        style={modalStyle.fingerprintIconStyle}
        source={
          isFingerprintSuccess
            ? require("res/images/ic_fingerprint_confirmed.png")
            : require("res/images/ic_fingerprint.png")
        }
        resizeMode="cover"
      />
      <Text
        style={[
          modalStyle.fingerprintTextStyle,
          { color: isFingerprintSuccess ? "#f9A010" : "#5D646C" },
        ]}
      >
        {isFingerprintSuccess
          ? "Fingerprint Verified"
          : "Touch the fingerprint sensor to login."}
      </Text>
      <PNContainedButton
        onPress={() => {
          setModalVisibility(false);
          cancelAuthenticate();
        }}
        label="Try login instead"
        buttonStyle={{ marginTop: 20 }}
        disabled={isFingerprintSuccess}
      />
    </View>
  </Modal>
);

export const LoginScreen = ({
  loginByFingerprint,
  navigation,
  userInfo,
  getAttributes,
  response,
  login,
  token,
}) => {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [fingerprintToken, setFingerprintToken] = useState(null);
  const [signupData, setSignupData] = useState({});
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isFingerprintSuccess, setIsFingerprintSuccess] = useState(false);
  const [isScanning, setScanningStatus] = useState(false);
  const [user, setUser] = useState({
    // username: "alvin@thousandminds.com",
    // password: "alvinviernes",
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log("response: ", response);
    if (token.tokens) {
      getAttributes({
        name: "cis_no",
        access_token: token.tokens.access_token,
      });
      userInfo(token.tokens.access_token);
      Profile.setAccessToken(token.tokens.access_token);
    }
  }, [token]);

  useEffect(() => {
    AsyncStorage.getItem("fingerprintToken").then((token) => {
      setFingerprintToken(token);
      checkDeviceHardware();
      checkEnrolledFingerprints();
    });

    AsyncStorage.getItem("SIGNUP_DATA").then((data) => {
      data = JSON.parse(data);
      setSignupData(data);
    });
  }, []);

  useEffect(() => {
    if (isCompatible && isEnrolled) {
      console.log("Compatible and Enrolled");
      if (fingerprintToken && isScanning == false) {
        console.log("Scanning...");
        setModalVisibility(true);
        scan();
      }
    }
  }, [fingerprintToken, isCompatible, isEnrolled]);

  const input_username = useRef();
  const input_password = useRef();

  const checkDeviceHardware = async () => {
    const isHardwareSupported = await hasHardwareAsync();
    setIsCompatible(isHardwareSupported);
  };

  const checkEnrolledFingerprints = async () => {
    const hasEnrolledFingerprint = await isEnrolledAsync();
    setIsEnrolled(hasEnrolledFingerprint);
  };

  const scan = async () => {
    setScanningStatus(true);
    console.log("Scan()");
    const { success, error } = await authenticateAsync({ promptMessage: "" });
    console.log("Error: ", error);
    if (success) {
      setScanningStatus(false);
      setIsFingerprintSuccess(true);
      loginByFingerprint(fingerprintToken);
    } else if( error == "authentication_failed" || error == "too_fast"){
        Alert.alert(
          "Invalid Fingerprint",
          "Please try touching the fingerprint sensor again.",
          [
            {
              text: "Ok",
              onPress: () => scan(),
            },
          ]
        );
    } else {
      cancelAuthenticate();
    }
  };

  const onChangeText = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: "#309fe7",
      }}
    >
      <KeyboardShift>
        {() => (
          <View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={[
                    buttonStyles.logo,
                    {
                      width: width - 30,
                      height: height * 0.09,
                      marginTop: height * 0.2,
                    },
                  ]}
                  source={config.company.logo.login}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Email"
                  onChangeText={(text) => onChangeText("username", text)}
                  ref={input_username}
                  style={[buttonStyles.textbox, {}]}
                  value={user.username}
                />

                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => onChangeText("password", text)}
                  ref={input_password}
                  style={[buttonStyles.textbox, {}]}
                  value={user.password}
                />

                <Button
                  full
                  transparent
                  light
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={buttonStyles.forgotButtonTrans}
                >
                  <Text style={{ margin: 0, padding: 0 }}>FORGOT PASSWORD</Text>
                </Button>

                <Button
                  full
                  style={buttonStyles.button}
                  onPress={() => login(user.username, user.password)}
                  disabled={response.is_fetching}
                >
                  {response.is_fetching ? (
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
                    if (signupData) {
                      navigation.navigate("EmailVerification");
                    } else {
                      navigation.navigate("CreateMobileAccount");
                    }
                  }}
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
      <ModalLoginFingerprint
        isVisible={isModalVisible}
        isFingerprintSuccess={isFingerprintSuccess}
        setModalVisibility={setModalVisibility}
      />
    </Container>
  );
};

let buttonStyles = StyleSheet.create({
  logo: {
    // height: 70,
    marginBottom: 70,
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
    backgroundColor: "#f5ac14",
  },
  buttonText: {
    fontFamily: "Avenir_Heavy",
    fontSize: 16,
  },
  buttonTrans: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTransText: {
    fontFamily: "Avenir_Heavy",
    fontSize: 16,
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
    backgroundColor: "#FFFFFF",
  },
  forgotButtonTrans: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const modalStyle = StyleSheet.create({
  defaultContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultContentStyle: {
    alignItems: "center",
    backgroundColor: "white",
    height: 400,
    justifyContent: "center",
    padding: 25,
    width: 300,
  },
  fingerprintIconStyle: {
    height: 128,
    marginBottom: 40,
    width: 128,
  },
  fingerprintTextStyle: {
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
});

const mapStateToProps = ({ auth, token }) => {
  console.log("Token: ", token);
  return {
    response: auth,
    token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(API.login(username, password));
    },
    loginByFingerprint: (refreshToken) => {
      dispatch(API.loginByFingerprint(refreshToken));
    },
    userInfo: (token) => {
      dispatch(IBMAppId.getUserInfo(token));
    },
    getAttributes: (parameters) => {
      dispatch(getAttributes(parameters));
    },
    putAttributes: (parameters) => {
      dispatch(putAttributes(parameters));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";

// APIs

// Custom Components
import Modal from "react-native-modal";
import KeyboardShift from "library/components/KeyboardShift";
import PlaceholderInputBox from "../../library/components/Form/Inputs/InputBox/PlaceholderInputBox";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import PNTextButton from "../../library/components/Buttons/PNTextButton";

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
import { useSafeArea } from 'react-native-safe-area-context';


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

  const inset = useSafeArea();

  useEffect(() => {
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
      if (fingerprintToken && isScanning == false) {
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

    const { success, error } = await authenticateAsync({ promptMessage: "" });

    if (success) {
      setScanningStatus(false);
      setIsFingerprintSuccess(true);
      loginByFingerprint(fingerprintToken);
    } else if (error == "authentication_failed" || error == "too_fast") {
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
    <React.Fragment>
      <KeyboardShift>
        <View
          style={{
            flex: 1,
            backgroundColor: "#309fe7",
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              flex: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={[buttonStyles.logo]}
              source={config.company.logo.login}
            />
          </View>
          <View style={{ flex: 4 }}>
            <PlaceholderInputBox
              onChangeText={(text) => onChangeText("username", text)}
              onSubmitEditing={() => input_password.current.focus()}
              placeholder="Email"
              ref={input_username}
              value={user.username}
            />
            <PlaceholderInputBox
              onChangeText={(text) => onChangeText("password", text)}
              placeholder="Password"
              ref={input_password}
              secureTextEntry={true}
              style={{marginBottom: 0}}
              value={user.password}
            />
            <Button
              full
              transparent
              light
              onPress={() => navigation.navigate("ForgotPassword")}
              style={buttonStyles.forgotButtonTrans}
            >
              <Text style={{ color: "#FFF", margin: 0, padding: 0 }}>
                FORGOT PASSWORD
              </Text>
            </Button>

            <PNContainedButton
              disabled={response.is_fetching}
              label="LOGIN"
              loading={response.is_fetching}
              onPress={() => login(user.username, user.password)}
            />

            <PNTextButton
              disabled={response.is_fetching}
              label="CREATE MOBILE ACCOUNT"
              loading={response.is_fetching}
              onPress={() => {
                signupData
                  ? navigation.navigate("EmailVerification")
                  : navigation.navigate("CreateMobileAccount");
              }}
              buttonStyle={{ marginTop: 10 }}
            />
          </View>
        </View>
      </KeyboardShift>
      <ModalLoginFingerprint
        isVisible={isModalVisible}
        isFingerprintSuccess={isFingerprintSuccess}
        setModalVisibility={setModalVisibility}
      />
    </React.Fragment>
  );
};

let buttonStyles = StyleSheet.create({
  logo: {
    // height: 70,
    width: 270,
    height: 45,
  },
  forgotButtonTrans: {
    fontSize: 18,
    marginTop: 5,
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

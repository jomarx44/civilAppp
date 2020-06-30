import * as Profile from "store/profile";

import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ContainedButton, TextButton } from "../../components/Buttons";
import React, { useEffect, useRef, useState } from "react";
// Custom Components
import {
  authenticateAsync,
  cancelAuthenticate,
  hasHardwareAsync,
  isEnrolledAsync,
} from "expo-local-authentication";
import {
  getAttributes,
  putAttributes,
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";

import API from "../../actions/api";
import { Button } from "native-base";
import IBMAppId from "../../actions/ibmappid";
import KeyboardShift from "library/components/KeyboardShift";
import PlaceholderInputBox from "../../library/components/Form/Inputs/InputBox/PlaceholderInputBox";
// Others
import config from "../../config";
import { connect } from "react-redux";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// APIs



export const LoginScreen = ({
  loginByFingerprint,
  navigation,
  userInfo,
  getAttributes,
  response,
  login,
  token,
}) => {
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

  const inset = useSafeAreaInsets();

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
    });

    AsyncStorage.getItem("SIGNUP_DATA").then((data) => {
      data = JSON.parse(data);
      setSignupData(data);
    });
  }, []);

  useEffect(() => {
      if (fingerprintToken && isScanning == false) {
        setModalVisibility(true);
        scan();
      }
  }, [fingerprintToken]);

  const input_username = useRef();
  const input_password = useRef();

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

            <ContainedButton
              disabled={response.is_fetching}
              label="LOGIN"
              loading={response.is_fetching}
              onPress={() => login(user.username, user.password)}
            />

            <TextButton
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

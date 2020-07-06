import React, { useState, useEffect } from "react";
import { Alert, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Login } from "./Login";
import {
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { auth, token, attribute,  } from "../../API"
import { login } from "../../redux/auth/actions"

export const LoginContainer = (props) => {
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

  const {
    loginByFingerprint,
    navigation,
    userInfo,
    getAttributes,
    auth,
    login,
    token,
  } = props;

  useEffect(() => {
    if (token && token.tokens) {
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
      handleScan();
    }
  }, [fingerprintToken]);

  const handleChangeText = (id, value) => {
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleLogin = () => {
    login(user.username, user.password)
    console.log("User Data: ", user);
  };

  const handleCreate = () => {
    if(signupData) {
      return navigation.navigate("EmailVerification")
    }

    return navigation.navigate("CreateMobileAccount");
  };

  const handleScan = async () => {
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
            onPress: () => handleScan(),
          },
        ]
      );
    } else {
      cancelAuthenticate();
    }
  };

  return (
    <Login
      data={user}
      isLoggingIn={auth && auth.status.isLoggingIn}
      onChangeText={handleChangeText}
      onPressCreate={handleCreate}
      onLogin={handleLogin}
      isVisible={isModalVisible}
      setVisibility={setModalVisibility}
    />
  );
};

const mapStateToProps = ({ auth, token }) => {
  return {
    auth,
    token,
  }
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
  loginByFingerprint: (refreshToken) => {
    dispatch(token.getByRefreshToken(refreshToken));
  },
  userInfo: (token) => {
    dispatch(IBMAppId.getUserInfo(token));
  },
  getAttributes: (parameters) => {
    dispatch(attribute.get(parameters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

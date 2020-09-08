import React, { useEffect, useState } from "react";
import { Alert, AsyncStorage } from "react-native";
import { attribute, token } from "../../API";
import {
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { connect, useDispatch } from "react-redux";

import { Login } from "./Login";
import { SignupDataAsyncStorage } from "../../helpers/asyncStorage";
import { addCreatedUser } from "../../redux/user/actions";
import { getUserInfoAsync } from "../../redux/user/actions";
import { loginAsync, loginByFingerprintAsync } from "../../redux/auth/actions";

export const LoginContainer = (props) => {
  const [fingerprintToken, setFingerprintToken] = useState(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isFingerprintSuccess, setIsFingerprintSuccess] = useState(false);
  const [isScanning, setScanningStatus] = useState(false);
  const [userData, setUserData] = useState({
    // username: "alvin@thousandminds.com",
    // password: "alvinviernes",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const {
    loginByFingerprint,
    navigation,
    getUserInfo,
    getProfile,
    getAttributes,
    auth,
    login,
    token,
    user,
  } = props;

  useEffect(() => {
    // Check if fingerprint login status and fingerprint token
    AsyncStorage.getItem("fingerprintToken").then((token) => {
      setFingerprintToken(token);
    });

    SignupDataAsyncStorage.get().then((data) => {
      if (data) {
        dispatch(addCreatedUser(JSON.parse(data)));
      }
    });
  }, []);

  useEffect(() => {
    console.log('auth', auth)
    if (auth && auth.accessToken) {
      getUserInfo(auth.accessToken);
      // Profile.setAccessToken(auth.accessToken);
    } else if (auth && auth.error) {
      Alert.alert("Login failed", auth.error);
    }
  }, [auth]);

  useEffect(() => {
    if (fingerprintToken && isScanning == false) {
      setModalVisibility(true);
      handleScan();
    }
  }, [fingerprintToken]);

  const handleChangeText = (id, value) => {
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  const handleLogin = () => {
    login(userData.username, userData.password);
  };

  const handleCreate = () => {
    if (user.createdListByIds.length > 0) {
      return navigation.navigate("EmailConfirmation");
    }

    return navigation.navigate("CreateMobileAccount");
  };

  const handleScan = async () => {
    setScanningStatus(true);

    const { success, error } = await authenticateAsync({
      promptMessage: "Scan your fingerprint to access to app",
    });

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
      data={userData}
      isLoggingIn={auth && auth.status.isLoggingIn}
      onChangeText={handleChangeText}
      onPressCreate={handleCreate}
      onLogin={handleLogin}
      isVisible={isModalVisible}
      setVisibility={setModalVisibility}
    />
  );
};

const mapStateToProps = ({ auth, token, user }) => {
  return {
    auth,
    token,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(loginAsync(username, password));
  },
  loginByFingerprint: (refreshToken) => {
    dispatch(loginByFingerprintAsync(refreshToken));
  },
  getUserInfo: (accessToken) => {
    dispatch(getUserInfoAsync(accessToken));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

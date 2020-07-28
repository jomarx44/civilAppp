import { Alert, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { attribute, token, } from "../../API"
import {
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { connect, useDispatch } from "react-redux";

import { Login } from "./Login";
import { SignupDataAsyncStorage } from "../../helpers/asyncStorage"
import { addCreatedUser } from "../../redux/user/actions"
import { getUserInfoAsync } from "../../redux/user/actions"
import { loginAsync } from "../../redux/auth/actions"

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
  const dispatch = useDispatch()

  const {
    loginByFingerprint,
    navigation,
    userInfo,
    getAttributes,
    auth,
    login,
    token,
    user
  } = props;

  useEffect(() => {
    // Check if fingerprint login status and fingerprint token
    AsyncStorage.getItem("fingerprintToken").then((token) => {
      setFingerprintToken(token);
    });

    // Check if there's pending create account
    // const signupData = {
    //   id: "a5c2575d-a520-4f4f-88e2-df016401542c",
    //   email: "thanusmarksman@gmail.com",
    //   givenName: "Alvin",
    //   middleName: "Viernes",
    //   familyName: "Ching",
    //   phoneNumber: "+639953186216",
    // }
    // SignupDataAsyncStorage.set(JSON.stringify(signupData))
    SignupDataAsyncStorage.get()
      .then((data) => {
        if(data) {
          dispatch(addCreatedUser(JSON.parse(data)));
        }
      });
  }, []);

  useEffect(() => {
    if (auth && auth.accessToken) {
      getAttributes({
        name: "cis_no",
        access_token: auth.accessToken,
      });
      userInfo(auth.accessToken);
      // Profile.setAccessToken(auth.accessToken);
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
    login(userData.username, userData.password)
  };

  const handleCreate = () => {
    if(user.createdListByIds.length > 0) {
      return navigation.navigate("EmailConfirmation")
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
  }
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(loginAsync(username, password));
  },
  loginByFingerprint: (refreshToken) => {
    dispatch(token.getByRefreshToken(refreshToken));
  },
  userInfo: (accessToken) => {
    dispatch(getUserInfoAsync(accessToken));
  },
  getAttributes: (parameters) => {
    // dispatch(attribute.get(parameters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

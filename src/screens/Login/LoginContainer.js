import React, { useState, useEffect } from "react";
import { Alert, AsyncStorage } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Login } from "./Login";
import {
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { auth, token, attribute,  } from "../../API"
import { SignupDataAsyncStorage } from "../../helpers/asyncStorage"
import { login } from "../../redux/auth/actions"
import { addCreatedUser } from "../../redux/user/actions"

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
    console.log("userData Data: ", userData);
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

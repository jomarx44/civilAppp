import React, { useRef } from "react";
import PropTypes from 'prop-types'
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContainedButton, TextButton } from "../../components/Buttons";
import { InputBox } from "../../components/InputBox";
import KeyboardShift from "library/components/KeyboardShift";
import config from "../../config";
import { styles } from "./styles";
import FingerprintModal from "../../components/FingerprintModal";

export const Login = (props) => {
  const {
    data: { username, password },
    onChangeText,
    onPressCreate,
    onLogin,
    isVisible,
    isLoggingIn,
    setVisibility
  } = props;
  const inputUsername = useRef();
  const inputPassword = useRef();

  const inset = useSafeAreaInsets();

  return (
    <React.Fragment>
      <KeyboardShift>
        <View
          style={{
            flex: 1,
            backgroundColor: "#309fe7",
            marginTop: inset.top,
            alignItems: "center",
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{ height: 45, width: 270 }}
              resizeMode="contain"
              source={config.company.logo.login}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "stretch",
              width: "85%",
              maxWidth: 315,
            }}
          >
            <InputBox
              containerStyle={{ borderRadius: 4 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={styles.input}
              filledInputStyle={styles.input}
              onChangeText={(value) => onChangeText("username", value)}
              onSubmitEditing={() => inputPassword.current.focus()}
              ref={inputUsername}
              placeholder="Username"
              value={username}
            />
            <InputBox
              containerStyle={{ borderRadius: 4 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={styles.input}
              filledInputStyle={styles.input}
              onChangeText={(value) => onChangeText("password", value)}
              onSubmitEditing={onLogin}
              placeholder="Password"
              ref={inputPassword}
              secureTextEntry={true}
              value={password}
            />
            <ContainedButton
              label="LOGIN"
              disabled={isLoggingIn}
              loading={isLoggingIn}
              onPress={onLogin}
              buttonStyle={{ marginBottom: 4 }}
              labelStyle={{ fontSize: 18 }}
            />
            <TextButton
              label="CREATE MOBILE ACCOUNT"
              disabled={isLoggingIn}
              onPress={onPressCreate}
              labelStyle={{ fontFamily: "Avenir_Heavy" }}
            />
          </View>
        </View>
      </KeyboardShift>
      <FingerprintModal
        isVisible={isVisible}
        onScanSuccess={() => {
          
        }}
        setVisibility={setVisibility}
      />
    </React.Fragment>
  );
};

Login.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPressCreate: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool,
}

export default Login;

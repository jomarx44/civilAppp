import React from 'react'
import { Image, Text, View } from 'react-native';
import { ContainedButton, TextButton } from "../../components/Buttons";
import { FingerprintModal } from "../../components/FingerprintModal"

export const LoginScreen = () => {
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
      <FingerprintModal
        isVisible={isVisible}
        onScanSuccess={() => {
          
        }}
        setVisibility={setVisibility}
      />
    </React.Fragment>
  )
}

export default LoginScreen

import EmailConfirmationScreen from "../screens/Email/EmailConfirmationScreen";
import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import { Image } from "react-native";
import LoginScreen from "screens/LoginScreen";
import { NavigationButtons } from "../components/NavigationButtons"
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";
import PNHeaderBlueBack from "library/Layout/Header/PNHeaderBlueBack";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import { ProofOfIdentity } from "../screens/ProofOfIdentity"
/* eslint-disable react/display-name */
import React from "react";
import TakeAPhotoOfIDScreen from "screens/TakeAPhotoOfIDScreen";
import TesterScreen from "../screens/TesterScreen/TesterScreen"
import { TopNavigation } from "../components/TopNavigation"
import { createStackNavigator } from "@react-navigation/stack";
import { icons } from "../res/images/icons"
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  // const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ProofOfIdentity">
      <Stack.Screen
        name="ProofOfIdentity"
        component={ProofOfIdentity}
        options={{ 
          header: ({navigation}) => {
            return <TopNavigation 
              leftLogo={<NavigationButtons logo={icons.ic_back_blue} onPress={() => {navigation.goBack()}} />}
            >Open Bank Account</TopNavigation>;
          },
      }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          header: () => {
            return <PNHeaderBlueBack onPress={navigation.goBack} />;
          },
        }}
      />
      <Stack.Screen
        name="CreateMobileAccount"
        component={PersonalInfoScreen}
        options={{
          header: () => {
            return <PNHeaderBackButton onPress={navigation.goBack} />;
          },
        }}
      />
      <Stack.Screen
        name="EmailConfirmationScreen"
        component={EmailConfirmationScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{
          header: () => {
            return <PNHeaderBlueBack onPress={navigation.goBack} />;
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="OTPSignUp"
        component={OTPOpenAccountScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBackButton
                onPress={navigation.goBack}
                headerStyle={blueNavigationStyle.headerStyle}
                iconStyle={blueNavigationStyle.iconStyle}
              />
            );
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmailConfirmationScreen from "../screens/Email/EmailConfirmationScreen";
import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import LoginScreen from "screens/LoginScreen";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import TakeAPhotoOfIDScreen from "screens/TakeAPhotoOfIDScreen";
import TesterScreen from "../screens/TesterScreen/TesterScreen";
import PNHeaderBlueBack from "library/Layout/Header/PNHeaderBlueBack";
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="EmailConfirmationScreen"
    >
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
      <Stack.Screen name="TakeAPhotoOfID" component={TakeAPhotoOfIDScreen} />
      <Stack.Screen
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
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

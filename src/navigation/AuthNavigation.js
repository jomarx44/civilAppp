/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import { CreateMobileAccount } from "../screens/CreateMobileAccount";
import { EmailConfirmation } from "../screens/Email";
import { TesterScreen } from "../screens/TesterScreen";
import { BackHeader, BackHeaderBlue } from "./headers";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TesterScreen">
      <Stack.Screen
        name="TesterScreen"
        component={TesterScreen}
        options={{
          header: ({ navigation }) => (
            <BackHeaderBlue goBack={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          header: ({ navigation }) => (
            <BackHeader goBack={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="CreateMobileAccount"
        component={CreateMobileAccount}
        options={{
          header: ({ navigation }) => (
            <BackHeader goBack={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={{
          header: ({ navigation }) => (
            <BackHeader goBack={() => navigation.goBack()} />
          ),
        }}
      />
      {/* <Stack.Screen
        name="OTPSignUp"
        component={OTPOpenAccountScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;

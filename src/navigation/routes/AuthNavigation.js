/* eslint-disable react/display-name */
import React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Login } from "screens/Login";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import { CreateMobileAccount } from "screens/CreateMobileAccount";
import { EmailConfirmation } from "screens/Email";
import { OTPMobileAccount } from "screens/OTP";
import { icons } from "../../res/images/icons";
import {
  DARK_BLUE,
  LIGHT_BLUE,
  DIRTY_WHITE,
  WHITE,
} from "../../constants/colors";
import { headerOptions } from "../HeaderOptions";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              canGoBack={true}
              backImage={() => (
                <Image
                  source={icons.ic_back_white}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: DARK_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="CreateMobileAccount"
        component={CreateMobileAccount}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              canGoBack={true}
              backImage={() => (
                <Image
                  source={icons.ic_back_blue}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              canGoBack={true}
              backImage={() => (
                <Image
                  source={icons.ic_back_blue}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
            />
          ),
        })}
      />
      <Stack.Screen
        name="OTPMobileAccount"
        component={OTPMobileAccount}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              canGoBack={true}
              backImage={() => (
                <Image
                  source={icons.ic_back_white}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

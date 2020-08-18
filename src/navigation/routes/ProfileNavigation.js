/* eslint-disable react/display-name */
import React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import ProfileScreen from "screens/ProfileScreen";
import { EditProfile } from "../../screens/EditProfile"
import { ChangeMobileNumber } from "../../screens/ChangeMobileNumber";
import { ChangePassword } from "../../screens/ChangePassword"
import FingerprintScreen from "screens/FingerprintScreen";
// import OTPChangeMobileNumberScreen from "screens/ChangeMobileNumberScreen/OTPChangeMobileNumberScreen";
import { OTPChangeMobileNumber } from "../../screens/OTP"

import { icons } from "../../res/images/icons";
import { headerOptions } from "../HeaderOptions";
import { DARK_BLUE, WHITE, LIGHT_BLUE } from "../../constants/colors";

const Stack = createStackNavigator();

export const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ViewProfile">
      <Stack.Screen
        name="ViewProfile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Image
                  source={icons.ic_back_blue}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
              canGoBack
            />
          ),
          headerTitleColor: DARK_BLUE,
          title: "Change Password",
        })}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumber}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Image
                  source={icons.ic_back_blue}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
              canGoBack
            />
          ),
          headerTitleColor: DARK_BLUE,
          title: "Change Mobile Number",
        })}
      />
      <Stack.Screen
        name="OTPChangeMobileNumber"
        component={OTPChangeMobileNumber}
        options={({ navigation, route }) => headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Image
                  source={icons.ic_back_white}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
              onPress={() => {
                if(route.params?.formData) {
                  navigation.navigate("ReviewTransfer", { formData: route.params?.formData })
                } else {
                  navigation.navigate("TransferMoneyOption")
                }
              }}
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="FingerprintScreen"
        component={FingerprintScreen}
        options={headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Image
                  source={icons.ic_back_blue}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
              canGoBack
            />
          ),
          headerTitleColor: DARK_BLUE,
          title: "Fingerprint",
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

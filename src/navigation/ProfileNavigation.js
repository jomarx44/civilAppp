/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen";
import FingerprintScreen from "../screens/FingerprintScreen";
import OTPChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen/OTPChangeMobileNumberScreen";
import { icons } from "../res/images/icons";
import { TopNavigation } from "../components/TopNavigation";
import { NavigationButtons } from "../components/NavigationButtons";

const Stack = createStackNavigator();

export const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ViewProfile">
      <Stack.Screen
        name="ViewProfile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
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
              >
                Change Password
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumberScreen}
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
              >
                Change Mobile Number
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="OTPChangeMobileNumberScreen"
        component={OTPChangeMobileNumberScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_white}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="FingerprintScreen"
        component={FingerprintScreen}
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
              >
                Fingerprint
              </TopNavigation>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

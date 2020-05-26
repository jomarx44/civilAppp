import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen";
import FingerprintScreen from "../screens/FingerprintScreen";
import OTPChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen/OTPChangeMobileNumberScreen"
import PNHeaderBackTitle from "../library/Layout/Header/PNHeaderBackTitle";
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";

const Stack = createStackNavigator();

export const ProfileNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewProfile">
      <Stack.Screen
        name="ViewProfile"
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          header: () => {
            return (
              // Default Header
              <PNHeaderBackTitle
                title="Edit Profile"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBackTitle
                title="Change Password"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumberScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBackTitle
                title="Change Mobile Number"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="OTPChangeMobileNumberScreen"
        component={OTPChangeMobileNumberScreen}
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
      <Stack.Screen
        name="FingerprintScreen"
        component={FingerprintScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBackTitle
                title="Fingerprint"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
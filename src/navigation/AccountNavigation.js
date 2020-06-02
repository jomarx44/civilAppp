/* eslint-disable react/display-name */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AnnouncementScreen from "screens/AnnouncementScreen";
import ElectronicSignatureScreen from "../screens/ElectronicSignatureScreen";
import DashboardScreen from "screens/DashboardScreen/dashboard";
import AccountHistoryScreen from "screens/DashboardScreen/accountHistory";
import CreateBankAccount from "../screens/BankAccountScreen/CreateBankAccountScreen";
import OTPCreateBankAccountScreen from "../screens/BankAccountScreen/OTPCreateBankAccountScreen";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import LinkAccount from "screens/LinkAccount";
import LinkAccountOTPScreen from "../screens/LinkAccount/LinkAccountOTPScreen";
import LoanAccountScreen from "../screens/LoanAccountScreen/LoanAccountScreen";
import PNHeaderDrawerTitle from "library/Layout/Header/PNHeaderDrawerTitle";
import PNHeaderBackTitle from "../library/Layout/Header/PNHeaderBackTitle";
import PNHeaderBlueSkip from "library/Layout/Header/PNHeaderBlueSkip";
import PNHeaderBlueBack from "library/Layout/Header/PNHeaderBlueBack";
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: () => {
          return (
            // Default Header
            <PNHeaderBackTitle
              title="Create Account"
              onBack={navigation.goBack}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBlueSkip
                title="Announcements"
                onPressSkip={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          header: () => {
            return (
              <PNHeaderDrawerTitle
                title="My Accounts"
                openDrawer={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="AccountHistory"
        component={AccountHistoryScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBlueBack
                title="Savings Account"
                onPress={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen name="LoanAccount" component={LoanAccountScreen} />
      <Stack.Screen
        name="CreateBankAccount"
        component={CreateBankAccount}
        options={{
          header: () => {
            return (
              // Default Header
              <PNHeaderBackTitle
                title="Create Account"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ElectronicSignature"
        component={ElectronicSignatureScreen}
        options={{
          header: () => {
            return (
              <PNHeaderBackTitle title="Signature" onBack={navigation.goBack} />
            );
          },
        }}
      />
      <Stack.Screen name="OTPOpenAccount" component={OTPOpenAccountScreen} />
      <Stack.Screen
        name="LinkAccountOTP"
        component={LinkAccountOTPScreen}
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
        name="OTPCreateBankAccountScreen"
        component={OTPCreateBankAccountScreen}
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
        name="ConnectCreateAccount"
        component={ConnectCreateAccountScreen}
        options={{
          header: () => {
            return <PNHeaderBlueBack onPress={navigation.goBack} />;
          },
        }}
      />
      <Stack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={{
          header: () => {
            return <PNHeaderBackButton onPress={navigation.goBack} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

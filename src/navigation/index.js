import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";
import { Dimensions } from "react-native";

import Login from "screens/LoginScreen";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import TakeAPhotoOfIDScreen from "screens/TakeAPhotoOfIDScreen";
import LoginFingerPrintScreen from "screens/LoginScreen/fingerprint";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";

import SideMenu from "./SideMenu";
import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";
import OpenAccountScreen from "screens/OpenAccountScreen/";
import AnnouncementScreen from "screens/AnnouncementScreen/";

import DashboardScreen from "screens/DashboardScreen/dashboard";
import AccountHistoryScreen from "screens/DashboardScreen/accountHistory";
import CIS01 from "screens/OpenAccountScreen/CIS01";
import CIS02 from "screens/OpenAccountScreen/CIS02";
import CIS03 from "screens/OpenAccountScreen/CIS03";
import CIS04 from "screens/OpenAccountScreen/CIS04";
import CIS05 from "screens/OpenAccountScreen/CIS05";
import CIS06 from "screens/OpenAccountScreen/CIS06";
import CIS07 from "screens/OpenAccountScreen/CIS07";
import CIS08 from "screens/OpenAccountScreen/CIS08";
import CIS09 from "screens/OpenAccountScreen/CIS09";
import CIS10 from "screens/OpenAccountScreen/CIS10";
import CIS11 from "screens/OpenAccountScreen/CIS11";
import CIS12 from "screens/OpenAccountScreen/CIS12";
import CIS13 from "screens/OpenAccountScreen/CIS13";
import CIS14 from "screens/OpenAccountScreen/CIS14";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import OTPScreen from "screens/OTPScreen/OTPScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import LinkAccount from "screens/OpenAccountScreen/LinkAccount";

const AuthenticationNavigator = createStackNavigator({
  Login: { 
    screen: Login,
  },
  CreateMobileAccount: {screen: PersonalInfoScreen},
  EmailVerification: {screen: EmailVerificationScreen},
  TakeAPhotoOfID: { screen: TakeAPhotoOfIDScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  OTPSignUp: {screen: OTPOpenAccountScreen}
}, {
  initialRouteName: 'Login'
});

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen },
  AccountHistory: { screen: AccountHistoryScreen },
  FingerPrint: { screen: LoginFingerPrintScreen },
  CIS01: { screen: CIS01 },
  CIS02: { screen: CIS02 },
  CIS03: { screen: CIS03 },
  CIS04: { screen: CIS04 },
  CIS05: { screen: CIS05 },
  CIS06: { screen: CIS06 },
  CIS07: { screen: CIS07 },
  CIS08: { screen: CIS08 },
  CIS09: { screen: CIS09 },
  CIS10: { screen: CIS10 },
  CIS11: { screen: CIS11 },
  CIS12: { screen: CIS12 },
  CIS13: { screen: CIS13 },
  CIS14: { screen: CIS14 },
  OTPOpenAccount: { screen: OTPOpenAccountScreen },
  OTP: { screen: OTPScreen },
  ConnectCreateAccount: { screen: ConnectCreateAccountScreen },
  LinkAccount: { screen: LinkAccount }
}, {
  initialRouteName: 'Dashboard',
});

const HomeNavigator = createDrawerNavigator({
  Home: { screen: DashboardStack },
  Announcement: { 
    screen: AnnouncementScreen,
    header: null
  },
  OpenAccountScreen: { screen: OpenAccountScreen },
  PersonalDetails: {
    screen: PersonalDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Personal Details"
    })
  }
}, {
  initialRouteName: 'Home',
  contentComponent: SideMenu
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationNavigator,
  Home: HomeNavigator
});

export const Navigator = createAppContainer(AppNavigator);
export default Navigator;

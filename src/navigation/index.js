import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from 'react-native';
import SideMenu from "./SideMenu.js";
import Login from "screens/LoginScreen";
import LoginFingerPrintScreen from "screens/LoginScreen/fingerprint";
import LoginWebViewScreen from "screens/LoginScreen/loginwebview";
import Test from "screens/TestScreen";
import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";
import ConnectCreateAccountScreen from "screens/ConnectCreateAccountScreen/";
import TakeAPhotoOfID from "screens/TakeAPhotoOfID/";
import OTPScreen from "screens/OTPScreen/";
import EmailVerificationScreen from "screens/EmailVerificationScreen/";
import OpenAccountScreen from "screens/OpenAccountScreen/";

const MainDrawer = createDrawerNavigator(
  {
    Login: { screen: Login },
    ConnectCreateAccountScreen: { screen: ConnectCreateAccountScreen },
    TakeAPhotoOfID: { screen: TakeAPhotoOfID },
    OTPScreen: { screen: OTPScreen },
    EmailVerificationScreen: { screen: EmailVerificationScreen },
    OpenAccountScreen: { screen: OpenAccountScreen },
    FingerPrint: { screen: LoginFingerPrintScreen },
    LoginWebViewScreen: { screen: LoginWebViewScreen },
    Test: { screen: Test },
    PersonalDetails: {
       screen: PersonalDetailsScreen,
       navigationOptions: ( { navigation }) => ({
         title: "Personal Details",
       }),    
    },  
  },
  {
    drawerWidth: Dimensions.get('window').width * 0.45,
    contentComponent: SideMenu,
    initialRouteName: 'Login'
  }
);
export const Navigator = createAppContainer(MainDrawer);
export default Navigator;

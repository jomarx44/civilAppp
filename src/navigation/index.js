import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from 'react-native';
import SideMenu from "./SideMenu.js";
import Login from "screens/LoginScreen";
import LoginFingerPrintScreen from "screens/LoginScreen/fingerprint";
import LoginWebViewScreen from "screens/LoginScreen/loginWebview";
import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";
import TakeAPhotoOfID from "screens/TakeAPhotoOfID/";
import OpenAccountScreen from "screens/OpenAccountScreen/";
import SignUpScreen from "screens/SignUpScreen/";
import DashboardScreen from "screens/DashboardScreen/";

const MainDrawer = createDrawerNavigator(
  {
    Login: { screen: Login },
    TakeAPhotoOfID: { screen: TakeAPhotoOfID },
    DashboardScreen: { screen: DashboardScreen },
    OpenAccountScreen: { screen: OpenAccountScreen },
    SignUpScreen: { screen: SignUpScreen },
    FingerPrint: { screen: LoginFingerPrintScreen },
    LoginWebViewScreen: { screen: LoginWebViewScreen },
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

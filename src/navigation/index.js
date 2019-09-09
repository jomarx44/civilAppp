import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from 'react-native';
import SideMenu from "./SideMenu.js";
import Login from "screens/LoginScreen";
import LoginFingerPrintScreen from "screens/LoginScreen/fingerprint";
import Test from "screens/TestScreen";
import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";
import ConnectCreateAccountScreen from "screens/ConnectCreateAccountScreen/";
import TakeAPhotoOfID from "screens/TakeAPhotoOfID/";

const MainDrawer = createDrawerNavigator(
  {
    Login: { screen: Login },
    ConnectCreateAccountScreen: { screen: ConnectCreateAccountScreen },
    TakeAPhotoOfID: { screen: TakeAPhotoOfID },
    FingerPrint: { screen: LoginFingerPrintScreen },
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
    initialRouteName: 'TakeAPhotoOfID'
  }
);
export const Navigator = createAppContainer(MainDrawer);
export default Navigator;

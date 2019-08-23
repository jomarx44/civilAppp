import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from 'react-native';
import SideMenu from "./SideMenu.js";
import Login from "screens/LoginScreen";
import Test from "screens/TestScreen";
import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";

const MainDrawer = createDrawerNavigator(
  {
    Login: { screen: Login },
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
    initialRouteName: 'PersonalDetails'
  }
);
export const Navigator = createAppContainer(MainDrawer);
export default Navigator;

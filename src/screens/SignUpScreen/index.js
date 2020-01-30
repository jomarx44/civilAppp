import React, { Component } from "react";
import PersonalInfo from "./PersonalInfo.js";
import EmailVerificationScreen from "./EmailVerificationScreen.js";
import { createStackNavigator } from "react-navigation";
export default DrawNav = createStackNavigator({
  PersonalInfo: { screen: PersonalInfo },
  EmailVerificationScreen: { screen: EmailVerificationScreen },
});

import React, { Component } from "react";
import PersonalInfo from "./PersonalInfo.js";
import EmailVerificationScreen from "./EmailVerificationScreen.js";
import OTPScreen from "./OTPScreen.js";
import ConnectCreateAccountScreen from "./ConnectCreateAccountScreen.js";
import LinkAccount from "./LinkAccount.js";
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator({
  PersonalInfo: { screen: PersonalInfo },
  EmailVerificationScreen: { screen: EmailVerificationScreen },
  OTPScreen: { screen: OTPScreen },
  ConnectCreateAccountScreen: { screen: ConnectCreateAccountScreen },
  LinkAccount: { screen: LinkAccount },
}))

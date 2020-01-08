import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import ForgotPasswordScreen from "./ForgotPasswordScreen.js";
export default (DrawNav = createStackNavigator({
    ForgotPasswordScreen: { screen: ForgotPasswordScreen }
}))

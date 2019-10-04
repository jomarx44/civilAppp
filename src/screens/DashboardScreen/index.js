import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import DashboardScreen from "./dashboard.js";
export default (DrawNav = createStackNavigator({
  DashboardScreen: { screen: DashboardScreen },
}))

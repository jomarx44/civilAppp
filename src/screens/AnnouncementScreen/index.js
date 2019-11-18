import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import AnnouncementScreen from "./announcementScreen.js";
export default (DrawNav = createStackNavigator({
  AnnouncementScreen: { screen: AnnouncementScreen }
}))

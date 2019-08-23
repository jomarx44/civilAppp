import React, { Component } from "react";
import PersonalDetails from "./PersonalDetails.js";
import EmployeeID from "./EmployeeID.js";
import OtherInfo from "./OtherInfo.js";
import ChangePass from "screens/ChangePasswordScreen"
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator({
  PersonalDetails: { screen: PersonalDetails },
  EmployeeID: { screen: EmployeeID },
  OtherInfo: { screen: OtherInfo },
  ChangePass: { screen: ChangePass }
}));
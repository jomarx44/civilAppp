import { DARK_BLUE, DIRTY_WHITE, WHITE } from "../../constants/colors";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";

import { DrawerActions } from "@react-navigation/native";
import { Image } from "react-native";
/* eslint-disable react/display-name */
import React from "react";
import {
  Testing
} from "../../screens/TesterScreen";
import {SuccessTransferMoney} from "../../screens/Common"
import { headerOptions } from "../HeaderOptions";
import { icons } from "../../res/images/icons";

const Stack = createStackNavigator();

export const TesterNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Testing">
      <Stack.Screen
        name="Testing"
        component={Testing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

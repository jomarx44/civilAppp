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
import { headerOptions } from "../HeaderOptions";
import { icons } from "../../res/images/icons";

const Stack = createStackNavigator();

export const TesterNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Testing">
      <Stack.Screen
        name="Testing"
        component={Testing}
        options={({ navigation }) =>
          headerOptions({
            headerLeft: (props) => {
              return (
                <HeaderBackButton
                  {...props}
                  backImage={() => (
                    <Image
                      source={icons.ic_menu_blue}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  )}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                  }}
                />
              );
            },
            title: "Transfer Money",
            cardStyle: {
              backgroundColor: DIRTY_WHITE,
            },
          })
        }
      />
    </Stack.Navigator>
  );
};

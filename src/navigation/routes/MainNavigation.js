import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AccountNavigator } from "./AccountNavigation";
import { ProfileNavigation } from "./ProfileNavigation";
import { TransferMoneyNavigation } from "./TransferMoneyNavigation"
import MainDrawerContent from "../MainDrawerContent";

const Drawer = createDrawerNavigator();

export const MainNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        width: "85%",
      }}
      drawerContent={(props) => <MainDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={AccountNavigator}
        options={{ drawerLabel: "My Accounts" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{ drawerLabel: "My Profile" }}
      />
      <Drawer.Screen
        name="TransferMoney"
        component={TransferMoneyNavigation}
        options={{ drawerLabel: "Transfer Money" }}
      />
    </Drawer.Navigator>
  );
};

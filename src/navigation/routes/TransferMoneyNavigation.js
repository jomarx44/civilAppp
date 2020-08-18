import {
  DARK_BLUE,
  DIRTY_WHITE,
  LIGHT_BLUE,
  WHITE,
} from "../../constants/colors";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  OtherBanksTransferForm,
  // SunSavingsTransferForm,
  TransferMoneyOption,
} from "../../screens/TransferMoney";
import { SelectSourceAccount } from "../../screens/SelectSourceAccount"
import { ReviewTransfer } from "../../screens/ReviewTransfer"
import { SuccessTransferMoney } from "../../screens/Common"

import { DrawerActions } from "@react-navigation/native";
import { Image } from "react-native";
import { OTPTransferMoney } from "screens/OTP";
/* eslint-disable react/display-name */
import React from "react";
import { headerOptions } from "../HeaderOptions";
import { icons } from "../../res/images/icons";

const Stack = createStackNavigator();

export const TransferMoneyNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TransferMoneyOption">
      <Stack.Screen
        name="TransferMoneyOption"
        component={TransferMoneyOption}
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
      {/* <Stack.Screen
        name="SunSavingsTransferForm"
        component={SunSavingsTransferForm}
        options={({ navigation }) =>
          headerOptions({
            headerLeft: (props) => {
              return (
                <HeaderBackButton
                  {...props}
                  backImage={() => (
                    <Image
                      source={icons.ic_back_blue}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  )}
                  canGoBack
                />
              );
            },
            title: "Transfer Money",
          })
        }
      /> */}
      <Stack.Screen
        name="OtherBanksTransferForm"
        component={OtherBanksTransferForm}
        options={({ navigation }) =>
          headerOptions({
            headerLeft: (props) => {
              return (
                <HeaderBackButton
                  {...props}
                  backImage={() => (
                    <Image
                      source={icons.ic_back_blue}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  )}
                  canGoBack
                />
              );
            },
            title: "Transfer Money",
          })
        }
      />
      <Stack.Screen
        name="SelectSourceAccount"
        component={SelectSourceAccount}
        options={({ navigation }) =>
          headerOptions({
            headerLeft: (props) => {
              return (
                <HeaderBackButton
                  {...props}
                  backImage={() => (
                    <Image
                      source={icons.ic_back_blue}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  )}
                  canGoBack
                />
              );
            },
            title: "Select Source Account",
            cardStyle: {
              backgroundColor: DIRTY_WHITE,
            },
          })
        }
      />
      <Stack.Screen
        name="ReviewTransfer"
        component={ReviewTransfer}
        options={({ navigation, route }) =>
          headerOptions({
            headerLeft: (props) => {
              return (
                <HeaderBackButton
                  {...props}
                  backImage={() => (
                    <Image
                      source={icons.ic_back_blue}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  )}
                  onPress={() => {
                    if(route.params?.previousRouteName && route.params?.transferMoneyData) {
                      navigation.navigate(route.params?.previousRouteName, { formData: route.params?.transferMoneyData })
                    } else {
                      navigation.goBack();
                    }
                  }}
                />
              );
            },
            title: "Review and Transfer",
            cardStyle: {
              backgroundColor: DIRTY_WHITE,
            },
          })
        }
      />
      <Stack.Screen
        name="OTPTransferMoney"
        component={OTPTransferMoney}
        options={({ navigation, route }) => headerOptions({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Image
                  source={icons.ic_back_white}
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                />
              )}
              onPress={() => {
                if(route.params?.formData) {
                  navigation.navigate("ReviewTransfer", { formData: route.params?.formData })
                } else {
                  navigation.navigate("TransferMoneyOption")
                }
              }}
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="SuccessTransferMoney"
        component={SuccessTransferMoney}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

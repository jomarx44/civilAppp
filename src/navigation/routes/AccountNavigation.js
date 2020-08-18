/* eslint-disable react/display-name */
import React from "react";
import { Image } from "react-native"
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import { Announcement } from "../../screens/Announcement";
import { AccountHistory, Dashboard} from "../../screens/DashboardScreen/";
import CreateBankAccount from "screens/BankAccountScreen/CreateBankAccountScreen";
import { ProofOfIdentity } from "../../screens/ProofOfIdentity";
import { UploadIdentity } from "screens/UploadIdentity";
import ElectronicSignatureScreen from "screens/ElectronicSignatureScreen";
import OTPCreateBankAccountScreen from "screens/BankAccountScreen/OTPCreateBankAccountScreen";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import { LinkAccount } from "../../screens/LinkAccount";
import { OTPLinkAccount } from "../../screens/OTP";
import LoanAccountScreen from "screens/LoanAccountScreen/LoanAccountScreen";

import { icons } from "../../res/images/icons";
import { TopNavigation } from "../../components/TopNavigation";
import { NavigationButtons } from "../../components/NavigationButtons";
import PNHeaderBlueSkip from "library/Layout/Header/PNHeaderBlueSkip";
import { headerOptions } from "../HeaderOptions";
import {
  DARK_BLUE,
  DIRTY_WHITE,
  LIGHT_BLUE,
  WHITE,
} from "../../constants/colors";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBlueSkip
                title="Announcements"
                onPressSkip={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) =>
        headerOptions({
          headerLeft: (props) => {
            return (
              <HeaderBackButton
                {...props}
                backImage={() => (
                  <Image
                    source={icons.ic_menu_white}
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
          headerTitleColor: WHITE,
          title: "My Accounts",
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })
      }
      />
      <Stack.Screen
        name="AccountHistory"
        component={AccountHistory}
        options={headerOptions({
          headerLeft: (props) => (
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
          ),
          headerTitleColor: DARK_BLUE,
          title: "Open Bank Account"
        })}
      />
      <Stack.Screen name="LoanAccount" component={LoanAccountScreen} />
      <Stack.Screen
        name="CreateBankAccount"
        component={CreateBankAccount}
        options={headerOptions({
          headerLeft: (props) => (
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
          ),
          headerTitleColor: DARK_BLUE,
          title: "Open Bank Account"
        })}
      />
      <Stack.Screen
        name="ProofOfIdentity"
        component={ProofOfIdentity}
        options={headerOptions({
          headerLeft: (props) => (
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
          ),
          headerTitleColor: DARK_BLUE,
          title: "Open Bank Account"
        })}
      />
      <Stack.Screen
        name="UploadIdentity"
        component={UploadIdentity}
        options={headerOptions({
          headerLeft: (props) => (
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
          ),
          headerTitleColor: DARK_BLUE,
          title: "Upload ID"
        })}
      />
      <Stack.Screen
        name="ElectronicSignature"
        component={ElectronicSignatureScreen}
        options={headerOptions({
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
              canGoBack
            />
          ),
          headerTitleColor: DARK_BLUE,
          title: "Signature",
        })}
      />
      <Stack.Screen
        name="OTPOpenAccount"
        component={OTPOpenAccountScreen}
        options={headerOptions({
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
              canGoBack
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="OTPLinkAccount"
        component={OTPLinkAccount}
        options={headerOptions({
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
              canGoBack
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="OTPCreateBankAccountScreen"
        component={OTPCreateBankAccountScreen}
        options={headerOptions({
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
              canGoBack
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="ConnectCreateAccount"
        component={ConnectCreateAccountScreen}
        options={headerOptions({
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
              canGoBack
            />
          ),
          headerTitleColor: WHITE,
          cardStyle: {
            backgroundColor: LIGHT_BLUE,
          },
        })}
      />
      <Stack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={headerOptions({
          headerLeft: (props) => (
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
          ),
          headerTitleColor: DARK_BLUE,
        })}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

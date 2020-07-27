/* eslint-disable react/display-name */
import React from "react";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Announcement } from "../../screens/Announcement";
import DashboardScreen from "screens/DashboardScreen/dashboard";
import AccountHistoryScreen from "screens/DashboardScreen/accountHistory";
import CreateBankAccount from "screens/BankAccountScreen/CreateBankAccountScreen";
import { ProofOfIdentity } from "screens/ProofOfIdentity";
import { UploadIdentity } from "screens/UploadIdentity";
import ElectronicSignatureScreen from "screens/ElectronicSignatureScreen";
import OTPCreateBankAccountScreen from "screens/BankAccountScreen/OTPCreateBankAccountScreen";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import LinkAccount from "screens/LinkAccount";
import LinkAccountOTPScreen from "screens/LinkAccount/LinkAccountOTPScreen";
import LoanAccountScreen from "screens/LoanAccountScreen/LoanAccountScreen";
import { icons } from "../../res/images/icons";
import { TopNavigation } from "../../components/TopNavigation";
import { NavigationButtons } from "../../components/NavigationButtons";
import PNHeaderBlueSkip from "library/Layout/Header/PNHeaderBlueSkip";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          header: () => {
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
        component={DashboardScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_menu_white}
                    onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}
                  />
                }
              >
                My Accounts
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="AccountHistory"
        component={AccountHistoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              >
                Savings Account
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen name="LoanAccount" component={LoanAccountScreen} />
      <Stack.Screen
        name="CreateBankAccount"
        component={CreateBankAccount}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              >
                Open Bank Account
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="ProofOfIdentity"
        component={ProofOfIdentity}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              >
                Open Bank Account
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="UploadIdentity"
        component={UploadIdentity}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              >
                Upload Identity
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="ElectronicSignature"
        component={ElectronicSignatureScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              >
                Open Bank Account
              </TopNavigation>
            );
          },
        }}
      />
      <Stack.Screen
        name="OTPOpenAccount"
        component={OTPOpenAccountScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="LinkAccountOTP"
        component={LinkAccountOTPScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="OTPCreateBankAccountScreen"
        component={OTPCreateBankAccountScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_white}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ConnectCreateAccount"
        component={ConnectCreateAccountScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_white}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={{
          header: ({ navigation }) => {
            return (
              <TopNavigation
                leftLogo={
                  <NavigationButtons
                    logo={icons.ic_back_blue}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

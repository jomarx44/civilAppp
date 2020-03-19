import React from "react";
import { connect } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { navigationRef } from "../navigation/NavigationService";

// Styles
import { blueNavigationStyle } from "./style";

// Drawer Components
import MainDrawerContent from "./MainDrawerContent";

// Header Components
import PNHeaderNoLogo from "library/Layout/Header/PNHeaderNoLogo";
import PNHeaderBlueSkip from "library/Layout/Header/PNHeaderBlueSkip";
import PNHeaderBlueBack from "library/Layout/Header/PNHeaderBlueBack";
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";
import PNHeaderCancelDone from "../library/Layout/Header/PNHeaderCancelDone";

import LoginScreen from "screens/LoginScreen";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import SignUpScreen2 from "screens/SignUpScreen/SignUpScreen2";
import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import TakeAPhotoOfIDScreen from "screens/TakeAPhotoOfIDScreen";
import LoginFingerPrintScreen from "screens/LoginScreen/fingerprint";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";

import SideMenu from "./SideMenu";
// import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";
import AnnouncementScreen from "screens/AnnouncementScreen";

import DashboardScreen from "screens/DashboardScreen/dashboard";
import AccountHistoryScreen from "screens/DashboardScreen/accountHistory";
import CIS01 from "screens/OpenAccountScreen/CIS01";
import CIS02 from "screens/OpenAccountScreen/CIS02";
import CIS03 from "screens/OpenAccountScreen/CIS03";
import CIS04 from "screens/OpenAccountScreen/CIS04";
import CIS05 from "screens/OpenAccountScreen/CIS05";
import CIS06 from "screens/OpenAccountScreen/CIS06";
import CIS07 from "screens/OpenAccountScreen/CIS07";
import CIS08 from "screens/OpenAccountScreen/CIS08";
import CIS09 from "screens/OpenAccountScreen/CIS09";
import CIS10 from "screens/OpenAccountScreen/CIS10";
import CIS11 from "screens/OpenAccountScreen/CIS11";
import CIS12 from "screens/OpenAccountScreen/CIS12";
import CIS13 from "screens/OpenAccountScreen/CIS13";
import CIS14 from "screens/OpenAccountScreen/CIS14";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import OTPScreen from "screens/OTPScreen/OTPScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import LinkAccount from "screens/OpenAccountScreen/LinkAccount";
import LoanAccountScreen from "../screens/LoanAccountScreen/LoanAccountScreen";

// Profile
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF"
  }
};

const Dashboard = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ header: () => <PNHeaderNoLogo title="My Accounts" /> }}
      />
      <Stack.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBlueSkip
                title="Announcements"
                onPressSkip={navigation.goBack}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="AccountHistory"
        component={AccountHistoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBlueBack
                title="Savings Account"
                onPress={navigation.goBack}
              />
            );
          }
        }}
      />
      <Stack.Screen name="LoanAccount" component={LoanAccountScreen} />
      <Stack.Screen name="Fingerprint" component={LoginFingerPrintScreen} />
      <Stack.Screen name="CIS01" component={CIS01} />
      <Stack.Screen name="CIS02" component={CIS02} />
      <Stack.Screen name="CIS03" component={CIS03} />
      <Stack.Screen name="CIS04" component={CIS04} />
      <Stack.Screen name="CIS05" component={CIS05} />
      <Stack.Screen name="CIS06" component={CIS06} />
      <Stack.Screen name="CIS07" component={CIS07} />
      <Stack.Screen name="CIS08" component={CIS08} />
      <Stack.Screen name="CIS09" component={CIS09} />
      <Stack.Screen name="CIS10" component={CIS10} />
      <Stack.Screen name="CIS11" component={CIS11} />
      <Stack.Screen name="CIS12" component={CIS12} />
      <Stack.Screen name="CIS13" component={CIS13} />
      <Stack.Screen name="CIS14" component={CIS14} />
      <Stack.Screen name="OTPOpenAccount" component={OTPOpenAccountScreen} />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackButton
                onPress={navigation.goBack}
                headerStyle={blueNavigationStyle.headerStyle}
                iconStyle={blueNavigationStyle.iconStyle}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="ConnectCreateAccount"
        component={ConnectCreateAccountScreen}
        options={{
          header: ({ navigation }) => {
            return <PNHeaderBlueBack onPress={navigation.goBack} />;
          }
        }}
      />
      <Stack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={{
          header: ({ navigation }) => {
            return <PNHeaderBackButton onPress={navigation.goBack} />;
          }
        }}
      />
    </Stack.Navigator>
  );
};

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="ViewProfile">
      <Stack.Screen
        name="ViewProfile"
        component={ProfileScreen}
        options={{ header: () => <PNHeaderNoLogo title="My Profile" /> }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBlueBack
                title="Change Password"
                onPress={navigation.goBack}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumberScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBlueBack
                title="Change Mobile Number"
                onPress={navigation.goBack}
              />
            );
          }
        }}
      />
    </Stack.Navigator>
  );
};

export const Navigator = ({ profile }) => {
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {profile.isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerStyle={{
            width: "85%"
          }}
          drawerContent={props => <MainDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={Dashboard}
            options={{ drawerLabel: "My Accounts" }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{ drawerLabel: "My Profile" }}
          />
          {/* <Drawer.Screen name="PersonalDetails" component={PersonalDetailsScreen} /> */}
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateMobileAccount"
            component={PersonalInfoScreen}
            options={{
              header: ({ navigation }) => {
                return <PNHeaderBackButton onPress={navigation.goBack} />;
              }
            }}
          />
          <Stack.Screen
            name="CreateMobileAccount2"
            component={SignUpScreen2}
            options={{
              header: ({ navigation }) => {
                return (
                  <PNHeaderCancelDone onCancel={() => navigation.goBack()} />
                );
              }
            }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationScreen}
            options={{
              header: ({ navigation }) => {
                return <PNHeaderBlueBack onPress={navigation.goBack} />;
              }
            }}
          />
          <Stack.Screen
            name="TakeAPhotoOfID"
            component={TakeAPhotoOfIDScreen}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              header: ({ navigation }) => {
                return <PNHeaderBlueBack onPress={navigation.goBack} />;
              }
            }}
          />
          <Stack.Screen
            name="OTPSignUp"
            component={OTPOpenAccountScreen}
            options={{
              header: ({ navigation }) => {
                return (
                  <PNHeaderBackButton
                    onPress={navigation.goBack}
                    headerStyle={blueNavigationStyle.headerStyle}
                    iconStyle={blueNavigationStyle.iconStyle}
                  />
                );
              }
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

import React, { useState } from "react";

// Others
// import UserInactivity from "react-native-user-inactivity";
import { connect } from "react-redux";
import {
  NavigationContainer,
  DefaultTheme,
  DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { navigationRef } from "../navigation/NavigationService";

// Styles
import { blueNavigationStyle } from "./style";

// Drawer Components
import MainDrawerContent from "./MainDrawerContent";

// Header Components
import PNHeaderDrawerTitle from "library/Layout/Header/PNHeaderDrawerTitle";
import PNHeaderBackTitle from "../library/Layout/Header/PNHeaderBackTitle";
import PNHeaderBlueSkip from "library/Layout/Header/PNHeaderBlueSkip";
import PNHeaderBlueBack from "library/Layout/Header/PNHeaderBlueBack";
import PNHeaderBackButton from "../library/Layout/Header/PNHeaderBackButton";
import PNHeaderCancelDone from "../library/Layout/Header/PNHeaderCancelDone";
import { TopNavigation } from "../components/TopNavigation"
import { NavigationButtons } from "../components/NavigationButtons"
import { icons } from "../res/images/icons"

// New Components
import EmailConfirmationScreen from "../screens/Email/EmailConfirmationScreen";
import { UploadIdentity } from "../screens/UploadIdentity"

// Authentication
import LoginScreen from "screens/LoginScreen";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import TakeAPhotoOfIDScreen from "screens/TakeAPhotoOfIDScreen";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import ElectronicSignatureScreen from "../screens/ElectronicSignatureScreen";
import TesterScreen from "../screens/TesterScreen/TesterScreen";

// import PersonalDetailsScreen from "screens/PersonalDetailsScreen/";

// Main
import AnnouncementScreen from "screens/AnnouncementScreen";
import DashboardScreen from "screens/DashboardScreen/dashboard";
import AccountHistoryScreen from "screens/DashboardScreen/accountHistory";
import CreateBankAccount from "../screens/BankAccountScreen/CreateBankAccountScreen";
import OTPOpenAccountScreen from "screens/OpenAccountScreen/OTPOpenAccountScreen";
import ConnectCreateAccountScreen from "screens/OpenAccountScreen/ConnectCreateAccountScreen";
import LinkAccount from "screens/LinkAccount";
import LinkAccountOTPScreen from "../screens/LinkAccount/LinkAccountOTPScreen";
import LoanAccountScreen from "../screens/LoanAccountScreen/LoanAccountScreen";

// Profile
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen";
import { FingerprintScreen } from "../screens/FingerprintScreen";

// OTPs
import OTPChangeMobileNumberScreen from "../screens/ChangeMobileNumberScreen/OTPChangeMobileNumberScreen"
import OTPCreateBankAccountScreen from "../screens/BankAccountScreen/OTPCreateBankAccountScreen"

// Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const Dashboard = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: ({ navigation }) => {
          return (
            // Default Header
            <PNHeaderBackTitle
              title="Create Account"
              onBack={navigation.goBack}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderDrawerTitle
                title="My Accounts"
                openDrawer={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
              />
            );
          },
        }}
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
          },
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
              // Default Header
              <PNHeaderBackTitle
                title="Create Account"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      {/* <Stack.Screen
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
      /> */}
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
              <PNHeaderBackTitle title="Signature" onBack={navigation.goBack} />
            );
          },
        }}
      />
      <Stack.Screen name="OTPOpenAccount" component={OTPOpenAccountScreen} />
      <Stack.Screen
        name="LinkAccountOTP"
        component={LinkAccountOTPScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackButton
                onPress={navigation.goBack}
                headerStyle={blueNavigationStyle.headerStyle}
                iconStyle={blueNavigationStyle.iconStyle}
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
              <PNHeaderBackButton
                onPress={navigation.goBack}
                headerStyle={blueNavigationStyle.headerStyle}
                iconStyle={blueNavigationStyle.iconStyle}
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
            return <PNHeaderBlueBack onPress={navigation.goBack} />;
          },
        }}
      />
      <Stack.Screen
        name="LinkAccount"
        component={LinkAccount}
        options={{
          header: ({ navigation }) => {
            return <PNHeaderBackButton onPress={navigation.goBack} />;
          },
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
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          header: ({ navigation }) => {
            return (
              // Default Header
              <PNHeaderBackTitle
                title="Edit Profile"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackTitle
                title="Change Password"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ChangeMobileNumber"
        component={ChangeMobileNumberScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackTitle
                title="Change Mobile Number"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="OTPChangeMobileNumberScreen"
        component={OTPChangeMobileNumberScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackButton
                onPress={navigation.goBack}
                headerStyle={blueNavigationStyle.headerStyle}
                iconStyle={blueNavigationStyle.iconStyle}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="FingerprintScreen"
        component={FingerprintScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <PNHeaderBackTitle
                title="Fingerprint"
                onBack={navigation.goBack}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const Navigator = ({ profile }) => {
  // const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(300000);

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {profile.isLoggedIn ? (
        // <UserInactivity
        //   isActive={active}
        //   timeForInactivity={timer}
        //   onAction={(isActive) => {
        //     setActive(isActive);
        //   }}
        //   style={{ flex: 1 }}
        // >
          <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{
              width: "85%",
            }}
            drawerContent={(props) => <MainDrawerContent {...props} />}
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
        // </UserInactivity>
      ) : (
        <Stack.Navigator>
          {/* <Stack.Screen
            name="EmailConfirmationScreen"
            component={EmailConfirmationScreen}
            options={{ headerShown: false }}
          /> */}
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
              },
            }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationScreen}
            options={{
              header: ({ navigation }) => {
                return <PNHeaderBlueBack onPress={navigation.goBack} />;
              },
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
              },
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
              },
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

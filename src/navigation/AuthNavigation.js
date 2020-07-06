/* eslint-disable react/display-name */
import React from "react";
import Login from "screens/Login";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import PersonalInfoScreen from "screens/SignUpScreen/PersonalInfoScreen";
import EmailConfirmationScreen from "../screens/Email/EmailConfirmationScreen";
// import EmailVerificationScreen from "screens/SignUpScreen/EmailVerificationScreen";
import { TesterScreen } from "../screens/TesterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { icons } from "../res/images/icons";
import { TopNavigation } from "../components/TopNavigation";
import { NavigationButtons } from "../components/NavigationButtons";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  // const navigation = useNavigation();

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="TesterScreen"
        component={TesterScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
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
        name="CreateMobileAccount"
        component={PersonalInfoScreen}
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
        name="EmailConfirmationScreen"
        component={EmailConfirmationScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{
          header: ({navigation}) => {
            return <TopNavigation
            leftLogo={
              <NavigationButtons
                logo={icons.ic_back_blue}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            }
          />
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="OTPSignUp"
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
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;

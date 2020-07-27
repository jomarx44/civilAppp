import { AuthNavigation, MainNavigation, TesterNavigation } from "./routes";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { hasHardwareAsync, isEnrolledAsync } from "expo-local-authentication";
import {
  setFingerprintCompatibility,
  setFingerprintEnrolled,
} from "../redux/application/actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigationRef } from "./NavigationService";

const TESTING_MODE = false;

// Theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const Navigator = ({
  auth: {
    status: { isLoggedIn },
  },
  setCompatibility,
  setEnrolled,
}) => {
  // Check fingerprint compatibility and enrollment
  useEffect(() => {
    checkDeviceHardware();
    checkEnrolledFingerprints();
  }, []);

  const checkDeviceHardware = async () => {
    const isHardwareSupported = await hasHardwareAsync();
    setCompatibility(isHardwareSupported);
  };

  const checkEnrolledFingerprints = async () => {
    const hasEnrolledFingerprint = await isEnrolledAsync();
    setEnrolled(hasEnrolledFingerprint);
  };

  if(TESTING_MODE) {
    return (
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <TesterNavigation />
      </NavigationContainer>
      
    )
  }

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {isLoggedIn ? 
        <MainNavigation /> :
        <AuthNavigation />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) => ({
  setCompatibility: (isCompatible) => {
    dispatch(setFingerprintCompatibility(isCompatible));
  },
  setEnrolled: (isEnrolled) => {
    dispatch(setFingerprintEnrolled(isEnrolled));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hasHardwareAsync, isEnrolledAsync } from "expo-local-authentication";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { navigationRef } from "../navigation/NavigationService";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import {
  setFingerprintCompatibility,
  setFingerprintEnrolled,
} from "../redux/application/actions";

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

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { navigationRef } from "../navigation/NavigationService";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation"

// Theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

export const Navigator = ({ profile }) => {
  // const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(300000);

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {profile.isLoggedIn ? (
        <MainNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

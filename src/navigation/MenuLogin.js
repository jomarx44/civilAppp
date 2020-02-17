import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import CDSideMenuItem from "library/components/CDSideMenuItem";
import NavigationService from "../navigation/NavigationService";
import * as Profile from "store/profile";

class MenuLogin extends Component {
  render() {
    const { currentRoute } = this.props;
    return (
      <ScrollView>
        {/*<CDSideMenuItem title='Connect Account' route='ConnectCreateAccountScreen' currentRoute={currentRoute} />*/}
        <CDSideMenuItem
          title="Dashboard"
          route="Home"
          currentRoute={currentRoute}
          onPress={() => {NavigationService.navigate("Dashboard")}}
        />
        <CDSideMenuItem
          title="FingerPrint Login"
          route="FingerPrint"
          currentRoute={currentRoute}
        />
        <CDSideMenuItem
          title="About Us"
          route="AboutUs"
          currentRoute={currentRoute}
        />
        <CDSideMenuItem
          title="Logout"
          route="Login"
          currentRoute={currentRoute}
          onPress={() => {
            Profile.deleteAccessToken();
            NavigationService.navigate("Login");
          }}
        />
      </ScrollView>
    );
  }
}

export default MenuLogin;

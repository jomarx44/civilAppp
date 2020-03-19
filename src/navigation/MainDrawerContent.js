import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

// Other
import { logout } from "../actions/actionCreators";
import * as Profile from "store/profile";
import { config } from "../config";

const MainDrawerContent = props => {
  return (
    <DrawerContentScrollView
      {...props}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.navigationLogoContainer}>
        <Image
          source={config.company.logo.sidebar}
          style={styles.navigationLogo}
        />
      </View>
      <DrawerItemList
        {...props}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        activeBackgroundColor="#FFF"
        activeTintColor="#f5ac14"
        inactiveTintColor="#FFF"
      />
      <DrawerItem
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        activeBackgroundColor="#FFF"
        activeTintColor="#f5ac14"
        inactiveTintColor="#FFF"
        label="Logout"
        onPress={() => {
          Profile.deleteAccessToken();
          props.logout();
          // props.navigation.navigate("Login");
        }}
      />
    </DrawerContentScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawerContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7"
  },
  contentContainer: {},
  labelStyle: {
    fontFamily: "Avenir_Medium",
    fontSize: 22
  },
  navigationLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    height: 87
  },
  navigationLogo: {
    width: 200,
    height: 35
  },
  itemStyle: {
    color: "#FFFFFF",
    height: 55,
    justifyContent: "center"
  }
});

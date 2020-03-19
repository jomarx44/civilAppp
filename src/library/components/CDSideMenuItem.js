import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Text } from "native-base";
import { withNavigation } from '@react-navigation/compat';
import NavigationService from "navigation/NavigationService.js";

class CDSideMenuItem extends Component {
  render() {
    const { currentRoute, route, onPress } = this.props;
    return (
      <View
        style={[
          styleDrawer.container,
          currentRoute == route && styleDrawer.container_active
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[
            styleDrawer.textstyle,
            currentRoute == route && styleDrawer.textstyleActive
          ]}
          onPress={
            onPress
              ? onPress
              : () => {
                  NavigationService.navigate(this.props.route);
                }
          }
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styleDrawer = StyleSheet.create({
  container: {
    height: 57,
    paddingLeft: 22,
    justifyContent: "center"
  },
  container_active: {
    backgroundColor: "#FFFFFF"
  },
  textstyle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Avenir_Medium"
  },
  textstyleActive: {
    color: "#f5ac14"
  },
  currenttextstyle: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "normal",
    marginLeft: 22,
    fontFamily: "Poppins_medium"
  },

  itemstyle: {},
  hairline: {
    backgroundColor: "#FFFFFF",
    height: 1,
    marginLeft: 18,
    width: 145
  }
});

export default CDSideMenuItem;

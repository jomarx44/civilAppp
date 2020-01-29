import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  ListItem,
  Text,
  Body,
  CheckBox
} from "native-base";

class PNRadioFormAddress extends Component {
  render() {
    const { onPress, selected } = this.props;
    return (
      <View style={styles.view}>
        <ListItem
          // checked={selected}
          onPress={onPress}
          style={styles.radioStyle}
        >
          <CheckBox checked={selected} onPress={onPress} />
          <Body>
            <Text style={{ color: "#f9a010", fontWeight: "bold" }}>
              Same as my Permanent Address
            </Text>
          </Body>
        </ListItem>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  view: {
    marginBottom: 25
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: "#5d646c"
  },
  radioStyle: {
    width: "100%",
  }
});

export default PNRadioFormAddress;

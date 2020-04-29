import React from "react";
import { StyleSheet, Text } from "react-native";

// Others
import config from "../../config";

export const EmailTitle = ({ children, style }) => {
  return <Text style={[styles.defaultTextStyle, style]}>{children}</Text>;
};

export default EmailTitle;

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: config.colors.emailTitle,
    fontFamily: "Gilroy_Medium",
    fontSize: 32,
  },
});

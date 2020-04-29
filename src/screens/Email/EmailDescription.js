import React from "react";
import { StyleSheet, Text } from "react-native";

// Others
import config from "../../config";

export const EmailDescription = ({ children, style }) => {
  return <Text style={[styles.defaultTextStyle, style]}>{children}</Text>;
};

export default EmailDescription;

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: config.colors.EmailDescription,
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    lineHeight: 22,
  },
});

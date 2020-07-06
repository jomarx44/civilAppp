import React from "react";
import { Text } from "react-native";
import { styles } from "./styles"

export const Description = (props) => {
  const { style, children } = props;
  return <Text style={[styles.description, style]}>{children}</Text>;
};

export default Description;

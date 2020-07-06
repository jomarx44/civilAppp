import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";

export const Title = (props) => {
  const { style, children } = props;
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export default Title;

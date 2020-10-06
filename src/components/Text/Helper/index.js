import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { styles } from "./styles";

export const HelperText = (props) => {
  const { children, style } = props;
  return <Text style={[styles.helper, style]}>{children}</Text>;
};

HelperText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default HelperText;

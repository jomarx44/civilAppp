import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import { styles } from "./styles";

export const OTPKeypadButton = (props) => {
  const { onPress, style, children } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.keypadButton, style]}>
      { children }
    </TouchableOpacity>
  );
};

OTPKeypadButton.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
};

export default OTPKeypadButton;

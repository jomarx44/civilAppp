import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import { OTPInput } from "./OTPInput";
import { styles } from "./styles";

export const OTPInputs = (props) => {
  const { style, value } = props;
  return (
    <View style={[styles.inputsContainer, style]}>
      <OTPInput value={value[0]} maxLength={1} />
      <OTPInput value={value[1]} maxLength={1} />
      <OTPInput value={value[2]} maxLength={1} />
      <OTPInput value={value[3]} maxLength={1} />
      <OTPInput value={value[4]} maxLength={1} />
      <OTPInput value={value[5]} maxLength={1} />
      <OTPInput value={value[6]} maxLength={1} />
    </View>
  );
};

OTPInputs.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.string.isRequired,
};

export default OTPInputs;

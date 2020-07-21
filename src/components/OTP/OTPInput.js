import React from "react";
import PropTypes from "prop-types";
import { TextInput, View, ViewPropTypes } from "react-native";
import { styles } from "./styles";

export const OTPInput = (props) => {
  const { value = "", containerStyle, inputStyle, ...inputProps } = props;
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        {...inputProps}
        editable={false}
        value={value}
        style={[
          styles.input,
          inputStyle,
          value.length <= 0 && { borderBottomWidth: 1 },
        ]}
      />
    </View>
  );
};

OTPInput.propTypes = {
  value: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  inputStyle: ViewPropTypes.style,
};

export default OTPInput;

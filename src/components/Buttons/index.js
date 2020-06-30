import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { DEFAULT_PRIMARY_COLOR } from "../../constants/colors";
import PropTypes from "prop-types";
import React from "react";
import { styles } from "./styles";

export const Button = (props) => {
  const {
    buttonStyle,
    disabled,
    disabledStyle,
    labelStyle,
    label,
    loading,
    ...otherProps
  } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={[
        styles.defaultButtonStyle,
        buttonStyle,
        disabled && styles.defaultDisabledStyle,
        disabled && disabledStyle,
      ]}
    >
      {!loading ? (
        <Text style={[styles.defaultLabelStyle, labelStyle]}>{label}</Text>
      ) : (
        <ActivityIndicator color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );
};

export const ContainedButton = ({ buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle={{ backgroundColor: DEFAULT_PRIMARY_COLOR, ...buttonStyle }}
    />
  );
};

export const OutlineButton = ({ buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle={{
        borderColor: DEFAULT_PRIMARY_COLOR,
        borderWidth: 2,
        ...buttonStyle,
        backgroundColor: "transparent",
      }}
    />
  );
};

export const TextButton = ({ buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle={{
        color: DEFAULT_PRIMARY_COLOR,
        ...buttonStyle,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Button;

/**
 * Prop Types
 */

Button.propTypes = {
  buttonStyle: PropTypes.object,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

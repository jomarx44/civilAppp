import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export const Button = ({
  buttonStyle,
  disabled,
  disabledStyle,
  labelStyle,
  label,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
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
  return <Button {...props} buttonStyle={{ ...buttonStyle }} />;
};

export const OutlineButton = ({ buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle={{
        ...buttonStyle,
        backgroundColor: "transparent",
        borderColor: "#F5AC14",
        borderWidth: 2,
      }}
    />
  );
};

export const TextButton = ({ buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      buttonStyle={{ ...buttonStyle, backgroundColor: "transparent" }}
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

/**
 * Default Values
 */

Button.defaultValues = {
  buttonStyle: {
    backgroundColor: "#F5AC14",
  },
  disabled: false,
  label: "Button",
  loading: false,
  onPress: () => {},
};

import { ActivityIndicator, Text, TouchableOpacity, ViewPropTypes } from "react-native";

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
      disabled={disabled}
      style={[
        styles.defaultButtonStyle,
        buttonStyle,
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

export const ContainedButton = (props) => {
  const {buttonStyle, ...buttonProps} = props;
  return (
    <Button
      {...buttonProps}
      buttonStyle={{ backgroundColor: DEFAULT_PRIMARY_COLOR, ...buttonStyle }}
      disabledStyle={styles.defaultDisabledStyle}
    />
  );
};

export const OutlineButton = (props) => {
  const {buttonStyle, ...buttonProps} = props;
  return (
    <Button
      {...buttonProps}
      buttonStyle={{
        borderColor: DEFAULT_PRIMARY_COLOR,
        borderWidth: 2,
        ...buttonStyle,
        backgroundColor: "transparent",
      }}
    />
  );
};

export const TextButton = (props) => {
  const {buttonStyle, ...buttonProps} = props;
  return (
    <Button
      {...buttonProps}
      buttonStyle={{
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
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

ContainedButton.propTypes = Button.propTypes;
OutlineButton.propTypes = Button.propTypes;
TextButton.propTypes = Button.propTypes;
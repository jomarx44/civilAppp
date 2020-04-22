import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const PNContainedButton = (props) => {
  const {
    buttonStyle,
    labelStyle,
    label,
    loading,
    disabled,
    disabledStyle,
  } = props;
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

PNContainedButton.propTypes = {
  buttonStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

export default PNContainedButton;

const styles = StyleSheet.create({
  defaultButtonStyle: {
    alignItems: "center",
    backgroundColor: "#F5AC14",
    borderRadius: 6,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  defaultLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Avenir_Heavy",
    fontSize: 16,
  },
  defaultDisabledStyle: {
    backgroundColor: "#C9C9C9",
  },
});

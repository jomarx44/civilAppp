import React from "react";
import PropTypes from "prop-types";
import { KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";

export const KeyboardShift = (props) => {
  const { children } = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

KeyboardShift.propTypes = {
  children: PropTypes.node,
};

export default KeyboardShift;

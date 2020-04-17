import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";

export const PNFormButton = ({ disabled, color, label, loading, ...props }) => {
  const [defaultStyles, setDefaultStyles] = useState({
    backgroundColor: "#F5AC14"
  });

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[
        styles.button,
        color ? { backgroundColor: color } : defaultStyles,
        disabled && {
          backgroundColor: "#C9C9C9"
        }
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.button_text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Avenir_Medium"
  }
});

export default PNFormButton;

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const InputModal = ({
  containerStyle,
  textStyle,
  placeholderStyle,
  value,
  placeholder,
  invalid,
  ...props
}) => {
  const [borderBottomColor, setBorderBottomColor] = useState("#E1E1E5");
  const [borderBottomWidth, setBorderBottomWidth] = useState(1);
  return (
    <TouchableOpacity
      {...props}
      style={[styles.defaultContainerStyle, containerStyle]}
    >
      <Text
        style={
          value
            ? [
                styles.defaultTextStyle,
                textStyle,
                { borderBottomColor, borderBottomWidth }
              ]
            : [
                styles.defaultPlaceholderStyle,
                placeholderStyle,
                { borderBottomColor, borderBottomWidth }
              ]
        }
      >
        {/* <Text> */}
        {value ? value : placeholder}
      </Text>
      <Text style={[styles.invalidText]}>{invalid}</Text>
    </TouchableOpacity>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    justifyContent: "center",
    backgroundColor: "transparent",
    flex: 1,
    marginBottom: 40
  },
  defaultTextStyle: {
    color: "#F9A010",
    fontFamily: "Avenir_Book",
    fontSize: 20
  },
  defaultPlaceholderStyle: {
    color: "#444444",
    fontFamily: "Avenir_Book",
    fontSize: 20,
    padding: 0
  },
  invalidText: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061"
  }
});

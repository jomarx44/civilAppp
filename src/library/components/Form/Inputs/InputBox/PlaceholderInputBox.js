import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const PlaceholderInputBox = forwardRef(({ style, ...props }, ref) => {
  const input = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      input.current.focus();
    }
  }));

  return (
    <TextInput
      {...props}
      ref={input}
      style={[styles.defaultStyle, styles.defautFontStyle, style]}
    />
  );
});

export default PlaceholderInputBox;

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    height: 48,
    marginBottom: 16,
    paddingHorizontal: 18,
  },
  defautFontStyle: {
    color: "#3E4A59",
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
  }
});

import React, { createRef, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Item, Label } from "native-base";

export const PNFormTextBox = forwardRef(({ editable = true, password, invalid, label, ...props }, ref) => {
  const input = createRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      input.current.focus();
    }
  }));

  return (
    <View style={styles.defaultContainerStyle}>
      <Label style={styles.label}>{label}</Label>
      <Item style={styles.text}>
        <TextInput
          {...props}
          ref={input}
          secureTextEntry={password}
          style={[styles.input, !editable && styles.input_disabled]}
        />
      </Item>
      <Text style={[styles.invalidText]}>{ invalid }</Text>
    </View>
  );
})

let styles = StyleSheet.create({
  defaultContainerStyle: {
    marginBottom: 15
  },
  text: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: 5
  },
  input: {
    color: "#f9a010",
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    width: "100%"
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  label: {
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    color: "#5d646c"
  },
  invalidText: {
    fontFamily: 'Gilroy_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormTextBox;

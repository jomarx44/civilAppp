/* eslint-disable react/display-name */
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TextInput, ViewPropTypes } from "react-native";

export const Input = forwardRef((props, ref) => {
  const [isFocused, setFocused] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const {
    containerStyle,
    inputContainerStyle,
    inputStyle,
    labelStyle,
    focusedContainerStyle,
    focusedInputContainerStyle,
    focusedInputStyle,
    focusedLabelStyle,
    filledContainerStyle,
    filledInputContainerStyle,
    filledInputStyle,
    filledLabelStyle,
    invalidStyle,
    label,
    value,
    invalidText,
    placeholderTextColor,
    onFocus,
    onBlur,
    onChangeText,
    ...inputProps
  } = props;
  const input = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      input.current.focus();
    },
  }));

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChangeText = (value) => {
    setEmpty(!value || value === "");
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        !isEmpty && filledContainerStyle && filledContainerStyle,
        isFocused && focusedContainerStyle && focusedContainerStyle,
      ]}
    >
      {label && (
        <Text
          style={[
            styles.label,
            labelStyle,
            !isEmpty && filledLabelStyle && filledLabelStyle,
            isFocused && focusedLabelStyle && focusedLabelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          !isEmpty && filledInputContainerStyle && filledInputContainerStyle,
          isFocused && focusedInputContainerStyle && focusedInputContainerStyle,
        ]}
      >
        <TextInput
          {...inputProps}
          onBlur={() => {
            handleBlur();
            onBlur && onBlur();
          }}
          onChangeText={(value) => {
            handleChangeText(value);
            onChangeText && onChangeText(value);
          }}
          onFocus={() => {
            handleFocus();
            onFocus && onFocus();
          }}
          placeholderTextColor={
            placeholderTextColor
              ? placeholderTextColor
              : constants.FONT_COLOR_DARKGRAY
          }
          ref={input}
          style={[
            { color: constants.FONT_COLOR_ORANGE },
            styles.input,
            inputStyle,
            !isEmpty && filledInputStyle && filledInputStyle,
            isFocused && focusedInputStyle && focusedInputStyle,
          ]}
          value={value}
        />
      </View>
      {invalidText && (
        <Text style={[styles.invalid, invalidStyle]}>{invalidText}</Text>
      )}
    </View>
  );
});

Input.propTypes = {
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  focusedContainerStyle: ViewPropTypes.style,
  focusedInputContainerStyle: ViewPropTypes.style,
  focusedInputStyle: Text.propTypes.style,
  focusedLabelStyle: Text.propTypes.style,
  filledContainerStyle: ViewPropTypes.style,
  filledInputContainerStyle: ViewPropTypes.style,
  filledInputStyle: Text.propTypes.style,
  filledLabelStyle: Text.propTypes.style,
  invalidStyle: Text.propTypes.style,
  label: PropTypes.string,
  value: PropTypes.string,
  invalidText: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
}

export const constants = {
  FONT_COLOR_ORANGE: "#f9a010",
  FONT_COLOR_GRAY: "#3e4a59",
  FONT_COLOR_DARKGRAY: "#444444",
  FONT_COLOR_DARKBLUE: "#003d6f",
};

export default Input;

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#FFF",
    flexDirection: "column",
    marginBottom: 20,
    width: "100%",
  },
  label: {
    backgroundColor: "transparent",
    color: "#5d646c",
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "#e1e1e5",
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: "transparent",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    height: 40,
    paddingVertical: 6,
  },
  invalid: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061"
  }
});

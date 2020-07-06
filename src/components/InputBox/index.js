/* eslint-disable react/display-name */
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Text, View, TextInput } from "react-native";
import { styles } from "./styles";

export const InputBox = forwardRef((props, ref) => {
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

export const constants = {
  FONT_COLOR_ORANGE: "#f9a010",
  FONT_COLOR_GRAY: "#3e4a59",
  FONT_COLOR_DARKGRAY: "#444444",
  FONT_COLOR_DARKBLUE: "#003d6f",
};

export default InputBox;

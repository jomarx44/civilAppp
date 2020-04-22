import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import { Animated, Text, TextInput, StyleSheet, View } from "react-native";

const COLOR_EMPTYVALUE = "E1E1E5"
const COLOR_NONEMPTYVALUE = "";

export const PNFormInputBox = forwardRef(
  ({ value, invalid = "", onBlur, onFocus, ...props }, ref) => {
    const [borderBottomColor, setBorderBottomColor] = useState("#E1E1E5");
    const [borderBottomWidth, setBorderBottomWidth] = useState(1);
    const input = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        input.current.focus();
      }
    }));

    const isEmpty = () => {
      return value == "";
    };

    const handleEvent = (event, options) => {
      switch (event) {
        case "onFocus":
          setBorderBottomColor("#F5AC14");
          break;

        case "onBlur":
          if (!isEmpty()) {
            setBorderBottomWidth(0);
          } else {
            setBorderBottomColor("#E1E1E5");
            setBorderBottomWidth(1);
          }
          break;

        default:
          break;
      }
    };

    return (
      <View style={styles.container}>
        <TextInput
          {...props}
          value={value}
          ref={input}
          style={[
            styles.input,
            {
              borderBottomColor: borderBottomColor,
              borderBottomWidth: borderBottomWidth
            }
          ]}
          placeholderTextColor="#444444"
          onFocus={() => {
            // Do props.onFocus if given
            onFocus && onFocus();
            handleEvent("onFocus");
          }}
          onBlur={() => {
            // Do props.onBlur if given
            onBlur && onBlur();
            handleEvent("onBlur");
          }}
          
        />
        <Text style={[styles.invalidText]}>{invalid}</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: "#F9A010"
  },
  invalidText: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061"
  }
});

export default PNFormInputBox;

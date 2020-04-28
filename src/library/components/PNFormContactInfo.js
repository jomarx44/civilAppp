import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TextInput } from "react-native";

export const PNFormContactInfo = forwardRef(
  ({ invalid = "", value, editable = true, onFocus, onBlur, ...props }, ref) => {
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
      <View style={styles.view}>
        <View style={{
          flexDirection: "row", 
          borderBottomColor,
          borderBottomWidth
        }}>
          <Text style={styles.prefix_number}>+63</Text>
          <TextInput
            {...props}
            editable={editable}
            keyboardType="number-pad"
            ref={input}
            style={[styles.input, !editable && styles.input_disabled]}
            value={value ? value.replace(/^0+/, "") : ""}
            maxLength={10}
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
        </View>
        
        <Text style={[styles.invalidText]}>{invalid}</Text>
      </View>
    );
  }
);

PNFormContactInfo.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  autoCompleteType: PropTypes.string,
  reference: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prefix_number: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: "#F9A010",
    width: "20%",
    marginRight: 5,
  },
  input: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: "#F9A010",
    width: "80%",
  },
  input_disabled: {
    backgroundColor: "#EEEEEE",
  },
  view: {
    marginBottom: 25,
  },
  invalidText: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061",
  },
});

export default PNFormContactInfo;

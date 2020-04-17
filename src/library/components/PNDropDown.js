import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Dimensions, Text, Picker } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const PNDropDown = ({
  disabled,
  placeholder,
  onValueChange,
  selectedValue,
  options = [],
  invalid = "",
  onBlur
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[styles.bordered, disabled && { backgroundColor: "#EEEEEE" }]}
      >
        <RNPickerSelect
          disabled={disabled}
          onClose={onBlur}
          onValueChange={onValueChange}
          items={options}
          style={pickerStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={placeholder}
          
        />
      </View>
      <Text style={[styles.invalidText]}>{invalid}</Text>
    </View>
  );
};

PNDropDown.propTypes = {
  options: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    flexDirection: "column"
  },
  bordered: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1
  },
  picker: {
    padding: 0,
    color: "#f9a010",
    fontFamily: "Avenir_Book",
    fontSize: 30,
    width: "100%"
  },
  picker_blank: {
    color: "#444444"
  },
  invalidText: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061"
  }
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    fontFamily: "Avenir_Book",
    width: "100%",
    color: "#f9a010",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    fontFamily: "Avenir_Book",
    width: "100%",
    color: "#f9a010",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default PNDropDown;

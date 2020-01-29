import React from "react";
import PropTypes from 'prop-types'
import { StyleSheet, View, Dimensions, Text, Picker } from "react-native";

const PNDropDown = ({ title, onValueChange, selectedValue, options = [] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={value => onValueChange(value)}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

PNDropDown.propTypes = {
  options: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: "#5d646c"
  },
  picker: {
    color: "#f9a010",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    width: "100%"
  }
});

export default PNDropDown;

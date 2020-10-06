import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const Dropdown = (props) => {
  const { onChangeItem } = props;
  return (
    <DropDownPicker
      {...props}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({});

import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Label, ListItem, Radio } from "native-base";

const data = [
  {
    title: "",
    onPress: () => {},
    selected: false
  }
];

export const RadioItem = ({ title, selected, onPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Radio
        onPress={onPress}
        selected={selected}
        selectedColor="#f5ac14"
        color="#c5c5c5"
        style={styles.radioStyle}
      />
      <Text style={styles.radioText}>{title}</Text>
    </TouchableOpacity>
  );
}

export const PNFormRadio = ({ items = [], invalid = '' }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <RadioItem
          key={index}
          title={item.title}
          selected={item.selected}
          onPress={item.onPress}
        />
      ))}
      <Text style={[styles.invalidText]}>{ invalid }</Text>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 40
  },
  radioStyle: {
    marginRight: 10
  },
  radioText: {
    fontFamily: "Avenir_Medium",
    fontSize: 21,
    color: "#3e4a59"
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormRadio;

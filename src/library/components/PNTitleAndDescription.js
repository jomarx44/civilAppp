import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const PNTitleAndDescription = (props) => {
  const { title, desc, containerStyle, titleStyle, descriptionStyle } = props;
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      <Text style={[styles.defaultTitleStyle, titleStyle]}>{title}</Text>
      <Text style={[styles.defaultDescriptionStyle, descriptionStyle]}>
        {desc}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "#FFFFFF",
    height: height * 0.22,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "center",
  },
  defaultTitleStyle: {
    fontSize: 32,
    color: "#042C5C",
    fontFamily: "Avenir_Heavy",
    marginBottom: 10,
  },
  defaultDescriptionStyle: {
    color: "#5D646C",
    lineHeight: 24,
    fontFamily: "Avenir_Medium",
    fontSize: 16,
  },
});

export default PNTitleAndDescription;

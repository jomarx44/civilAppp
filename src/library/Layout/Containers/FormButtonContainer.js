import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FormButtonContainer = ({containerStyle, children}) => {
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      {children}
    </View>
  );
};

export default FormButtonContainer;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingBottom: 30
  }
});

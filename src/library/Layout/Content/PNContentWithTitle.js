import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Custom Component
import KeyboardShift from "library/components/KeyboardShift";
import PNFormHeader from "../../components/PNFormHeader"

const PNContentWithTitle = ({
  title,
  children,
  containerStyle,
  inputsContainer,
  contentContainerStyle
}) => {
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      <KeyboardShift>
        {() => (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <PNFormHeader>{title}</PNFormHeader>
            <ScrollView
              persistentScrollbar={true}
              style={[styles.defaultInputsContainer, inputsContainer]}
              contentContainerStyle={[
                styles.defaultContentContainerStyle,
                contentContainerStyle
              ]}
            >
              {children}
            </ScrollView>
          </View>
        )}
      </KeyboardShift>
    </View>
  );
};

export default PNContentWithTitle;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1
  },
  defaultInputsContainerStyle: {
    // flex: 1,
    paddingHorizontal: 30
  },
  defaultContentContainerStyle: {
    paddingTop: 30,
    paddingHorizontal: 30
  }
});

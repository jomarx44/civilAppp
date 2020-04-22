import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

// Custom Components
import KeyboardShift from "library/components/KeyboardShift";
import PNTitleAndDescription from "library/components/PNTitleAndDescription";

const PNContentWithTitleAndDescription = ({
  title,
  desc,
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
            <PNTitleAndDescription title={title} desc={desc} />
            <ScrollView
              persistentScrollbar={true}
              style={[styles.defaultInputsContainer, inputsContainer]}
              contentContainerStyle={[
                styles.defaultContentContainerStyle,
                contentContainerStyle,
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

export default PNContentWithTitleAndDescription;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
  },
  defaultInputsContainerStyle: {
    paddingHorizontal: 30
  },
  defaultContentContainerStyle: {
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 100
  },
});

import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

// Custom Components
import KeyboardShift from "library/components/KeyboardShift";
import PNTitleAndDescription from "library/components/PNTitleAndDescription";

const PNContentWithTitleAndDescription = ({title, desc, children, containerStyle}) => {
  return (
    <KeyboardShift>
      {() => (
        <View style={[styles.defaultContainerStyle, containerStyle]}>
          <View style={styles.defaultHeaderStyle}>
            <PNTitleAndDescription
              title={title}
              desc={desc}
            />
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
          >
            {children}
          </ScrollView>
        </View>
      )}
    </KeyboardShift>
  );
};

export default PNContentWithTitleAndDescription;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
    flexDirection: "column",
    padding: 25
  },
  defaultHeaderStyle: {
    paddingTop: 20,
    backgroundColor: "transparent",
    flex: 1
  },
  content: {},
  contentContainer: {}
});

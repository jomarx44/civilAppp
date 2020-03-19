import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

// Custom Components
import KeyboardShift from "library/components/KeyboardShift";
import PNTitleAndDescription from "library/components/PNTitleAndDescription";

const PNContentWithTitleAndDescription = ({title, desc, children}) => {
  return (
    <KeyboardShift>
      {() => (
        <View style={styles.container}>
          <View style={styles.header}>
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
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 25
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  content: {},
  contentContainer: {}
});

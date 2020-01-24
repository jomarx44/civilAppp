import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import KeyboardShift from "library/components/CDKeyboardShift.js";

const OpenAccount = props => {
  return (
    <View style={styles.Container}>
      <KeyboardShift>
        {() => (
          <View>
            <View style={styles.HeaderContainer}></View>
            <ScrollView style={styles.ContentContainer}>
              
            </ScrollView>
          </View>
        )}
      </KeyboardShift>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  HeaderContainer: {
    flex: 1
  },
  ContentContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50
  }
});

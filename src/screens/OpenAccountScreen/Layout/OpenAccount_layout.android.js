import React from "react";
import PropTypes from 'prop-types'
import { Dimensions, View, StyleSheet, ScrollView } from "react-native";
import KeyboardShift from "library/components/CDKeyboardShift.js";

const {
  height,
  width
} = Dimensions.get('window');

const OpenAccountLayout = props => {
  return (
    <View style={styles.Container}>
      <KeyboardShift>
        {() => (
          <View>
            <View style={styles.HeaderContainer}>
              {props.header}
            </View>
            <ScrollView style={styles.ContentContainer}>
              {props.children}
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
    flex: 2,
    height: height * 0.2
  },
  ContentContainer: {
    flex: 8,
    paddingHorizontal: 30,
    paddingBottom: 50
  }
});

OpenAccountLayout.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.element
}

export default OpenAccountLayout;

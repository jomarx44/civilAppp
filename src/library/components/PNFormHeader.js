import React, { Component } from 'react'
import { Dimensions, Text, StyleSheet, View } from 'react-native'

const { height } = Dimensions.get('window');

export const PNFormHeader = ({children}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {children}
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: height * 0.2,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Avenir_Book',
    fontSize: 32
  }
});

export default PNFormHeader;
import React from 'react'
import { StyleSheet, View } from 'react-native'

const SlideContainer = ({containerStyle, children}) => {
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      {children}
    </View>
  )
}

export default SlideContainer

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1
  }
})

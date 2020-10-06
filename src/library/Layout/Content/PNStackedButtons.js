import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

export const PNStackedButtons = (props) => {
  const {children, containerStyle} = props;
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      {children}
    </View>
  )
}

PNStackedButtons.propTypes = {
  containerStyle: PropTypes.object
}

export default PNStackedButtons

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
})

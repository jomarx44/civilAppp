import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const PNContainedButton = (props) => {
  const {buttonStyle, labelStyle, label} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.defaultButtonStyle, buttonStyle]}
    >
      <Text style={[styles.defaultLabelStyle, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

PNContainedButton.propTypes = {
  buttonStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string
}

export default PNContainedButton;

const styles = StyleSheet.create({
  defaultButtonStyle: {
    alignItems: "center",
    backgroundColor: "#F5AC14",
    borderRadius: 4,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  defaultLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Avenir_Heavy",
    fontSize: 16
  }
})

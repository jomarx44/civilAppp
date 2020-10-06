import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const PNTextButton = (props) => {
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

PNTextButton.propTypes = {
  buttonStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string
}

export default PNTextButton;

const styles = StyleSheet.create({
  defaultButtonStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  defaultLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Gilroy_Bold",
    fontSize: 16
  }
})

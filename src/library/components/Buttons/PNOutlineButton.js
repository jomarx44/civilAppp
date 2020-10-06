import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const PNOutlineButton = (props) => {
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

PNOutlineButton.propTypes = {
  buttonStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string
}

export default PNOutlineButton;

const styles = StyleSheet.create({
  defaultButtonStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "#F5AC14",
    borderRadius: 4,
    borderWidth: 2,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  defaultLabelStyle: {
    color: "#F9AE34",
    fontFamily: "Gilroy_Bold",
    fontSize: 16
  }
})

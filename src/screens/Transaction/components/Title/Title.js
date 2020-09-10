import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

export const TransactionTitle = (props) => {
  const { style, children } = props;
  return (
    <Text style={[styles.defaultStyle, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: "#2a599d",
    fontFamily: "Gilroy_Bold",
    fontSize: 23
  }
});

TransactionTitle.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
}

export default TransactionTitle

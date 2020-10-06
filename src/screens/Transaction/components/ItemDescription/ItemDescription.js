import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

// Others
import config from "../../../../config";

export const TransactionItemDescription = (props) => {
  const { style, children } = props;
  return (
    <Text style={[styles.defaultStyle, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: config.colors.transactionDescription,
    fontFamily: "Avenir_Roman",
    fontSize: 13,
    marginBottom: 2
  }
});

TransactionItemDescription.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
}

export default TransactionItemDescription

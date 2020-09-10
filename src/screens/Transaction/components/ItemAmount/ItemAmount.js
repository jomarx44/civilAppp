import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

// Others
import config from "../../../../config";
import { numFixed } from "../../../../helpers/number"

export const TransactionItemAmount = (props) => {
  const { style, isCredit ,children } = props;
  const { transactionAmountCredit, transactionAmountDebit} = config.colors;
  return (
    <Text
      style={[styles.defaultStyles, style, { color: isCredit ? transactionAmountCredit : transactionAmountDebit }]}
    >
      {
         `${isCredit === true ? '- ' : '+ '}P ${numFixed(children)}`
      }
    </Text>
  )
}

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
  }
})

TransactionItemAmount.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node,
  isCredit: PropTypes.bool
}

export default TransactionItemAmount

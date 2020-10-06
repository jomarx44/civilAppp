import React from "react";
import PropTypes from 'prop-types'
import { StyleSheet, Text } from "react-native";

// Others
import config from "../../../../config";

export const TransactionItemType = (props) => {
  const { style, children } = props;
  return (
    <Text style={[styles.defaultStyle, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: config.colors.transactionType,
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
  }
})

TransactionItemType.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
}

export default TransactionItemType;

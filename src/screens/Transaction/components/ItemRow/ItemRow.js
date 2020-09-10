import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, ViewPropTypes } from "react-native";

export const TransactionItemRow = (props) => {
  const { children, style } = props;
  return <View style={[styles.defaultStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

TransactionItemRow.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default TransactionItemRow;

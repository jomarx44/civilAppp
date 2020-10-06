import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewPropTypes,
} from "react-native";

export const TransactionFilterButton = (props) => {
  const { children, onPress, style, textStyle } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.defaultStyle, style]}>
      <Text style={[styles.defaultTextStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingLeft: 20,
    alignItems: "center",
  },
  defaultTextStyle: {
    color: "#2a599d",
    fontFamily: "Gilroy_Bold",
    fontSize: 18,
  },
});

TransactionFilterButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};

export default TransactionFilterButton;

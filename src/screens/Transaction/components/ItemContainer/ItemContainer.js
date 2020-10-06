import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";

export const TransactionItemContainer = (props) => {
  const { style, children, onPress } = props;

  if (onPress) {
    <TouchableOpacity styles={[styles.defaultStyle, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>;
  }

  return <View style={[styles.defaultStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 10
  },
});

TransactionItemContainer.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node,
  onPress: PropTypes.func,
};

export default TransactionItemContainer;

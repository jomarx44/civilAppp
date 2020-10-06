import React from "react";
import PropTypes from 'prop-types'
import { StyleSheet, Text } from "react-native";

export const TransactionListLabel = (props) => {
  const { style, children } = props;

  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
    defaultStyle: {
        color: "#adbed0",
        fontFamily: "Gilroy_Bold",
        fontSize: 13,
        marginBottom: 7,
        marginTop: 14
    }
});

TransactionListLabel.propTypes = {
    style: Text.propTypes.style,
    children: PropTypes.node
}
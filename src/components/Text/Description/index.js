import React from "react";
import PropTypes from 'prop-types'
import { Text } from "react-native";
import { styles } from "./styles"

export const Description = (props) => {
  const { children, style } = props;
  return <Text style={[styles.description, style]}>{children}</Text>;
};

Description.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Description;

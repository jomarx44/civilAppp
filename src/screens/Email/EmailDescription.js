import React from "react";
import PropTypes from 'prop-types'
import { Text, ViewPropTypes } from "react-native";
import { styles } from "./styles"

export const EmailDescription = (props) => {
  const { children, style } = props
  return <Text style={[styles.description, style]}>{children}</Text>;
};

EmailDescription.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export default EmailDescription;

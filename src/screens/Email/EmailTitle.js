import React from "react";
import PropTypes from 'prop-types'
import { Text, ViewPropTypes } from "react-native";
import { styles } from "./styles";

export const EmailTitle = (props) => {
  const { children, style } = props;
  return <Text style={[styles.title, style]}>{children}</Text>;
};

EmailTitle.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export default EmailTitle;

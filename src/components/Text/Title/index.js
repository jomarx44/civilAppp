import React from "react";
import PropTypes from 'prop-types'
import { Text } from "react-native";
import { styles } from "./styles";

export const Title = (props) => {
  const { children, style } = props;
  return <Text style={[styles.title, style]}>{children}</Text>;
};

Title.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Title;

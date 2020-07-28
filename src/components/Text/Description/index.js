import React from "react";
<<<<<<< HEAD
import PropTypes from 'prop-types'
=======
>>>>>>> AC/pnmobile-live
import { Text } from "react-native";
import { styles } from "./styles"

export const Description = (props) => {
<<<<<<< HEAD
  const { children, style } = props;
  return <Text style={[styles.description, style]}>{children}</Text>;
};

Description.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

=======
  const { style, children } = props;
  return <Text style={[styles.description, style]}>{children}</Text>;
};

>>>>>>> AC/pnmobile-live
export default Description;

import React from "react";
import PropTypes from "prop-types";
import { Image, ViewPropTypes } from "react-native";
import { styles } from "./styles";

export const EmailLogo = (props) => {
  const { image, style } = props;
  return (
    <Image resizeMode="contain" source={image} style={[styles.logo, style]} />
  );
};

EmailLogo.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      })
    ),
  ]),
  style: ViewPropTypes.style,
};

export default EmailLogo;

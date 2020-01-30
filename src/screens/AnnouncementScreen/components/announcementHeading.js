import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

const announcementHeading = ({ size, children, emphasis }) => (
  <Text
    style={{
      fontSize: size,
      fontFamily: `OpenSans_${emphasis[0].toUpperCase() + emphasis.slice(1)}`
    }}
  >
    {children}
  </Text>
);

announcementHeading.propTypes = {
  size: PropTypes.number,
  children: PropTypes.string,
  emphasis: PropTypes.oneOf(["light", "regular", "semiBold", "bold"])
};

announcementHeading.defaultProps = {
  size: 16,
  emphasis: "bold"
};

export default announcementSubheading;

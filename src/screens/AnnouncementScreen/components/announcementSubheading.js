import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

const announcementSubheading = ({ size, children, emphasis }) => (
  <Text
    style={{
      fontSize: size,
      fontFamily: `Montserrat_${emphasis[0].toUpperCase() + emphasis.slice(1)}`
    }}
  >
    {children}
  </Text>
);

announcementSubheading.propTypes = {
  size: PropTypes.number,
  children: PropTypes.string,
  emphasis: PropTypes.oneOf(["light", "regular", "medium", "semiBold", "bold"])
};

announcementSubheading.defaultProps = {
  size: 14,
  emphasis: "regular"
};

export default announcementSubheading;

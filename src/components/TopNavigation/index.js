import { Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { styles } from "./styles";
import { useSafeArea } from "react-native-safe-area-context";

export const TopNavigation = (props) => {
  const { top } = useSafeArea();
  const {
    headerStyle,
    titleStyle,
    children,
    leftHeaderStyle,
    rightHeaderStyle,
    leftLogo,
    rightLogo,
    ...otherProps
  } = props;

  return (
    <View
      style={[{ marginTop: top }, styles.headerStyle, headerStyle]}
      {...otherProps}
    >
      <View style={[styles.leftHeaderStyle, leftHeaderStyle]}>
        {leftLogo && leftLogo}
      </View>
      <View style={styles.middleHeaderStyle}>
        <Text style={[styles.titleStyle, titleStyle]}>
          {children && children}
        </Text>
      </View>
      <View style={[styles.rightHeaderStyle, rightHeaderStyle]}>
        {rightLogo && rightLogo}
      </View>
    </View>
  );
};

TopNavigation.propTypes = {
  headerStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  children: PropTypes.string,
  leftHeaderStyle: ViewPropTypes.style,
  rightHeaderStyle: ViewPropTypes.style,
  leftLogo: PropTypes.node,
  rightLogo: PropTypes.node,
};

export default TopNavigation;

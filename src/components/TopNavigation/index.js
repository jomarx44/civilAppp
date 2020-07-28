<<<<<<< HEAD
import { Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { styles } from "./styles";
import { useSafeArea } from "react-native-safe-area-context";
=======
import { Text, View } from 'react-native'

import React from 'react'
import { styles } from "./styles";
import { useSafeArea } from 'react-native-safe-area-context';
>>>>>>> AC/pnmobile-live

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
<<<<<<< HEAD
    <View
      style={[{ marginTop: top }, styles.headerStyle, headerStyle]}
      {...otherProps}
    >
=======
    <View style={[{ marginTop: top }, styles.headerStyle, headerStyle ]} {...otherProps}>
>>>>>>> AC/pnmobile-live
      <View style={[styles.leftHeaderStyle, leftHeaderStyle]}>
        {leftLogo && leftLogo}
      </View>
      <View style={styles.middleHeaderStyle}>
<<<<<<< HEAD
        <Text style={[styles.titleStyle, titleStyle]}>
          {children && children}
        </Text>
=======
        <Text style={[styles.titleStyle, titleStyle]}>{children && children}</Text>
>>>>>>> AC/pnmobile-live
      </View>
      <View style={[styles.rightHeaderStyle, rightHeaderStyle]}>
        {rightLogo && rightLogo}
      </View>
    </View>
<<<<<<< HEAD
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
=======
  )
}
>>>>>>> AC/pnmobile-live

export default TopNavigation;

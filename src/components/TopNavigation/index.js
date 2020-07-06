import { Text, View } from 'react-native'

import React from 'react'
import { styles } from "./styles";
import { useSafeArea } from 'react-native-safe-area-context';

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
    <View style={[{ marginTop: top }, styles.headerStyle, headerStyle ]} {...otherProps}>
      <View style={[styles.leftHeaderStyle, leftHeaderStyle]}>
        {leftLogo && leftLogo}
      </View>
      <View style={styles.middleHeaderStyle}>
        <Text style={[styles.titleStyle, titleStyle]}>{children && children}</Text>
      </View>
      <View style={[styles.rightHeaderStyle, rightHeaderStyle]}>
        {rightLogo && rightLogo}
      </View>
    </View>
  )
}

export default TopNavigation;

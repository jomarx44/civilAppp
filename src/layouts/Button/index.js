import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import { styles } from './styles';

export const StackButtonView = (props) => {
  const { style, children } = props;
  return (
    <View style={[styles.defaultContainerStyle, style]}>
      {children}
    </View>
  )
}

StackButtonView.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node
}

export default StackButtonView;

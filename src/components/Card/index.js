import { TouchableOpacity, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { styles } from "./styles"

export const Card = (props) => {
  const { children, onPress, style } = props;
  if(onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: ViewPropTypes.style
}

export default Card

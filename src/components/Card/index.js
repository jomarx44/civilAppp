import { Text, TouchableOpacity, View } from 'react-native'

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

export default Card

import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import React from 'react'
import { styles } from "./styles"

export const NavigationButtons = (props) => {
  const { onPress, logo } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Image style={styles.logo} resizeMode="contain" source={logo} />
    </TouchableOpacity>
  )
}

export default NavigationButtons

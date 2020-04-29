import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const EmailLogo = ({ image, style }) => {
  return (
    <Image 
      resizeMode="contain"
      source={image}
      style={[styles.defaultImageStyle, style]}
    />
  )
}

export default EmailLogo;

const styles = StyleSheet.create({
  defaultImageStyle: {
    height: 275,
    width: 275,
  }
})

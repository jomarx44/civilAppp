import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const EmailLogo = ({ image, style }) => {
  return (
    <Image 
      resizeMode="contain"
      src={image}
      style={[styles.defaultImageStyle, style]}
    />
  )
}

export default EmailLogo;

const styles = StyleSheet.create({
  defaultImageStyle: {
    height: 200,
    width: 200
  }
})

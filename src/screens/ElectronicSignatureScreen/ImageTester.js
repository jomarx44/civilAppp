import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const ImageTester = ({navigation, route}) => {
  const encodedData = route.params.imageData;

  return (
    <View style={{flex: 1}}>
      <Image 
        source={{ uri: encodedData }} 
        style={{
          flex: 1
        }}
      />
    </View>
  )
}

export default ImageTester

const styles = StyleSheet.create({})

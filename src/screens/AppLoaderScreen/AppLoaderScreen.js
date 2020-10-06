import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const AppLoaderScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "#309FE7",
        flex: 1
      }}
    >
      <Image 
        source={require("res/images/ic_logo.png")}
        style={{
          bottom: 0,
          right: 0,
          width: "88%"
        }}
        resizeMode="contain"
      />
    </View>
  )
}

export default AppLoaderScreen

const styles = StyleSheet.create({})

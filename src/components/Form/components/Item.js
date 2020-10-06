import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Item } from "native-base"

export const Item = (props) => {
  const {
    children,
    success,
    error
  } = props;

  return (
    <View>
      {children}
    </View>
  )
}

export default Item

const styles = StyleSheet.create({})

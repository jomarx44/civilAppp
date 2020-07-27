import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export const ReviewTransfer = (props) => {
  const { containerStyle,  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={}
        renderItem={({ item }) => {
          return ()
        }}
        style={}
      />
    </View>
    
  )
}

export default ReviewTransfer

const styles = StyleSheet.create({
  container: {

  }
})

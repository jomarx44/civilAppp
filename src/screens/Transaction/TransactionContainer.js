import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export const TransactionContainer = () => {
  return (
    <View>
      <Text> prop </Text>
    </View>
  )
}

const mapStateToProps = ({...props}) => ({
  
})

const mapDispatchToProps = () => {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer)

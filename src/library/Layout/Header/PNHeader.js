import { Body, Button, Header, Icon, Left, Right } from "native-base"
import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PNHeader = ({ headerStyle, left, center, right }) => {
  const insets = useSafeAreaInsets();
  return (
    <Header style={[styles.defaultHeaderStyle, headerStyle, { paddingTop: insets.top }]}>
      <Left style={styles.defaultLeftStyle}>
        {left}
      </Left>
      <Body style={styles.defaultBodyStyle}>
        {center}
      </Body>
      <Right style={styles.defaultRightStyle}>
        {right}
      </Right>
    </Header>
  )
}

export default PNHeader

const styles = StyleSheet.create({
  defaultHeaderStyle: {
    backgroundColor: "transparent",
    height: 80,
    borderBottomWidth: 0, 
    elevation: 0, 
    shadowOpacity: 0,
  },
  defaultLeftStyle: {
    alignItems: 'center',
    flex: 1
  },
  defaultBodyStyle: {
    alignItems: 'center',
    flex: 3
  },
  defaultRightStyle: {
    alignItems: 'center',
    flex: 1
  }
})

import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AccountCard } from "./AccountCard"

const AccountCardList = ({
  ...props
}) => {
  return (
    <FlatList
      {...props}
      renderItem={({ item, index }) => {
        switch(item) {
          
        }
      }}
    />
  )
}

export default AccountCardList

const styles = StyleSheet.create({})

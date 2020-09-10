import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import { TransactionFilterButton, TransactionTitle, TransactionSection } from "./components"

export const Transaction = (props) => {
  const { data, onFilter, onRefresh, isRefreshing, isAllShown } = props;

  return (
    <View style={[styles.containerStyle]}>
      <View style={[styles.headerStyle]}>
        <TransactionTitle>Transactions</TransactionTitle>
        <TransactionFilterButton onPress={onFilter}>{isAllShown ? "Show Less" : "See All"}</TransactionFilterButton>
      </View>
      <TransactionSection data={data} onRefresh={onRefresh} isRefreshing={isRefreshing} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex:1,
    alignItems: "center",
    backgroundColor: "#fafcff",
    marginTop: 44
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: 320,
    marginBottom: 9
  }
});

Transaction.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func,
  isAllShown: PropTypes.bool
}

export default Transaction

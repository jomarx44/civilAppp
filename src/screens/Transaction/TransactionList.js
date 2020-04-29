import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";

export const TransactionListLabel = ({style, value}) => {
  return <Text style={[style]}></Text>
}

const TransactionList = () => {
  return (
    <FlatList
      data={}
      renderItem={({ item: { type, amount, date, id } }) => {
        <TransactionItem
          data={{
            id,
            amount,
            date,
            type,
          }}
        />;
      }}
    />
  );
};

export default TransactionList;

const styles = StyleSheet.create({});

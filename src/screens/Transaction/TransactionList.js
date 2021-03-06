import React from "react";
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";

export const TransactionListLabel = ({style, value}) => {
  return <Text style={[style]}></Text>
}

const TransactionList = (props) => {
  const { data } = props;
  return (
    <FlatList
      data={ data }
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

TransactionList.propTypes = {
  data: PropTypes.array.isRequired
}

export default TransactionList;

const styles = StyleSheet.create({});

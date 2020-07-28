import React from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, Text, View } from "react-native";

// Custom Components Here
import { SelectSourceAccountItem } from "./SelectSourceAccountItem";

export const SelectSourceAccountList = (props) => {
  const { data } = props;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <SelectSourceAccountItem
            accountData={{
              accountNumber: item.accountNumber,
              accountType: item.accountType,
              availableBalance: item.availableBalance,
            }}
            onPress={item.onPress}
          />
        );
      }}
      keyExtractor={item => item.accountNumber}
      style={[styles.listContainer]}
      contentContainerStyle={[styles.listContentContainer]}
    />
  );
};

SelectSourceAccountList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      accountNumber: PropTypes.string,
      accountType: PropTypes.string,
      availableBalance: PropTypes.string,
      onPress: PropTypes.func
    })
  ),
};

export default SelectSourceAccountList;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 10,
    width: "85%",
    maxWidth: 325,
    overflow: "hidden"
  }, 
  listContentContainer: {
    borderRadius: 10
  }
});

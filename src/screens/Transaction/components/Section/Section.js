import React from "react";
import PropTypes from "prop-types";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";

// Others
import { TransactionItem } from "../Item";
import { TransactionListLabel } from "../ListLabel";

export const TransactionSection = (props) => {
  const { data, onRefresh, isRefreshing } = props;
  return (
    <SectionList
      style={[styles.defaultStyle]}
      contentContainerStyle={[styles.defaultContentStyle]}
      sections={data}
      keyExtractor={(item, index) => item + index}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "#fafcff",
          }}
        />
      )}
      renderItem={({ item }) => {
        return <TransactionItem data={item} />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        return (
          <TransactionListLabel>{title.toUpperCase()}</TransactionListLabel>
        );
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    width: "100%",
    maxWidth: 320,
  },
});

TransactionSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      data: PropTypes.array,
    })
  ),
};

export default TransactionSection;

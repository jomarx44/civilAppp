import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Others
import config from "../../config";

export const TransactionItemType = ({ style, value }) => {
  return (
    <Text style={[styles.defaultTextStyle, styles.defaultTypeStyle, style]}>
      {value}
    </Text>
  );
};

export const TransactionItemCreditAmount = ({ style, value }) => {
  return (
    <Text
      style={[styles.defaultTextStyle, styles.defaultCreditAmountStyle, style]}
    >
      - P {value}
    </Text>
  );
};

export const TransactionItemDebitAmount = ({ style, value }) => {
  return (
    <Text
      style={[styles.defaultTextStyle, styles.defaultDebitAmountStyle, style]}
    >
      P {value}
    </Text>
  );
};

export const TransactionItemDate = ({ style, value }) => {
  return <Text style={[styles.defaultDateStyle, style]}>{value}</Text>;
};

export const TrannsactionItemRow = ({ children, style }) => {
  return <View style={[styles.defaultRowStyle, style]}>{children}</View>;
};

export const TransactionItemContainer = ({ children, onPress, style }) => {
  // Check if onPress was declared, if so then we'll use TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        stypes={[styles.defaultContainerStyle, style]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.defaultContainerStyle, style]}>{children}</View>;
};

export const TransactionItem = ({
  data: { amount, date, type },
  isCredit = false,
  onPress,
  containerStyle,
  rowStyle,
}) => {
  return (
    <TransactionItemContainer style={containerStyle} onPress={onPress}>
      <TrannsactionItemRow style={rowStyle}>
        <TransactionItemType value={type} />
        {isCredit === true ? (
          <TransactionItemCreditAmount value={amount} />
        ) : (
          <TransactionItemDebitAmount value={amount} />
        )}
      </TrannsactionItemRow>
      <TrannsactionItemRow style={rowStyle}>
        <TransactionDateLabel value={date} />
      </TrannsactionItemRow>
    </TransactionItemContainer>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 72,
    padding: 18,
  },
  defaultRowStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  defaultTextStyle: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
  },
  defaultTypeStyle: {
    color: config.colors.transactionType,
  },
  defaultDebitAmountStyle: {
    color: config.colors.transactionAmountDebit,
  },
  defaultCreditAmountStyle: {
    color: config.colors.transactionAmountCredit,
  },
  defaultDateStyle: {
    color: config.colors.transactionDate,
    fontFamily: "Avenir_Roman",
    fontSize: 13,
  },
});

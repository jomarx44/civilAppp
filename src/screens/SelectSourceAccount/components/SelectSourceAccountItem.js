import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

// Custom Components Here
import { Card } from "../../../components";

export const SelectSourceAccountItem = (props) => {
  const {
    accountData: { accountNumber, accountType, availableBalance },
    onPress
  } = props;
  return (
    <Card style={[styles.card]} onPress={onPress}>
      <View style={[styles.bankDetailsContainer]}>
        <Text style={[styles.accountNumber]}>{accountNumber}</Text>
        <Text style={[styles.accountType]}>{accountType}</Text>
      </View>
      <View style={[styles.balanceContainer]}>
        <Text style={[styles.availableBalanceLabel]}>Available Balance</Text>
        <Text style={[styles.availableBalance]}>{availableBalance}</Text>
      </View>
    </Card>
  );
};

SelectSourceAccountItem.propTypes = {
  accountData: PropTypes.shape({
    accountNumber: PropTypes.string,
    accountType: PropTypes.string,
    availableBalance: PropTypes.string
  }),
  onPress: PropTypes.func
};

export default SelectSourceAccountItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    borderRadius: 0,
    borderWidth: 0
  },
  bankDetailsContainer: {
    justifyContent: "center",
  },
  balanceContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  accountNumber: {
    color: "#77869E",
    fontFamily: "Gilroy_Medium",
    fontSize: 13,
    letterSpacing: 0.27,
    marginBottom: 4
  },
  accountType: {
    color: "#003d6f",
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
  },
  availableBalanceLabel: {
    color: "#444",
    fontFamily: "Gilroy_Medium",
    fontSize: 11,
    letterSpacing: 0.25,
    textAlign: "right"
  },
  availableBalance: {
    color: "#f9a010",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    textAlign: "right"
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BankItem } from "./components";
import { banks } from "./BankOptions";

export const TransferMoneyOption = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.transferMoneyOptionContentContiner}>
        {banks.map((bank, index) => {
          return (
            <BankItem
              onPress={() => {
                if (bank.routeName) {
                  navigation.navigate(bank.routeName);
                }
              }}
              key={`BankItem${index.toString()}`}
            >
              {bank.name}
            </BankItem>
          );
        })}
      </View>
      <View style={styles.manageContainer}>
        <Text style={styles.manageLabel}>MANAGE</Text>
        <BankItem onPress={() => {}}>Manage Saved Receiver</BankItem>
      </View>
    </View>
  );
};

export default TransferMoneyOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40
  }, 
  transferMoneyOptionContentContiner: {
    maxWidth: 325,
    width: "80%"
  },
  manageContainer: {
    marginTop: 35,
    maxWidth: 325,
    width: "80%"
  },
  manageLabel: {
    color: "#ADBED0",
    fontFamily: "Gilroy_Bold",
    fontSize: 13,
    marginBottom: 15
  },
});
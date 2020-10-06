import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AccountCard from "./AccountCard";

const AccountsListScreen = ({ navigation }) => {
  const documentsData = [
    { balance: "P 18,240", cardHolder: "ANNE DOMINGUEZ" },
    { balance: "P 18,241", cardHolder: "XIN RIVERA" },
    { balance: "P 18,242", cardHolder: "JV SORIANO" },
    { balance: "P 18,243", cardHolder: "DONG DATILES" },
    { balance: "P 18,244", cardHolder: "THADZ RIZO" },
    { balance: "P 18,245", cardHolder: "ALVIN CHING" },
    { balance: "P 18,246", cardHolder: "DENISE FABELICO" },
    { balance: "P 18,247", cardHolder: "FERVI CASTRO" },
  ];

  return (
    <View style={{ margin: 24, marginTop: 40, flex: 1 }}>
      <FlatList
        style={styles.flatlistStyle}
        showsVerticalScrollIndicator={false}
        data={documentsData}
        keyExtractor={(account) => account.balance}
        renderItem={({ item }) => {
          return (
            <AccountCard account={item} color1="#4a27f3" color2="#444bb1" />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    marginTop: 20.0,
  },
  flatlistContainer: {
    // backgroundColor: '#DDDDDD'
  },
});

export default AccountsListScreen;

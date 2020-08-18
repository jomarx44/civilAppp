import React, { useEffect } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
} from "react-native";
import { Container } from "native-base";

import { connect } from "react-redux";
import { getBankAccountHistoryAsync } from "../../redux/bankAccount/actions";

const numFixed = (amount) => {
  amount = Math.abs(amount);
  amount = amount.toFixed(2);

  let str = amount.split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const Item = (props) => {
  const { title, date, amount, index } = props;
  return (
    <View
      style={[
        localStyles.listItem,
        { backgroundColor: index % 2 == 0 ? "#FFF" : "#FAFAFB" },
      ]}
    >
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text style={localStyles.itemText}>{title}</Text>
        <Text style={localStyles.dateText}>{date}</Text>
      </View>
      <View style={{ flexGrow: 2, justifyContent: "center" }}>
        <Text
          style={[
            localStyles.amountText,
            { color: Math.sign(amount) === -1 ? "#679D1D" : "#DC6061" },
          ]}
        >
          {Math.sign(amount) === 1
            ? "PHP -" + numFixed(amount)
            : "PHP " + numFixed(amount)}
        </Text>
      </View>
    </View>
  );
};

export const AccountHistory = (props) => {
  const {
    route: {
      params: { accountNumber },
    },
    bankAccount: { list, listByIds, historyList, status },
    getBankAccountHistory,
  } = props;
  const arrayedHistoryList = historyList[accountNumber]
    ? Object.values(historyList[accountNumber])
    : [];

  useEffect(() => {
    if (!historyList[accountNumber]) {
      getBankAccountHistory(accountNumber, 10);
    }
  }, [accountNumber]);

  if (status.isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#f9a010" />
      </View>
    );
    
  }

  return (
    <Container>
      <View style={localStyles.viewHeader}>
        <Text style={localStyles.title}>CURRENT BALANCE</Text>
        <View style={localStyles.subtitle_container}>
          <Text style={localStyles.subtitle_static}>
            {list[accountNumber].accountCurrencyCode}
          </Text>
          <Text style={localStyles.subtitle}>
            {list[accountNumber].accountLedgerFormatted}
          </Text>
        </View>
      </View>

      {arrayedHistoryList && arrayedHistoryList.length > 0 && (
        <View style={localStyles.viewAccounts}>
          <View style={localStyles.bodyTitle_container}>
            <Text style={localStyles.bodyTitle}>TRANSACTIONS</Text>
          </View>
          <SafeAreaView style={localStyles.listStyle}>
            <FlatList
              data={arrayedHistoryList}
              renderItem={({ item, index }) => (
                <Item
                  index={index}
                  title={item.title}
                  amount={item.amount}
                  date={item.date}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      )}

      {arrayedHistoryList && arrayedHistoryList.length == 0 && (
        <View
          style={{
            flex: 4,
            backgroundColor: "#f2f4f5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={localStyles.bodyTitle}>Empty Transactions</Text>
        </View>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { bankAccount } = state;
  return { bankAccount };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBankAccountHistory: (accountNumber, count) => {
      dispatch(getBankAccountHistoryAsync(accountNumber, count));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistory);

let localStyles = StyleSheet.create({
  viewHeader: {
    flex: 1,
    backgroundColor: "#309fe7",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAccounts: {
    flex: 4,
    backgroundColor: "#f2f4f5",
  },
  title: {
    // color: "#292929",
    color: "#FFFFFF",
    fontFamily: "Avenir_Heavy",
    // marginBottom: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle_static: {
    color: "#FFFFFF",
    fontFamily: "Avenir_Medium",
    fontSize: 20,
  },
  subtitle: {
    // color: "#555555",
    color: "#FFFFFF",
    fontFamily: "Avenir_Medium",
    fontSize: 50,
    margin: 0,
  },
  bodyTitle_container: {
    marginVertical: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyTitle: {
    color: "#5D646C",
    marginBottom: 0,
    fontFamily: "Avenir_Medium",
    letterSpacing: 1.56,
    textAlign: "center",
    fontSize: 18,
  },
  listStyle: {
    flex: 1,
  },
  listItem: {
    display: "flex",
    borderStyle: "solid",
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
  },
  itemText: {
    textAlign: "left",
    color: "#444444",
    textTransform: "capitalize",
    fontFamily: "Avenir_Medium",
    fontSize: 16,
  },
  dateText: {
    textAlign: "left",
    color: "#868686",
    fontFamily: "Avenir_Light",
    fontSize: 12,
  },
  amountText: {
    fontSize: 15,
    textAlign: "right",
    alignItems: "center",
    fontFamily: "Avenir_Medium",
  },
});

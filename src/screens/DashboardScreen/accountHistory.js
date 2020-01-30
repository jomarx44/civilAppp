import React from "react";

import {
  Alert,
  ActivityIndicator,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  BackHandler,
  PixelRatio,
  SafeAreaView,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Center,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";

import styles from "styles/commonStyle";
import PNHeaderNoLogoCenterText from "library/components/PNHeaderNoLogo";
import PNTransparentButton from "library/components/PNTransparentButton";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import { thisExpression } from "@babel/types";
import { connect } from "react-redux";
import API from "../../actions/api";

numFixed = amount => {
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

function Item({ title, date, amount }) {
  return (
    <View style={localStyles.listItem}>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Text style={localStyles.itemText}>{title}</Text>
        <Text style={localStyles.dateText}>{date}</Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text
          style={[
            localStyles.amountText,
            { color: Math.sign(amount) === -1 ? "green" : "red" }
          ]}
        >
          {Math.sign(amount) === 1
            ? "(PHP " + numFixed(amount) + ")"
            : "PHP " + numFixed(amount)}
        </Text>
      </View>
    </View>
  );
}

class AccountHistoryScreen extends React.Component {
  
  static navigationOptions = {
    header: <PNHeaderNoLogoCenterText title="Savings Account" />
  };

  render() {
    const { is_fetching, account, error } = this.props.accountDetails;

    if (is_fetching) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#f9a010" />
        </View>
      );
    }

    if(error) {
      Alert.alert("Sun Savings Bank", "Ooops! There's something wrong connecting to the server. Please try again.");
    }
    
    return (
      <Container>
        <View style={localStyles.viewHeader}>
          <Text style={localStyles.title}>CURRENT BALANCE</Text>
          {!is_fetching && account.balance && account.balance.formatted && (
            <Text style={localStyles.subtitle}>
              PHP {account.balance.formatted}
            </Text>
          )}
        </View>
        <View style={localStyles.viewAccounts}>
          <Text style={localStyles.bodyTitle}>Transactions</Text>
          <SafeAreaView style={localStyles.listStyle}>
            {account.history && (
              <FlatList
                data={account.history}
                renderItem={({ item }) => (
                  <Item
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                  />
                )}
                keyExtractor={item => item.id}
              />
            )}
          </SafeAreaView>
        </View>
      </Container>
    );
  }
}

let localStyles = StyleSheet.create({
  viewHeader: {
    flex: 2,
    backgroundColor: "#309fe7",
    padding: 20,
    justifyContent: "flex-end"
  },
  viewAccounts: {
    flex: 4,
    backgroundColor: "#f2f4f5"
  },
  title: {
    // color: "#292929",
    color: "#FFFFFF",
    fontFamily: "OpenSans_Bold",
    // marginBottom: 10,
    fontSize: 18
  },
  subtitle: {
    // color: "#555555",
    color: "#FFFFFF",
    fontFamily: "Montserrat_Medium",
    fontSize: 16
  },
  bodyTitle: {
    color: "#A9A9A9",
    fontFamily: "OpenSans_SemiBold",
    marginHorizontal: 8,
    marginTop: 30,
    fontSize: 14
  },
  listStyle: {
    flex: 1,
    marginVertical: 10
  },
  listItem: {
    display: "flex",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 16,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 2,
    marginHorizontal: 8
  },
  itemText: {
    textAlign: "left",
    color: "#7a979c",
    textTransform: "capitalize",
    fontFamily: "OpenSans_SemiBold",
    fontSize: 14
  },
  dateText: {
    textAlign: "left",
    color: "#696969",
    fontFamily: "Montserrat_Light",
    fontSize: 10
  },
  amountText: {
    fontSize: 12,
    textAlign: "right",
    alignItems: "center",
    fontFamily: "OpenSans_Regular"
  }
});

const mapStateToProps = (state, props) => {
  const { accountDetails } = state;
  return { accountDetails };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountHistoryScreen);

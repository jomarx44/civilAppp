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

import PNHeaderNoLogoCenterText from "library/components/PNHeaderNoLogo";
import PNHeaderBlueBack from "library/components/PNHeaderBlueBack";
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

function Item({ title, date, amount, index }) {
  return (
    <View style={[localStyles.listItem, {backgroundColor: index % 2 == 0 ? '#FFF' : '#FAFAFB'}]}>
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
            { color: Math.sign(amount) === -1 ? "#679D1D" : "#DC6061" }
          ]}
        >
          {Math.sign(amount) === 1
            ? "PHP -" + numFixed(amount)
            : "PHP " + numFixed(amount)}
        </Text>
      </View>
    </View>
  );
}

class AccountHistoryScreen extends React.Component {

  componentDidMount() {
    if(this.props.accountDetails.account) {
      this.props.getAccountDetails("001-01-00027-7", "10");
    }
  }
  
  static navigationOptions = {
    header: <PNHeaderBlueBack title="Savings Account" navid="Dashboard" />
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
    
    return (
      <Container>
        <View style={localStyles.viewHeader}>
          <Text style={localStyles.title}>CURRENT BALANCE</Text>
          <View style={localStyles.subtitle_container}>
            <Text style={localStyles.subtitle_static}>PHP</Text>
            <Text style={localStyles.subtitle}>
               {account.balance ? account.balance.formatted : ''}
            </Text>
          </View>
          
        </View>
        <View style={localStyles.viewAccounts}>
          <View style={localStyles.bodyTitle_container}>
            <Text style={localStyles.bodyTitle}>TRANSACTIONS</Text>
          </View>
          <SafeAreaView style={localStyles.listStyle}>
            {account.history && (
              <FlatList
                data={account.history}
                renderItem={({ item, index }) => (
                  <Item
                    index={index}
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
    flex: 1,
    backgroundColor: "#309fe7",
    padding: 20,
    justifyContent: "center",
    alignItems: 'center'
  },
  viewAccounts: {
    flex: 4,
    backgroundColor: "#f2f4f5"
  },
  title: {
    // color: "#292929",
    color: "#FFFFFF",
    fontFamily: "Avenir_Heavy",
    // marginBottom: 10,
    fontSize: 18,
    marginBottom: 10
  },
  subtitle_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle_static: {
    color: "#FFFFFF",
    fontFamily: "Avenir_Medium",
    fontSize: 20
  },
  subtitle: {
    // color: "#555555",
    color: "#FFFFFF",
    fontFamily: "Avenir_Medium",
    fontSize: 50, 
    margin: 0
  },
  bodyTitle_container: {
    marginVertical: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyTitle: {
    color: "#5D646C",
    marginBottom: 0,
    fontFamily: "Avenir_Medium",
    letterSpacing: 1.56,
    textAlign: 'center',
    fontSize: 18
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
    fontSize: 16
  },
  dateText: {
    textAlign: "left",
    color: "#868686",
    fontFamily: "Avenir_Light",
    fontSize: 12
  },
  amountText: {
    fontSize: 15,
    textAlign: "right",
    alignItems: "center",
    fontFamily: "Avenir_Medium"
  }
});

const mapStateToProps = (state, props) => {
  const { accountDetails } = state;
  return { accountDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccountDetails: (acctno, count) => {
      dispatch(API.getAccountDetails(acctno, count));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountHistoryScreen);

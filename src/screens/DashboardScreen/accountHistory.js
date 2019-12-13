import React from "react";

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground,
         TextInput, View, BackHandler, PixelRatio, SafeAreaView, 
         FlatList } from "react-native";
import { Container, Header, Title, Left, 
         Center, Icon, Right, Button, Body, 
         Content,Text, Card, CardItem } from "native-base";

import styles from "styles/commonStyle";
import PNHeaderNoLogoCenterText from "library/components/PNHeaderNoLogo"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"

const DATA = [
  { 
    id: '1',
    title: 'Payroll',
    date: '11-15-2019',
    amount: 5950.00
  },
  { 
    id: '2',
    title: 'ATM Withdrawal',
    date: '11-01-2019',
    amount: -20000.00
  },
  { 
    id: '3',
    title: 'ATM Withdrawal',
    date: '10-30-2019',
    amount: 8000.00
  },
  { 
    id: '4',
    title: 'Payroll',
    date: '10-15-2019',
    amount: 14000.00
  },
  { 
    id: '5',
    title: 'Payroll',
    date: '10-1-2019',
    amount: 14000.00
  },
  { 
    id: '6',
    title: 'ATM Withdrawal',
    date: '10-5-2019',
    amount: -19000.00
  }
]

numFixed = (amount) => {
  amount = Math.abs(amount);
  amount = amount.toFixed(2);

  let str = amount.split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

function Item({ title, date, amount }) {
  return (
    <View style={localStyles.listItem}>
      <Text style={localStyles.itemText}>{title}</Text>
      <Text style={localStyles.dateText}>{date}
        
      </Text>
      <Text style={[localStyles.amountText, { color: Math.sign(amount) === -1 ? 'red' : 'green' }]}>
          { Math.sign(amount) === -1 ? ('(PHP ' + this.numFixed(amount) + ')') : ('PHP ' + this.numFixed(amount)) }
      </Text>
    </View>
  );
}

class AccountHistoryScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderNoLogoCenterText title="Savings Account" />
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={localStyles.viewHeader}>
          <Text style={localStyles.title}>CURRENT BALANCE</Text>
          <Text style={{ textAlign: 'center', color: '#fff' }}>PHP <Text style={localStyles.subtitle}>10,340.10</Text> </Text>
        </View>
        <View style={localStyles.viewAccounts}>
          <Text style={localStyles.bodyTitle}>TRANSACTIONS</Text>
          <SafeAreaView style={localStyles.listStyle}>
            <FlatList
              data={ DATA }
              renderItem={({ item }) => 
                <Item title={item.title} amount={item.amount} date={item.date} />}
              keyExtractor={ item => item.id } 
            />
          </SafeAreaView>
        </View>
      </Container>
    );
  }
}

let localStyles = StyleSheet.create({
  viewHeader : {
    flex: 1,
    backgroundColor: '#309fe7'
  },
  viewAccounts : {
    flex: 4,
    backgroundColor: '#f2f4f5',
  },
  title : {
    textAlign: 'center',
    color: '#f5ac14',
    fontFamily: 'Menlo-Bold',
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 20
  },
  subtitle : {
    textAlign: 'center',
    fontSize: 65,
    color: '#fff',
    marginTop: 20,
    paddingBottom: 10
  },
  bodyTitle : {
    textAlign: 'center',
    color: '#696969',
    fontFamily: 'Menlo-Bold',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20
  },
  listStyle : {
    flex: 1,
    marginTop: 10,
  },
  listItem : {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',  
    marginVertical: 8,
    marginHorizontal: 16
  },
  itemText : {
    textAlign: 'left',
    color: '#696969',
    textTransform: 'uppercase',
    fontFamily: 'Avenir-Light',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  dateText : {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    color: '#696969',
    fontFamily: 'Avenir-Light',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 15
  },
  amountText : {
    display: 'flex',
    flexDirection: 'column-reverse',
    fontSize: 20,
    textAlign: 'right',
    marginLeft: 200,
    paddingLeft: 5,
    paddingRight: 10,
    top: 30,
    alignItems: 'flex-end' 
  }
});



export default AccountHistoryScreen;




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
    amount: 5950
  },
  { 
    id: '2',
    title: 'ATM Withdrawal',
    date: '11-01-2019',
    amount: 20000
  },
  { 
    id: '3',
    title: 'ATM Withdrawal',
    date: '10-30-2019',
    amount: 8000
  },
  { 
    id: '4',
    title: 'Payroll',
    date: '10-15-2019',
    amount: 14000
  }
]

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
              renderItem={({ item }) => <Item title={item.title} />}
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
    paddingTop: 30,
    fontSize: 20
  },
  subtitle : {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fff'
  },
  bodyTitle : {
    textAlign: 'center',
    color: '#696969',
    fontFamily: 'Menlo-Bold',
    fontWeight: 'bold',
    paddingTop: 30,
    fontSize: 20
  },
  listStyle : {
    flex: 1,
    marginTop: 10
  }
});



export default AccountHistoryScreen;




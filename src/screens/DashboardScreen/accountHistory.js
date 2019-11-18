import React from "react";

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, 
         Center, Icon, Right, Button, Body, 
         Content,Text, Card, CardItem } from "native-base";

import styles from "styles/commonStyle";
import PNHeaderNoLogo from "library/components/PNHeaderNoLogo"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"


class AccountHistoryScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderNoLogo title="Savings Account" />
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={localStyles.viewHeader}>
          <Text style={localStyles.title}>CURRENT BALANCE</Text>
          <Text style={localStyles.subtitle}>PHP 10,340.10</Text>
        </View>
        <View style={localStyles.viewAccounts}>
          <Text style={localStyles.title}>CURRENT BALANCE</Text>
          <Text style={localStyles.subtitle}>PHP 10,340.10</Text>
        </View>
      </Container>
    );
  }
}

let localStyles = StyleSheet.create({
  viewHeader: {
    flex: 1,
    backgroundColor: '#309fe7' 
  },
  viewAccounts: {
    flex: 4,
    backgroundColor: '#f2f4f5' 
  },
});



export default AccountHistoryScreen;




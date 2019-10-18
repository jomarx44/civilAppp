import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { ScrollView, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from 'navigation/NavigationService.js'
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox"
import PNBlueButton from "library/components/PNBlueButton"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"
import PNHeaderTitle from "library/components/PNHeaderTitle"

class CIS05 extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderBackButtonBlue/>
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <KeyboardShift>
          {() => (
          <View style={{flex:1}}>
            <View style={{backgroundColor: "#309fe7", height: height*.20}} >
              <PNHeaderTitle title="My Employment Information:" />
            </View>
            <ScrollView>
              <View style={{flex: 4, paddingTop: 30 }} >
                <PNFormTextBox title="Nature of Work" />
                <PNFormTextBox title="Contact Number" />
                <PNFormTextBox title="Field Name" />
                <PNFormTextBox title="Employment Position" />
                <PNFormTextBox title="Source of Funds" />
                <PNFormTextBox title="Monthly Gross Income" />
                <PNFormTextBox title="Employer's Name" />
                <PNFormTextBox title="Employer's Address" />
            
              </View>
              <View style={localStyle.footer} >
                <PNBlueButton title="NEXT" navid="CIS06" />
              </View>
            </ScrollView>
          </View>
          )}
        </KeyboardShift>
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: '#FFFFFF'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }, 
  header: {
    backgroundColor: "#309fe7",
    flex: 1,
    paddingTop: 110
  },
  footer: {
    flex: 1,
    paddingBottom: 50
  }
});


export default CIS05;


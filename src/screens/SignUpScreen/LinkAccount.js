import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import {ScrollView, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from 'navigation/NavigationService.js'
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox"
import PNBlueButton from "library/components/PNBlueButton"
import PNHeaderBackButtonWhite from "library/components/PNHeaderBackButtonWhite"
import PNHeaderTitleDesc from "library/components/PNHeaderTitleDesc"

class LinkAccount extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderBackButtonWhite/>
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
    <KeyboardShift> 
          {() => (
      <ScrollView>
        <View style={localStyle.header} >
          <PNHeaderTitleDesc title="Link My Account" 
             desc="Please fill in the required fields to link your account."/>
        </View>
        <View style={{flex: 4, paddingTop: 30 }} >
          <PNFormTextBox title="Acccount Number" />
          <PNFormTextBox title="First Name" />
          <PNFormTextBox title="Middle Name" />
          <PNFormTextBox title="Last Name" />
          <PNFormTextBox title="Birth Date" />
          <PNFormTextBox title="TIN" />
      
        </View>
        <View style={{flex: 1, paddingBottom: 50}} >
          <PNBlueButton title="NEXT" navid="OTPScreen" />
        </View>

      </ScrollView>
          )}
    </KeyboardShift>
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
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flex: 1
  }
});


export default LinkAccount;


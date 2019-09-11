import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTextBox from "library/components/PNTextBox"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderBackButtonWhiteOnly from "library/components/PNHeaderBackButtonWhiteOnly"
import PNOTPDigits from "library/components/PNOTPDigits"
import PNOTPKeypad from "library/components/PNOTPKeypad"

class OTPScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={[styles.containerBlue, {flex:1}]}>
          <PNHeaderBackButtonWhiteOnly />
          <View
            style={[{ flex: 1 , marginTop: 40}]} >
            <Text style={[localStyle.text, {fontSize: 32/PixelRatio.getFontScale()}]} >
              OTP 
            </Text>
            <Text style={[localStyle.text, {fontSize: 16/PixelRatio.getFontScale()}]} >
              Please type the verification code sent to your mobile number. 
            </Text>
 
          </View>

          <View
            style={[{ flex: 1}]} >
            <PNOTPDigits />
          </View>
          <View
            style={[{flex: 4}]} >
            <PNOTPKeypad />
          </View>


        </View>
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
  }
});



export default OTPScreen;


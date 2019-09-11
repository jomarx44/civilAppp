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

class EmailVerificationScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={[styles.containerBlue, {flex:1}]}>
          <View
            style={[{ flex: 1 , alignItems : 'center'}]} >
          </View>
          <View
            style={[{ flex: 1 , alignItems : 'center'}]} >
            <Image source={require('res/images/IOS/ic_email.png')} />
          </View>

          <View
            style={[{flex: 2, alignItems : 'center'}]} >
            <Text style={{ textAlign: 'center', color: '#FFFFFF' ,fontSize: 32/PixelRatio.getFontScale()}} >
              Email Confirmation
            </Text>
            <Text style={[ localStyle.text , { fontSize: 16/PixelRatio.getFontScale()} ]} >
              We have sent email to <Text style={{color: '#F5AC14'}}>anne@gmail</Text> to confirm the validity of our email address. After receiving the email we will sending OTP to your mobile number.
            </Text>
 
          </View>

          <View
            style={[{flex: 1, alignItems : 'center'}]} >
            <Text style={[ localStyle.text , { textDecorationLine: 'underline', fontSize: 16/PixelRatio.getFontScale()} ]} >
              resend email confirmation
            </Text>
 
          </View>
        </View>
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  text: {
    marginTop: 32,
    lineHeight: 26,
    marginLeft: 32,
    marginRight: 32,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});



export default EmailVerificationScreen;


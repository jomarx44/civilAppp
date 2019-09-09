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

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={styles.containerBlue}>
          <View
            style={[buttonStyles.button, { bottom: 330, width: width}]} >
            <PNTextBox placeholder="Email" />
          </View>
          <View
            style={[buttonStyles.button, { bottom: 264, width: width}]} >
            <PNTextBox placeholder="Password" />
          </View>




          <View
            style={[buttonStyles.button, { bottom: 170, width: width}]} >
            <PNOrangeButton title="LOGIN" />
          </View>

          <View
            style={[buttonStyles.button, { bottom: 120, width: width}]} >
            <Text style={{color: '#FFFFFF' ,fontSize: 18/PixelRatio.getFontScale()}} >
              CREATE MOBILE ACCOUNT
            </Text>
          </View>

        </View>
      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});



export default LoginScreen;


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
import PNHeaderBackButtonOnly from "library/components/PNHeaderBackButtonOnly.js"
import PNButtonID from "library/components/PNButtonID.js"

class TakeAPhotoOfIDScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={[styles.containerBlue, {backgroundColor: '#FFFFFF'}]}>
        <PNHeaderBackButtonOnly />

          <View
            style={[{ top: 80, width: width}]} >
            <Text style={{textAlign: 'left', marginLeft: 32, color: '#F5AC14' ,fontSize: 30/PixelRatio.getFontScale()}} >
              Take a photo of an ID document
            </Text>

            <Text style={{textAlign: 'left', marginLeft: 32, marginTop: 4, color: '#5D646C' ,fontSize: 18/PixelRatio.getFontScale()}} >
              Choose Documents
            </Text>
          </View>


          <View
            style={[buttonStyles.button, { bottom: 100, width: width}]} >
            <PNButtonID title="Philippine Passport" iconname="home" isTop='true' />
            <PNButtonID title="Unified Multipurpose ID" iconname="home" isTop='false' />
            <PNButtonID title="Philippine Driver's License" iconname="home" isTop='false' />
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



export default TakeAPhotoOfIDScreen;


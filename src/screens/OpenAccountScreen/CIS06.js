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
import PNBlueButtonSaveAsyncStorage from "library/components/PNBlueButtonSaveAsyncStorage"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"
import PNHeaderTitle from "library/components/PNHeaderTitle"

class CIS06 extends React.Component {

  input_account_type;
  constructor(props) {
    super(props);
    this.state = {
      cis: {}
    }
  }

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({cis});
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
              <PNHeaderTitle title="The Purpose of my Account is:" />
            </View>
            <ScrollView>
              <View style={{flex: 4, paddingTop: 30 }} >
                <PNFormTextBox title="Account Type" 
                    reference={input => { this.input_account_type = input }}
                    onChangeText={(text) => this.onChangeText(text,"account_type")}/>
            
              </View>
              <View style={{flex: 1}} >
                <PNBlueButtonSaveAsyncStorage title="NEXT" navid="CIS07" storeKey="cis6" storeValue={this.state.cis}/>
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
  }
});


export default CIS06;


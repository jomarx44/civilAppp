import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { ScrollView, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio } from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import ModalDropdown from 'react-native-modal-dropdown';
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from 'navigation/NavigationService.js'
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox"
import PNDropDownInput from "library/components/PNDropDownInput"
import PNDropDownInputFund from "library/components/PNDropDownInputFund"
import PNDropDownInputEmployee from "library/components/PNDropDownInputEmployee"
import PNBlueButton from "library/components/PNBlueButton"
import PNBlueButtonSaveAsyncStorage from "library/components/PNBlueButtonSaveAsyncStorage"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"
import PNHeaderTitle from "library/components/PNHeaderTitle"

class CIS11 extends React.Component {

  input_work;
  input_contact_number;
  input_field;
  input_position;
  input_fund_source;
  input_gross_income;
  input_employers_name;
  input_employers_address;
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
              <PNHeaderTitle title="My Employment Information:" />
            </View>
            <ScrollView>
              <View style={{flex: 4, paddingTop: 30 }} >
                <PNFormTextBox title="Nature of Work" 
                    reference={input => { this.input_work = input }}
                    onChangeText={(text) => this.onChangeText(text,"work")}/>
                <PNFormTextBox title="Contact Number" 
                    reference={input => { this.input_contact_number = input }}
                    onChangeText={(text) => this.onChangeText(text,"contact_number")}/>
                <PNDropDownInput title="Field Name" />
                <PNFormTextBox title="Employment Position" 
                    reference={input => { this.input_position = input }}
                    onChangeText={(text) => this.onChangeText(text,"position")}/>
                <PNDropDownInputFund title="Source of Funds" 
                    />
                <PNFormTextBox title="Monthly Gross Income" 
                    reference={input => { this.input_gross_income = input }}
                    onChangeText={(text) => this.onChangeText(text,"gross_income")}/>
                <PNFormTextBox title="Employer's Name" 
                    reference={input => { this.input_employers_name = input }}
                    onChangeText={(text) => this.onChangeText(text,"employers_name")}/>
                <PNFormTextBox title="Employer's Address" 
                    reference={input => { this.input_employers_address = input }}
                    onChangeText={(text) => this.onChangeText(text,"employers_address")}/>
            
              </View>
              <View style={localStyle.footer} >
                <PNBlueButtonSaveAsyncStorage title="NEXT" navid="CIS12" storeKey="cis11" storeValue={this.state.cis}/>
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


export default CIS11;


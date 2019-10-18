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

import { connect } from 'react-redux';
import API from 'actions/api';

class PersonalInfo extends React.Component {

  input_email;
  input_password;
  input_confirmpassword;
  input_givenName;
  input_middleName;
  input_familyName;
  input_phoneNumber;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        confirmpassword: '',
        givenName: '',
        middleName: '',
        familyName: '',
        phoneNumber: '',
      }
    }
  }

  static navigationOptions = {
    header: (
      <PNHeaderBackButtonWhite/>
    )
  };

  onChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({user : user})
  }

  componentDidUpdate(prevProps) {
    if (this.props.response.success && this.props.response.action ===  'signup' ) {
      console.log("Personal Info componentDidUpdate" + JSON.stringify(this.props.response));
      // save the data
      if ( this.props.response.meta && this.props.response.meta.resourceType && this.props.response.meta.resourceType === 'User') {
        console.log("saving to signup data");
        Profile.setSignUpData(this.props.response);
      }
      NavigationService.navigate("EmailVerificationScreen");
    }
  }


  signup() {
    const { user } = this.state;

    // save the form data here
    Profile.setFormData(user);
    this.props.signup(user);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
    <KeyboardShift> 
      {() => (
        <ScrollView>
          <View style={localStyle.header} >
            <PNHeaderTitleDesc title="Create Account" 
               desc="To verify your identity, please fill in personal information."/>
          </View>
          <View style={{flex: 4, paddingTop: 30 }} >
            <PNFormTextBox
                     title="First Name"
                     onChangeText={(text) => this.onChangeText(text,"givenName")}
                     reference={input => { this.input_givenName = input }}
            />
            <PNFormTextBox
                     title="Middle Name"
                     onChangeText={(text) => this.onChangeText(text,"middleName")}
                     reference={input => { this.input_middleName = input }}
            />

            <PNFormTextBox
                     title="Last Name"
                     onChangeText={(text) => this.onChangeText(text,"familyName")}
                     reference={input => { this.input_familyName = input }}
            />

            <PNFormTextBox
                     title="Email Address"
                     onChangeText={(text) => this.onChangeText(text,"email")}
                     reference={input => { this.input_email = input }}
            />

            <PNFormTextBox
                     title="Mobile Number"
                     onChangeText={(text) => this.onChangeText(text,"phoneNumber")}
                     reference={input => { this.input_phoneNumber = input }}
            />

            <PNFormTextBox
                     title="Password" password={true}
                     onChangeText={(text) => this.onChangeText(text,"password")}
                     reference={input => { this.input_password = input }}
            />

            <PNFormTextBox
                     title="Confirm Password" password={true}
                     onChangeText={(text) => this.onChangeText(text,"confirmpassword")}
                     reference={input => { this.input_confirmpassword = input }}
            />
          </View>
          <View style={{flex: 1, paddingBottom: 100}} >
            <Button full primary style={localStyle.button}
             onPress={() => this.signup()}>
            <Text>NEXT</Text>
           </Button>
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
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#309fe7',
  }, 
  header: {
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
   textbox: {
   height: 48,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#FFFFFF'
 }
});


const mapStateToProps = state => {
  return {
    response: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (userdata) => {
      dispatch(API.signup(userdata));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);


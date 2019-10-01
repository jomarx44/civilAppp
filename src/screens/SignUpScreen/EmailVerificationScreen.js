import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { AsyncStorage, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";
import PNTextBox from "library/components/PNTextBox"
import PNOrangeButton from "library/components/PNOrangeButton"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"

import NavigationService from 'navigation/NavigationService.js'
import { connect } from 'react-redux';
import API from 'actions/api';

class EmailVerificationScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    signup_data : ''
  }

  getSignupData = async () => {
    let signupdata = await AsyncStorage.getItem('SIGNUP_DATA');
    signupdata = JSON.parse(signupdata);
    if (signupdata) {
       console.log('EmailVerificationScreen signup data' + JSON.stringify(signupdata));
       this.setState({ signup_data : signupdata });
    }
  }

  componentDidMount() {
    this.getSignupData();
  }


  checkEmailAndGoNext() {
    let signup_data = this.state.signup_data;
    if (signup_data) {
      console.log("signupdata" + signup_data.id);
      this.props.checkEmail(signup_data.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.response.success && this.props.response.action === 'isEmailVerified' ) {
      console.log("Email Verification componentDidUpdate" + JSON.stringify(this.props.response));
      // save the data
      if ( this.props.response.isEmailVerified) {
        NavigationService.navigate("OTPScreen");
      } else {
        console.log("status is " + this.props.response.status);
      }
    }
  }


  static navigationOptions = {
    header: (
      <PNHeaderBackButtonBlue/>
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    let signup_data = this.state.signup_data;
    let email = '';
    if (signup_data.emails) {
      console.log(signup_data.emails[0].value);
      email = signup_data.emails[0].value;
    } 

    return (
      <Container>
        <View style={[styles.containerBlue, {flex:1}]}>
          <View
            style={[{ flex: 1 , alignItems : 'center'}]} >
          </View>
          <View
            style={[{ flex: 1 , alignItems : 'center'}]} >
            <Image source={require('res/images/ic_email.png')} />
          </View>

          <View
            style={[{flex: 2, alignItems : 'center'}]} >
            <Text style={{ textAlign: 'center', color: '#FFFFFF' ,fontSize: 32/PixelRatio.getFontScale()}} >
              Email Confirmation
            </Text>
            <Text style={[ localStyle.text , { fontSize: 16/PixelRatio.getFontScale()} ]} >
              We have sent email to <Text style={{color: '#F5AC14'}}>{email}</Text> to confirm the validity of our email address. After receiving the email we will be sending OTP to your mobile number.
            </Text>
 
          </View>

          <View
            style={[{flex: 1, alignItems : 'center'}]} >
            <Text style={[ localStyle.text , { textDecorationLine: 'underline', fontSize: 16/PixelRatio.getFontScale()} ]} >
              resend email confirmation
            </Text>
          </View>
           <View style={{flex: 1}} >
             <Button full primary style={localStyle.button}
               onPress={() => this.checkEmailAndGoNext()}>
               <Text>NEXT</Text>
             </Button>
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
   height: 50,
   marginTop: 50,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: 18,
  }
});


const mapStateToProps = state => {
  return {
    response: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkEmail: (userId) => {
      dispatch(API.checkEmail(userId));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationScreen);


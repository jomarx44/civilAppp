import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import {AsyncStorage, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem, Input } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTextBox from "library/components/PNTextBox"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderBackButtonWhiteOnly from "library/components/PNHeaderBackButtonWhiteOnly"
import PNOTPDigits from "library/components/PNOTPDigits"
import PNOTPKeypad from "library/components/PNOTPKeypad"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"
import { Col, Row, Grid } from 'react-native-easy-grid';

import NavigationService from 'navigation/NavigationService.js'
import { connect } from 'react-redux';
import API from 'actions/api';

class OTPScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  
  state = {
    signup_data : '',
    form_data : '',
    sms_sent: false,
    is_navigated: false,
    access_token: '',
    counter : 0,
    otp : '',
    d1 : '',
    d2 : '',
    d3 : '',
    d4 : '',
  }

  getSignupData = async () => {
    let signupdata = await AsyncStorage.getItem('SIGNUP_DATA');
    signupdata = JSON.parse(signupdata);
    console.log("getSignupData");
    if (signupdata) {
       console.log('signup data' + JSON.stringify(signupdata));
       this.setState({ signup_data : signupdata });
    }
  }

  getFormData = async () => {
    let formdata = await AsyncStorage.getItem('FORM_DATA');
    formdata = JSON.parse(formdata);
    console.log("getFormData");
    if (formdata) {
       console.log('form data' + JSON.stringify(formdata));
       this.setState({ form_data : formdata });
       this.props.loginInitial(this.state.signup_data.emails[0].value, formdata.password);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.response.success && this.props.response.action === 'signin' ) {
      // get access token and call sendotp api
      if (this.state.sms_sent == false ) {
         this.setState({ sms_sent : true});
         this.setState({ access_token : this.props.response.access_token});
         this.props.sendOTP(this.props.response.access_token, this.state.form_data.phoneNumber);
      } else {
         console.log("sms already sent");
      }
    }

    if (this.props.response.success && this.props.response.action === 'isOTPCorrect' && this.state.is_navigated == false ) {
        NavigationService.navigate("ConnectCreateAccountScreen");
    }


  }



  onPressedDigit = (value) => {
    let { otp, counter }  = this.state;
    otp += value;
    counter += 1;
    this.setState({counter: counter});
    console.log("otp " + otp);
    console.log("counter " + counter);
    this.setState({otp: otp});
    if (counter == 1) {
       this.setState({d1: value});
    } else if (counter == 2) {
       this.setState({d2: value});
    } else if (counter == 3) {
       this.setState({d3: value});
    } else if (counter == 4) {
       this.setState({d4: value});
       console.log("checking otp value");
       this.props.isOTPCorrect(this.state.access_token, otp);
    }
  }



  componentDidMount() {
    this.getSignupData();
    this.getFormData();
    

  }
 
  static navigationOptions = {
    header: (
      <PNHeaderBackButtonBlue/>
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    const { d1, d2, d3, d4 } = this.state;
    return (
      <Container>
        <View style={[styles.containerBlue, {flex:1}]}>
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
            <View style={localStyle.item}>
              <Grid style={styles.grid}>
                <Col style={[localStyle.digit]}><Input value={d1}/></Col>
                <Col style={[localStyle.digit]}><Input value={d2}/></Col>
                <Col style={[localStyle.digit]}><Input value={d3}/></Col>
                <Col style={[localStyle.digit]}><Input value={d4}/></Col>
              </Grid>
            </View>

          </View>
          <View
            style={[{flex: 4}]} >
            <View style={localStyle.kpgrid}>
              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('1')}>
                    <Text style={localStyle.kptext}>1</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('2')}>
                    <Text style={localStyle.kptext}>2</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('3')}>
                    <Text style={localStyle.kptext}>3</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('4')}>
                    <Text style={localStyle.kptext}>4</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('5')}>
                    <Text style={localStyle.kptext}>5</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('6')}>
                    <Text style={localStyle.kptext}>6</Text>
                  </Button>
                </Col>
              </View>

              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('7')}>
                    <Text style={localStyle.kptext}>7</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('8')}>
                    <Text style={localStyle.kptext}>8</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('9')}>
                    <Text style={localStyle.kptext}>9</Text>
                  </Button>
                </Col>
              </View>


              <View style={localStyle.kprow}>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('')}>
                    <Text style={localStyle.kptext}></Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('0')}>
                    <Text style={localStyle.kptext}>0</Text>
                  </Button>
                </Col>
                <Col style={[localStyle.kpdigit]}>
                  <Button transparent light
                    onPress={() => this.onPressedDigit('<')}>
                    <Text style={localStyle.kptext}>&lt;</Text>
                  </Button>
                </Col>
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  digit: {
   width: 47,
   height: 52,
   marginLeft: 10,
   marginRight: 10,
   backgroundColor: '#FFFFFF'
  },
  grid: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
   height: 52,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   alignItems: 'center',
   justifyContent: 'center',
 },
  
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
  kptext: {
   flex: 1,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  kpdigit: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
  },
  kpgrid: {
    flex: 4,
    flexDirection: 'column'
  },
  kprow: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    flexDirection: 'row'
  },
  
  kpitem: {
   height: 52,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   alignItems: 'center',
   justifyContent: 'center',
 } 
});


const mapStateToProps = state => {
  return {
    response: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginInitial: (username, password) => {
      dispatch(API.loginInitial(username, password));
    },
    sendOTP: (token, phoneNumber) => {
      dispatch(API.sendOTP(token, phoneNumber));
    },
    isOTPCorrect: (token, otp) => {
      dispatch(API.isOTPCorrect(token, otp));
    }
 
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);


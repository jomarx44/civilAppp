import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { ScrollView, AsyncStorage, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTextBox from "library/components/PNTextBox"
import PNTransparentButton from "library/components/PNTransparentButton"
import * as LocalAuthentication from 'expo-local-authentication';

import NavigationService from 'navigation/NavigationService.js';
import { connect } from 'react-redux';
import API from 'actions/api';
import IBMAppId from 'actions/ibmappid';

class LoginScreen extends React.Component {

  input_username;
  input_password;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      compatible: false,
      fingerprints: false,
      user : {
        username: 'riczenn@thousandminds.com',
        password: 'qwertyuiop',
      },
      result: ''
    }
  }

  getLoginInformation = async () => {
    let accessData = await AsyncStorage.getItem('ACCESS_DATA'); 
    if (accessData !== null) {
      accessData = JSON.parse(accessData)
      this.setState({
        isModal: false,
      });
      this.scanFingerprint();
   
    }
  }


  onChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({user : user})
  }

  componentDidMount(){
    //this.checkDeviceForHardware();
    //this.checkForFingerprints();
    //this.getLoginInformation();
  }


  componentDidUpdate(prevProps) {
    if (this.props.response.email ) {
      // NavigationService.navigate("DashboardScreen");
      NavigationService.navigate("AnnouncementScreen");
    }
    if (this.props.response.success && this.props.response.action ===  'signin' ) {
      console.log("Login componentDidUpdate" + JSON.stringify(this.props.response));
        console.log("Calling app id api");
        this.props.userInfo(this.props.response.access_token); 
      if ( this.props.response.meta && this.props.response.meta.resourceType && this.props.response.meta.resourceType === 'User') {
        console.log("saving to signup data");
        Profile.setSignUpData(this.props.response);
        NavigationService.navigate("DashboardScreen");
      }
    }
  }


  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    console.log("compatible " + compatible);
    this.setState({compatible})
  }

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    console.log("fingerprints " + fingerprints);
    this.setState({fingerprints})
  }

  scanFingerprint = async () => {
   let result = await LocalAuthentication.authenticateAsync({promptMessage : 'Scan your finger.'});
   console.log('Scan Result:', result)
  }

  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {text: 'Scan', onPress: () => {
          this.scanFingerprint();
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'}
      ]
    )
  }


  handleDataReceived(msgData) {

    // add to profile data
    Profile.setProfileData(msgData.data.attributes);
    Profile.setAccessData(msgData.data.accessData);
    setLoggedState('Authenticated');

    this.setState({
      text2: `Message from web view ${msgData}`,
    });
    msgData.isSuccessfull = true;
  }


  login() {
    const { user } = this.state;
    console.log("checklogin: " + user.username + " : " + user.password);
    this.props.login(user.username, user.password);
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container style={styles.containerBlue}>
      <KeyboardShift>
        {() => (
        <View>
        <ScrollView>
 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         <Image style={[buttonStyles.logo, {width: width - 30, height: height * 0.09, marginTop: height * 0.3}]} source={require('res/images/ic_logo_login.png')} />
        </View>
        <View style={{ flex: 1, flexDirection: 'column-reverse', justifyContent: 'center' }}>

         <Button full transparent light
          onPress={() => NavigationService.navigate("SignUpScreen")}
          style={buttonStyles.buttonTrans}>
          <Text style={ [{fontWeight: 'bold'}]}>CREATE MOBILE ACCOUNT</Text>
         </Button>

         <Button full style={buttonStyles.button}
           onPress={() => this.login()}>
          <Text>LOGIN</Text>
         </Button>

         <TextInput
                   placeholder="Password"
                   secureTextEntry={true}
                   onChangeText={(text) => this.onChangeText(text,"password")}
                   ref={input => { this.input_password = input }}
                   style={[buttonStyles.textbox, { }]}/>

         <TextInput
                   placeholder="Email"
                   onChangeText={(text) => this.onChangeText(text,"username")}
                   ref={input => { this.input_username = input }}
                   style={[buttonStyles.textbox, { }]}/>
        </View>
      </ScrollView>
       </View>
        )}
        </KeyboardShift>

      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  logo: {
   // height: 70,
   marginBottom: 100,
  },
  button: {
   height: 50,
   marginTop: 50,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: 18,
   backgroundColor: '#f5ac14',
  }, 
  buttonTrans: {
   fontSize: 18,
   marginBottom: 20,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   borderColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
 },
 textbox: {
   height: 48,
   marginTop: 20,
   marginLeft: 30,
   paddingLeft: 20,
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
    login: (username, password) => {
      dispatch(API.login(username, password));
    }, 
    userInfo: ( token ) => {
      dispatch(IBMAppId.getUserInfo(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);



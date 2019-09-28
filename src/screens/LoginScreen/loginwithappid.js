import React from "react";
import AppJson from '../../../app.json';


import KeyboardShift from "library/components/CDKeyboardShift.js"

import { AsyncStorage, StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
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

import NavigationService from 'navigation/NavigationService.js'

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.state = {
      isModal: false,
      isReady: false,
      compatible: false,
      fingerprints: false,
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

  componentDidMount(){
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    this.getLoginInformation();
  }

  componentWillUnMount() {
    this.onWebViewMessage.unbind(this);
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
      isModal: false,
    });
    msgData.isSuccessfull = true;
  }

  onWebViewMessage(event) {
    console.log("Message received from webview");
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }
    console.log(msgData);
    switch (msgData.targetFunc) {
      case "handleDataReceived":
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }
  }


  checkLogin() {
    this.setState({isModal : true});
  }


  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={styles.containerBlue}>
        <Modal isVisible={this.state.isModal}
           transparent={true} >
           <View style={{
             flex: 1,
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center'}}>
             <View style={{
               width: width * 0.9,
               height: height * 0.7}}>
               <WebView
                 ref={webview => { this.myWebView = webview; }}
                 scrollEnabled={false}
                 onMessage={this.onWebViewMessage}
                 style={{ flex: 1 }}
                 source={{uri: AppJson.appid_uri }} />
            </View>
          </View>
        </Modal>
 
        <View style={{ flex: 1, flexDirection: 'column-reverse', paddingBottom: 50 }}>

         <Button full transparent light
          onPress={() => NavigationService.navigate("SignUpScreen")}
          style={buttonStyles.buttonTrans}>
          <Text>CREATE MOBILE ACCOUNT</Text>
         </Button>

         <Button full primary style={buttonStyles.button}
           onPress={() => this.checkLogin()}>
          <Text>LOGIN</Text>
         </Button>

        </View>
       </View>

      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  button: {
   height: 50,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: 18,
  }, 
  buttonTrans: {
   fontSize: 18,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   borderWidth: 2,
   borderColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
 }
});



export default LoginScreen;


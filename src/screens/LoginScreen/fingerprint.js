import React from "react";
import AppJson from '../../../app.json';
import { WebView } from "react-native-webview";




import KeyboardShift from "library/components/CDKeyboardShift.js"

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio, TouchableOpacity} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import * as Profile from 'store/profile';
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";

import NavigationService from 'navigation/NavigationService.js'

import * as LocalAuthentication from 'expo-local-authentication';

class LoginFingerPrintScreen extends React.Component {

  constructor(props) {
    super(props);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);

    this.state = {
      isReady: false,
      test: false,
      text: "ReactNative WebView Sample",
      text2:  "",
      compatible: false,
      fingerprints: false,
      result: ''
    };
  }

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({compatible})
  }

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({fingerprints})
  }

  scanFingerprint = async () => {
   let result = await LocalAuthentication.authenticateAsync({promptMessage : 'Scan your finger.'});
   console.log('Scan Result:', result)
   alert("Success!");
   NavigationService.navigate("DashboardScreen");
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



  componentWillUnMount() {
    this.onWebViewMessage.ubbind(this);
  }

  handleDataReceived(msgData) {

    // add to profile data
    Profile.setProfileData(msgData.data.attributes);
    Profile.setAccessData(msgData.data.accessData);
    setLoggedState('Authenticated');


    this.setState({
      text2: `Message from web view ${msgData}`
    });
    msgData.isSuccessfull = true;
  }

  onWebViewMessage(event) {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }
    switch (msgData.targetFunc) {
      case "handleDataReceived":
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }
  }


  render() {
    let {height, width} = Dimensions.get('window');
    if ( this.state.compatible )  {
      this.scanFingerprint();
    }
    return (
      <Container>
            <View style={styles.container}>
              <View style={styles.webViewContainer}>
                <WebView
                    ref={webview => {this.myWebView = webview;}}
                    scrollEnabled={false}
                    source={{uri: AppJson.appid_uri }}
                    onMessage={this.onWebViewMessage}
                />
              </View>
            </View>
      </Container>
    );
  }
}

export default LoginFingerPrintScreen;


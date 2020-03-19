import React from "react";
import AppJson from "../../../app.json";
import { WebView } from "react-native-webview";

import KeyboardShift from "library/components/KeyboardShift";

import {
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  BackHandler,
  PixelRatio
} from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Center,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

class LoginWebViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
  }

  componentWillUnMount() {
    this.onWebViewMessage.ubbind(this);
  }

  handleDataReceived(msgData) {
    // add to profile data
    Profile.setProfileData(msgData.data.attributes);
    Profile.setAccessData(msgData.data.accessData);
    setLoggedState("Authenticated");

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
    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.webViewContainer}>
            <WebView
              ref={webview => {
                this.myWebView = webview;
              }}
              scrollEnabled={false}
              source={{ uri: AppJson.appid_uri }}
              onMessage={this.onWebViewMessage}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"
  },
  webViewContainer: {
    flex: 1
  }
});
export default LoginWebViewScreen;

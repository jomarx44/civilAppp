import React from "react";

import {
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  BackHandler,
  TouchableOpacity,
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

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton";
import PNTransparentButton from "library/components/PNTransparentButton";

let { height, width } = Dimensions.get("window");

export const ConnectCreateAccountScreen = () => (
  <ImageBackground
        source={require("res/images/SSB-Splash.png")}
        style={buttonStyles.backgroundImage}
      >
        <View
          style={{
            flex: 1,
            width: width * 0.9,
            alignSelf: 'center',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          <PNOrangeButton title="OPEN BANK ACCOUNT" navid="CIS01" />
          <PNTransparentButton title="LINK MY ACCOUNT" navid="LinkAccount" />
        </View>
        <View style={styles.termsAndConditions}>
          <TouchableOpacity style={buttonStyles.buttonTrans}>
            <Text style={buttonStyles.buttonTransText}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
);

let buttonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  },
  termsAndConditions: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTrans: {
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTransText: {
    color: "#FFF",
    fontFamily: "Avenir_Roman",
    fontSize: 16
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    paddingVertical: 45,
    justifyContent: 'flex-end',
    alignItems: "center",
    resizeMode: "contain"
  }
});

export default ConnectCreateAccountScreen;

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

// Custom Components

import PNStackedButtons from "library/Layout/Content/PNStackedButtons";
import PNContainedButton from "library/components/Buttons/PNContainedButton";
import PNOutlineButton from "library/components/Buttons/PNOutlineButton";
import PNTextButton from "library/components/Buttons/PNTextButton";

import PNOrangeButton from "library/components/PNOrangeButton";
import PNTransparentButton from "library/components/PNTransparentButton";

let { height, width } = Dimensions.get("window");

export const ConnectCreateAccountScreen = ({ navigation }) => (
  <ImageBackground
    source={require("res/images/SSB-Splash.png")}
    style={buttonStyles.backgroundImage}
  >
    <PNStackedButtons
      containerStyle={{
        flex: 1,
        justifyContent: "center",
        marginTop: 100,
        alignItems: "center",
      }}
    >
      <PNContainedButton
        label="OPEN BANK ACCOUNT"
        buttonStyle={{ width: "100%", height: 50, marginBottom: 20 }}
        onPress={() => navigation.navigate("CreateBankAccount")}
      />
      <PNOutlineButton
        label="LINK MY ACCOUNT"
        buttonStyle={{ width: "100%", height: 50, borderColor: "#FFF" }}
        labelStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("LinkAccount")}
      />
    </PNStackedButtons>
    <View style={styles.termsAndConditions}>
      <PNTextButton 
        label="Terms and Conditions"
        buttonStyle={{ width: "100%", height: 50, borderColor: "#FFF" }}
        labelStyle={{ color: "#FFF", fontFamily: 'Avenir_Roman', fontSize: 16 }}
        // onPress={() => navigation.navigate("LinkAccount")}
      />
    </View>
  </ImageBackground>
);

let buttonStyles = StyleSheet.create({
  termsAndConditions: {
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    paddingVertical: 45,
    justifyContent: "flex-end",
    alignItems: "stretch",
    resizeMode: "contain"
  }
});

export default ConnectCreateAccountScreen;

import React from "react";

import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";

import styles from "styles/commonStyle";

// Custom Components

import PNStackedButtons from "library/Layout/Content/PNStackedButtons";
import { ContainedButton, OutlineButton, TextButton } from "../../components/Buttons";

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
      <ContainedButton
        label="OPEN BANK ACCOUNT"
        buttonStyle={{ width: "100%", height: 50, marginBottom: 20 }}
        onPress={() => navigation.navigate("CreateBankAccount")}
      />
      <OutlineButton
        label="LINK MY ACCOUNT"
        buttonStyle={{ width: "100%", height: 50, borderColor: "#FFF" }}
        labelStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("LinkAccount")}
      />
    </PNStackedButtons>
    <View style={styles.termsAndConditions}>
      <TextButton 
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

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

// Custom Component
import PNElectronicSignature from "../../library/components/PNElectronicSignature";
import PNStackedButtons from "library/Layout/Content/PNStackedButtons";
import PNContainedButton from "library/components/Buttons/PNContainedButton";
import PNOutlineButton from "library/components/Buttons/PNOutlineButton";

// Others
// var RNFS = require("react-native-fs");

/**
 * @requires PNElectronicSignature
 * @param navigation
 */
export const ElectronicSignatureScreen = ({ navigation, containerStyle }) => {
  const [isVisibile, setVisibility] = useState(false);
  const [imageData, setImageData] = useState("")

  useEffect(() => {
    // Known Bug (Need to delay the loading of electronic signature)
    setTimeout(() => setVisibility(true), 10)
  }, [isVisibile])
  
  return (
    <View style={[styles.defaultContainerStyle, containerStyle]}>
      <View style={styles.signatureContainerStyle}>
        { isVisibile &&
          <PNElectronicSignature onChange={({base64DataUrl}) => {setImageData(base64DataUrl)}} onError={() => {}} />
        }
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.contentTitle}>Please sign here if the customer is present</Text>
        <Text  style={styles.contentSubtitle}>
          By signing above, you agree to authorize change and all the terms and
          conditions.
        </Text>
      </View>
      <PNStackedButtons
        containerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <PNContainedButton
          label="DONE SIGNING"
          buttonStyle={{ width: "100%", height: 50, marginBottom: 20 }}
          onPress={() => {
            navigation.navigate("ImageTester", { imageData })
          }}
        />
        <PNOutlineButton
          label="CLEAR SIGNATURE"
          buttonStyle={{ width: "100%", height: 50 }}
          onPress={() => {
            setVisibility(false);
            setImageData("");
          }}
        />
      </PNStackedButtons>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectronicSignatureScreen);

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1, 
    paddingHorizontal: 30, 
    paddingVertical: 50
  },
  signatureContainerStyle: {
    flex: 2
  },
  contentContainerStyle: {
    alignItems: "center",
    borderTopColor: "#979797",
    borderTopWidth: 1,
    flex: 2,
    flexDirection: "column",
    padding: 15
  },
  contentTitle: {
    color: "#444444",
    fontFamily: 'Avenir_Medium',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  },
  contentSubtitle: {
    color: "#868686",
    fontFamily: 'Avenir_Book',
    fontSize: 12,
    textAlign: 'center'
  }
});

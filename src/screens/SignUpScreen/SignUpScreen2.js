import React, { Component, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

// Custom Component
import { PNElectronicSignature } from "../../library/components/PNElectronicSignature";
import PNHeaderCancelDone from "../../library/components/PNHeaderCancelDone";

// Others
// var RNFS = require("react-native-fs");

export const ElectronicSignatureScreen = ({ navigation }) => {
  const [imageBase64, setImageBase64] = useState("");
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    navigation.setParams({
      handleOnDone,
      showDone
    });
  }, [showDone]);

  handleOnDone = () => {
    // const path = `${RNFS.TemporaryDirectoryPath}siganture.png`;
    // RNFS.writeFile(path, imageBase64, 'base64')
    // .then(() => {
    //   console.log('Image saved at ' + path)
    // });
  };

  handleOnSignaturePadChange = ({ base64DataUrl }) => {
    console.log("Changed");
    setImageBase64(base64DataUrl);
    setShowDone(true);
  };

  handleOnSignaturePadError = error => {
    console.log("handleOnSignaturePadError: ", error);
  };

  return (
    <View>
      <PNElectronicSignature
        onChange={handleOnSignaturePadChange}
        onError={handleOnSignaturePadError}
      />
    </View>
    
  );
};

ElectronicSignatureScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    header: (
      <PNHeaderCancelDone
        navId="CreateMobileAccount"
        onDone={() => params.handleOnDone()}
      />
    )
  };
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectronicSignatureScreen);

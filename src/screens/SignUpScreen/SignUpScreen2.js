import React, { Component, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

// Custom Component
import { PNElectronicSignature } from "../../library/components/PNElectronicSignature";
// import PNHeaderCancelDone from "../../library/components/PNHeaderCancelDone";

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
    
  };

  handleOnSignaturePadChange = ({ base64DataUrl }) => {
    setImageBase64(base64DataUrl);
    setShowDone(true);
  };

  handleOnSignaturePadError = error => {

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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectronicSignatureScreen);

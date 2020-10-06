import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

// Others
import SignaturePad from "react-native-signature-pad";

export const PNElectronicSignature = ({ onChange, onError }) => {
  return (
    <View style={{ flex: 1 }}>
      <SignaturePad
        onError={onError}
        onChange={onChange}
        style={{ flex: 1, backgroundColor: "white" }}
      />
    </View>
  );
};

PNElectronicSignature.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func
};

const styles = StyleSheet.create({
  signatureStyle: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PNElectronicSignature;

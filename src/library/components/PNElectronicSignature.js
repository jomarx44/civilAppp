import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import SignaturePad from "react-native-signature-pad";

export const PNElectronicSignature = ({ onError, onChange }) => {
  return (
    <View style={{flex: 1}}>
      <SignaturePad
        onError={onError}
        onChange={onChange}
        // onError={signaturePadError}
        // onChange={signaturePadChange}
        style={styles.signaturePadStyle}
      />
    </View>
    
  );
};

PNElectronicSignature.propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func
};

const styles = StyleSheet.create({
  signaturePadStyle: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PNElectronicSignature;

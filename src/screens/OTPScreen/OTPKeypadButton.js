import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';

const OTPKeypadButton = ({onPress, text}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={styles.button}
  >
    {text}
  </TouchableOpacity>
);

OTPKeypadButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.element,isRequired
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OTPKeypadButton;
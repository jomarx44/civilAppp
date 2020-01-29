import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

const OTPKeypad = (props) => {
  <View style={styles.container}>
    <View style={styles.keypad_row}>

    </View>
    <View style={styles.keypad_row}>

    </View>
    <View style={styles.keypad_row}>

    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypad_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default OTPKeypad;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  DatePicker
} from 'native-base';

const PNFormDatePicker = ({title, onDateChange, invalid = '', ...props }) => {
  const [ borderBottomWidth, setBorderBottomWidth ] = useState(1);

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputContainer, {borderBottomWidth}]}>
        <DatePicker 
          {...props}
          onDateChange={(date) => {
            onDateChange(date);
            setBorderBottomWidth(0);
          }}
          textStyle={styles.textStyle}
          placeHolderTextStyle={styles.placeHolder}
        />
      </View>
      <Text style={[styles.invalidText]}>{ invalid }</Text>
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Avenir_Medium',
    color: "#5d646c"
  },
  inputContainer: {
    justifyContent: "center",
    borderBottomColor: '#E0E0E0',
    backgroundColor: "#FFFFFF",
    marginTop: 5
  },
  placeHolder: {
    color: '#444444',
    fontFamily: "Avenir_Book",
    fontSize: 20,
    padding: 0
  },
  textStyle: {
    padding: 0,
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010'
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormDatePicker
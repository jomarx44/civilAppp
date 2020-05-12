import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  DatePicker
} from 'native-base';

const PNDatePicker = ({title, onDateChange, ...props }) => {
  const [ borderBottomWidth, setBorderBottomWidth ] = useState(1);

  return (
    <View style={[styles.container, { borderBottomWidth }]}>
      <Text style={styles.label}></Text>
      <View style={styles.inputContainer}>
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
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Avenir_Medium',
    color: "#5d646c"
  },
  inputContainer: {
    justifyContent: "center",
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
  }
});

export default PNDatePicker
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  DatePicker
} from 'native-base';

const PNDatePicker = ({title, defaultDate, minimumDate, maximumDate, placeHolderText, onDateChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <DatePicker 
          defaultDate={defaultDate}
          onDateChange={(date) => onDateChange(date)}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textStyle={styles.textStyle}
          placeHolderText={placeHolderText}
          placeHolderTextStyle={styles.placeHolder}
        />
      </View>
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  label: {
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
    color: "#5d646c"
  },
  inputContainer: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 5
  },
  placeHolder: {
    color: '#f9a010',
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
  },
  textStyle: {
    color: '#f9a010',
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
  }
});

export default PNDatePicker
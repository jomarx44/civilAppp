import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions, TextInput, Picker} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text, Label} from "native-base";
import ModalDropdown from 'react-native-modal-dropdown';

class PNDropDownInputFund extends Component {
  render() {
    const { title, reference, onChangeText, password } = this.props;
    return (
     <View style={styles.view}>
       <Label style={styles.label}>{title}</Label>
        <ModalDropdown
          defaultValue='Please select one...'
          options={[ 'Salary', 'Investment', 'Government Assistance', 'Business', 'Others' ]} 
          dropdownStyle={[styles.input, {}]}
          textStyle={styles.text}
          dropdownTextStyle={{ fontSize: 18, /*borderBottomColor: 'black', borderBottomWidth: 1*/ }}
           />
     </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
   marginRight: 30,
   alignItems: 'flex-start',
   backgroundColor: '#FFFFFF',
   marginLeft: 30,
   marginBottom: 0,
   marginTop: 20,
   color: '#f9a010',
   fontSize: 18
  },
  input: {
   color: '#f9a010',
   fontSize: 18,
   marginBottom: 0,
   marginTop: 0,
   marginLeft: 30,
   width: '85%'
  },
  label: {
   marginLeft: 30,
   marginRight: 30,
   fontSize: 18,
   fontWeight: '400',
   color: '#5d646c'
  },
  view: {
   marginTop: 30,
   marginBottom: 10
  }
});

export default PNDropDownInputFund;

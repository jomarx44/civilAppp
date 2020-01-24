import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions, TextInput, Picker} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text, Label, Icon} from "native-base";
import ModalDropdown from 'react-native-modal-dropdown';

class PNDropDownInput extends Component {
  render() {
    const { title, reference, onChangeText, password } = this.props;
    const icon = <Icon style={{ marginLeft: 90 }} name="ios-arrow-down" />;
    return (
     <View style={styles.view}>
       <Label style={styles.label}>{title}</Label>
        <ModalDropdown
          defaultValue='Please select city...'
          options={[ 'Manila', 'Makati City', 'Pasay City', 'Quezon City', 'Taguig City' ]} 
          dropdownStyle={[styles.input]}
          textStyle={styles.text}
          dropdownTextStyle={{ fontSize: 18}}
        />
     </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    alignItems: "center",
    color: '#f9a010',
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    marginTop: 5
  },
  input: {
    color: "#f9a010",
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
    width: "100%"
  },
  label: {
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
    color: "#5d646c"
  },
  view: {
    marginBottom: 25
  }
});

export default PNDropDownInput;

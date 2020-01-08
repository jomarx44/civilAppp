import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions, TextInput} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text, Label} from "native-base";

class PNFormTextBox extends Component {

  render() {
    const { title, reference, onChangeText, password, value } = this.props;
    return (
     <View style={styles.view}>
        <Label style={styles.label}>{title}</Label>
      <Item 
        style={styles.text} >
        <TextInput
          onChangeText={onChangeText}
          ref={reference} secureTextEntry={password}
          style={styles.input}
          value={value}
          defaultValue='' />
      </Item>
     </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
   marginLeft: 30,
   marginRight: 30,
   alignItems: 'center',
   backgroundColor: '#FFFFFF',
   marginBottom: 0,
   marginTop: 20,
  },
  input: {
   color: '#f9a010',
   fontSize: 18,
   marginBottom: 0,
   marginTop: 0,
   width: '100%'
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

export default PNFormTextBox;

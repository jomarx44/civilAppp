import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions, TextInput} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text, Label} from "native-base";

class PNFormTextBoxWithoutLabel extends Component {

  render() {
    const { title, reference, onChangeText, password } = this.props;
    return (
     <View style={styles.view}>
      <Item 
        style={styles.text} >
        <TextInput
          onChangeText={onChangeText}
          ref={reference} secureTextEntry={password}
          style={styles.input} />
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
  },
  input: {
   color: '#f9a010',
   fontSize: 18,
   marginBottom: 0,
   marginTop: 0,
   width: '100%'
  },
  view: {
   marginTop: 20,
   marginBottom: 10
  }
});

export default PNFormTextBoxWithoutLabel;

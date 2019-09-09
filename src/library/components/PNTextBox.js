import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text } from "native-base";

class PNTextBox extends Component {

  render() {
    const { placeholder } = this.props;
    return (
      <Item regular
        style={styles.button} >
        <Input placeholder={placeholder} />
      </Item>
    );
  }
}

let styles = StyleSheet.create({
  button: {
   height: 48,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#FFFFFF'
 }
});

export default PNTextBox;

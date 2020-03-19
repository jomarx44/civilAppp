import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";
import * as NavigationService from 'navigation/NavigationService.js'

class PNBlueButton extends Component {

  render() {
    const { title, navid } = this.props;
    return (
      <Button full 
        style={styles.button}
        onPress={() => NavigationService.navigate(navid)}>
        <Text>{title}</Text>
      </Button>
    );
  }
}

let styles = StyleSheet.create({
  button: {
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#309fe7',
 }
});

export default PNBlueButton;

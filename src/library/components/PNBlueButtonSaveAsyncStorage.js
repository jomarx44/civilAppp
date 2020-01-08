import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Button, Text } from "native-base";
import NavigationService from 'navigation/NavigationService.js';

class PNBlueButtonSaveAsyncStorage extends Component {

  onPressButton = (navid, storeKey, storeValue) => {
    AsyncStorage.setItem(storeKey, JSON.stringify(storeValue));
    NavigationService.navigate(navid);
  }

  render() {
    const { title, navid, storeKey, storeValue} = this.props;
    return (
      <Button full 
        style={styles.button}
        onPress={() => this.onPressButton(navid, storeKey, storeValue)}>
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
   marginBottom: 20,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#309fe7',
 }
});

export default PNBlueButtonSaveAsyncStorage;

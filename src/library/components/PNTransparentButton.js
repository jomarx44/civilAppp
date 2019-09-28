import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";
import NavigationService from 'navigation/NavigationService.js'


class PNTransparentButton extends Component {

  render() {
    const { title, navid } = this.props;
    return (
      <Button full transparent light
        onPress={() => NavigationService.navigate(navid)}
        style={styles.button}>
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
   borderWidth: 2,
   borderColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
 }
});

export default PNTransparentButton;

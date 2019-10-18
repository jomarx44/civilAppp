import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";
import NavigationService from 'navigation/NavigationService.js'


class PNOrangeButton extends Component {

  render() {
    const { title, navid } = this.props;
    return (
      <Button full primary
        style={styles.button}
        onPress={() => NavigationService.navigate(navid)}>
        <Text>{title}</Text>
      </Button>
    );
  }
}

let styles = StyleSheet.create({
  button: {
   height: 50,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f5ac14',
 }
});

export default PNOrangeButton;

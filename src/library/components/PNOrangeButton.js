import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";

class PNOrangeButton extends Component {

  render() {
    const { title } = this.props;
    return (
      <Button full primary
        style={styles.button}>
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
 }
});

export default PNOrangeButton;

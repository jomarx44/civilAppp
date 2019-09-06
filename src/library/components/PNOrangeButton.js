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
   marginTop: 20,
   marginLeft: 60,
   marginRight: 60,
   justifyContent: 'center',
   alignItems: 'center',
 }
});

export default PNOrangeButton;

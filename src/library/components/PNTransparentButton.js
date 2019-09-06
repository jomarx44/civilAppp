import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";

class PNTransparentButton extends Component {

  render() {
    const { title } = this.props;
    return (
      <Button full transparent light
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
   borderWidth: 2,
   borderColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
 }
});

export default PNTransparentButton;

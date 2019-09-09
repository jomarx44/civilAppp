import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Container, Header, Content, Button, Icon, Text } from "native-base";

class PNButtonID extends Component {

  render() {
    const { title, iconname, isTop } = this.props;
    if (isTop == 'true' ) {
    return (
      <View style={[styles.view, { borderTopWidth: 1 }]}>
      <Button transparent
        style={styles.button} >
        <Icon name={iconname} style={styles.text} />
        <Text style={styles.text}>{title}</Text>
        <Icon name='arrow-forward' style={[styles.text]} />
      </Button>
      </View>
    );
   } else {
    return (
      <View style={styles.view}>
      <Button transparent
        style={styles.button} >
        <Icon name={iconname} style={styles.text} />
        <Text style={styles.text}>{title}</Text>
        <Icon name='arrow-forward' style={[styles.text]} />
      </Button>
      </View>
    );
 

   }
  }
}

let styles = StyleSheet.create({
  button: {
   height: 48,
   flex: 1,

   marginLeft: 30,
   marginRight: 30,

   marginTop: 10,
   marginBottom: 10,
   backgroundColor: '#FFFFFF'
 }, view: {
   borderBottomWidth: 1,
   alignSelf: 'stretch',
   borderColor: '#E1E1E5',

 }, text: {
   color: "#5D646C",
   fontSize: 18
 }
});

export default PNButtonID;

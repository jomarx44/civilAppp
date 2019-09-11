import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

class PNOTPDigits extends Component {

  render() {
    const { placeholder } = this.props;
    return (
     <View style={styles.item}>
      <Grid style={styles.grid}> 
        <Col style={[styles.digit]}><Input/></Col>
        <Col style={[styles.digit]}><Input/></Col>
        <Col style={[styles.digit]}><Input/></Col>
        <Col style={[styles.digit]}><Input/></Col>
      </Grid>
     </View>
    );
  }
}

let styles = StyleSheet.create({
  digit: {
   width: 47,
   height: 52,
   marginLeft: 10,
   marginRight: 10,
   backgroundColor: '#FFFFFF'
  },
  grid: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
   height: 52,
   marginTop: 20,
   marginLeft: 30,
   marginRight: 30,
   alignItems: 'center',
   justifyContent: 'center',
 }
});

export default PNOTPDigits;

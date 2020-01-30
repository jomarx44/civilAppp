import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Container, Header, Content, Input, Item, Button, Text } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from 'navigation/NavigationService.js'



class PNKeypadButton extends Component {
  handleClick(title) {
  }
  render() {
    const { title, onPressButton } = this.props;
    return (
      <Col style={[styles.digit]}>
        <Button transparent light
           onPress={() => onPressButton}>
          <Text style={styles.text}>{title}</Text>
        </Button>
      </Col>
    );
  }
}


class PNKeypadButtonCheck extends Component {


 

  render() {
    const { title, navid } = this.props;
    return (
      <Col style={[styles.digit]}>
        <Button transparent light
          onPress={() => NavigationService.navigate(navid)}>
          <Text style={styles.text}>{title}</Text>
        </Button>
      </Col>
    );
  }
}




class PNOTPKeypad extends Component {

  constructor(props) {
    super(props);

  }

  handleKeypadButton(title) {
  }

  render() {
    const { placeholder, navid } = this.props;
    return (
     <View style={styles.grid}>
        <View style={styles.row}>
          <PNKeypadButton title="1" onPressButton={() => this.handleKeypadButton("1")}/>
          <PNKeypadButton title="2"/>
          <PNKeypadButton title="3"/>
        </View>
        <View style={styles.row}>
          <PNKeypadButton title="4"/>
          <PNKeypadButton title="5"/>
          <PNKeypadButton title="6"/>
        </View>
        <View style={styles.row}>
          <PNKeypadButton title="7"/>
          <PNKeypadButton title="8"/>
          <PNKeypadButton title="9"/>
        </View>
        <View style={styles.row}>
          <PNKeypadButton title=""/>
          <PNKeypadButton title="0"/>
          <PNKeypadButtonCheck title="<" navid={navid}/>
        </View>
 
 
 
     </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
   flex: 1,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  digit: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
  },
  grid: {
    flex: 4,
    flexDirection: 'column'
  },
  row: {
    marginLeft: 30,
    marginRight: 30,
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

export default PNOTPKeypad;

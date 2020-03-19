import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import styles2 from "styles/commonStyle";

class PNTitleAndDescription extends Component {
  render() {
    const { title, desc } = this.props;  
    return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
     );
  }
}

let styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'Avenir_Heavy',
    color: '#F5AC14',
    marginBottom: 10
  },
  desc: {
    color: "#5d646c",
    fontFamily: 'Avenir_Medium',
    fontSize: 16,
  }
});


export default PNTitleAndDescription;

import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import styles2 from "styles/commonStyle";

class PNHeaderTitleDesc extends Component {
  render() {
    const { title, desc } = this.props;  
    return (
        <View style={{ flex: 1 , flexDirection: 'column-reverse' }}>
          <Text style={styles.desc}>{desc}</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
     );
  }
}

let styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5ac14',
    marginBottom: 13,
    marginLeft: 32,
  },
  desc: {
    marginLeft: 32,
    marginRight: 32,
    color: "#5d646c",
    fontSize: 16,

  }
});


export default PNHeaderTitleDesc;

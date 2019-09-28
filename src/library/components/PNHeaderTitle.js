import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import styles2 from "styles/commonStyle";

class PNHeaderTitle extends Component {
  render() {
    const { title } = this.props;  
    return (
        <View style={{ flex: 1 , flexDirection: 'column-reverse' }}>
          <Text style={styles.text}>{title}</Text>
        </View>
     );
  }
}

let styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 13,
    marginLeft: 32,
  }
});


export default PNHeaderTitle;

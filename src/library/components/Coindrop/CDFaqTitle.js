import React, { Component } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from '@react-navigation/compat';
class CDFaqTitle extends Component {
  render() {
    return (
        <View>
          <Text allowFontScaling={false} style={styles.TitleText}>{'Browse FAQ Topics'.toUpperCase()}</Text>
          <Text allowFontScaling={false} style={styles.PathText}>{this.props.categoryPath.toUpperCase()}</Text>
        </View>
    );
  }
}

let styles = StyleSheet.create({
 TitleText : {
   color: '#FA8043',
   fontSize: 14,
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 40,
 },
 PathText : {
   color: '#FA8043',
   fontSize: 12,
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 40,
 }
});

export default withNavigation(CDFaqTitle);
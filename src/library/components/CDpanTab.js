import React, { Component } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
class CDpanTab extends Component {

  render() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text allowFontScaling={false} 
            style={this.props.tab == 'portfolio' ? styles.ActiveTab : InactiveTab}>
            PORTFOLIO</Text>
          <Text allowFontScaling={false} 
            style={this.props.tab == 'portfolio' ? styles.ActiveTab : InactiveTab}>
            APPLICATIONS</Text>
          <Text allowFontScaling={false} 
            style={this.props.tab == 'portfolio' ? styles.ActiveTab : InactiveTab}>
            NOTIFICATION</Text>
        </View>
    );
  }
}

let styles = StyleSheet.create({
 ActiveTab : {
   color: '#FA8043',
   fontSize: 14,
   fontWeight: 'bold',
 },
 InactiveTab : {
   color: '#7d7d7d',
   fontSize: 14,
   fontWeight: 'bold',
 }

});

export default withNavigation(CDpanTab);
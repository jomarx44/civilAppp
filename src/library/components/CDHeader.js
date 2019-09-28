import React, { Component } from 'react';

import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import NavigationService from 'navigation/NavigationService.js'
class CDHeader extends Component {
  render() {
    return (
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {this.props.navigation.openDrawer() }}>
              <Image source={require('res/images/ic_menu_white.png')} />
            </Button>
          </Left>
          <Body>
            <TouchableOpacity onPress={() => { NavigationService.navigate('Product') }}>
              <Image source={require('res/images/ic_menu_white.png')} />
            </TouchableOpacity>
          </Body>
        </Header>
    );
  }
}
export default withNavigation(CDHeader);

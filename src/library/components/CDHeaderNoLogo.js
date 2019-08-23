import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
class CDHeader extends Component {
  render() {
    return (
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {this.props.navigation.openDrawer() }}>
              <Image source={require('res/images/ic_menu.png')} />
            </Button>
          </Left>
          <Body>
            <Image source={require('res/images/ic_logo_menu_trans.png')} />
          </Body>
        </Header>
    );
  }
}
export default withNavigation(CDHeader);

import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
class CDHeaderSideMenu extends Component {
  render() {
    return (
        <Header transparent>
          <Right>
            <Button
             transparent
             onPress={() => {this.props.navigation.closeDrawer() }}>
             <Image source={require('res/images/ic_menu_white.png')} />
           </Button>
         </Right>
        </Header>
    );
  }
}
export default withNavigation(CDHeaderSideMenu);

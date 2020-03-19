import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from '@react-navigation/compat';
class CDHeaderSideMenu extends Component {
  render() {
    return (
        <Header transparent style={{height: 84}}>
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

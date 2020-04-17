import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from '@react-navigation/compat';
class CDHeaderBackButton extends Component {
  render() {
    return (
        <Header transparent>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{color: '#FA8043'}}
              name='arrow-back' 
            />
          </Button>
        </Left>
          <Body>
            <Image source={require('res/images/ic_logo_menu_trans.png')} />
          </Body>
        </Header>
     );
  }
}
export default withNavigation(CDHeaderBackButton);
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from '@react-navigation/compat';
class PNHeaderBackButtonWhiteOnly extends Component {
  render() {
    return (
        <Header transparent>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{color: '#FFFFFF'}}
              name='arrow-back' 
            />
          </Button>
        </Left>
          <Body>
          </Body>

        </Header>
     );
  }
}
export default withNavigation(PNHeaderBackButtonWhiteOnly);

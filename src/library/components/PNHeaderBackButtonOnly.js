import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
class PNHeaderBackButtonOnly extends Component {
  render() {
    return (
        <Header transparent>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{color: '#309FE7'}}
              name='ios-arrow-back' 
            />
          </Button>
        </Left>
          <Body>
          </Body>

        </Header>
     );
  }
}
export default withNavigation(PNHeaderBackButtonOnly);

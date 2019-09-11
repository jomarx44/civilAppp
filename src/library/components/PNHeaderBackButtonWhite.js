import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
class PNHeaderBackButtonWhite extends Component {
  render() {
    const { title } = this.props;  
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
            <Text style={styles.text}>{title}</Text>
          </Body>
        </Header>
     );
  }
}

let styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#FFFFFF'
  },
});


export default withNavigation(PNHeaderBackButtonWhite);

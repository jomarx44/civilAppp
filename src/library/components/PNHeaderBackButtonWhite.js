import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import NavigationService from 'navigation/NavigationService.js'

class PNHeaderBackButtonWhite extends Component {

  onPressBack = (navid) => {
    if(navid) {
      NavigationService.navigate(navid);
    }
    else {
      this.props.navigation.goBack(null);
    }
  }

  render() {
    const { title, navid } = this.props;  
    return (
        <Header transparent style={styles.text}>
          <Left>
          <Button transparent onPress={() => this.onPressBack(navid)}>
            <Icon style={{color: '#DCDCDC'}}
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
    color: '#000',
    backgroundColor: '#FFFFFF'
  },
});


export default withNavigation(PNHeaderBackButtonWhite);

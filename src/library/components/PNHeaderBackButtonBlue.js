import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import styles2 from "styles/commonStyle";
import NavigationService from 'navigation/NavigationService.js'

class PNHeaderBackButtonBlue extends Component {

  onPressBack = (navid) => {
    if(navid) {
      NavigationService.navigate(navid);
    }
    else {
      this.props.navigation.goBack(null);
    }
  }

  render() {
    const { navid } = this.props;
    return (
        <Header transparent style={styles.text}>
          <Left>
          <Button transparent onPress={() => this.onPressBack(navid)}>
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

let styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    backgroundColor: '#309fe7',
  }
});

export default withNavigation(PNHeaderBackButtonBlue);

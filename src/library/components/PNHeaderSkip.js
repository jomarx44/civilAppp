import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import styles2 from "styles/commonStyle";
import NavigationService from 'navigation/NavigationService.js'

class PNHeaderSkip extends Component {

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
          <Right>
            <Button transparent onPress={() => this.onPressBack(navid)}>
              <Text style={{color: '#FFFFFF'}}>
                Skip
              </Text>
              <Icon style={{color: '#FFFFFF'}}
                name='arrow-forward' 
              />
            </Button>
          </Right>
        </Header>
     );
  }
}

let styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    backgroundColor: '#309fe7',
    paddingLeft: 0,
    paddingRight: 0
  }
});

export default withNavigation(PNHeaderSkip);


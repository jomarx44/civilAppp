import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
class PNHeader extends Component {
  render() {
    const { title } = this.props;
    return (
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => {this.props.navigation.openDrawer() }}>
              <Image source={require('res/images/ic_menu_white.png')} />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
    );
  }
}

let styles = StyleSheet.create({
  header: {
   backgroundColor: '#309fe7'
  }

});





export default withNavigation(PNHeader);
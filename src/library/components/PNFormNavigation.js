import React, { Component } from 'react'
import { Dimensions, Text, Platform, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Title, Right, Icon } from 'native-base';
import { withNavigation } from '@react-navigation/compat'
import * as NavigationService from 'navigation/NavigationService.js'

const {width} = Dimensions.get('window')

export const PNFormNavigation = ({navigation, navid, title}) => {
  const onPressBack = (navid) => {
    if(navid) {
      NavigationService.navigate(navid);
    }
    else {
      navigation.goBack(null);
    }
  }

  return (
    <Header style={styles.container}>
      <Left style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={styles.backButton} onPress={() => onPressBack(navid)}>
          <Icon style={{color: '#F9A010'}}
            name='arrow-back' 
          />
        </TouchableOpacity>
      </Left>
      <Body style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
        <Title  style={styles.text}>{title}</Title>
      </Body>
      <Right style={{flex: 1}}>
        <Title>asdadss</Title>
      </Right>
    </Header>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFF',
    height: 44
  },
  backButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingLeft: 10,
    height: 44,
    width: 40
  },
  text: {
    fontFamily: 'Avenir_Medium',
    fontSize: 18,
    color: '#444444',
  }
})

export default withNavigation(PNFormNavigation);

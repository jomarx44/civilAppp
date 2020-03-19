import React, { Component } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

const PNHeaderBlueSkip = ({onPressSkip, title}) => {
  return (
    <Header transparent style={styles.container}>
      <Left style={{flex: 1}} />
      <Body style={{flex: 2, alignItems: 'center'}}>
        <Title style={styles.title}>{title}</Title>
      </Body>
      <Right style={{flex: 1}}>
        <Button transparent onPress={() => onPressSkip()}>
          <Text style={{fontFamily: 'Avenir_Light', fontSize: 16, color: '#fff'} }>Skip</Text>
          <Icon style={{ color: "#FFFFFF" }} name="right" type="AntDesign"/>
        </Button>
      </Right>
    </Header>
  );
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7",
  },
  title: {
    fontFamily: 'Avenir_Medium',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default PNHeaderBlueSkip;

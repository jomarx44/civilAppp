import React, { Component } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

const PNHeaderBlueBack = ({ title, onPress }) => {
  return (
    <Header transparent style={styles.container}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => onPress()}>
          <Icon style={{ color: "#FFFFFF" }} name="left" type="AntDesign" />
        </Button>
      </Left>
      <Body style={{ flex: 2, alignItems: "center" }}>
        {title && <Title style={styles.title}>{title}</Title>}
      </Body>
      <Right style={{ flex: 1 }} />
    </Header>
  );
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7"
  },
  title: {
    fontFamily: "Avenir_Medium",
    fontSize: 18,
    textAlign: "center"
  }
});

export default PNHeaderBlueBack;

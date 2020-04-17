import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from "native-base";

// Others
import { config } from "../../../config";

export const PNHeaderDrawerTitle = ({title, containerStyle, titleStyle, openDrawer}) => {
  return (
    <Header style={[styles.defaultContainerStyle, containerStyle]}>
      <Left style={{ flex: 1 }}>
        <Button
          transparent
          onPress={() => {
            openDrawer();
          }}
        >
          <Image source={config.icons.drawer} />
        </Button>
      </Left>
      <Body style={styles.body}>
        <Title style={[styles.defaultTitleStyle, titleStyle]}>{title}</Title>
      </Body>
      <Right style={{ flex: 1 }} />
    </Header>
  )
}

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "#309fe7",
    paddingTop: 30,
    height: 80
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3
  },
  defaultTitleStyle: {
    color: "#fff",
    fontFamily: "Avenir_Medium",
    fontSize: 18,
    letterSpacing: 0
  }
});

export default PNHeaderDrawerTitle;

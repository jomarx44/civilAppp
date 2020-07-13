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
import { useSafeArea } from 'react-native-safe-area-context'

// Others
import { config } from "../../../config";

export const PNHeaderDrawerTitle = ({title, containerStyle, titleStyle, openDrawer}) => {
  const insets = useSafeArea();
  return (
    <Header style={[styles.defaultContainerStyle, containerStyle, {marginTop: insets.top}]}>
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
    height: 50
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

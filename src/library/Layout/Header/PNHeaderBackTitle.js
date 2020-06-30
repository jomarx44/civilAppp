import { Body, Button, Header, Icon, Left, Right } from "native-base";
import { StyleSheet, Text } from "react-native";

import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PNHeaderBackTitle = props => {
  const insets = useSafeAreaInsets();
  const { headerStyle, iconStyle, onBack, title } = props;
  return (
    <Header style={[styles.defaultHeaderStyle, headerStyle, {paddingTop: insets.top}]}>
      <Left style={styles.defaultLeftStyle}>
        <Button transparent onPress={() => onBack()}>
          <Icon
            style={[styles.defaultIconStyle, iconStyle]}
            name="arrow-back"
          />
        </Button>
      </Left>
      <Body style={styles.defaultBodyStyle}>
        <Text style={styles.defaultTitleStyle}>{title}</Text>
      </Body>
      <Right style={styles.defaultRightStyle} />
    </Header>
  );
};

export default PNHeaderBackTitle;

const styles = StyleSheet.create({
  defaultBodyStyle: {
    alignItems: "center",
    flex: 3,
  },
  defaultHeaderStyle: {
    backgroundColor: "transparent",
    height: 80,
    borderBottomWidth: 0, 
    elevation: 0, 
    shadowOpacity: 0,
  },
  defaultIconStyle: {
    color: "#F5AC14"
  },
  defaultLeftStyle: {
    flex: 1
  },
  defaultRightStyle: {
    flex: 1
  },
  defaultTitleStyle: {
    color: '#444444',
    fontFamily: 'Avenir_Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});

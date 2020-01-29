import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Label,
  ListItem,
  Text,
  Radio,
  Right,
  Left
} from "native-base";

const PNRadioFormAccountType = ({toggleAccountType, value, title}) => {
  return (
    <View style={styles.view}>
      <Label style={styles.label}>{title}</Label>
      <ListItem
        selected={value === 'savings'}
        onPress={() => toggleAccountType('savings')}
        style={styles.radioStyle}
      >
        <Left>
          <Text>Savings</Text>
        </Left>
        <Right>
          <Radio
            selected={value === 'savings'}
            onPress={() => toggleAccountType('savings')}
          />
        </Right>
      </ListItem>
      <ListItem
        selected={value === 'time_deposit'}
        onPress={() => toggleAccountType('time_deposit')}
        style={styles.radioStyle}
      >
        <Left>
          <Text>Time Deposit</Text>
        </Left>
        <Right>
          <Radio
            selected={value === 'time_deposit'}
            onPress={() => toggleAccountType('time_deposit')}
          />
        </Right>
      </ListItem>
      <ListItem
        selected={value === 'current_account'}
        onPress={() => toggleAccountType('current_account')}
        style={styles.radioStyle}
      >
        <Left>
          <Text>Current Account</Text>
        </Left>
        <Right>
          <Radio
            selected={value === 'current_account'}
            onPress={() => toggleAccountType('current_account')}
          />
        </Right>
      </ListItem>
    </View>
  );
}

let styles = StyleSheet.create({
  view: {
    marginBottom: 25
  },
  label: {
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
    color: "#5d646c"
  },
  radioStyle: {
    marginBottom: 30,
    width: "85%"
  }
});

export default PNRadioFormAccountType;

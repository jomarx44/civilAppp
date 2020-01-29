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

const PNRadioFormGender = ({toggleGender, value, title}) => {
  return (
    <View style={styles.view}>
      <Label style={styles.label}>{title}</Label>
      <ListItem
        selected={value == 'male'}
        onPress={() => toggleGender('male')}
        style={styles.radioStyle}
      >
        <Left>
          <Text>Male</Text>
        </Left>
        <Right>
          <Radio
            onPress={() => toggleGender('male')}
            selected={value == 'male'}
          />
        </Right>
      </ListItem>
      <ListItem
        selected={value == 'female'}
        onPress={() => toggleGender('female')}
        style={styles.radioStyle}
      >
        <Left>
          <Text>Female</Text>
        </Left>
        <Right>
          <Radio
            onPress={() => toggleGender('female')}
            selected={value == 'female'}
          />
        </Right>
      </ListItem>
    </View>
  )
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
    marginLeft: 30,
    marginBottom: 30,
    width: "85%"
  }
});

export default PNRadioFormGender;

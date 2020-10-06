import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { Header, Left, Body, Right, Button, Title } from "native-base";

export const PNHeaderCancelDone = ({ onDone, onCancel, title }) => {
  return (
    <Header transparent style={styles.container}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Button>
      </Left>
      <Body style={{ flex: 2, alignItems: "center" }}>
        <Title style={styles.title}>{title}</Title>
      </Body>
      <Right style={{ flex: 1 }}>
        <Button transparent onPress={onDone}>
          <Text style={styles.buttonText}>Done</Text>
        </Button>
      </Right>
    </Header>
  );
};

PNHeaderCancelDone.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7"
  },
  title: {
    fontFamily: "Avenir_Medium",
    fontSize: 18,
    textAlign: "center"
  },
  buttonText: {
    fontFamily: "Avenir_Light",
    fontSize: 16,
    color: "#fff"
  }
});

export default PNHeaderCancelDone;

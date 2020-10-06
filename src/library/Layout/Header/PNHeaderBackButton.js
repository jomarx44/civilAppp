import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Header, Left, Body, Button, Icon, Text } from "native-base";

export const PNHeaderBackButton = ({
  title,
  onPress,
  headerStyle,
  iconStyle
}) => {
  return (
    <Header
      transparent
      style={[styles.headerDefaultStyle, headerStyle && headerStyle]}
    >
      <Left>
        <Button transparent onPress={() => onPress()}>
          <Icon
            style={[styles.iconDefaultStyle, iconStyle && iconStyle]}
            name="arrow-back"
          />
        </Button>
      </Left>
      <Body>{title && <Title style={styles.title}>{title}</Title>}</Body>
    </Header>
  );
};

const styles = StyleSheet.create({
  headerDefaultStyle: {
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    color: "#000"
  },
  iconDefaultStyle: {
    color: "#309fe7"
  }
});

PNHeaderBackButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  headerStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

export default PNHeaderBackButton;

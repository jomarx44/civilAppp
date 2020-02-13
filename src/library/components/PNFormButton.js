import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default class PNFormButton extends Component {
  state = {
    styles: {
      backgroundColor: "#F5AC14"
    }
  };

  checkIfDisabled = () => {
    return this.props.disabled === true;
  };

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          styles.button,
          this.props.color ? { backgroundColor: this.props.color } : this.state.styles,
          this.props.disabled && {
            backgroundColor: "#C9C9C9"
          }
        ]}
      >
        <Text style={styles.button_text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Avenir_Medium"
  }
});

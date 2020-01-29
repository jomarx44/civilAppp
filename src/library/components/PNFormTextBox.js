import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput } from "react-native";
import { Item, Label } from "native-base";

class PNFormTextBox extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  focus = () => {
    this.input.current.focus();
  };

  render() {
    const {
      title,
      onChangeText,
      password,
      value,
      maxLength = null,
      onSubmitEditing = null,
      keyboardType = "default",
      autoCompleteType = "off",
      editable = true
    } = this.props;
    return (
      <View style={styles.view}>
        <Label style={styles.label}>{title}</Label>
        <Item style={styles.text}>
          <TextInput
            autoCompleteType={autoCompleteType}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            ref={this.input}
            secureTextEntry={password}
            style={[styles.input, !editable && styles.input_disabled]}
            value={value}
            editable={editable}
            maxLength={maxLength}
          />
        </Item>
      </View>
    );
  }
}

PNFormTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  password: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  reference: PropTypes.func,
  onSubmitEditing: PropTypes.func
};

let styles = StyleSheet.create({
  text: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 5
  },
  input: {
    color: "#f9a010",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    width: "100%"
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: "#5d646c"
  },
  view: {
    marginBottom: 25
  }
});

export default PNFormTextBox;

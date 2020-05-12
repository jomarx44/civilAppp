import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import { Item, Label } from "native-base";

class PNFormTextBoxMasked extends Component {
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
      editable = true,
      invalid = ""
    } = this.props;
    return (
      <View style={styles.view}>
        <Label style={styles.label}>{title}</Label>
        <Item style={styles.text}>
          <TextInputMask 
            {...this.props}
            style={[styles.input, !editable && styles.input_disabled]}
            ref={this.input}
          />
        </Item>
        <Text style={[styles.invalidText]}>{ invalid }</Text>
      </View>
    );
  }
}

PNFormTextBoxMasked.propTypes = {
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
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: "Avenir_Medium",
    width: "100%"
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  label: {
    fontSize: 18,
    fontFamily: "Avenir_Medium",
    color: "#5d646c"
  },
  view: {
    marginBottom: 25
  },
  invalidText: {
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormTextBoxMasked;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Item, Label } from "native-base";

class PNFormTextBoxPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  focus = () => {
    this.input.current.focus();
  };

  render() {
    const {
      label,
      password,
      value,
      editable = true,
      invalid = ""
    } = this.props;
    return (
      <View style={styles.view}>
        <Label style={styles.label}>{label}</Label>
        <Item style={[styles.text, !editable && styles.disabled]}>
          <Text style={styles.prefix_number}>+63</Text>
          <TextInput
            {...this.props}
            value={value ? value.replace(/^0+/, '') : ''}
            ref={this.input}
            keyboardType='number-pad'
            secureTextEntry={password}
            style={styles.input}
            maxLength={10}
          />
        </Item>
        <Text style={[styles.invalidText]}>{ invalid }</Text>
      </View>
    );
  }
}

PNFormTextBoxPhoneNumber.propTypes = {
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
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  prefix_number: {
    fontFamily: "Gilroy_Medium",
    fontSize: 20,
    color: '#F9A010',
    width: '15%',
  },
  input: {
    color: "#f9a010",
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    width:'85%'
  },
  disabled: {
    backgroundColor: "#EEEEEE"
  },
  label: {
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    color: "#5d646c"
  },
  view: {
    marginBottom: 15
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Gilroy_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormTextBoxPhoneNumber;

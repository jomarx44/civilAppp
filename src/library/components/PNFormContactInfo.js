import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Item, Label } from "native-base";

class PNFormContactInfo extends Component {
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
      value,
      onSubmitEditing = null,
      autoCompleteType = "off",
      editable = true,
      invalid = ''
    } = this.props;
    return (
      <View style={styles.view}>
        <Item style={styles.text}>
          <Text style={styles.prefix_number}>+639</Text>
          <TextInput 
            autoCompleteType={autoCompleteType}
            keyboardType='number-pad'
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            ref={this.input}
            style={[styles.input, !editable && styles.input_disabled]}
            value={value}
            editable={editable}
            maxLength={9}
          />
        </Item>
      <Text style={[styles.invalidText]}>{ invalid }</Text>
      </View>
    );
  }
}

PNFormContactInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
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
    justifyContent: 'space-between'
  },
  prefix_number: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010',
    width:'20%',
    marginRight: 5
  },
  input: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010',
    width:'80%'
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  view: {
    marginBottom: 25
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormContactInfo;

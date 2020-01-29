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
      editable = true
    } = this.props;
    return (
      <View style={styles.view}>
        <Label style={styles.label}>{title}</Label>
        <Item style={styles.text}>
          <Text style={styles.prefix_number}>+63</Text>
          <TextInput 
            autoCompleteType={autoCompleteType}
            keyboardType='number-pad'
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            ref={this.input}
            style={[styles.input, !editable && styles.input_disabled]}
            value={value}
            editable={editable}
            maxLength={10}
          />
        </Item>
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
    color: "#f9a010",
    fontSize: 16,
    fontFamily: "Montserrat_SemiBold",
    width:'10%',
    marginRight: 10
  },
  input: {
    color: "#f9a010",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    width:'80%'
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

export default PNFormContactInfo;

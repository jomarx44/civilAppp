import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Item, Label } from "native-base";
import { TextInputMask } from 'react-native-masked-text'

class PNFormInitialDeposit extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    styles: {
      borderBottomColor: "#E1E1E5",
      borderBottomWidth: 1
    }
  };

  focus = () => {
    this.input.current.focus();
  };

  checkIfEmpty = () => {
    return this.props.value == "";
  };

  handleOnFocus = () => {
    const { styles } = this.state;
    styles.borderBottomColor = "#F5AC14";
    this.setState({
      styles
    });
  };

  handleOnBlur = () => {
    const { styles } = this.state;
    if (!this.checkIfEmpty()) {
      styles.borderBottomWidth = 0;
      this.setState({ styles });
    } else {
      styles.borderBottomColor = "#E1E1E5";
      styles.borderBottomWidth = 1;
      this.setState({ styles });
    }
  };

  render() {
    const {
      title,
      onChangeText,
      value,
      maxLength = null,
      onSubmitEditing = null,
      autoCompleteType = "off",
      editable = true,
      invalid
    } = this.props;

    
    return (
      <View style={styles.view}>
        <TextInputMask 
          type={'money'}
          options={{
            precision: 2,
            separator: '.',
            delimiter: ',',
            unit: 'PHP ',
          }}
          style={[
            styles.input,
            {
              borderBottomColor: this.state.styles.borderBottomColor,
              borderBottomWidth: this.state.styles.borderBottomWidth
            }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor='#444444'
          onFocus={() => {
            // Do this.props.onFocus if given
            // this.props.onFocus && this.props.onFocus();
            this.handleOnFocus();
          }}
          onBlur={() => {
            // Do this.props.onBlur if given
            // this.props.onBlur && this.props.onBlur();
            this.handleOnBlur();
          }}
        />
        <Text style={[styles.invalidText]}>{ invalid }</Text>
      </View>
    );
  }
}

PNFormInitialDeposit.propTypes = {
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
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010'
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  view: {
    flexDirection: 'column',
    marginBottom: 40
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormInitialDeposit;

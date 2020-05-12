import React, { Component } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

export class PNFormInputBox extends Component {
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
      invalid = "",
      onFocus,
      onBlur
    } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          {...this.props}
          ref={this.input}
          style={[
            styles.input,
            {
              borderBottomColor: this.state.styles.borderBottomColor,
              borderBottomWidth: this.state.styles.borderBottomWidth
            }
          ]}
          placeholderTextColor='#444444'
          onFocus={() => {
            // Do this.props.onFocus if given
            onFocus && onFocus();
            this.handleOnFocus();
          }}
          onBlur={() => {
            // Do this.props.onBlur if given
            onBlur && onBlur();
            this.handleOnBlur();
          }}
        />
        <Text style={[styles.invalidText]}>{ invalid }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010',
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormInputBox;

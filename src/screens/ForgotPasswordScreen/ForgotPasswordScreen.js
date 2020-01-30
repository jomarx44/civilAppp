import React from "react";

import KeyboardShift from "library/components/CDKeyboardShift.js";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import styles from "styles/commonStyle";

import { ActivityIndicator, View, TextInput, StyleSheet } from "react-native";
import {
  Header,
  Container,
  Button,
  Input,
  Form,
  Label,
  Text
} from "native-base";
import API from "../../actions/api";
import { connect } from "react-redux";

class ForgotPasswordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  onChangeText = text => {
    this.setState({ email: text });
  };

  recoverPassword() {
    return null;
  }

  render() {
    return (
      <Container style={styles.containerBlue}>
        <KeyboardShift>
          {() => (
            <View>
              <Text style={localStyles.text}>
                We will send instructions to your
                <Text
                  style={{
                    color: "#ffffff",
                    textDecorationLine: "underline",
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  email address{" "}
                </Text>
                to reset your password.
              </Text>

              <TextInput
                style={localStyles.textbox}
                placeholder="Enter email"
                value={this.state.email}
                onChangeText={text => this.onChangeText(text)}
              />

              <Button
                full
                style={localStyles.button}
                onPress={() => this.props.forgotPassword(this.state.email)}
              >
                {this.props.auth.is_fetching ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={{ fontWeight: "bold" }}>RESET PASSSWORD</Text>
                )}
                
              </Button>
            </View>
          )}
        </KeyboardShift>
      </Container>
    );
  }
}

let localStyles = StyleSheet.create({
  text: {
    marginLeft: 30,
    marginRight: 30,
    color: "#ffffff",
    marginTop: "40%",
    textAlign: "center"
  },
  textbox: {
    height: 48,
    marginTop: 20,
    marginLeft: 30,
    paddingLeft: 20,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  button: {
    height: 50,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "#f5ac14"
  }
});

const mapStateToProps = (state, props) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: username => {
      dispatch(API.forgotPassword(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

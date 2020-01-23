import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Center,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from "navigation/NavigationService.js";
import styles from "styles/commonStyle";
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNBlueButton from "../../library/components/PNBlueButton";
import PNHeaderBackButtonWhite from "library/components/PNHeaderBackButtonWhite";
import PNHeaderTitleDesc from "../../library/components/PNHeaderTitleDesc";
import { connect } from "react-redux";
import API from "../../actions/api";

class LinkAccount extends React.Component {
  constructor(props) {
    super(props);
    this.input_firstname = React.createRef();
    this.input_middlename = React.createRef();
    this.input_lastname = React.createRef();
    this.input_acctno = React.createRef();
    this.input_birthdate = React.createRef();
    this.input_tin = React.createRef();
  }

  // state = {
  //   acctno: "",
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   date_of_birth: "",
  //   tin: ""
  // };

  state = {
    acctno: "",
    first_name: "marc clemen",
    middle_name: "conejos",
    last_name: "andres",
    date_of_birth: "09/03/1985",
    tin: ""
  };

  static navigationOptions = {
    header: <PNHeaderBackButtonWhite />
  };

  handleChangeText = (text, index) => {
    this.setState({ [index]: text });
  };

  handlePress = () => {
    this.props.checkAccount(this.state);
  };

  render() {
    const {
      acctno,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      tin
    } = this.state;

    const { otp, token } = this.props;

    // if(!otp.isFetching && token.token) {
    //   NavigationService.navigate("OTPScreen")
    // }

    return (
      <KeyboardShift>
        {() => (
          <ScrollView contentContainerStyle={localStyle.container}>
            <View style={localStyle.header}>
              <PNHeaderTitleDesc
                title="Link My Account"
                desc="Please fill in the required fields to link your account."
              />
            </View>
            <View style={{ flex: 4, paddingTop: 30 }}>
              <PNFormTextBox
                title="Acccount Number"
                onChangeText={text => this.handleChangeText(text, "acctno")}
                value={acctno}
                onSubmitEditing={() => this.input_firstname.current.focus()}
                ref={this.input_acctno}
              />
              <PNFormTextBox
                autoCompleteType="name"
                title="First Name"
                onChangeText={text => this.handleChangeText(text, "first_name")}
                value={first_name}
                onSubmitEditing={() => this.input_middlename.current.focus()}
                ref={this.input_firstname}
              />
              <PNFormTextBox
                autoCompleteType="name"
                title="Middle Name"
                onChangeText={text =>
                  this.handleChangeText(text, "middle_name")
                }
                value={middle_name}
                onSubmitEditing={() => this.input_lastname.current.focus()}
                ref={this.input_middlename}
              />
              <PNFormTextBox
                autoCompleteType="name"
                title="Last Name"
                onChangeText={text => this.handleChangeText(text, "last_name")}
                value={last_name}
                onSubmitEditing={() => this.input_birthdate.current.focus()}
                ref={this.input_lastname}
              />
              <PNFormTextBox
                title="Birth Date"
                onChangeText={text =>
                  this.handleChangeText(text, "date_of_birth")
                }
                value={date_of_birth}
                onSubmitEditing={() => this.input_tin.current.focus()}
                ref={this.input_birthdate}
              />
              <PNFormTextBox
                title="TIN"
                keyboardType="number-pad"
                onChangeText={text => this.handleChangeText(text, "tin")}
                value={tin}
                onSubmitEditing={() => this.input_firstname.current.focus()}
                ref={this.input_tin}
              />
              <TouchableOpacity
                style={localStyle.button}
                onPress={() => this.handlePress()}
                disable={otp.isFetching}
              >
                {otp.isFetching ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={localStyle.button_text}>NEXT</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardShift>
    );
  }
}

let localStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 51
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 40,
    backgroundColor: "#309fe7",
    alignItems: "center",
    justifyContent: "center"
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_Medium"
  },
  header: {
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flex: 1
  }
});

const mapStateToProps = (state, props) => {
  const { otp, token } = state;
  return { otp, token };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAccount: account_info => {
      dispatch(API.checkAccount(account_info));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkAccount);

import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";

import KeyboardShift from "library/components/KeyboardShift";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNDatePicker from 'library/components/PNDatePicker';
import PNTitleAndDescription from "library/components/PNTitleAndDescription";
import { connect } from "react-redux";
import API from "../../actions/api";
import validate from "validate.js";

const constraints = {

};

class LinkAccount extends React.Component {
  constructor(props) {
    super(props);
    this.input_firstname = React.createRef();
    this.input_middlename = React.createRef();
    this.input_lastname = React.createRef();
    this.input_acctno = React.createRef();
    this.input_tin = React.createRef();
  }
  
  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
  }

  state = {
    acctno: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: new Date(),
    tin: ""
  };

  handleChangeText = (text, index) => {
    this.setState({ [index]: text });
  };

  handlePress = () => {
    const account = this.state;
    account.date_of_birth = this.getFormattedDate(account.date_of_birth);
    this.props.checkAccount(account);
  };

  handleDateChange = (date) => {
    this.setState({date_of_birth: date});
  }

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

    return (
      <KeyboardShift>
        {() => (
          <ScrollView contentContainerStyle={localStyle.container}>
            <View style={localStyle.header}>
              <PNTitleAndDescription
                title="Link My Account"
                desc="Please fill in the required fields to link your account."
              />
            </View>
            <View style={{ flex: 4, paddingTop: 30 }}>
              <PNFormTextBox
                label="Acccount Number"
                onChangeText={text => this.handleChangeText(text, "acctno")}
                value={acctno}
                onSubmitEditing={() => this.input_firstname.current.focus()}
                ref={this.input_acctno}
              />
              <PNFormTextBox
                autoCompleteType="name"
                label="First Name"
                onChangeText={text => this.handleChangeText(text, "first_name")}
                value={first_name}
                onSubmitEditing={() => this.input_middlename.current.focus()}
                ref={this.input_firstname}
              />
              <PNFormTextBox
                autoCompleteType="name"
                label="Middle Name"
                onChangeText={text =>
                  this.handleChangeText(text, "middle_name")
                }
                value={middle_name}
                onSubmitEditing={() => this.input_lastname.current.focus()}
                ref={this.input_middlename}
              />
              <PNFormTextBox
                autoCompleteType="name"
                label="Last Name"
                onChangeText={text => this.handleChangeText(text, "last_name")}
                value={last_name}
                ref={this.input_lastname}
              />
              <PNDatePicker
                title="Date of Birth"
                placeHolderText="Select Date of Birth"
                defaultDate={date_of_birth}
                onDateChange={this.handleDateChange}
                maximumDate={new Date()}
              />
              <PNFormTextBox
                label="TIN"
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
    fontFamily: "Avenir_Medium"
  },
  header: {
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flex: 1
  }
});

const mapStateToProps = (state, props) => {
  const { otp, token } = state;
  console.log("OTP State: ", otp);
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

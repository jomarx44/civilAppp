import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
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
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNDatePicker from '../../library/components/PNDatePicker';
import PNHeaderBackButtonWhite from "library/components/PNHeaderBackButtonWhite";
import PNHeaderTitleDesc from "../../library/components/PNHeaderTitleDesc";
import { connect } from "react-redux";
import API from "../../actions/api";
import { alertBox } from "../../actions/axiosCalls.js";

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

  componentDidUpdate(prevProps) {
    if(prevProps.otp !== this.props.otp) {
      if(!this.props.otp.isFetching && this.props.otp.success == false) {
        alertBox(this.props.otp.message);
      }
    }
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonWhite />
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

    if(!otp.isFetching && token.token) {
      NavigationService.navigate("OTPScreen")
    }

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

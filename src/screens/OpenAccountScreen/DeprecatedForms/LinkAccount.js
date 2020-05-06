import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

// Custom Components
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNDatePicker from "library/components/PNDatePicker";

import { connect } from "react-redux";
import API from "../../actions/api";
import {
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE,
  CLEAR_TEMPORARY_KEY,
} from "../../actions/types"
import { getFormattedDate } from "../../library/helpers";
import validate from "validate.js";

const constraints = {};

class LinkAccount extends React.Component {
  constructor(props) {
    super(props);
    this.input_firstname = React.createRef();
    this.input_middlename = React.createRef();
    this.input_lastname = React.createRef();
    this.input_acctno = React.createRef();
    this.input_tin = React.createRef();
  }

  state = {
    acctno: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: new Date(),
    tin: "",
  };

  componentDidMount() {
    this.props.initializeReducer();
  }

  handleChangeText = (text, index) => {
    this.setState({ [index]: text });
  };

  handlePress = () => {
    const account = {
      ...this.state,
    };
    account.date_of_birth = getFormattedDate(account.date_of_birth);
    this.props.checkAccount(account);
  };

  handleDateChange = (date) => {
    this.setState({ date_of_birth: date });
  };

  render() {
    const {
      acctno,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      tin,
    } = this.state;

    const { otp } = this.props;

    return (
      <React.Fragment>
        <PNContentWithTitleAndDescription
          title="Link My Account"
          desc="Please fill in the required fields to link your account."
        >
          <PNFormTextBox
            label="Acccount Number"
            onChangeText={(text) => this.handleChangeText(text, "acctno")}
            value={acctno}
            onSubmitEditing={() => this.input_firstname.current.focus()}
            ref={this.input_acctno}
          />
          <PNFormTextBox
            autoCompleteType="name"
            label="First Name"
            onChangeText={(text) => this.handleChangeText(text, "first_name")}
            value={first_name}
            onSubmitEditing={() => this.input_middlename.current.focus()}
            ref={this.input_firstname}
          />
          <PNFormTextBox
            autoCompleteType="name"
            label="Middle Name"
            onChangeText={(text) => this.handleChangeText(text, "middle_name")}
            value={middle_name}
            onSubmitEditing={() => this.input_lastname.current.focus()}
            ref={this.input_middlename}
          />
          <PNFormTextBox
            autoCompleteType="name"
            label="Last Name"
            onChangeText={(text) => this.handleChangeText(text, "last_name")}
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
            onChangeText={(text) => this.handleChangeText(text, "tin")}
            value={tin}
            onSubmitEditing={() => this.input_firstname.current.focus()}
            ref={this.input_tin}
          />
        </PNContentWithTitleAndDescription>
        <FormButtonContainer>
          <PNContainedButton
            onPress={() => this.handlePress()}
            disabled={otp.isFetching}
            label="NEXT"
            loading={otp.isFetching}
          />
        </FormButtonContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({otp}, props) => {
  return { otp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeReducer: () => {
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      });
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      });
      dispatch({
        type: CLEAR_TEMPORARY_KEY
      })
    },
    checkAccount: (account_info) => {
      dispatch(API.checkAccount(account_info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkAccount);

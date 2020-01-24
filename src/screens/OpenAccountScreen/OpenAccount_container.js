import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";

import KeyboardShift from "library/components/CDKeyboardShift.js";
class OpenAccountContainer extends Component {
  render() {
    return(

    );
  }
}

const mapStateToProps = (state, props) => {
  const {  } = state;
  return { otp, token };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAccount: account_info => {
      dispatch(API.checkAccount(account_info));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAccount);


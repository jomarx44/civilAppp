import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import KeyboardShift from "library/components/KeyboardShift";
import OpenAccountLayout from "./OpenAccount_layout";

class OpenAccountContainer extends Component {
  render() {
    return (
      <OpenAccountLayout
        header
      >

      </OpenAccountLayout>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAccount);

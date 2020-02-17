import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

// Custom Components
import KeyboardShift from "library/components/CDKeyboardShift.js";
import PNHeaderTitleDesc from "library/components/PNHeaderTitleDesc";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormButton from "library/components/PNFormButton";

// API
import { loan } from "../../actions/api";

export class LoanAccount extends Component {
  constructor(props) {
    super(props);
    this.input_amount = React.createRef();
    this.input_perCutOff = React.createRef();
    this.input_months = React.createRef();
  }

  state = {
    amount: "",
    perCutOff: "",
    months: ""
  };

  handlePress = () => {
    this.props.loan(this.state);
  };

  handleEvents = (eventType, params = {}) => {
    switch (eventType) {
      case "onChangeText":
        this.setState({ [params.index]: params.value });
        break;
      case "onChangeAmountPerCutOff":
        // Change State of Per Cut Off
        // Recompute the needed months to pay
        break;
      case "onChangeMonths":
        // Change State of Months
        // Recompute the amount of Per Cut Off
        break;
      default:
        break;
    }
  };

  render() {
    const { amount, perCutOff, months } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={styles.header}>
              <PNHeaderTitleDesc
                title="Loan Money"
                desc="Please provide the required field with appropriate values."
              />
            </View>
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
            >
              <PNFormInputBox
                placeholder="Loan Amount"
                onChangeText={text =>
                  this.handleEvents("onChangeText", {
                    value: text,
                    index: "amount"
                  })
                }
                value={amount}
                reference={input => {
                  this.input_amount = input;
                }}
              />
              <PNFormInputBox
                placeholder="Amount per Cut Off"
                onChangeText={text =>
                  this.handleEvents("onChangeAmountPerCutOff", {
                    value: text,
                    index: "perCutOff"
                  })
                }
                value={perCutOff}
                reference={input => {
                  this.input_perCutOff = input;
                }}
              />
              <PNFormInputBox
                placeholder="Months"
                onChangeText={text =>
                  this.handleEvents("onChangeMonths", {
                    value: text,
                    index: "months"
                  })
                }
                value={months}
                reference={input => {
                  this.input_months = input;
                }}
              />
              <PNFormButton onPress={() => {}} disabled={true} label="Lol" />
            </ScrollView>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  content: {},
  contentContainer: {}
});

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    loan: payload => {
      dispatch(loan(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanAccount);

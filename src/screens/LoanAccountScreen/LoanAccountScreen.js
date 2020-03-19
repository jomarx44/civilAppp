import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

// Custom Components
import KeyboardShift from "library/components/KeyboardShift";
import PNTitleAndDescription from "library/components/PNTitleAndDescription";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNFormButton from "library/components/PNFormButton";

// API
import API from "../../actions/api";

// Others
// import Validate from "validate.js";
import validate from "validate.js";
import * as Profile from "../../store/profile";

let constraints = {
  amount: {
    presence: {
      allowEmpty: false
    },
    numericality: {
      strict: true
    }
  },
  perCutOff: {
    presence: {
      allowEmpty: false
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notLessThanOrEqualTo: "must be lesser or equal to Loan Amount"
    }
  },
  months: {
    presence: {
      allowEmpty: false
    },
    numericality: {
      strict: true
    }
  }
};

export class LoanAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.input_amount = React.createRef();
    this.input_perCutOff = React.createRef();
    this.input_months = React.createRef();
  }

  // To be added
  state = {
    data: {
      user_id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      amount: "",
      perCutOff: "",
      months: ""
    },
    invalid: {}
  };

  // To be added
  componentDidMount = async () => {
    let profile = await Profile.getProfileData();
    console.log("Profile: ", profile);
    const { id } = profile.identities[0];
    const {
      givenName,
      middleName,
      familyName
    } = profile.identities[0].idpUserInfo.name;
    this.setState((state, props) => ({
      ...state,
      data: {
        ...state.data,
        user_id: id,
        firstName: givenName,
        middleName: middleName,
        lastName: familyName
      }
    }));
  };

  // Set Invalid
  setInvalid = invalid => {
    this.setState({
      invalid: invalid
    });
  };

  handlePress = () => {
    // console.log("State: ", this.state);
    constraints.perCutOff.numericality.lessThanOrEqualTo = parseFloat(
      this.state.data.amount
    );
    console.log("NEW CONSTRAINTS: ", constraints);
    const invalid = validate(this.state.data, constraints);
    if (!invalid) {
      this.props.loan(this.state);
    } else {
      this.setInvalid(invalid);
      console.log("INVALID: ", invalid);
    }
  };

  // To be added
  handleEvents = (eventType, params = {}) => {
    // Mutable Data, need to destructure state to avoid changing the state
    let { amount, perCutOff, months } = this.state.data;
    let invalid = {};
    switch (eventType) {
      case "onChangeText":
        this.setState((state, props) => ({
          ...state,
          data: {
            ...state.data,
            [params.index]: params.value
          }
        }));
        break;

      case "onBlur":
        let {} = params;
        invalid = validate({ perCutOff: perCutOff }, constraints);
        if (invalid) {
          this.setState(
            (state) => ({
              ...state,
              invalid: {
                ...state.invalid,
                ...invalid
              }
            }),
            () => console.log("Invalid State: ", this.state.invalid)
          );
        } else {
          const { invalid } = this.state;
          delete invalid[params.index];
          this.setState(state => ({
            ...state,
            invalid
          }));
        }
        break;

      case "onBlurAmountPerCutOff":
        if (perCutOff && amount) {
          invalid = validate({ perCutOff: perCutOff }, constraints);
          if (!invalid) {
            // Compute the needed months to pay
            amount = parseFloat(amount);
            perCutOff = parseFloat(perCutOff);
            const computedMonths = Math.ceil(amount / perCutOff);
            // Change State of Per Cut Off
            this.setState((state, props) => ({
              ...state,
              data: { ...state.data, months: computedMonths.toString() }
            }));
          } else {
            this.setInvalid(invalid);
          }
        }
        break;

      case "onBlurMonths":
        if (months && amount) {
          invalid = validate({ perCutOff: perCutOff }, constraints);
          if (!invalid) {
            // Compute the amount of Per Cut Off
            amount = parseFloat(amount);
            months = parseFloat(months);
            const computedPerCutOff = amount / months;
            // Change State of Months
            this.setState({ perCutOff: computedPerCutOff.toString() });
          } else {
            this.setInvalid(invalid);
          }
        }
        break;

      default:
        break;
    }
  };

  render() {
    const {
      data: { amount, perCutOff, months },
      invalid
    } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={styles.header}>
              <PNTitleAndDescription
                title="Loan Money"
                desc="Please provide the required field with appropriate values."
              />
            </View>
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
            >
              {/* To be added (All input fields and buttons) */}
              <PNFormTextBox
                title="Loan Amount"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  this.handleEvents("onChangeText", {
                    value: text,
                    index: "amount"
                  })
                }
                ref={this.input_amount}
                onSubmitEditing={() => this.input_perCutOff.current.focus()}
                // onBlur={() => this.handleOnBlur("givenName")}
                invalid={invalid.amount ? invalid.amount[0] : ""}
                value={amount}
              />

              <PNFormTextBox
                title="Amount per Cut Off"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  this.handleEvents("onChangeText", {
                    value: text,
                    index: "perCutOff"
                  })
                }
                ref={this.input_perCutOff}
                onSubmitEditing={() => this.input_months.current.focus()}
                onBlur={() => {
                  this.handleEvents("onBlurAmountPerCutOff");
                }}
                invalid={invalid.perCutOff ? invalid.perCutOff[0] : ""}
                value={perCutOff}
              />

              <PNFormTextBox
                title="Months"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  this.handleEvents("onChangeText", {
                    value: text,
                    index: "months"
                  })
                }
                ref={this.input_months}
                // onSubmitEditing={() => this.input_middleName.current.focus()}
                onBlur={() => {
                  this.handleEvents("onBlurMonths");
                }}
                invalid={invalid.months ? invalid.months[0] : ""}
                value={months}
              />

              <PNFormButton
                onPress={() => {
                  this.handlePress();
                }}
                disabled={this.props.is_fetching}
                label="Save"
                loading={this.props.is_fetching}
              />
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
    flexDirection: "column",
    padding: 25
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  content: {},
  contentContainer: {}
});

// To be added
const mapStateToProps = state => {
  const { loader } = state;
  return {
    ...loader.payload
  };
};

// To be added
const mapDispatchToProps = dispatch => {
  return {
    loan: payload => {
      dispatch(API.loan(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanAccountScreen);

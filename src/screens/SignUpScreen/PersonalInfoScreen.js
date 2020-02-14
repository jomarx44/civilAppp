import React from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import { Button, Text } from "native-base";

import KeyboardShift from "library/components/CDKeyboardShift.js";
import * as Profile from "../../store/profile";
import NavigationService from "navigation/NavigationService.js";
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNFormTextBoxPhoneNumber from "../../library/components/PNFormTextBox-PhoneNumber";
import PNFormTextBoxMasked from "../../library/components/PNFormTextBoxMasked";
import PNHeaderBackButtonWhite from "library/components/PNHeaderBackButtonWhite";
import PNHeaderTitleDesc from "library/components/PNHeaderTitleDesc";
import { connect } from "react-redux";
import API from "actions/api";
import {
  addAttributes,
  putAttributes,
  requestUniqueId
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  email: {
    presence: {
      allowEmpty: false
    },
    email: {
      message: "This doesn't look like a valid email"
    }
  },
  password: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 8,
      message: "must be atleast 8 characters"
    }
  },
  confirmPassword: {
    presence: {
      allowEmpty: false
    },
    equality: {
      attribute: "password",
      message: "and Password did not matched."
    }
  },
  givenName: {
    presence: {
      allowEmpty: false
    }
  },
  familyName: {
    presence: {
      allowEmpty: false
    }
  },
  phoneNumber: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 10,
      message: "is not valid"
    }
  }
};

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        givenName: "",
        middleName: "",
        familyName: "",
        phoneNumber: ""
      },
      invalid: {
        password: true
      }
    };

    this.input_email = React.createRef();
    this.input_password = React.createRef();
    this.input_confirmPassword = React.createRef();
    this.input_givenName = React.createRef();
    this.input_middleName = React.createRef();
    this.input_familyName = React.createRef();
    this.input_phoneNumber = React.createRef();
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonWhite />
  };

  onChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;
    
    this.setState({ user: user });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.response.success &&
      this.props.response.action === "signup"
    ) {
      // save the data
      if (
        this.props.response.meta &&
        this.props.response.meta.resourceType &&
        this.props.response.meta.resourceType === "User"
      ) {
        Profile.setSignUpData(this.props.response);
      }
    }
  }

  handleOnBlur = (index, additionalValidate = {}) => {
    const current = {
      ...additionalValidate,
      [index]: this.state.user[index]
    };
    console.log("Current: ", current);
    const invalid = validate(current, { [index]: constraints[index] });
    if (invalid) {
      this.setState(
        {
          ...this.state,
          invalid: {
            ...this.state.invalid,
            ...invalid
          }
        },
        () => console.log("Invalid State: ", this.state.invalid)
      );
    } else {
      const { invalid } = this.state;
      delete invalid[index];
      this.setState({
        ...this.state,
        invalid
      });
    }
  };

  handleBlurPhone = (index) => {
    console.log(parseInt(this.state.user.phoneNumber, 10).toString());
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        phoneNumber: this.state.user.phoneNumber ? parseInt(this.state.user.phoneNumber.toString(), 10) : ''
      }
    }, () => {
      console.log(this.state.user.phoneNumber)
      this.handleOnBlur(index)
    });
  }

  signup() {
    // Add Validation
    const invalid = validate(this.state.user, constraints);
    
    if (!invalid) {
      const user = { ...this.state.user };
      user.phoneNumber = '63' + user.phoneNumber;
      console.log("USER: ", user);
      Profile.setFormData(user);
      this.props.signup(user);
    } else {
      this.setState({
        invalid: invalid
      });
    }
  }

  render() {
    let { height, width } = Dimensions.get("window");
    const { user, invalid } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={localStyle.container}>
            <View style={localStyle.header}>
              <PNHeaderTitleDesc
                title="Create Account"
                desc="To verify your identity, please fill in personal information."
              />
            </View>
            <View style={{ flex: 4, paddingTop: 30 }}>
              <PNFormTextBox
                title="First Name"
                onChangeText={text => {
                  this.onChangeText(text, "givenName");
                }}
                ref={this.input_givenName}
                onSubmitEditing={() => this.input_middleName.current.focus()}
                onBlur={() => this.handleOnBlur("givenName")}
                invalid={invalid.givenName ? invalid.givenName[0] : ""}
                value={this.state.user.givenName}
              />
              <PNFormTextBox
                title="Middle Name"
                onChangeText={text => this.onChangeText(text, "middleName")}
                ref={this.input_middleName}
                onSubmitEditing={() => this.input_familyName.current.focus()}
                value={this.state.user.middleName}
              />

              <PNFormTextBox
                title="Last Name"
                onChangeText={text => this.onChangeText(text, "familyName")}
                ref={this.input_familyName}
                onSubmitEditing={() => this.input_email.current.focus()}
                onBlur={() => this.handleOnBlur("familyName")}
                invalid={invalid.familyName ? invalid.familyName[0] : ""}
                value={this.state.user.familyName}
              />

              <PNFormTextBox
                title="Email Address"
                onChangeText={text => this.onChangeText(text, "email")}
                ref={this.input_email}
                onBlur={() => this.handleOnBlur("email")}
                onSubmitEditing={() => this.input_phoneNumber.current.focus()}
                invalid={invalid.email ? invalid.email[0] : ""}
                value={this.state.user.email}
              />

              <PNFormTextBoxPhoneNumber
                title="Mobile Number"
                onChangeText={text => this.onChangeText(text, "phoneNumber")}
                ref={this.input_phoneNumber}
                onSubmitEditing={() => this.input_password.current.focus()}
                maxLength={10}
                value={this.state.user.phoneNumber}
                onBlur={() => this.handleOnBlur("phoneNumber")}
                invalid={invalid.phoneNumber ? invalid.phoneNumber[0] : ""}
              />

              <PNFormTextBox
                title="Password"
                password={true}
                onChangeText={text => this.onChangeText(text, "password")}
                ref={this.input_password}
                onSubmitEditing={() =>
                  this.input_confirmPassword.current.focus()
                }
                onBlur={() => this.handleOnBlur("password")}
                invalid={invalid.password ? invalid.password[0] : ""}
                value={this.state.user.password}
              />

              <PNFormTextBox
                title="Confirm Password"
                password={true}
                onChangeText={text =>
                  this.onChangeText(text, "confirmPassword")
                }
                ref={this.input_confirmPassword}
                onBlur={() => this.handleOnBlur("confirmPassword", { password: this.state.user.password })}
                invalid={
                  invalid.confirmPassword ? invalid.confirmPassword[0] : ""
                }
                editable={!this.state.invalid.password}
                value={this.state.user.confirmPassword}
              />
            </View>
            <View style={{ flex: 1, paddingBottom: 100 }}>
              <Button
                full
                primary
                // disabled={}
                style={localStyle.button}
                onPress={() => this.signup()}
              >
                {this.props.response.is_fetching ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text>NEXT</Text>
                )}
              </Button>
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
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: "#FFFFFF"
  },
  button: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#309fe7"
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  textbox: {
    height: 48,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});

const mapStateToProps = state => {
  return {
    response: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: userdata => {
      dispatch(API.signup(userdata));
    },
    addAttributes: attributes => {
      dispatch(addAttributes(attributes));
    },
    putAttributes: params => {
      dispatch(putAttributes(params));
    },
    requestUniqueId: attributes => {
      dispatch(requestUniqueId(attributes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

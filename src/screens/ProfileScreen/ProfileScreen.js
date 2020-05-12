// To be added
import React, { Component } from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

// Custom Component
import KeyboardShift from "library/components/CDKeyboardShift.js";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNFormTextBoxPhoneNumber from "library/components/PNFormTextBox-PhoneNumber";
import PNHeaderNoLogo from "library/components/PNHeaderNoLogo.js";
import PNHeaderTitleDesc from "library/components/PNHeaderTitleDesc";

// Others
import validate from "validate.js";

import API from "../../actions/api";

const constraints = {
  email: {
    presence: {
      allowEmpty: false
    },
    email: {
      message: "This doesn't look like a valid email"
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

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.input_givenName = React.createRef();
    this.input_middleName = React.createRef();
    this.input_familyName = React.createRef();
    this.input_email = React.createRef();
    this.input_phoneNumber = React.createRef();
  }

  state = {
    user: {
      id: "",
      givenName: "",
      middleName: "",
      familyName: "",
      email: "",
      phoneNumber: ""
    },
    invalid: {},
    isEditMode: false
  };

  static navigationOptions = {
    header: <PNHeaderNoLogo title="My Profile" />
  };

  componentDidMount = async () => {
    let profile = await AsyncStorage.getItem("PROFILE_DATA");
    profile = JSON.parse(profile);
    console.log("PROFILE: ", profile);
    const { id } = profile.identities[0].idpUserInfo;
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        id
      }
    }));
    this.props.getProfile({ id });
  };

  componentDidUpdate = () => {};

  handleChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;

    this.setState({ user: user });
  };

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

  handleBlurPhone = index => {
    // console.log(parseInt(this.state.user.phoneNumber, 10).toString());
    this.setState(
      {
        ...this.state,
        user: {
          ...this.state.user,
          phoneNumber: this.state.user.phoneNumber
            ? parseInt(this.state.user.phoneNumber.toString(), 10)
            : ""
        }
      },
      () => {
        // console.log(user.phoneNumber)
        this.handleOnBlur(index);
      }
    );
  };

  handleSubmit = () => {
    // Add Validation
    const invalid = validate(this.state.user, constraints);

    if (!invalid) {
      const user = { ...this.state.user };
      user.phoneNumber = "63" + user.phoneNumber;
      this.props.saveProfile(user);
    } else {
      this.setState({
        invalid: invalid
      });
    }
  };

  handleToggleEditMode = () =>
    this.setState(state => ({ isEditMode: !state.isEditMode }));

  render() {
    const { invalid, user, isEditMode } = this.state;
    const { profile, getProfile } = this.props;

    return (
      <KeyboardShift>
        {() => (
          <React.Fragment>
          <ScrollView
            contentContainerStyle={styles.container}
            persistentScrollbar={true}
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                refreshing={profile.isFetching}
                onRefresh={() => getProfile({id: this.state.user.id})}
                progressBackgroundColor="#ffffff"
              />
            }
          >
            <View style={styles.header}>
              <PNHeaderTitleDesc title="Profile" />
            </View>
            <View style={{ flex: 4, paddingTop: 30 }}>
              <PNFormTextBox
                title="First Name"
                onChangeText={text => this.handleChangeText(text, "givenName")}
                ref={this.input_givenName}
                onSubmitEditing={() => this.input_middleName.current.focus()}
                onBlur={() => this.handleOnBlur("givenName")}
                invalid={invalid.givenName ? invalid.givenName[0] : ""}
                editable={isEditMode}
                value={user.givenName}
              />

              <PNFormTextBox
                title="Middle Name"
                onChangeText={text => this.handleChangeText(text, "middleName")}
                ref={this.input_middleName}
                onSubmitEditing={() => this.input_familyName.current.focus()}
                editable={isEditMode}
                value={user.middleName}
              />

              <PNFormTextBox
                title="Last Name"
                onChangeText={text => this.handleChangeText(text, "familyName")}
                ref={this.input_familyName}
                onSubmitEditing={() => this.input_email.current.focus()}
                onBlur={() => this.handleOnBlur("familyName")}
                invalid={invalid.familyName ? invalid.familyName[0] : ""}
                editable={isEditMode}
                value={user.familyName}
              />

              <PNFormTextBox
                title="Email Address"
                onChangeText={text => this.handleChangeText(text, "email")}
                ref={this.input_email}
                onBlur={() => this.handleOnBlur("email")}
                onSubmitEditing={() => this.input_phoneNumber.current.focus()}
                invalid={invalid.email ? invalid.email[0] : ""}
                editable={isEditMode}
                value={user.email}
              />

              <PNFormTextBoxPhoneNumber
                title="Mobile Number"
                onChangeText={text =>
                  this.handleChangeText(text, "phoneNumber")
                }
                ref={this.input_phoneNumber}
                // onSubmitEditing={() => this.input_password.current.focus()}
                maxLength={10}
                value={user.phoneNumber}
                onBlur={() => this.handleOnBlur("phoneNumber")}
                invalid={invalid.phoneNumber ? invalid.phoneNumber[0] : ""}
                editable={isEditMode}
              />
            </View>
          </ScrollView>
          <View style={{padding: 20}}>
            {!isEditMode ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.handleToggleEditMode();
                }}
                disable={false}
              >
                {profile.isUpdating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.button_text}>Edit Profile</Text>
                )}
              </TouchableOpacity>
            ) : (
              <React.Fragment>
                <TouchableOpacity
                  style={[styles.button, {marginBottom: 10}]}
                  onPress={() => this.handleSubmit()}
                  disable={profile.isUpdating}
                >
                  {profile.isUpdating ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.button_text}>Save Changes</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: "transparent"}]}
                  onPress={() => {
                    this.handleToggleEditMode();
                  }}
                >
                  <Text style={[styles.button_text, {color: "red"}]}>Cancel</Text>
                </TouchableOpacity>
              </React.Fragment>
              
            )}
          </View>
          </React.Fragment >
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: "#FFFFFF"
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#f9a010",
    alignItems: "center",
    justifyContent: "center"
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Avenir_Medium"
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
  const { profile } = state;
  return {
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: payload => {
      dispatch(API.saveProfile(payload));
    },
    getProfile: payload => {
      dispatch(API.getProfile(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

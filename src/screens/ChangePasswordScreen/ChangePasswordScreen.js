import React, { useState } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

// Custom Components
import PNFormTextBox from "library/components/PNFormTextBox";
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNFormButton from "library/components/PNFormButton";

// Others
import { connect } from "react-redux";
import API from "../../actions/api";

const constraints = {
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
  }
};

export const ChangePasswordScreen = ({ profile, changeUserDetail }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalids, setInvalids] = useState({});

  const handlePress = () => {
    console.log("Profile Data: ", profile);
    const { id, emails, phoneNumbers, name } = profile.data;
    changeUserDetail({
      id,
      emails,
      phoneNumbers,
      userName: emails[0].value,
      password: newPassword,
      name
    });
  };

  return (
    <PNContentWithTitleAndDescription title="Change Password" desc="">
      {/* <PNFormTextBox 
        title="Old Password"
        onChangeText={text => setOldPassword(text)}
        value={oldPassword}
        secureTextEntry={true}
        // onSubmitEditing={() => this.input_middlename.current.focus()}
        // ref={this.input_firstname}
      /> */}
      <PNFormTextBox
        title="New Password"
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        secureTextEntry={true}
        // onSubmitEditing={() => this.input_middlename.current.focus()}
        // ref={this.input_firstname}
      />
      <PNFormTextBox
        title="Confirm Password"
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
        // onSubmitEditing={() => this.input_middlename.current.focus()}
        // ref={this.input_firstname}
      />
      <PNFormButton
        onPress={() => {
          handlePress();
        }}
        // disabled={this.props.is_fetching}
        label="Save"
        // loading={this.props.is_fetching}
      />
    </PNContentWithTitleAndDescription>
  );
};

ChangePasswordScreen.propTypes = {};

const mapStateToProps = state => {
  console.log();
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserDetail: payload => {
      dispatch(API.changeUserDetail(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordScreen);

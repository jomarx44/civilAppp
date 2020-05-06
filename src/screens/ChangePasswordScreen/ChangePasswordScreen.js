import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, View, Text } from "react-native";
import PropTypes from "prop-types";

// Custom Components
import PNFormTextBox from "library/components/PNFormTextBox";
// import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNContentWithTitle from "../../library/Layout/Content/PNContentWithTitle"
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer"
import PNContainedButton from "library/components/Buttons/PNContainedButton";

// Others
import { connect } from "react-redux";
import API from "../../actions/api";
import { UPDATE_PROFILE_INITIALIZE } from "../../actions/types";
import validate from "validate.js";
import Modal from "react-native-modal";

const constraints = {
  password: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 8,
      message: "must be atleast 8 characters",
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
    },
    equality: {
      attribute: "password",
      message: "and Password did not matched.",
    },
  },
};

export const ChangePasswordScreen = ({
  profile,
  updateUserInformation,
  navigation,
  initializeReducers,
  getProfile,
}) => {
  const [passwords, setPasswords] = useState({});
  const [invalids, setInvalids] = useState({});

  const input_password = useRef();
  const input_confirmPassword = useRef();

  useEffect(() => {
    if (profile.isUpdated === true) {
      Alert.alert(
        "Change Mobile Number",
        "Password was successfully changed.",
        [
          {
            text: "Ok",
            onPress: () => {
              initializeReducers();
              // getProfile(profile.data.sub);
              navigation.navigate("ViewProfile");
            },
          },
        ]
      );
    }
  }, [profile.isUpdated]);

  const handlePress = () => {
    const currentInvalids = validate(passwords, constraints);
    if (!currentInvalids) {
      const { id, emails, phoneNumbers, name } = profile.data;
      updateUserInformation({
        id,
        emails,
        phoneNumbers,
        userName: emails[0].value,
        password: passwords.password,
        name,
      });
    } else {
      setInvalids(currentInvalids);
    }
  };

  const handleOnBlur = (index, additionalValidate = {}) => {
    const invalid = validate(
      {
        ...additionalValidate,
        [index]: passwords[index],
      },
      {
        [index]: constraints[index],
      }
    );

    if (invalid) {
      // Add invalid
      setInvalids({
        ...invalids,
        ...invalid,
      });
    } else {
      // Then remove the invalid message on selected index
      const temporary_invalids = {
        ...invalids,
      };
      delete temporary_invalids[index];
      setInvalids(temporary_invalids);
    }
  };

  return (
    <React.Fragment>
      <PNContentWithTitle
        title="Change Password"
        // desc=""
        // containerStyle={{ backgroundColor: "#F7F7F7" }}
      >
        <PNFormTextBox
          label="New Password"
          onChangeText={(text) =>
            setPasswords({ ...passwords, password: text })
          }
          value={passwords.password}
          password={true}
          onSubmitEditing={() => input_confirmPassword.current.focus()}
          ref={input_password}
          onBlur={() => handleOnBlur("password")}
          invalid={invalids.password ? invalids.password[0] : ""}
        />
        <PNFormTextBox
          label="Confirm Password"
          onChangeText={(text) =>
            setPasswords({ ...passwords, confirmPassword: text })
          }
          value={passwords.confirmPassword}
          password={true}
          onSubmitEditing={() => handlePress()}
          ref={input_confirmPassword}
          onBlur={() =>
            handleOnBlur("confirmPassword", { password: passwords.password })
          }
          invalid={invalids.confirmPassword ? invalids.confirmPassword[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNContainedButton
          buttonStyle={{ marginTop: 30 }}
          onPress={() => handlePress()}
          disabled={profile.isUpdating}
          label="Save"
          loading={profile.isUpdating}
        />
      </FormButtonContainer>
      <Modal isVisible={profile.isUpdating}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator color="#FFF" size="large" />
          <Text style={{ color: "white" }}>Saving...</Text>
        </View>
      </Modal>
    </React.Fragment>
  );
};

ChangePasswordScreen.propTypes = {};

const mapStateToProps = ({profile}) => {
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInformation: (payload) => {
      dispatch(API.updateUserInformation(payload));
    },
    initializeReducers: () => {
      dispatch({
        type: UPDATE_PROFILE_INITIALIZE,
      });
    },
    getProfile: (id) => {
      dispatch(API.getProfile({ id }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordScreen);

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { CreateMobileAccount } from "./CreateMobileAccount";
import { config } from "./config";
import validate from "validate.js";
import { user } from "../../API";
import { SignupDataAsyncStorage } from "../../helpers/asyncStorage";
import { addCreatedUser } from "../../redux/user/actions";

export const CreateMobileAccountContainer = (props) => {
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    givenName: null,
    middleName: null,
    familyName: null,
    phoneNumber: null,
    phoneCode: "+63",
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);

  const { navigation, addCreatedUser } = props;

  const handleChange = (index, value) => {
    setFormData({
      ...formData,
      [index]: value,
    });
  };

  const handleBlur = (index, additionalValidate = {}) => {
    const current = {
      ...additionalValidate,
      [index]: formData[index],
    };

    const invalid = validate(current, { [index]: config.constraints[index] });
    if (invalid) {
      setInvalids({
        ...invalids,
        ...invalid,
      });
    } else {
      const newInvalids = { ...invalids };
      delete newInvalids[index];
      setInvalids(newInvalids);
    }
  };

  const handleSubmit = () => {
    const invalid = validate(formData, config.constraints);
    if (invalid) {
      setInvalids(invalid);
    } else {
      setSubmittingStatus(true);
      user
        .create(formData)
        .then(({ data }) => {
          if (data.success) {
            const signupData = {
              id: data.id,
              email: formData.email,
              givenName: formData.givenName,
              middleName: formData.middleName,
              familyName: formData.familyName,
              phoneNumber: formData.phoneNumber,
            };
            SignupDataAsyncStorage.set(JSON.stringify(signupData)).then(() => {
              addCreatedUser(signupData);
              navigation.navigate("EmailConfirmation");
            });
          } else if (data.log_error) {
            const { detail } = JSON.parse(data.log_error);
            Alert.alert("Creating Mobile Account Failed", detail);
          }
        })
        .catch((error) => {
          Alert.alert(
            "Server Error",
            "Ooops! There's something wrong connecting to the server. Please try again."
          );
        })
        .finally(() => {
          setSubmittingStatus(false);
        });
    }
  };

  return (
    <CreateMobileAccount
      invalids={invalids}
      data={formData}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = (state) => () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCreatedUser: (user) => dispatch(addCreatedUser(user)),
  };
};

CreateMobileAccountContainer.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMobileAccountContainer);

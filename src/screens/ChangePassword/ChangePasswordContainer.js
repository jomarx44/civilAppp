import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native"
import { connect } from "react-redux";
import validate from "validate.js";

// Form Component
import { ChangePassword } from "./ChangePassword";

// Custom Component Here

// Others
import { config } from "./config";
import { profile, user as userAPI } from "../../API"

export const ChangePasswordContainer = (props) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);
  const { auth, user, navigation, route: { params } } = props;

  useEffect(() => {
    if (params?.formData) {
      setFormData((currentState) => ({
        ...currentState,
        ...params?.formData,
      }));
    }
  }, [params?.formData]);

  /**
   * Handle Blur Event Listener
   * @description Used for validating inputs when onBlur event is triggered
   * @param {String} index formData index
   * @param {Object} additionalValidation Additional data for validation (used for Equality Validation)
   */
  const handleBlur = (index, additionalValidation = {}) => {
    if(!config.validate) {
      return true;
    }

    let newInvalids = {};

    if (__DEV__) {
      // Warn the user if the given index doesn't exist in [formData] state
      if (!formData[index] === undefined) {
        console.warn(`'${index}' index is not found in [formData] state.`);
      }

      // Warn the user if there's no Validation Constraints to the specified index
      if (!config.constraints[index]) {
        console.warn(
          `There are no Validation Constraints for '${index}' form data index.`
        );
      }
    }

    const toBeValidated = {
      ...additionalValidation,
      [index]: formData[index],
    };

    const invalid = handleValidate(toBeValidated, {
      [index]: config.constraints[index],
    });

    if (!invalid) {
      // Remove the specified index from [invalids] state
      newInvalids = { ...invalids };
      delete newInvalids[index];
    } else {
      // Add [invalid] to [invalids] state
      newInvalids = {
        ...invalids,
        ...invalid,
      };
    }

    // Set new Invalids as [invalids] state
    setInvalids(newInvalids);

    // Return New Invalids
    return newInvalids;
  };

  const handleChange = (index, value) => {
    setFormData((currentState) => ({
      ...currentState,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate
    const invalid = handleValidate(formData, config.constraints);
    if(invalid) {
      setInvalids(invalid)
    } else {  
      setSubmittingStatus(true);
      // Submit
      handleSavePassword()
    }
  };

  const handleSavePassword = () => {
    const userData = {
      id: user.info.id,
      emails: user.info.emails,
      name: {
        familyName: user.info.lastName,
        givenName: user.info.firstName,
        middleName: user.info.middleName
      },
      password: formData.password
    };
    userAPI.update(userData)
      .then(({data: { success, status, detail, ...data }}) => {
        if(status === "CONFIRMED") {
          Alert.alert(
            "Change Password",
            "Your password was successfully changed.",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ViewProfile", { reload: true }),
              },
            ]
          );
        } else {
          Alert.alert(
            "Change Password",
            detail,
            [
              {
                text: "Retry",
                onPress: () => handleSavePassword(),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      })
      .finally(() => setSubmittingStatus(false));
  }

  const handleValidate = (data = {}, constraints = {}) => {
    if(!config.validate) {
      return false;
    }
    
    const invalid = validate(data, constraints);
    // Do additional invalid data processing here
    return invalid;
  };

  return (
    <ChangePassword
      data={formData}
      invalids={invalids}
      isSubmitting={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

ChangePasswordContainer.propTypes = {};

const mapStateToProps = (state) => () => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);

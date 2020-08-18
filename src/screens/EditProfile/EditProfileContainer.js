import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { connect } from "react-redux";
import validate from "validate.js";

// Form Component
import { EditProfile } from "./EditProfile";

// Custom Component Here

// Others
import { config } from "./config";
import { profile as profileAPI } from "../../API";

export const EditProfileContainer = (props) => {
  const {
    auth,
    profile: {
      attributes,
    },
    user,
    navigation,
    route: { params },
  } = props;
  const [formData, setFormData] = useState({
    firstName: attributes?.name?.firstName ? attributes?.name?.firstName : user.info.firstName,
    middleName: attributes?.name?.middleName ? attributes?.name?.middleName : user.info.middleName,
    lastName: attributes?.name?.lastName ? attributes?.name?.lastName : user.info.lastName,
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);

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
    if (!config.validate) {
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
    if (invalid) {
      setInvalids(invalid);
    } else {
      handleSaveProfile();
    }
  };

  const handleSaveProfile = () => {
    setSubmittingStatus(true);
    // Submit
    profileAPI
      .addAttribute({
        accessToken: auth.accessToken,
        attributeName: "name",
        attributeValue: formData,
      })
      .then(({ data: { success, message } }) => {
        if (success) {
          Alert.alert("Edit Profile", "Your profile was successfully updated", [
            {
              text: "Ok",
              onPress: () => navigation.navigate("ViewProfile", { reload: true }),
            },
          ]);
        } else {
          Alert.alert("Edit Profile", "Failed while updating profile.", [
            {
              text: "Retry",
              onPress: () => handleSaveProfile(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        }
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      })
      .finally(() => setSubmittingStatus(false));
  };

  const handleValidate = (data = {}, constraints = {}) => {
    if (!config.validate) {
      return false;
    }

    const invalid = validate(data, constraints);
    // Do additional invalid data processing here
    return invalid;
  };

  return (
    <EditProfile
      data={formData}
      invalids={invalids}
      isSubmitting={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

EditProfileContainer.propTypes = {};

const mapStateToProps = (state) => () => {
  return {
    auth: state.auth,
    user: state.user,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileContainer);

import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validate from "validate.js";

// Form Component
import { LinkAccount } from "./LinkAccount";

// Custom Component Here

// Others
import { config } from "./config";
import { CIS } from "../../API";
import { getFormattedDate } from "../../library/helpers";


export const LinkAccountContainer = (props) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: new Date(),
    tin: "",
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);
  const {
    navigation,
    route: { params },
  } = props;

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
      setSubmittingStatus(true);
      // Submit
      CIS.check({...formData, birthDate: getFormattedDate(formData.birthDate)})
        .then(({ data: {data} }) => {
          const {
            ErrorMsg: errorMessage,
            ReturnCode: returnCode,
            token,
          } = data["Register.Info"];
          if (token) {
            navigation.navigate("OTPLinkAccount", { token });
          } else {
            Alert.alert("Link Account failed", errorMessage);
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
    <LinkAccount
      data={formData}
      invalids={invalids}
      isSubmitting={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

LinkAccountContainer.propTypes = {};

const mapStateToProps = (state) => () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkAccountContainer);

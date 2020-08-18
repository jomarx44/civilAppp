import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validate from "validate.js";

// Form Component
import { ChangeMobileNumber } from "./ChangeMobileNumber";

// Others
import { config } from "./config";

export const ChangeMobileNumberContainer = (props) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    phoneCode: "+63"
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);
  const { navigation, route: { params } } = props;

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
      if (formData[index] === undefined) {
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
      navigation.navigate("OTPChangeMobileNumber", {
        formData
      });
    }
  };

  const handleValidate = (data = {}, constraints = {}) => {
    if(!config.validate) {
      return false;
    }
    
    const invalid = validate(data, constraints);
    // Do additional invalid data processing here
    return invalid;
  };

  return (
    <ChangeMobileNumber
      data={formData}
      invalids={invalids}
      isSubmitting={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

ChangeMobileNumberContainer.propTypes = {};

const mapStateToProps = (state) => () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeMobileNumberContainer);

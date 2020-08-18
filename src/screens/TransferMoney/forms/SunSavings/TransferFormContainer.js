import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validate from "validate.js";

// Form Component
import { TransferForm } from "./TransferForm";

// Custom Component Here

// Others
import { config } from "./config";

export const TransferFormContainer = (props) => {
  const [formData, setFormData] = useState({
    sourceAccount: {},
    bankCode: "0147",
    sourceAccountNumber: "",
    recipientAccountNumber: "",
    recipientAccountName: "",
    recipientBankName: "Sun Savings Bank",
    amount: "",
    recipientEmailAddress: "",
    recipientMobileNumber: "",
    paymentDescription: "",
  });
  const [invalids, setInvalids] = useState({});
  const [isSubmitting, setSubmittingStatus] = useState(false);
  const { route, navigation } = props;

  useEffect(() => {
    if (route.params?.formData) {
      setFormData((currentFormData) => ({
        ...currentFormData,
        ...route.params?.formData,
      }));
    }
  }, [route.params?.formData]);

  const handleSelectSource = () => {
    navigation.navigate("SelectSourceAccount", {
      previousRouteName: "SunSavingsTransferForm",
    });
  };

  /**
   * Handle Blur Event Listener
   * @description Used for validating inputs when onBlur event is triggered
   * @param {String} index formData index
   * @param {Object} additionalValidation Additional data for validation (used for Equality Validation)
   */
  const handleBlur = (index, additionalValidation = {}) => {
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
    setFormData({
      ...formData,
      [index]: value,
    });
  };

  const handleSubmit = () => {
    // Validate
    const invalid = handleValidate(formData, config.constraints);
    if (invalid) {
      setInvalids(invalid);
    } else {
      navigation.navigate("ReviewTransfer", {
        previousRouteName: "SunSavingsTransferForm",
        transferMoneyData: formData,
      });
    }
  };

  const handleValidate = (data = {}, constraints = {}) => {
    const invalid = validate(data, constraints);
    // Do additional invalid data processing here
    return invalid;
  };

  return (
    <TransferForm
      data={formData}
      invalids={invalids}
      isSubmitting={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onSelectSource={handleSelectSource}
    />
  );
};

export default TransferFormContainer;

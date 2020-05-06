import React, { useRef } from "react";

// Custom Components
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNDatePicker from "library/components/PNDatePicker";

export const LinkAccountForm = ({
  accountInfo: {
    accountNumber,
    firstName,
    middleName,
    lastName,
    birthDate,
    tin
  },
  handleChange,
  handleSubmit,
  isLoading
}) => {
  const input_accountNumber = useRef();
  const input_firstname = useRef();
  const input_lastname = useRef();
  const input_middlename = useRef();
  const input_tin = useRef();

  return (
    <React.Fragment>
      <PNContentWithTitleAndDescription
        title="Link My Account"
        desc="Please fill in the required fields to link your account."
      >
        <PNFormTextBox
          label="Acccount Number"
          onChangeText={(text) => handleChange(text, "accountNumber")}
          value={accountNumber}
          onSubmitEditing={() => input_firstname.current.focus()}
          ref={input_accountNumber}
        />
        <PNFormTextBox
          autoCompleteType="name"
          label="First Name"
          onChangeText={(text) => handleChange(text, "firstName")}
          value={firstName}
          onSubmitEditing={() => input_middlename.current.focus()}
          ref={input_firstname}
        />
        <PNFormTextBox
          autoCompleteType="name"
          label="Middle Name"
          onChangeText={(text) => handleChange(text, "middleName")}
          value={middleName}
          onSubmitEditing={() => input_lastname.current.focus()}
          ref={input_middlename}
        />
        <PNFormTextBox
          autoCompleteType="name"
          label="Last Name"
          onChangeText={(text) => handleChange(text, "lastName")}
          value={lastName}
          ref={input_lastname}
        />
        <PNDatePicker
          title="Date of Birth"
          placeHolderText="Select Date of Birth"
          defaultDate={birthDate}
          onDateChange={(date) => handleChange(date, "birthDate")}
          maximumDate={new Date()}
        />
        <PNFormTextBox
          label="TIN"
          keyboardType="number-pad"
          onChangeText={(text) => handleChange(text, "tin")}
          value={tin}
          onSubmitEditing={() => input_firstname.current.focus()}
          ref={input_tin}
        />
      </PNContentWithTitleAndDescription>
      <FormButtonContainer>
        <PNContainedButton
          onPress={() => handleSubmit()}
          disabled={isLoading}
          label="NEXT"
          loading={isLoading}
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export default LinkAccountForm;

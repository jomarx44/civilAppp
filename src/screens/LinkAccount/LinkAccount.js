import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

// Custom Components Here
import {
  ContainedButton,
  Input,
  KeyboardShift,
  Title,
  Description,
} from "../../components";
import PNDatePicker from "../../library/components/PNDatePicker"
import {
  FormContentView,
  FormHeaderView,
  FormScrollView,
  StackButtonView,
} from "../../layouts";

export const LinkAccount = (props) => {
  const { data, invalids, isSubmitting, onBlur, onChange, onSubmit } = props;

  const inputAccountNumber = useRef();
  const inputFirstname = useRef();
  const inputLastname = useRef();
  const inputMiddlename = useRef();
  const inputTIN = useRef();

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormHeaderView style={styles.formHeaderView}>
          <Title>Link My Account</Title>
          <Description>
            Please fill in the required fields to link your account.
          </Description>
        </FormHeaderView>
        <FormContentView>
          <Input
            label="Acccount Number"
            onChangeText={(value) => {
              onChange("accountNumber", value);
            }}
            ref={inputAccountNumber}
            onSubmitEditing={() => inputFirstname.current.focus()}
            onBlur={() => onBlur("accountNumber")}
            invalidText={invalids.accountNumber && invalids.accountNumber[0]}
            value={data.accountNumber}
          />
          <Input
            autoCompleteType="name"
            label="First Name"
            onChangeText={(value) => {
              onChange("firstName", value);
            }}
            ref={inputFirstname}
            onSubmitEditing={() => inputMiddlename.current.focus()}
            onBlur={() => onBlur("firstName")}
            invalidText={invalids.firstName && invalids.firstName[0]}
            value={data.firstName}
          />
          <Input
            autoCompleteType="name"
            label="Middle Name"
            onChangeText={(value) => {
              onChange("middleName", value);
            }}
            ref={inputMiddlename}
            onSubmitEditing={() => inputLastname.current.focus()}
            onBlur={() => onBlur("middleName")}
            invalidText={invalids.middleName && invalids.middleName[0]}
            value={data.middleName}
          />
          <Input
            autoCompleteType="name"
            label="Last Name"
            onChangeText={(value) => {
              onChange("lastName", value);
            }}
            ref={inputLastname}
            onBlur={() => onBlur("lastName")}
            invalidText={invalids.lastName && invalids.lastName[0]}
            value={data.lastName}
          />
          <PNDatePicker
            title="Date of Birth"
            placeHolderText="Select Date of Birth"
            defaultDate={data.birthDate}
            onDateChange={(date) => onChange("birthDate", date)}
            maximumDate={new Date()}
          />
  
          <Input
            label="TIN"
            onChangeText={(value) => {
              onChange("tin", value);
            }}
            ref={inputTIN}
            onSubmitEditing={() => onSubmit()}
            onBlur={() => onBlur("tin")}
            invalidText={invalids.tin && invalids.tin[0]}
            value={data.tin}
          />
        </FormContentView>
      </FormScrollView>
      <StackButtonView>
        <ContainedButton
          disabled={isSubmitting}
          label="NEXT"
          loading={isSubmitting}
          onPress={() => onSubmit()}
          buttonStyle={{ backgroundColor: "#309fe7" }}
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

LinkAccount.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LinkAccount;

const styles = StyleSheet.create({
  formHeaderView: {
    marginBottom: 37,
    width: "80%",
    maxWidth: 300,
  },
});

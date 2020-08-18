import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

// Custom Component Here
import {
  ContainedButton,
  Input,
  KeyboardShift,
  Title,
  Description,
} from "../../components/";
import {
  FormContentView,
  FormHeaderView,
  FormScrollView,
  StackButtonView,
} from "../../layouts";

export const EditProfile = (props) => {
  const {
    data,
    invalids,
    isSubmitting,
    onBlur,
    onChange,
    onSubmit,
    containerStyle,
  } = props;

  const inputFirstName = useRef();
  const inputMiddleName = useRef();
  const inputLastName = useRef();

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormHeaderView style={styles.formHeaderView}>
          <Title>Edit Profile</Title>
        </FormHeaderView>
        <FormContentView>
          <Input
            label="First Name"
            onChangeText={(value) => {
              onChange("firstName", value);
            }}
            ref={inputFirstName}
            onSubmitEditing={() => inputMiddleName.current.focus()}
            onBlur={() => onBlur("firstName")}
            invalidText={invalids.firstName && invalids.firstName[0]}
            value={data.firstName}
          />
          <Input
            label="Middle Name"
            onChangeText={(value) => {
              onChange("middleName", value);
            }}
            ref={inputMiddleName}
            onSubmitEditing={() => inputLastName.current.focus()}
            onBlur={() => onBlur("middleName")}
            invalidText={invalids.middleName && invalids.middleName[0]}
            value={data.middleName}
          />
          <Input
            label="Last Name"
            onChangeText={(value) => {
              onChange("lastName", value);
            }}
            ref={inputLastName}
            onSubmitEditing={() => onSubmit()}
            onBlur={() => onBlur("lastName")}
            invalidText={invalids.lastName && invalids.lastName[0]}
            value={data.lastName}
          />
        </FormContentView>
      </FormScrollView>
      <StackButtonView>
        <ContainedButton
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={() => onSubmit()}
          buttonStyle={{ backgroundColor: "#309fe7" }}
          label="NEXT"
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

EditProfile.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default EditProfile;

const styles = StyleSheet.create({
  formHeaderView: {
    marginBottom: 37,
    width: "80%",
    maxWidth: 300,
  },
});

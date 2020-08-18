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

export const ChangeMobileNumber = (props) => {
  const {
    data,
    invalids,
    isSubmitting,
    onBlur,
    onChange,
    onSubmit,
    containerStyle,
  } = props;

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormHeaderView style={styles.formHeaderView}>
          <Title>Change Mobile Number</Title>
        </FormHeaderView>
        <FormContentView>
          <Input
            label="New Mobile Number"
            keyboardType="phone-pad"
            maxLength={13}
            onChangeText={(value) => {
              onChange("phoneNumber", value);
            }}
            // onSubmitEditing={() => onSubmit()}
            onBlur={() => onBlur("phoneNumber")}
            invalidText={invalids.phoneNumber && invalids.phoneNumber[0]}
            defaultValue={data.phoneCode}
            value={data.phoneNumber.length < 3 ? data.phoneCode : data.phoneNumber}
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

ChangeMobileNumber.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default ChangeMobileNumber;

const styles = StyleSheet.create({
  formHeaderView: {
    marginBottom: 37,
    width: "80%",
    maxWidth: 300
  },
});

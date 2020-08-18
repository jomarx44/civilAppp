import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";


import {
  ContainedButton,
  Input,
  KeyboardShift,
  Title,
} from "../../components/";
import {
  FormContentView,
  FormHeaderView,
  FormScrollView,
  StackButtonView,
} from "../../layouts";

export const ChangePassword = (props) => {
  const {
    data,
    invalids,
    isSubmitting,
    onBlur,
    onChange,
    onSubmit,
    containerStyle,
  } = props;
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormHeaderView style={styles.formHeaderView}>
          <Title>Change Password</Title>
        </FormHeaderView>
        <FormContentView>
          <Input
            label="New Password"
            onChangeText={(value) => {
              onChange("password", value);
            }}
            secureTextEntry={true}
            onSubmitEditing={() => inputConfirmPassword.current.focus()}
            onBlur={() => onBlur("password")}
            ref={inputPassword}
            invalidText={invalids.password && invalids.password[0]}
            value={data.password}
          />
          <Input
            label="Confirm Password"
            onChangeText={(value) => {
              onChange("confirmPassword", value);
            }}
            secureTextEntry={true}
            onSubmitEditing={() => onSubmit()}
            onBlur={() => onBlur("confirmPassword", { password: data.password })}
            ref={inputConfirmPassword}
            invalidText={invalids.confirmPassword && invalids.confirmPassword[0]}
            value={data.confirmPassword}
          />
        </FormContentView>
      </FormScrollView>
      <StackButtonView>
        <ContainedButton
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={() => onSubmit()}
          buttonStyle={{ backgroundColor: "#309fe7" }}
          label="SAVE"
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

ChangePassword.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default ChangePassword;

const styles = StyleSheet.create({
  formHeaderView: {
    marginBottom: 37,
    width: "80%",
    maxWidth: 300
  },
});

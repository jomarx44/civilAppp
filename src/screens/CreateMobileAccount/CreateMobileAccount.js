import React, { useRef } from "react";
import PropTypes from "prop-types";
import { styles } from "./styles";
import {
  ContainedButton,
  InputBox,
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

export const CreateMobileAccount = (props) => {
  const { invalids, data, isSubmitting, onBlur, onChange, onSubmit } = props;
  const inputGivenName = useRef();
  const inputMiddleName = useRef();
  const inputFamilyName = useRef();
  const inputEmail = useRef();
  const inputPhoneNumber = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormHeaderView style={styles.formHeaderView}>
          <Title>Verify Identity</Title>
          <Description>
            To verify your identity, please fill in personal information.
          </Description>
        </FormHeaderView>
        <FormContentView>
          <InputBox
            label="First Name"
            onChangeText={(value) => {
              onChange("givenName", value);
            }}
            ref={inputGivenName}
            onSubmitEditing={() => inputMiddleName.current.focus()}
            onBlur={() => onBlur("givenName")}
            invalidText={invalids.givenName && invalids.givenName[0]}
            value={data.givenName}
          />
          <InputBox
            label="Middle Name"
            onChangeText={(value) => onChange("middleName", value)}
            ref={inputMiddleName}
            onSubmitEditing={() => inputFamilyName.current.focus()}
            value={data.middleName}
          />
          <InputBox
            label="Last Name"
            onChangeText={(value) => onChange("familyName", value)}
            ref={inputFamilyName}
            onSubmitEditing={() => inputEmail.current.focus()}
            onBlur={() => onBlur("familyName")}
            invalidText={invalids.familyName && invalids.familyName[0]}
            value={data.familyName}
          />
          <InputBox
            label="Email Address"
            onChangeText={(value) => onChange("email", value)}
            ref={inputEmail}
            onBlur={() => onBlur("email")}
            onSubmitEditing={() => inputPhoneNumber.current.focus()}
            invalidText={invalids.email && invalids.email[0]}
            value={data.email}
          />
          <InputBox
            label="Mobile Number"
            onChangeText={(value) => onChange("phoneNumber", value)}
            ref={inputPhoneNumber}
            keyboardType="phone-pad"
            maxLength={13}
            onBlur={() => onBlur("phoneNumber")}
            onSubmitEditing={() => inputPassword.current.focus()}
            invalidText={invalids.phoneNumber && invalids.phoneNumber[0]}
            defaultValue={data.phoneCode}
            // value={ data.phoneNumber }
          />
          <InputBox
            label="Password"
            password={true}
            onChangeText={(value) => onChange("password", value)}
            ref={inputPassword}
            onSubmitEditing={() => inputConfirmPassword.current.focus()}
            onBlur={() => onBlur("password")}
            secureTextEntry={true}
            invalidText={invalids.password && invalids.password[0]}
            value={data.password}
          />
          <InputBox
            label="Confirm Password"
            password={true}
            onChangeText={(value) => onChange("confirmPassword", value)}
            ref={inputConfirmPassword}
            onBlur={() =>
              onBlur("confirmPassword", { password: data.password })
            }
            secureTextEntry={true}
            invalidText={
              invalids.confirmPassword && invalids.confirmPassword[0]
            }
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
          label="NEXT"
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

CreateMobileAccount.propTypes = {
  invalids: PropTypes.object,
  data: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateMobileAccount;

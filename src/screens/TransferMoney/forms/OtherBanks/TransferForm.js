import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

// Custom Components Here
import {
  ContainedButton,
  HelperText,
  InputBox,
  KeyboardShift,
} from "../../../../components";
import {
  FormContentView,
  FormScrollView,
  StackButtonView,
} from "../../../../layouts";

export const TransferForm = (props) => {
  const inputBankName = useRef();
  const inputAccountNumber = useRef();
  const inputAccountName = useRef();
  const inputEmailAddress = useRef();
  const inputMobileNumber = useRef();
  const inputPaymentDescription = useRef();
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
        <FormContentView>
          <HelperText style={styles.helperText}>
            Please enter your Bank Details
          </HelperText>
          <InputBox
            label="Bank Name"
            onChangeText={(value) => {
              onChange("bankName", value);
            }}
            ref={inputBankName}
            onSubmitEditing={() => inputAccountNumber.current.focus()}
            onBlur={() => onBlur("bankName")}
            invalidText={
              invalids && invalids.bankName && invalids.bankName[0]
            }
            value={data.bankName}
          />
          <InputBox
            label="Account Number"
            onChangeText={(value) => {
              onChange("accountNumber", value);
            }}
            ref={inputAccountNumber}
            onSubmitEditing={() => inputAccountName.current.focus()}
            onBlur={() => onBlur("accountNumber")}
            invalidText={
              invalids && invalids.accountNumber && invalids.accountNumber[0]
            }
            value={data.accountNumber}
          />
          <InputBox
            label="Account Name"
            onChangeText={(value) => {
              onChange("accountName", value);
            }}
            ref={inputAccountName}
            onSubmitEditing={() => inputEmailAddress.current.focus()}
            onBlur={() => onBlur("accountName")}
            invalidText={
              invalids && invalids.accountName && invalids.accountName[0]
            }
            value={data.accountName}
          />
          <HelperText style={styles.helperText}>
            To notify the recipient, please fill in the following:
          </HelperText>
          <InputBox
            label="Email Address"
            onChangeText={(value) => {
              onChange("emailAddress", value);
            }}
            ref={inputEmailAddress}
            onSubmitEditing={() => inputMobileNumber.current.focus()}
            onBlur={() => onBlur("emailAddress")}
            invalidText={
              invalids && invalids.emailAddress && invalids.emailAddress[0]
            }
            value={data.emailAddress}
          />
          <InputBox
            label="Mobile Number"
            onChangeText={(value) => {
              onChange("mobileNumber", value);
            }}
            ref={inputMobileNumber}
            keyboardType="phone-pad"
            maxLength={13}
            onSubmitEditing={() => inputPaymentDescription.current.focus()}
            onBlur={() => onBlur("mobileNumber")}
            invalidText={
              invalids && invalids.mobileNumber && invalids.mobileNumber[0]
            }
            defaultValue={data.phoneCode}
            value={data.mobileNumber}
          />
          <InputBox
            label="Payment Description"
            onChangeText={(value) => {
              onChange("paymentDescription", value);
            }}
            ref={inputPaymentDescription}
            onSubmitEditing={() => onSubmit()}
            onBlur={() => onBlur("paymentDescription")}
            invalidText={
              invalids &&
              invalids.paymentDescription &&
              invalids.paymentDescription[0]
            }
            value={data.paymentDescription}
          />
        </FormContentView>
      </FormScrollView>
      <StackButtonView>
        <ContainedButton
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={() => onSubmit()}
          label="NEXT"
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

TransferForm.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  helperText: { marginBottom: 24 }
})

export default TransferForm;

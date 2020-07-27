import React, { useRef } from "react";
import { StyleSheet } from "react-native"
import PropTypes from 'prop-types'

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
  const inputAccountNumber = useRef();
  const inputAccountName = useRef();
  const inputEmailAddress = useRef();
  const inputMobileNumber = useRef();
  const inputPaymentDescription = useRef();
  const { onBlur, onChange, onSubmit, data, invalids, isSubmitting } = props;

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormContentView>
          <HelperText style={styles.helperText}>
            Please enter the Sun Savings Account Number
          </HelperText>
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
  onBlur: PropTypes.func, 
  onChange: PropTypes.func, 
  onSubmit: PropTypes.func, 
  data: PropTypes.object, 
  invalids: PropTypes.object, 
  isSubmitting: PropTypes.bool
}

const styles = StyleSheet.create({
  helperText: { marginBottom: 24 }
})

export default TransferForm;

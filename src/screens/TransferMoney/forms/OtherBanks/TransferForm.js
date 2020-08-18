import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

// Custom Components Here
import {
  ContainedButton,
  Dropdown,
  HelperText,
  Input,
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
  const inputAmount = useRef();
  const inputEmailAddress = useRef();
  const inputMobileNumber = useRef();
  const inputPaymentDescription = useRef();
  const {
    data,
    invalids,
    isSubmitting,
    onBlur,
    onChange,
    onSelectSource,
    onSubmit,
    bankList,
  } = props;

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormContentView>
          <HelperText style={styles.helperText}>
            Please select source account
          </HelperText>
          <View style={{flexDirection: "row", justifyContent: "flex-end", marginBottom: 20}}>
            <ContainedButton 
              buttonStyle={{
                borderRadius: 18.5,
                backgroundColor: "#f0f0f0",
                width: 200
              }}
              labelStyle={{
                color: "#444",
                fontSize: 14,
                fontFamily: "Gilroy_Medium"
              }}
              label="Select Source Account"
              onPress={onSelectSource}
            />
          </View>
          <Input
            label="Source Account Number"
            invalidText={
              invalids && invalids.sourceAccountNumber && invalids.sourceAccountNumber[0]
            }
            editable={false}
            value={data.sourceAccountNumber}
          />
          <HelperText style={styles.helperText}>
            Please enter your Bank Details
          </HelperText>
          <Dropdown
            items={bankList}
            defaultValue={data.bankCode}
            onChangeItem={(item) => {
              onChange("bankCode", item.value)
              onChange("recipientBankName", item.label)
            }}
          />
          <Input
            label="Recipient Account Number"
            onChangeText={(value) => {
              onChange("recipientAccountNumber", value);
            }}
            ref={inputAccountNumber}
            onSubmitEditing={() => inputAccountName.current.focus()}
            onBlur={() => onBlur("recipientAccountNumber")}
            invalidText={
              invalids && invalids.recipientAccountNumber && invalids.recipientAccountNumber[0]
            }
            value={data.recipientAccountNumber}
          />
          <Input
            label="Recipient Account Name"
            onChangeText={(value) => {
              onChange("recipientAccountName", value);
            }}
            ref={inputAccountName}
            onSubmitEditing={() => inputAmount.current.focus()}
            onBlur={() => onBlur("recipientAccountName")}
            invalidText={
              invalids && invalids.recipientAccountName && invalids.recipientAccountName[0]
            }
            value={data.recipientAccountName}
          />
          <Input
            label="Amount"
            onChangeText={(value) => {
              onChange("amount", value);
            }}
            keyboardType="decimal-pad"
            ref={inputAmount}
            onSubmitEditing={() => inputEmailAddress.current.focus()}
            onBlur={() => onBlur("amount")}
            invalidText={
              invalids && invalids.amount && invalids.amount[0]
            }
            value={data.amount}
          />
          <HelperText style={styles.helperText}>
            To notify the recipient, please fill in the following:
          </HelperText>
          <Input
            label="Email Address"
            onChangeText={(value) => {
              onChange("recipientEmailAddress", value);
            }}
            ref={inputEmailAddress}
            onSubmitEditing={() => inputMobileNumber.current.focus()}
            onBlur={() => onBlur("recipientEmailAddress")}
            invalidText={
              invalids && invalids.recipientEmailAddress && invalids.recipientEmailAddress[0]
            }
            value={data.recipientEmailAddress}
          />
          <Input
            label="Mobile Number"
            onChangeText={(value) => {
              onChange("recipientMobileNumber", value);
            }}
            ref={inputMobileNumber}
            keyboardType="phone-pad"
            maxLength={13}
            onSubmitEditing={() => inputPaymentDescription.current.focus()}
            onBlur={() => onBlur("recipientMobileNumber")}
            invalidText={
              invalids && invalids.recipientMobileNumber && invalids.recipientMobileNumber[0]
            }
            defaultValue={data.phoneCode}
            value={data.recipientMobileNumber.length < 3 ? "+63" : data.recipientMobileNumber}
          />
          <Input
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
  onSelectSource: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  helperText: { marginBottom: 24 }
})

export default TransferForm;

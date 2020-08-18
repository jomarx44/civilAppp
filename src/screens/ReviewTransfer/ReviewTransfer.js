import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from "react-native";

// Custom Components Here
import {
  KeyboardShift,
  ContainedButton,
  Card,
  HelperText,
} from "../../components";
import {
  FormContentView,
  FormScrollView,
  StackButtonView,
} from "../../layouts";
import moment from "moment";

export const ReviewTransfer = (props) => {
  const { data, onSubmit } = props;

  return (
    <KeyboardShift>
      <FormScrollView>
        <FormContentView>
          <Card
            style={[
              styles.card,
              { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
            ]}
          >
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>From Account</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={[styles.value]}>
                {data.sourceAccount?.accountMainName}
              </Text>
              <HelperText style={[styles.helper]}>Sun Savings Bank</HelperText>
              <HelperText style={[styles.helper]}>
                {data.sourceAccount?.accountNumber.replace(
                  /\B(?=(\d{4})+(?!\d))/g,
                  " "
                )}
              </HelperText>
            </View>
          </Card>
          <Card style={[styles.card]}>
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>To Account</Text>
            </View>
            <View style={[styles.valueContainer]}>
              {data?.recipientAccountName && (
                <Text style={[styles.value]}>{data.recipientAccountName}</Text>
              )}
              <HelperText style={[styles.helper]}>
                {data?.recipientBankName}
              </HelperText>
              <HelperText style={[styles.helper]}>
                {data?.recipientAccountNumber.replace(
                  /\B(?=(\d{4})+(?!\d))/g,
                  " "
                )}
              </HelperText>
            </View>
          </Card>
          <Card style={[styles.card]}>
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>Amount</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={[styles.value]}>
                {new Intl.NumberFormat("PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(data.amount)}
              </Text>
            </View>
          </Card>
          <Card style={[styles.card]}>
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>Date</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={[styles.value]}>
                {moment().format("D MMM YYYY")}
              </Text>
            </View>
          </Card>
          <Card
            style={[
              styles.card,
              { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
            ]}
          >
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>Message</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={[styles.value]}>{data?.paymentDescription}</Text>
            </View>
          </Card>
        </FormContentView>
      </FormScrollView>
      <StackButtonView>
        <ContainedButton
          onPress={() => onSubmit()}
          label="TRANSFER"
        />
      </StackButtonView>
    </KeyboardShift>
  );
};

ReviewTransfer.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default ReviewTransfer;

const styles = StyleSheet.create({
  content: {
    width: "80%",
    maxWidth: 325,
  },
  contentContainer: {},
  card: {
    padding: 20,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: "space-between",
  },
  labelContainer: {
    justifyContent: "flex-start",
    width: "40%",
    maxWidth: 150
  },
  valueContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  label: {
    color: "#444",
    fontFamily: "Gilroy_Medium",
    fontSize: 12,
    letterSpacing: 0.25,
  },
  value: {
    color: "#003d6f",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    textAlign: "left",
  },
  helper: {
    textAlign: "left",
    fontSize: 14,
  },
});

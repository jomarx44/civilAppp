import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Custom Components Here
import { SelectSourceAccount } from "./SelectSourceAccount";

// Others
import { constants } from "../../constants";
import { getBankAccountsAsync } from "../../redux/bankAccount/actions";

export const SelectSourceContainer = (props) => {
  const { bankAccount, getBankAccounts, route, navigation } = props;

  const handlePress = (account) => {
    if (route.params?.previousRouteName) {
      navigation.navigate(route.params?.previousRouteName, {
        formData: {
          sourceAccountNumber: account.accountNumber,
          sourceAccount: account
        },
      });
    }
  };

  return (
    <SelectSourceAccount
      data={Object.values(bankAccount.list).map(
        (account) => {
          const {
            accountNumber,
            accountType,
            accountMainName,
            accountCurrencyCode,
            accountLedgerFormatted,
          } = account;
          return {
            accountNumber: accountNumber,
            accountType: constants.accountTypes[accountType],
            accountName: accountMainName,
            availableBalance: `${accountCurrencyCode} ${accountLedgerFormatted}`,
            onPress: () => handlePress(account),
          };
        }
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    bankAccount: state.bankAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBankAccounts: (CISNumber) => {
      dispatch(getBankAccountsAsync(CISNumber));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSourceContainer);

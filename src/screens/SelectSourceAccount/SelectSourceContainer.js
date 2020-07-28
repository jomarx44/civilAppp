import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Custom Components Here
import { SelectSourceAccount } from "./SelectSourceAccount";

// Others
import { constants } from "../../constants";
import { getBankAccountsAsync } from "../../redux/bankAccount/actions";

export const SelectSourceContainer = (props) => {
  const { bankAccount, getBankAccounts } = props;

  useEffect(() => {
    getBankAccounts("1200000039");
  }, []);

  const handlePress = (accountNumber) => {};

  return (
    <SelectSourceAccount
      data={Object.values(bankAccount.list).map((account) => ({
        accountNumber: account.accountNumber,
        accountType: constants.accountTypes[account.accountType],
        availableBalance: `${account.accountCurrencyCode} ${account.accountLedgerFormatted}`,
        onPress: () => handlePress(account.accountNumber),
      }))}
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

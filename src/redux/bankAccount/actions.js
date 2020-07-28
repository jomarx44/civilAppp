import {
  BANK_ACCOUNT_CREATE,
  BANK_ACCOUNT_CREATE_ERROR,
  BANK_ACCOUNT_CREATE_INITIALIZE,
  BANK_ACCOUNT_CREATE_SUCCESS,
  BANK_ACCOUNT_FETCH,
  BANK_ACCOUNT_FETCH_ERROR,
  BANK_ACCOUNT_FETCH_INITIALIZE,
  BANK_ACCOUNT_FETCH_SUCCESS,
  BANK_ACCOUNT_INITIALIZE_REDUCER,
} from "../actions";

import { bankAccount } from "../../API";

/***********************
 * ACTION CREATORS
 ***********************/

// Initialize Bank Account Reducer
export const bankAccountInitializeReducer = () => ({
  type: BANK_ACCOUNT_INITIALIZE_REDUCER,
});

// Initialize Create Bank Account
export const bankAccountInitializeCreate = () => ({
  type: BANK_ACCOUNT_CREATE_INITIALIZE,
});

// Create Bank Account
export const createBankAccount = (account) => ({
  type: BANK_ACCOUNT_CREATE,
  payload: {
    account,
  },
});

// Create Bank Account Success
export const createBankAccountSuccess = () => ({
  type: BANK_ACCOUNT_CREATE_SUCCESS,
});

// Create Bank Account Error
export const createBankAccountError = (error) => ({
  type: BANK_ACCOUNT_CREATE_ERROR,
  error,
});

// Initialize Fetch Bank Account
export const bankAccountInitializeFetch = () => ({
  type: BANK_ACCOUNT_FETCH_INITIALIZE,
});

// Fetch Bank Account
export const fetchBankAccount = () => {
  return {
    type: BANK_ACCOUNT_FETCH,
  };
};

// Fetch Bank Account Success
export const fetchBankAccountSuccess = (accounts, accountsById) => ({
  type: BANK_ACCOUNT_FETCH_SUCCESS,
  payload: {
    list: accounts,
    listByIds: accountsById,
  },
});

// Fetch Bank Account Error
export const fetchBankAccountError = (error) => ({
  type: BANK_ACCOUNT_FETCH_ERROR,
  error,
});

/***********************
 * API WITH DISPATCH
 ***********************/

const reformatAccount = (account) => {
  return {
    accountNumber: account.acctno,
    accountNumberFormatted: account.AcctNoFormatted,
    accountLedger: account.Ledger,
    accountLedgerFormatted: account.LedgerFormatted,
    accountAmountCent: account.amt_cent,
    accountAmountWhole: account.amt_whole,
    accountMainName: account.acctname,
    accountName: account.Name1,
    accountOtherName: account.Name2,
    accountDesription: account.acctdesc,
    accountType: account.accttype,
    accountCurrencyCode: account.CurrencyCode,
    FTRSource: account.FTRSrc,
    ATM: account.atm,
  };
};

export const getBankAccountsAsync = (CISNumber) => {
  return (dispatch) => {
    dispatch(fetchBankAccount());
    return bankAccount
      .get(CISNumber)
      .then(({ data: { data, msg, status} }) => {
        const {
          accts: { a: accounts },
          ErrorMsg: errorMessage,
          ReturnCode: returnCode,
        } = data["Account.Info"];
        
        if (accounts) {
          let list = {};
          let listByIds = [];

          if (Array.isArray(accounts)) {
            accounts.map((account, index) => {
              list = {
                ...list,
                [account.AcctNoFormatted]: reformatAccount(account),
              };
              listByIds = [...listByIds, account.AcctNoFormatted];
            });
          } else if (accounts instanceof Object) {
            list = {
              ...list,
              [accounts.AcctNoFormatted]: reformatAccount(accounts),
            };
            listByIds = [...listByIds, accounts.AcctNoFormatted];
          }

          dispatch(fetchBankAccountSuccess(list, listByIds));
        } else {
          dispatch(fetchBankAccountError(new Error(errorMessage)));
        }
      })
      .catch((error) => {
        dispatch(fetchBankAccountError(error));
      });
  };
};

import {
  BANK_ACCOUNT_CREATE,
  BANK_ACCOUNT_CREATE_ERROR,
  BANK_ACCOUNT_CREATE_INITIALIZE,
  BANK_ACCOUNT_CREATE_SUCCESS,
  BANK_ACCOUNT_FETCH,
  BANK_ACCOUNT_FETCH_ERROR,
  BANK_ACCOUNT_FETCH_INITIALIZE,
  BANK_ACCOUNT_FETCH_SUCCESS,
  BANK_ACCOUNT_HISTORY_FETCH,
  BANK_ACCOUNT_HISTORY_FETCH_ERROR,
  BANK_ACCOUNT_HISTORY_FETCH_INITIALIZE,
  BANK_ACCOUNT_HISTORY_FETCH_SUCCESS,
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
export const getBankAccount = () => {
  return {
    type: BANK_ACCOUNT_FETCH,
  };
};

// Fetch Bank Account Success
export const getBankAccountSuccess = (accounts, accountsById) => ({
  type: BANK_ACCOUNT_FETCH_SUCCESS,
  payload: {
    list: accounts,
    listByIds: accountsById,
  },
});

// Fetch Bank Account Error
export const getBankAccountError = (error) => ({
  type: BANK_ACCOUNT_FETCH_ERROR,
  error,
});

// Fetch Bank Account
export const getBankAccountHistory = () => {
  return {
    type: BANK_ACCOUNT_HISTORY_FETCH,
  };
};

// Fetch Bank Account Success
export const getBankAccountHistorySuccess = (historyList) => ({
  type: BANK_ACCOUNT_HISTORY_FETCH_SUCCESS,
  payload: {
    historyList,
  },
});

// Fetch Bank Account Error
export const getBankAccountHistoryError = (error) => ({
  type: BANK_ACCOUNT_HISTORY_FETCH_ERROR,
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

/**
 * @description Used for fetching Bank Accounts
 * @param {String} CISNumber
 */
export const getBankAccountsAsync = (CISNumber) => {
  console.log("Went Here???");
  return (dispatch) => {
    dispatch(getBankAccount());
    return bankAccount
      .get(CISNumber)
      .then(({ data: { data, msg, status } }) => {
        const {
          accts: { a: accounts },
          ErrorMsg: errorMessage,
          ReturnCode: returnCode,
        } = data["Account.Info"];
        console.log("errorMessage: ", errorMessage);

        if (errorMessage == "") {
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

          dispatch(getBankAccountSuccess(list, listByIds));
        } else {
          dispatch(getBankAccountError(new Error(errorMessage)));
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        dispatch(getBankAccountError(error));
      });
  };
};

/**
 * Get Bank Account History Async
 * @param {String} accountNumber Bank Account Number or Bank Formatted Account Number
 * @param {String} count Maximum count of total history to be returned
 */
export const getBankAccountHistoryAsync = (accountNumber, count = 10) => {
  return (dispatch) => {
    dispatch(getBankAccountHistory());
    return bankAccount
      .getHistory(accountNumber, count)
      .then(({ data: { data } }) => {
        const {
          AcctNoFormatted: accountNumberFormatted,
          ErrorMsg: errorMessage,
          ErrorMsg2: errorMessage2,
          ReturnCode: returnCode,
          tis: { ti: historyList },
        } = data["Account.Info"];

        if (returnCode == 0) {
          if (historyList instanceof Array) {
            let formattedHistoryList = historyList.map((history, index) => {
              return {
                id: index.toString(),
                title: history.tn,
                date: history.td,
                amount: history.dr
                  ? parseInt(history.dr.replace(",", ""))
                  : -Math.abs(parseInt(history.cr.replace(",", ""))),
              };
            });

            dispatch(
              getBankAccountHistorySuccess({
                [accountNumberFormatted]: formattedHistoryList,
              })
            );
          }
        } else {
          getBankAccountHistoryError(new Error(errorMessage));
        }
      })
      .catch((error) => {
        dispatch(getBankAccountHistoryError(error));
      });
  };
};

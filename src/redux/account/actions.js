import {
  FETCH_ACCOUNTS_INITIALIZE,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNT_HISTORY_INITIALIZE,
  FETCH_ACCOUNT_HISTORY,
  FETCH_ACCOUNT_HISTORY_ERROR,
  FETCH_ACCOUNT_HISTORY_SUCCESS,
  FETCH_ACCOUNT_INFO_INITIALIZE,
  FETCH_ACCOUNT_INFO,
  FETCH_ACCOUNT_INFO_ERROR,
  FETCH_ACCOUNT_INFO_SUCCESS,
} from "../actions";

import { bankAccount } from "../../API/index";

/**
 * ACTION CREATORS
 */

export const fetchAccountsInitialize = () => ({
  type: FETCH_ACCOUNTS_INITIALIZE,
});

export const fetchAccountsStart = (CISNumber) => ({
  type: FETCH_ACCOUNTS,
  payload: {
    CISNumber,
  },
});

export const fetchAccountsError = (error) => ({
  type: FETCH_ACCOUNTS_ERROR,
  payload: {
    error,
  },
});

export const fetchAccountsSuccess = (list, listById) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  payload: {
    list,
    listById,
  },
});

export const fetchAccountHistoryInitialize = () => ({
  type: FETCH_ACCOUNT_HISTORY_INITIALIZE,
});

export const fetchAccountHistoryStart = (accountNumber, count) => ({
  type: FETCH_ACCOUNT_HISTORY,
  payload: {
    accountNumber,
    historyCount: count,
  },
});

export const fetchAccountHistoryError = (error) => ({
  type: FETCH_ACCOUNT_HISTORY_ERROR,
  payload: {
    error,
  },
});

export const fetchAccountHistorySuccess = (list, listById) => ({
  type: FETCH_ACCOUNT_HISTORY_SUCCESS,
  payload: {
    historyList: list,
    historyListById: listById,
  },
});

export const fetchAccountInfoInitialize = () => ({
  type: FETCH_ACCOUNT_INFO_INITIALIZE,
});

export const fetchAccountInfoStart = (accountNumber) => ({
  type: FETCH_ACCOUNT_INFO,
  payload: {
    accountNumber,
  },
});

export const fetchAccountInfoError = (error) => ({
  type: FETCH_ACCOUNT_INFO_ERROR,
  payload: {
    error,
  },
});

export const fetchAccountInfoSuccess = (list, listById) => ({
  type: FETCH_ACCOUNT_INFO_SUCCESS,
  payload: {
    infoList: list,
    infoListById: listById,
  },
});

/**
 * API WITH DISPATCH
 */

/**
 * @description Used for fetching Bank Accounts
 * @param {String} CISNumber 
 */
export const fetchAccounts = (CISNumber) => {
  return (dispatch) => {
    dispatch(fetchAccountsStart(CISNumber));
    return bankAccount
      .get(CISNumber)
      .then(({ data: { data } }) => {
        const {
          ErrorMsg: errorMessage,
          accts: { a: accountListUnformatted },
        } = data["Account.Info"];

        if (errorMessage !== "") {
          let accounts = [];
          let accountList = {};
          let accountsLisById = [];

          accountListUnformatted instanceof Object &&
            accounts.push(accountListUnformatted);

          accounts.map((account) => {
            const {
              acctno: accountNumber,
              AcctNoFormatted: accountNumberFormatted,
              Name1: name,
              CurrencyCode: currencyCode,
              Ledger: balance,
              LedgerFormatted: balanceFormatted,
              acctdesc: accountDescription,
              acctname: accountName,
              accttype: accountType,
              amt_cent: amountCent,
              amt_whole: amountWhole,
            } = account;

            accountList[accountNumberFormatted] = {
              accountDescription,
              accountName,
              accountNumber,
              accountNumberFormatted,
              accountType,
              amountCent,
              amountWhole,
              balance,
              balanceFormatted,
              currencyCode,
              name,
            };

            accountsLisById.push(accountNumberFormatted);
          });

          dispatch(fetchAccountsSuccess(accountList, accountsLisById));
        } else {
          dispatch(fetchAccountsError(errorMessage));
        }
      })
      .catch((error) => dispatch(fetchAccountsError(error)));
  };
};

export const fetchAccountInfo = (accountNumber) => {
  return dispatch => {
    dispatch(fetchAccountInfoStart(accountNumber));
    return bankAccount
      .getInfo(accountNumber)
      .then( ( {data: { data } } ) => {
        const {
          ErrorMsg: errorMessage,
        } = data["Account.Info"]
      })
      .catch(error => dispatch(fetchAccountInfoError(error)));
  }
}

export const fetchAccountHistory = (accountNumber, count) => {
  return dispatch => {
    dispatch(fetchAccountHistoryStart(accountNumber, count));
    return bankAccount
      .getHistory()
      .then(({data: { data }}) => {
        const {
          ErrorMsg: errorMessage,
          tis
        } = data["Account.Info"];

        if(errorMessage !== "") {
          
        }
      })
      .catch(error => dispatch(fetchAccountHistoryError(error)));
  }
}
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

import {
  bankAccount
} from "../../API"

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
    type: BANK_ACCOUNT_FETCH
  }
};

// Fetch Bank Account Success
export const fetchBankAccountSuccess = (accounts, accountsById) => ({
  type: BANK_ACCOUNT_FETCH_SUCCESS,
  payload: {
    list: accounts,
    listById: accountsById
  }
});

// Fetch Bank Account Error
export const fetchBankAccountError = (error) => ({
  type: BANK_ACCOUNT_FETCH_ERROR,
  error,
});

/***********************
 * API WITH DISPATCH
 ***********************/

export const getBankAsync = (CISNumber) => {
  return dispatch => {
    return bankAccount.get(CISNumber)
      .then(({data}) => {
        
      })
      .catch((error) => {
        dispatch(fetchBankAccountError(error))
      })
  }
}
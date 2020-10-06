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

const initState = {
  historyList: {},
  historyListById: [],
  infoList: {},
  infoListById: [],
  list: {},
  listById: [],
  suppliedParameters: {
    accountNumber: "",
    historyCount: 0,
    CISNumber: "",
  },
  error: null,
  isFetchingAccounts: false,
  isFetchingAccountHistory: false,
  isFetchingAccountInfo: false,
};

export const account = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_INITIALIZE:
      return {
        ...state,
        list: initState.list,
        listById: initState.listById,
        suppliedParameters: {
          ...state.suppliedParameters,
          CISNumber: initState.suppliedParameters.CISNumber,
        },
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        suppliedParameters: {
          ...state.suppliedParameters,
          CISNumber: action.payload.CISNumber,
        },
        errtor: initState.error,
        isFetchingAccounts: true,
      };
    case FETCH_ACCOUNTS_ERROR:
      return { ...state, error: action.error, isFetchingAccounts: false };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        listById: action.payload.listById,
        suppliedParameters: {
          ...state.suppliedParameters,
          CISNumber: initState.suppliedParameters.CISNumber,
        },
        isFetchingAccounts: false,
      };
    case FETCH_ACCOUNT_HISTORY_INITIALIZE:
      return {
        ...state,
        historyList: initState.historyList,
        historyListById: initState.historyListById,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: initState.suppliedParameters.accountNumber,
          historyCount: initState.suppliedParameters.historyCount,
        },
      };
    case FETCH_ACCOUNT_HISTORY:
      return {
        ...state,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: action.payload.accountNumber,
          historyCount: action.payload.historyCount,
        },
        error: initState.error,
        isFetchingAccountHistory: true,
      };
    case FETCH_ACCOUNT_HISTORY_ERROR:
      return { ...state, error: action.error, isFetchingAccountHistory: false };
    case FETCH_ACCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        historyList: action.payload.historyList,
        historyListById: action.payload.historyListById,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: initState.suppliedParameters.accountNumber,
          historyCount: initState.suppliedParameters.historyCount,
        },
        isFetchingAccountHistory: false,
      };
    case FETCH_ACCOUNT_INFO_INITIALIZE:
      return {
        ...state,
        infoList: initState.infoList,
        infoListById: initState.infoListById,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: initState.suppliedParameters.accountNumber,
        },
      };
    case FETCH_ACCOUNT_INFO:
      return {
        ...state,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: action.payload.accountNumber,
        },
        error: initState.error,
        isFetchingAccountInfo: true,
      };
    case FETCH_ACCOUNT_INFO_ERROR:
      return { ...state, error: action.payload.error };
    case FETCH_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        infoList: action.payload.infoList,
        infoListById: action.payload.infoListById,
        suppliedParameters: {
          ...state.suppliedParameters,
          accountNumber: initState.suppliedParameters.accountNumber,
        },
      };
    default:
      return state;
  }
};

export default account;

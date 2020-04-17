import {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTINFO_ERROR,
  FETCH_ACCOUNTSHISTORY_ERROR,
  CLEAR_ACCOUNTS,
} from "../../actions/types";

const accountState = {
  is_fetching: true,
  error: null,
  list: []
};

export const accountsReducer = (state = accountState, action) => {
  switch (action.type) {
    case CLEAR_ACCOUNTS: 
      return accountState;
    case FETCH_ACCOUNTS:
      return state;
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        is_fetching: false,
        list: action.payload
      };
    case FETCH_ACCOUNTS_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const accountDetailsState = {
  is_fetching: true,
  account: {
    id: "", // Account Number
    balance: {
      raw: "", // Available Balance
      formatted: "" // Available Balance (Formatted)
    },
    currency: "", // Currency Code
    history: [], // History
    name: "", // Full Name (Name1)
    product: "", // Product
    status: {
      type: "", // Status
      code: "" // Status Number
    },
    type: {
      raw: "", // Account Type
      formatted: "" // Account Type (Formatted)
    }
  },
  error: null,
};

export const accountDetailsReducer = (state = accountDetailsState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTINFO_ERROR:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        error: true
      };
    case FETCH_ACCOUNTSHISTORY_ERROR:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        error: true
      };
    default:
      return state;
  }
};

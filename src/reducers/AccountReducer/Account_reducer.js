import * as TYPE from "../../actions/types";

const accountState = {
  is_fetching: true,
  error: null,
  list: []
};

export const accountsReducer = (state = accountState, action) => {
  switch (action.type) {
    case TYPE.FETCH_ACCOUNTS:
      return state;
    case TYPE.FETCH_ACCOUNTS_SUCCESS:
      return {
        is_fetching: false,
        list: action.payload
      };
    case TYPE.FETCH_ACCOUNTS_ERROR:
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
    case TYPE.FETCH_ACCOUNTDETAILS:
      return {
        ...state
      };
    case TYPE.FETCH_ACCOUNTDETAILS_SUCCESS:
      return {
        is_fetching: false,
        account: action.payload,
        error: null
      };
    case TYPE.FETCH_ACCOUNTDETAILS_ERROR:
      return {
        ...state,
        is_fetching: false,
        error: true
      };
    case TYPE.FETCH_ACCOUNTINFO_ERROR:
      return {
        ...state,
        is_fetching: false,
        error: true
      };
    case TYPE.FETCH_ACCOUNTSHISTORY_ERROR:
      return {
        is_fetching: false,
        account: {},
        error: true
      };
    default:
      return state;
  }
};

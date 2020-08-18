import { combineReducers } from "redux";
import { account } from "./account/reducer";
import { auth } from "./auth/reducer";
import { bankAccount } from "./bankAccount/reducer";
import { list } from "./list/reducer"
import { profile } from "./profile/reducer";
import { user } from "./user/reducer"
// Temporary
import accountReducer from "../reducers/accountReducer";
// import { accountDetailsReducer, accountsReducer } from "../reducers/AccountReducer";
import AppAttributeReducer from "../reducers/AppAttributeReducer";
import { cisReducer } from "../reducers/cisReducer";
import { cityReducer } from "../reducers/cityReducer";
import ListReducer from "../reducers/ListReducer";
import { LoaderReducer } from "../reducers/loaderReducer";
import { otpReducer } from "../reducers/OTPReducer";

const appReducer = combineReducers({
  // account,
  auth,
  bankAccount,
  list,
  profile,
  user,
  account: accountReducer,
  // accounts: accountsReducer,
  // accountDetails: accountDetailsReducer,
  appAttribute: AppAttributeReducer,
  cis: cisReducer,
  city: cityReducer,
  lists: ListReducer,
  loader: LoaderReducer,
  otp: otpReducer,
});

const rootReducer = (state, action) => {
  if(action.type === "LOGOUT") {
    // To be refactored
    state = {
      auth: {
        accessToken: null,
        idtoken: null,
        refreshToken: null,
        status: {
          isCreating: false,
          isCreated: null,
          isLoggingIn: false,
          isLoggedIn: false
        },
        error: null
      },
      bankAccount: {
        list: {},
        historyList: {},
        listByIds: [],
        formData: {},
        status: {
          isFetching: false,
          isCreating: false
        },
        error: null
      },
      list: {
        civilStatus: {
          list: {},
          listByIds: [],
          error: null
        },
        homeOwnership: {
          list: {},
          listByIds: [],
          error: null
        },
        idList: {
          list: {},
          listByIds: [],
          error: null
        },
        jobTitle: {
          list: {},
          listByIds: [],
          error: null
        },
        nationality: {
          list: {},
          listByIds: [],
          error: null
        },
        sourceOfFund: {
          list: {},
          listByIds: [],
          error: null
        },
        error: null,
        status: {
          isFetching: false
        }
      },
      profile: {
        data: null,
        error: null,
        status: {
          isFetching: false
        }
      },
      user: {
        createdList: {},
        createdListByIds: [],
        info: null,
        error: null,
        status: {
          isFetchingInfo: false
        }
      },
      account: {
        accounts: {},
        accountsList: {},
        error: null,
        formData: {},
        isAdding: false,
        isAdded: null,
        isLinking: false,
        isLinked: null,
        isFetching: null
      },
      appAttribute: {
        isFetching: false,
        isSaving: false,
        isUpdating: false,
        success: null,
        message: '',
        attributes: {},
        temporary_key: null,
        temporary_attributes: {}
      },
      cis: {
        id: null
      },
      city: {
        isFetching: false,
        data: []
      },
      lists: {
        meta: {
          isFetching: false
        },
        barangays: {
          isFetching: false,
          data: {},
          listsById: []
        },
        homeOwnership: {
          data: {},
          listsById: []
        },
        civilStatus: {
          data: {},
          listsById: []
        },
        idList: {
          data: {},
          listsById: []
        },
        jobTitle: {
          data: {},
          listsById: []
        },
        nationality: {
          data: {},
          listsById: []
        },
        sourceOfFund: {
          data: {},
          listsById: []
        }
      },
      loader: {
        payload: {
          is_fetching: false
        },
        success: null
      },
      otp: {
        isFetching: false,
        message: '',
        success: null,
        isVerified: null,
        token: ''
      }
    };
  }
  
  return appReducer(state, action)
}

export default rootReducer;
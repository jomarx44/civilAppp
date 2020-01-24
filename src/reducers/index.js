import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import {accountDetailsReducer, accountsReducer} from "./AccountReducer";
import {otpReducer} from './otpReducer'
import {cisReducer} from './cisReducer';
import {tokenReducer} from './tokenReducer';
import AppAttributeReducer from './AppAttributeReducer'

export default combineReducers({
  common,
  auth,
  otp: otpReducer,
  accounts: accountsReducer,
  accountDetails: accountDetailsReducer,
  cis: cisReducer,
  token: tokenReducer,
  appAttribute: AppAttributeReducer
});

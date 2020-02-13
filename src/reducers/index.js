import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import {accountDetailsReducer, accountsReducer} from "./AccountReducer";
import {otpReducer} from './OTPReducer'
import {cisReducer} from './cisReducer';
import AppAttributeReducer from './AppAttributeReducer'

export default combineReducers({
  common,
  auth,
  otp: otpReducer,
  accounts: accountsReducer,
  accountDetails: accountDetailsReducer,
  cis: cisReducer,
  appAttribute: AppAttributeReducer
});
